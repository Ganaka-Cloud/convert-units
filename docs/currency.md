## Currency conversions (GBP-anchored)

This project includes a currency measure that converts between fiat currencies using a single anchor currency: GBP.

### How it works
- The file `lib/definitions/currency.js` contains unit definitions for each supported three‑letter currency code (e.g., `USD`, `EUR`, `JPY`).
- Each unit has:
  - `name.singular` and `name.plural` equal to the three‑letter code in uppercase
  - `to_anchor` equal to 1 divided by the GBP rate returned by the external API
- Anchor settings:
  - Anchor unit: `GBP`
  - Anchor ratio: `1`

As a result, converting `from('USD').to('EUR')` proceeds via the GBP anchor using the ratios encoded in `to_anchor`.

### Data source
- Rates are fetched from: `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/gbp.json`
- Only keys that match three lowercase letters are included. They are normalized to uppercase in `currency.js`.
- The API response expresses value per 1 GBP for each currency. For a code `XXX` with value `v`, `to_anchor` is set to `1 / v` (and `GBP` is `1`).

## Automatic updates with currencyUpdater

The utility `lib/utils/currencyUpdater.js` keeps `lib/definitions/currency.js` current.

### Exports
- `updateCurrencyDefinitions()`
  - Fetches GBP rates JSON, regenerates `lib/definitions/currency.js`, and returns `{ outputFile, count }`.
- `startCurrencyUpdateScheduler({ onSuccess, onError })`
  - Runs `updateCurrencyDefinitions()` immediately on initialization.
  - Schedules the next update at 4:00 AM local time every day.
  - Returns a function to stop the scheduler.

### Scheduling details
- The next run time is computed for the upcoming 4:00 AM local clock time. If the current time is past 4:00 AM, it schedules for the next day.
- Daylight Saving Time shifts are handled by recomputing the next delay after each run.
- Errors during fetch/write are surfaced via the optional `onError` callback but do not stop future scheduling.

## Initialization (server/app startup)

Add this to your server bootstrap so rates update on startup and daily thereafter:

```js
const { startCurrencyUpdateScheduler } = require('./lib/utils/currencyUpdater');

startCurrencyUpdateScheduler({
  onSuccess: (result) => {
    console.log('Currency definitions updated:', result.count, 'entries');
  },
  onError: (err) => {
    console.error('Currency update failed:', err && err.message);
  },
});
```

If you need a one‑off manual refresh (e.g., in a maintenance task):

```js
const { updateCurrencyDefinitions } = require('./lib/utils/currencyUpdater');

(async () => {
  try {
    const result = await updateCurrencyDefinitions();
    console.log('Updated currency definitions:', result.count);
  } catch (err) {
    console.error('Manual currency update failed:', err);
  }
})();
```

## Notes and considerations
- File writes: `currencyUpdater` overwrites `lib/definitions/currency.js`. Ensure your runtime has permission to write to the project directory (or run the updater as part of your build/publish step if your runtime filesystem is read‑only).
- Unit coverage: The API includes many entries (including some non‑fiat). Only three‑letter lowercase keys are included to align with typical ISO‑style codes.
- Testing: The test suite dynamically includes all currency codes when checking the global possibilities list, so new codes from the upstream API are accounted for automatically.
