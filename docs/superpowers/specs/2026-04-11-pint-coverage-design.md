# Extend @pandala/convert-units to Full Pint Coverage

**Date:** 2026-04-11
**Branch:** develop (v2.5.1)
**Approach:** Hybrid — Runtime prefix expansion + JSON export (no build step for JS)

## Context

The Ganaka UI workspace-block-composition spec (Activity A, Agent 5) calls for extending `@pandala/convert-units` from 42 measures / ~590 units to 50+ measures / 1000+ units, achieving Python Pint-level unit coverage for conversion only (no dimensional analysis). The library serves as the single source of truth for both the JS frontend (ganaka-ui) and the future Go DimEngine.

Currently, ganaka-ui depends on the public API (`.from().to()`, `.possibilities()`, `.describe()`, `.measures()`, `.list()`) and two hand-maintained JSON files (`latexUnits.json`, `latexUnitTypes.json`) that map unit abbreviations to LaTeX display strings. The only internal dependency is `currencyInit.js` which directly imports `lib/definitions/currency.js`.

## Design

### 1. SI Prefix Auto-Expansion Utility

**New file: `lib/siPrefixes.js`**

A pure function that generates unit definitions from a base unit + prefix set, called at `require()` time (zero conversion-time overhead).

```js
expandSI(baseAbbr, baseName, baseToAnchor, prefixes, options?)
```

**Parameters:**
- `baseAbbr` — e.g., `"N"`
- `baseName` — e.g., `"Newton"` (singular; plural auto-generated as `baseName + "s"`)
- `baseToAnchor` — e.g., `1`
- `prefixes` — array of prefix symbols to generate, e.g., `["μ", "m", "k", "M", "G"]`
- `options.pluralName` — optional irregular plural override (e.g., `"Hertz"` → `"Hertz"` not `"Hertzs"`)
- `options.baseLatex` — optional LaTeX override for the base symbol (e.g., `"\\Omega"` for Ω)

**Returns:** A flat object in the exact shape the engine expects:
```js
{
  "μN": { name: { singular: "Micronewton", plural: "Micronewtons" }, to_anchor: 1e-6, _latex: "${\\mu}N$" },
  "mN": { name: { singular: "Millinewton", plural: "Millinewtons" }, to_anchor: 1e-3, _latex: "$mN$" },
  "N":  { name: { singular: "Newton",      plural: "Newtons" },      to_anchor: 1,    _latex: "$N$" },
  "kN": { name: { singular: "Kilonewton",  plural: "Kilonewtons" },  to_anchor: 1e3,  _latex: "$kN$" },
  ...
}
```

**Built-in SI prefix table (18 prefixes):**

| Symbol | Name | Factor | LaTeX |
|---|---|---|---|
| y | yocto | 10⁻²⁴ | `$y$` |
| z | zepto | 10⁻²¹ | `$z$` |
| a | atto | 10⁻¹⁸ | `$a$` |
| f | femto | 10⁻¹⁵ | `$f$` |
| p | pico | 10⁻¹² | `$p$` |
| n | nano | 10⁻⁹ | `$n$` |
| μ | micro | 10⁻⁶ | `${\\mu}` |
| m | milli | 10⁻³ | `$m$` |
| c | centi | 10⁻² | `$c$` |
| d | deci | 10⁻¹ | `$d$` |
| da | deca | 10¹ | `$da$` |
| h | hecto | 10² | `$h$` |
| k | kilo | 10³ | `$k$` |
| M | mega | 10⁶ | `$M$` |
| G | giga | 10⁹ | `$G$` |
| T | tera | 10¹² | `$T$` |
| P | peta | 10¹⁵ | `$P$` |
| E | exa | 10¹⁸ | `$E$` |

Each definition file chooses which prefixes are relevant (not all units need all 18).

**Usage pattern in definition files:**
```js
const { expandSI } = require("../siPrefixes");
metric = {
  ...expandSI("N", "Newton", 1, ["μ", "m", "k", "M", "G"]),
  dyn: { name: { singular: "dyne", ... }, to_anchor: 1e-5, _latex: "$dyn$" },
  kgf: { ... },  // non-SI units stay manual
};
```

Spread puts expanded units first; manual entries defined after the spread override if there's a collision (standard JS object spread semantics — last key wins). For example, if `expandSI` generates `kN` and a manual `kN` entry follows, the manual entry wins. This allows definition files to override auto-generated names or `to_anchor` values for specific prefixed units if needed.

**`_latex` metadata:** Each unit definition gains an optional `_latex` property. The conversion engine ignores it (it only reads `name`, `to_anchor`, `anchor_shift`). The JSON export script reads it.

### 2. New Measures (15 new definition files + 1 fix)

All registered in `lib/index.js` with `require()` statements.

| Measure | File | Anchor (metric) | Key Units | Systems | Notes |
|---|---|---|---|---|---|
| Dynamic Viscosity | `viscosity.js` | Pa·s (1) | Pa·s, cP, P (poise) + SI prefixes on Pa·s | metric | cP = 1e-3 Pa·s |
| Kinematic Viscosity | `kinematic-viscosity.js` | m²/s (1) | m²/s, St, cSt | metric | St = 1e-4 m²/s |
| Torque | `torque.js` | N·m (1) | N·m, kN·m, MN·m + lbf·ft, ozf·in | metric + imperial | Distinct from Energy despite same SI dimension |
| Surface Tension | `surface-tension.js` | N/m (1) | N/m, mN/m, dyn/cm | metric | dyn/cm = 1e-3 N/m |
| Radiation Dose | `radiation-dose.js` | Gy (1) | Gy, Sv, rad, rem + SI prefixes on Gy/Sv | metric + legacy | rad = 0.01 Gy |
| Radiation Activity | `radiation-activity.js` | Bq (1) | Bq, Ci, Rd + SI prefixes on Bq | metric | Ci = 3.7e10 Bq |
| Magnetic Flux | `magnetic-flux.js` | Wb (1) | Wb, Mx (maxwell) + SI prefixes | metric + CGS | Mx = 1e-8 Wb |
| Magnetic Flux Density | `magnetic-flux-density.js` | T (1) | T, G (gauss) + SI prefixes on T | metric + CGS | G = 1e-4 T |
| Magnetic Field Strength | `magnetic-field-strength.js` | A/m (1) | A/m, Oe (oersted) | metric + CGS | Oe = 1000/(4π) A/m |
| Luminance | `luminance.js` | cd/m² (1) | nit, stilb, lambert, cd/m² | metric | stilb = 1e4 cd/m² |
| Solid Angle | `solid-angle.js` | sr (1) | sr, deg² | metric | deg² = (π/180)² sr |
| Electric Field | `electric-field.js` | V/m (1) | V/m + SI prefixes | metric | — |
| Electric Charge | `charge.js` (fix existing) | C (1) | C + SI prefixes, Ah, mAh | metric | Fix: remove copy-paste acceleration units from imperial section |
| Substance Flow | `substance-flow.js` | mol/s (1) | mol/s, mol/min, mol/L | metric | — |
| Logarithmic Power | `logarithmic-power.js` | dBW (1) | dBW, dBm | metric | Uses `anchor_shift` for dBm (see below) |
| Logarithmic Ratio | `logarithmic-ratio.js` | dB (1) | dB, Np | metric | Linear ratio: 1 Np = 8.686 dB |

**Logarithmic units — special handling:**

dB-based conversions are non-linear. The engine already supports `transform` functions (used by temperature). Logarithmic units will use the same mechanism.

There are two distinct use cases:
1. **Absolute power levels** (dBW, dBm): These have a fixed reference and can be inter-converted. Anchor: dBW. dBm → dBW via `anchor_shift: -30` (since dBm = dBW + 30). This uses the existing `anchor_shift` mechanism, same as temperature — no `transform` needed.
2. **Neper ↔ dB**: Np → dB is a linear scaling (`1 Np = 8.685889638 dB`), so it uses a standard `to_anchor` ratio within a single system.

Note: bare "dB" is a relative/dimensionless ratio and cannot be converted to an absolute level like dBW.

**Important engine constraint:** The conversion engine allows cross-system conversion within the same measure via `_anchors` ratio/transform — it does NOT block it. The "Cannot convert incompatible measures" error only fires when `origin.measure !== destination.measure` (different measures entirely). Therefore, putting absolute and relative dB units in different systems of the same measure would cause the engine to silently produce wrong results (it would attempt a ratio-based conversion between dBW and dB).

**Solution:** Split into two separate measures:
- **`Logarithmic-power`** (single system `metric`): dBW (anchor, `to_anchor: 1`), dBm (`anchor_shift: 30`, `to_anchor: 1`). Converting dBm ↔ dBW uses the existing `anchor_shift` mechanism.
- **`Logarithmic-ratio`** (single system `metric`): dB (anchor, `to_anchor: 1`), Np (`to_anchor: 8.685889638`). Converting Np ↔ dB is a simple linear ratio.

This way, attempting `convert(0).from('dBm').to('dB')` correctly throws "Cannot convert incompatible measures of Logarithmic-ratio and Logarithmic-power".

### 3. Extensions to Existing Measures

Additive changes only — append new units to existing definition files. No existing abbreviations or `to_anchor` values change.

| Measure | File | Units to Add | System |
|---|---|---|---|
| Pressure | `pressure.js` | atm (101325 Pa), mmHg (133.322 Pa), cmH₂O (98.0665 Pa), mbar (100 Pa) | metric |
| Pressure | `pressure.js` | inH₂O, inHg | imperial |
| Energy | `energy.js` | cal (4.184 J), kcal (4184 J), erg (1e-7 J), therm (1.055e8 J), quad (1.055e18 J), toe (4.187e10 J) | metric |
| Energy | `energy.js` | eV, keV, MeV + SI prefixes on eV | metric |
| Power | `power.js` | hp-mech (745.7 W), hp-met (735.499 W), hp-elec (746 W), hp-boiler (9809.5 W), tonRef (3516.85 W) | metric + imperial |
| Length | `length.js` | Å (1e-10 m), ly (9.461e15 m), AU (1.496e11 m), pc (3.086e16 m) | metric |
| Length | `length.js` | fathom (6 ft), furlong (660 ft), chain (66 ft) | imperial |
| Mass | `mass.js` | u (1.66054e-27 kg), Da (1.66054e-27 kg) | metric |
| Mass | `mass.js` | slug (14.5939 kg-equivalent), stone (14 lb), grain (1/7000 lb) | imperial |
| Volume | `volume.js` | gill, barrel-oil, barrel-beer, bushel, peck, fl-oz-UK | imperial |
| Time | `time.js` | fortnight (1.2096e6 s), shake (1e-8 s), svedberg (1e-13 s), yr-julian (3.15576e7 s) | metric |
| Force | `force.js` | pond (9.80665e-3 N), kp (9.80665 N) | metric |
| Frequency | `frequency.js` | Review and add missing SI prefixes via expandSI | metric |

### 4. JSON Export & LaTeX Generation

**New script: `scripts/gen-registry.js`**

Loads `lib/index.js`, iterates all measures/systems/units, and outputs three files to `dist/`:

**`dist/units-registry.json`** — for Go DimEngine:
```json
{
  "version": "2.6.0",
  "generatedAt": "2026-04-11T...",
  "measures": {
    "Length": {
      "systems": ["metric", "imperial"],
      "units": {
        "m": {
          "system": "metric",
          "singular": "Meter",
          "plural": "Meters",
          "to_anchor": 1,
          "latex": "$m$"
        }
      },
      "anchors": {
        "metric": { "unit": "m", "ratio": 3.28084 },
        "imperial": { "unit": "ft", "ratio": 0.3048 }
      }
    }
  }
}
```

**`dist/latexUnits.json`** — drop-in for ganaka-ui:
```json
{
  "latexUnits": {
    "m": "$m$",
    "km": "$km$",
    "μm": "${\\mu}m$",
    "μN": "${\\mu}N$"
  }
}
```

**LaTeX convention (must match existing ganaka-ui patterns):** Micro uses `${\\mu}` prefix (e.g., `"${\\mu}m$"` not `"$\\mu m$"`). Superscripts use `^{n}` (e.g., `"$m^{2}$"`). Fractions use dot separator (e.g., `"$km.h^{-1}$"` for km/h). The generator must follow these conventions — not invent new ones — to be a drop-in replacement.

**`dist/latexUnitTypes.json`** — drop-in for ganaka-ui:
```json
{
  "latexUnitTypes": [
    { "id": 0, "name": "-Select-", "siunit": "--", "imperialunit": "--" },
    { "id": 1, "name": "--", "siunit": "--", "imperialunit": "--" },
    { "id": 2, "name": "Length", "siunit": "m", "imperialunit": "ft" },
    { "id": 44, "name": "Viscosity", "siunit": "Pa·s", "imperialunit": "" }
  ]
}
```

The wrapper key `"latexUnitTypes"` and the placeholder entries (id 0: "-Select-", id 1: "--") must be preserved exactly — ganaka-ui components depend on them. Existing IDs preserved; new measures get sequential IDs starting after the current max (currently 42 for Currency).

**npm scripts:**
```json
"build:registry": "node scripts/gen-registry.js",
"check:collisions": "node scripts/check-collisions.js"
```

### 5. Performance: `getUnit()` Lookup Cache

At 1200+ units, the 3-level nested `lodash.foreach` in `getUnit()` is wasteful — especially for `.toBest()` which calls `getUnit()` once per possibility.

**Add a lazy-initialized lookup map** in `lib/index.js`:

```js
let _unitCache = null;

// In getUnit():
if (!_unitCache) {
  _unitCache = {};
  // Build abbr -> {abbr, measure, system, unit} map from measures object
}
return _unitCache[abbr] || null;
```

- Built once on first `getUnit()` call
- O(1) lookups thereafter
- No public API change
- Currency mutations from ganaka-ui's `currencyInit.js` happen before any conversion calls, so the cache is built after mutations complete (lazy init ensures this)

### 6. Collision Checker

**New script: `scripts/check-collisions.js`**

- Loads all definitions from `lib/index.js`
- Builds `Map<abbreviation, measure[]>`
- Reports any abbreviation appearing in more than one measure
- Exits with non-zero code if collisions found
- Run in CI alongside lint and tests

### 7. ganaka-ui Compatibility

ganaka-ui (18 files) depends on convert-units through these integration points:

**Public API (no changes needed):**
- `.from(abbr).to(abbr)` — returns number. Unchanged.
- `.possibilities(measure)` — returns `string[]` of abbreviations. Will return more entries (new units) but same shape. Measure names must remain PascalCase (e.g., `"Length"`, `"Pressure"`) to match ganaka-ui's `.describe().measure` lookups.
- `.describe(abbr)` — returns `{ abbr, measure, system, singular, plural }`. ganaka-ui only accesses `.measure`. Unchanged.
- `.measures()` — returns `string[]` of measure names. Will return more entries (new measures). Unchanged shape.
- `.list()`, `.toBest()` — unchanged signatures and return shapes.

**Internal dependency — `currencyInit.js`:**
- Imports `@pandala/convert-units/lib/definitions/currency.js` directly via dynamic `import()`
- Accesses `defs.currency` (the unit map) and `defs._anchors` (the anchor config)
- Mutates in-place: deletes all keys from `defs.currency`, then `Object.assign(targetMap, updated)`
- Sets `anchors.currency.unit = 'GBP'` and `anchors.currency.ratio = 1`
- **Guarantee:** `currency.js` will NOT use `expandSI` and its export structure (`{ currency: {...}, _anchors: {...} }`) will remain identical.

**JSON files (generated replacements):**
- `latexUnits.json`: wrapper structure `{ "latexUnits": { ... } }` must be preserved. All 562 existing entries must appear in the generated output with identical LaTeX strings. New units are additive.
- `latexUnitTypes.json`: wrapper structure `{ "latexUnitTypes": [...] }` must be preserved. Placeholder entries (id 0: "-Select-", id 1: "--") must be preserved. All existing IDs (2-42) must remain unchanged. New measures get IDs 43+.

**What does NOT change:**
- Public API signatures and return shapes
- Currency definition structure
- Engine logic (`Converter.to()` method)
- Package name (stays `convert-units`; scoped name handled at publish time)
- Existing measure names (PascalCase keys in `measures` object)
- Existing unit abbreviations and their `to_anchor` values (unless corrected by Pint cross-validation in Phase 0)

### 8. Known Abbreviation Collision Risks

The following single-character abbreviations are already in use across existing measures: `m` (meter), `N` (newton), `g` (gram), `t` (metric ton), `l` (liter), `C` (celsius), `K` (kelvin), `F` (fahrenheit), `R` (rankine), `s` (second), `h` (hour), `d` (day), `b` (bit), `B` (byte), `A` (ampere), `V` (volt), `W` (watt), `J` (joule).

New measures must avoid these. Key decisions:
- **Tesla** (`T`): Safe — `T` is not currently used. But note: `T` is also the tera prefix symbol. Definition files using `expandSI` on Tesla must NOT include `T` as a prefix (that would create `TT`). Tesla itself is defined manually, not via prefix expansion.
- **Gauss** (`G`): Safe — `G` is not currently used. Same prefix concern as Tesla (`G` is giga). Gauss is defined manually.
- **Coulomb** (`c`): The existing `charge.js` uses lowercase `c`. This is safe since `C` (uppercase) is Celsius. However, `c` is also the `centi` prefix symbol — definition files that expand with `centi` prefix on a unit whose abbreviation starts with `c` could collide. The collision checker script will catch these.
- **Becquerel** (`Bq`): Safe — multi-character, no collision.
- **Weber** (`Wb`): Safe — multi-character, no collision.

### 9. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Abbreviation collisions across measures | `getUnit()` returns wrong measure | Collision checker in CI; manual audit of all new abbreviations (see section 8 above) |
| Logarithmic transform complexity | Incorrect dB conversions | Cross-validate against Pint's dB conversion test cases |
| `charge.js` has copy-paste bug (imperial section has acceleration units) | Wiring it into index.js would expose broken units | Fix imperial section before wiring; add tests |
| LaTeX generation doesn't match ganaka-ui expectations | Broken unit display | Compare generated output against existing `latexUnits.json`; ensure all 562 existing entries preserved |
| Conversion factor accuracy | Incorrect conversions | Use NIST/BIPM reference values; cross-validate against Pint for all shared units |

## Verification

### Phase 0: Audit Existing `to_anchor` Values Against Pint

Before adding new units, verify that the existing ~308 non-currency units already in convert-units use conversion factors that agree with Python Pint. This catches any legacy inaccuracies inherited from the original fork.

**Method:**

1. **Generate a Pint reference dataset** — a Python script (`scripts/gen-pint-reference.py`) that:
   - Imports `pint`, creates a `UnitRegistry`
   - For each unit abbreviation that exists in both convert-units and Pint, computes `1 <unit> → <anchor unit>` (e.g., `1 km → ? m`, `1 psi → ? Pa`)
   - Outputs `pint-reference.json`: `{ "Length": { "km": { "to_anchor_pint": 1000.0, "anchor": "m" }, ... }, ... }`

2. **Run a comparison script** (`scripts/verify-against-pint.js`) that:
   - Loads `pint-reference.json` and the live convert-units definitions
   - For each overlapping unit, computes relative error: `|to_anchor_cu - to_anchor_pint| / to_anchor_pint`
   - Reports discrepancies exceeding 1e-6 (one part per million)
   - Classifies results as: EXACT MATCH (error = 0), ACCEPTABLE (error < 1e-6), REVIEW (1e-6 < error < 1e-3), WRONG (error > 1e-3)

3. **Fix any WRONG or REVIEW values** — update `to_anchor` in the existing definition files to match NIST/BIPM reference values (which Pint uses).

**Expected overlap by measure (approximate):**

| Measure | convert-units units | Likely Pint overlap | Notes |
|---|---|---|---|
| Length | nm, μm, mm, cm, m, km, in, ft, yd, mi, nMi | All | Core SI + imperial |
| Mass | mg, g, kg, mt, oz, lb, t | All | Check mt vs metric ton |
| Volume | mm3, cm3, ml, l, kl, m3, tsp, Tbs, fl-oz, cup, pnt, qt, gal | Most | US vs UK fluid measures may differ |
| Temperature | C, K, F, R | All | Verify transform functions match |
| Pressure | Pa, hPa, kPa, MPa, bar, psi, torr | Most | torr definition may vary slightly |
| Energy | J, kJ, Wh, kWh, MWh, BTU | Most | BTU has multiple definitions (IT, th, mean) |
| Force | N, daN, kN, dyn, lbf, kgf | Most | kgf: verify 9.80665 exact |
| Power | W, kW, MW, GW, hp | Most | hp: verify which definition (mech vs metric) |
| Speed | m/s, km/h, mph, knot, ft/s | All | — |
| Frequency | Hz, kHz, MHz, GHz, THz | All | Pure SI multiples |
| Current | A, mA, kA | All | Pure SI |
| Voltage | V, mV, kV | All | Pure SI |
| Time | s, min, h, d, week, month, year | Most | month/year definitions vary |
| Angle | deg, rad, grad, arcmin, arcsec | All | — |
| Digital | b, Kb, Mb, Gb, Tb, B, KB, MB, GB, TB | Some | Pint may not cover all binary variants |

Units unique to convert-units (engineering-specific like area-moment, section-modulus, stress-intensity-factor, J-integral, Stefan-Boltzmann, crack-growth-rate) will not have Pint equivalents — these are skipped in the comparison.

**Acceptance criteria:** All overlapping units either EXACT MATCH or ACCEPTABLE (< 1e-6 relative error). Any REVIEW/WRONG entries fixed before proceeding to new unit additions.

### Phase 1: Test Convention in convert-units

All tests follow the existing patterns established in the codebase. The test framework uses Jake (task runner) + Node.js built-in `assert` module. Tests are CommonJS modules exporting a `tests` object.

**Test file template (one per measure):**

```js
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// --- Identity tests (same-unit) ---
tests["N to N"] = function () {
  assert.strictEqual(convert(1).from("N").to("N"), 1);
};

// --- Within-system tests (exact ratios) ---
tests["kN to N"] = function () {
  assert.strictEqual(convert(1).from("kN").to("N"), 1000);
};

tests["N to kN"] = function () {
  assert.strictEqual(convert(1).from("N").to("kN"), 1 / 1000);
};

// --- Cross-system tests (expect < 0.1% error) ---
tests["N to lbf"] = function () {
  var expected = 0.224809,
    actual = convert(1).from("N").to("lbf");
  assert.ok(
    percentError(expected, actual) < ACCURACY,
    "Expected: " + expected + ", Actual: " + actual
  );
};

// --- Round-trip tests (A → B → A should recover original) ---
tests["N to lbf and back"] = function () {
  var expected = 100,
    actual = convert(convert(100).from("N").to("lbf")).from("lbf").to("N");
  assert.ok(
    percentError(expected, actual) < ACCURACY,
    "Expected: " + expected + ", Actual: " + actual
  );
};

module.exports = tests;
```

**Test categories per measure:**

| Category | Method | When to use |
|---|---|---|
| **Identity** | `assert.strictEqual(convert(x).from(u).to(u), x)` | Every unit — verifies no corruption |
| **Within-system exact** | `assert.strictEqual(convert(1).from(a).to(b), ratio)` | Units in the same system where `to_anchor` ratio is exact (e.g., km → m = 1000) |
| **Cross-system approximate** | `percentError(expected, actual) < ACCURACY` | Metric ↔ imperial where anchor ratio introduces floating-point error; ACCURACY = 1/1000 (0.1%) |
| **Round-trip** | Convert A → B → A, verify < 0.1% error | Every cross-system pair — catches asymmetric transform bugs |
| **Edge values** | Test with 0, negative, very large, very small values | Temperature (0°C, -273.15°C), logarithmic (0 dBW), and any unit with `anchor_shift` |
| **Pint cross-validation** | Compare against `pint-reference.json` values | Every unit that overlaps with Pint — exact factor comparison, not just conversion result |

**`percentError` utility** ([lib/percentError.js](lib/percentError.js)):
```js
module.exports = (expected, actual) => Math.abs((expected - actual) / actual);
```

### Phase 2: Tests for New and Extended Units

1. **Per-measure test files** — one `test/<measure>.js` per new measure (15 new + 1 fixed = 16 files), following the template above. Minimum coverage per file:
   - 1 identity test per unit
   - Within-system conversion for each unit to/from anchor
   - Cross-system round-trip if applicable
   - Edge value tests for non-linear measures (logarithmic, any with `anchor_shift`)

2. **Extended measure tests** — for the 9 existing measures receiving new units, add new test cases to the existing test files (e.g., add `atm to Pa` test in `test/pressures.js`)

3. **Parametric prefix test** (`test/si-prefixes.js`) — programmatically verify every `expandSI`-generated unit:
   ```js
   // For each measure that uses expandSI:
   //   For each prefixed unit (e.g., μN, mN, kN):
   //     1. Convert 1 <prefix><base> to <base> — verify equals prefix factor
   //     2. Convert 1 <base> to <prefix><base> — verify equals 1/prefix factor
   //     3. Round-trip: <prefix><base> → <base> → <prefix><base> — verify identity
   ```

4. **Pint cross-validation for new units** — extend `pint-reference.json` to include all newly added units that exist in Pint. Run `scripts/verify-against-pint.js` — all new units must be EXACT MATCH or ACCEPTABLE.

### Phase 3: Infrastructure & CI Tests

5. **Collision check:** `npm run check:collisions` — zero abbreviation collisions across all measures
6. **Registry consistency:** `test/registry-consistency.js` — verify `dist/units-registry.json` matches live library output (catches stale JSON)
7. **LaTeX backward compatibility:** verify all 562 existing `latexUnits.json` entries are preserved in generated output
8. **Lint + format:** `npm run ci:lint` passes
9. **All existing tests pass:** `npm test` — all 46 existing test files continue to pass (regression guard)