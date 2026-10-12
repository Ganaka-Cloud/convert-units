# Changelog

All notable changes to this project will be documented in this file.

## [2.11.0] - 2026-10-12

Unit keys are now the tag-grammar spelling only (SI symbols joined with `*` and `/`, bare integer exponents). Consumers must replace the removed keys; there are no aliases. Consumers install from git tags (ganaka-ui pins `#v2.10.0`) and run `scripts/gen-registry.js`, so re-run it after upgrading.

Removed keys and their replacements:

| Measure | Removed | Use |
|---|---|---|
| Density | `kgpcm` | `kg/m3` |
| Density | `gpcc` | `g/cm3` |
| Density | `gpcm` | `g/m3` |
| Density | `tpcmm` | `t/mm3` |
| Density | `kgpl` | `kg/l` |
| Density | `gpl` | `g/l` |
| Mass-moment | `kgm2` | `kg*m2` |
| Mass-moment | `kgcm2` | `kg*cm2` |
| Mass-moment | `kgmm2` | `kg*mm2` |
| J-integral | `J/sqm` | `J/m2` |
| J-integral | `kJ/sqm` | `kJ/m2` |
| LinearCTE | `/C` | `1/C` |
| LinearCTE | `/K` | `1/K` |

Also in this release:

- LinearCTE no longer applies absolute-temperature offsets: a coefficient is per temperature interval, so 1 /K = 5/9 /F (NIST SP 811 App. B.8). The measure's metric anchor is now `1/K`.
- New measures: Temperature-gradient (`K/m`, `F/ft`), Electrical-conductivity (`S/m`), Compressibility (`1/Pa`, `1/psi`), Piezo-coefficient (`m/V`).
- Density `tpcmm` (now `t/mm3`) is named a metric tonne per cubic millimetre, matching its factor.
- Registry LaTeX: `kg/m^{3}`, `kg\cdot m^{2}`, `J/m^{2}`, `^{\circ}C^{-1}`, `K^{-1}` for the new keys.
- Anchors changed in the generated registry: Density `kg/m3`, Mass-moment `kg*m2`, J-integral `J/m2`, LinearCTE `1/K`.

## [2.5.1] - 2025-08-09

- Cleanup: Removed server-side `lib/utils/currencyUpdater.js` as browser/Vue apps use in-memory updates.

## [2.5.0] - 2025-08-09

- Currency conversions anchored to GBP:
  - Added `lib/definitions/currency.js` containing uppercase three-letter currency codes with ratios derived from GBP API.
  - Registered `Currency` measure and updated tests to dynamically include all currency codes.
- Automatic currency updates:
  - Added `lib/utils/currencyUpdater.js` to regenerate currency definitions from `@fawazahmed0/currency-api`.
  - Scheduler runs on initialization and daily at 4:00 AM local time.
- Documentation:
  - Added `docs/currency.md` explaining usage and initialization of the updater.

## [2.4.0] - 2025-08-09

- Modernize codebase to ES6+ (no TypeScript):
  - Converted core `lib/index.js` to class syntax and strict equality.
  - Added "use strict" and minor ES6 cleanups across all `lib/definitions/*`.
  - Normalized decimals in definitions where appropriate.
- Comprehensive test updates and additions:
  - Fixed outdated tests, added dedicated measure tests, and expanded possibilities coverage.
  - Audited and corrected several measure definition factors to match standards (density, thermal-conductivity, thermal-expansion, Stefan-Boltzmann, stress-intensity-factor).
- Tooling and CI:
  - Added ESLint + Prettier configuration (no TypeScript).
  - Added GitHub Actions workflow to run lint and tests on push/PR.
- Bumped version to 2.4.0.


