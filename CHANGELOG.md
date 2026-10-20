# Changelog

All notable changes to this project will be documented in this file.

## [2.12.0] - 2026-10-20

New measures, and units are now identified by (measure, abbreviation).

- New measure **Stiffness** (translational spring stiffness, SI base `N/m`): `N/m`, `kN/m`, `MN/m`, `N/mm`, `kN/mm`, `lbf/in`, `lbf/ft`, `kip/in`. Imperial anchor `lbf/in` (1 lbf/in = 175.126835 N/m, from 1 lbf = 4.4482216152605 N and 1 in = 0.0254 m).
- New measure **Rotational-stiffness** (SI base `N*m/rad`): `N*m/rad`, `kN*m/rad`, `MN*m/rad`, `lbf*in/rad`, `lbf*ft/rad`, `kip*in/rad`, `kip*ft/rad`. Imperial anchor `lbf*in/rad`. No collision with Torque or Moment.
- `from`, `to`, `describe` and `getUnit` accept the measure as an optional second argument: `convert(1).from('lbf/in', 'Stiffness').to('N/m', 'Stiffness')`. `.to` with no measure resolves inside the measure of `from`.
- Five abbreviations are now shared by LineLoad and Stiffness: `N/m`, `N/mm`, `kN/m`, `lbf/in`, `lbf/ft` (list in `scripts/sharedAbbreviations.js`). `scripts/check-collisions.js` now fails on a duplicate abbreviation inside one measure, and on any cross-measure share that is not listed.
- Behaviour change (the only one): calling a shared abbreviation with no measure, e.g. `convert(1).from('N/m')`, throws `Ambiguous unit N/m: it belongs to the measures LineLoad, Stiffness...` instead of resolving to LineLoad. Consumers that convert LineLoad values by abbreviation alone must pass `'LineLoad'`. Every other abbreviation behaves exactly as before.
- Registry: `scripts/gen-registry.js` emits both measures with LaTeX (`$N.m^{-1}$`, `$kip.in^{-1}$`, `$N\cdot m.rad^{-1}$`) and siunit/imperialunit `N/m` / `lbf/in` and `N*m/rad` / `lbf*in/rad`. `latexUnits.json` is keyed by abbreviation, and a shared abbreviation has the same LaTeX in both measures.
- Run `scripts/gen-registry.js` again after upgrading.

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

Angle base is now the radian (breaking for anything that assumed degrees):

- The Angle anchor is `rad` and every unit is re-expressed exactly against it (`deg` = pi/180, `grad` = pi/200, `arcmin` = pi/10800, `arcsec` = pi/648000, `rev` = 2 pi, `mil` = 2 pi/6400). The generated `latexUnitTypes` siunit for Angle changes from `deg` to `rad`, so scripts now receive radians. Angle-to-angle conversions are unchanged; no other measure embeds an angle base (Frequency `deg/s` and `rad/s` are expressed in Hz, Solid-angle `deg2` is already (pi/180)^2 sr).

Conversion factors corrected. Metric/imperial anchor ratios and many inner factors are now derived from exact definitions in `lib/constants.js` (ft = 0.3048 m, in = 0.0254 m, yd = 0.9144 m, lb = 0.45359237 kg, g = 9.80665 m/s2, Btu_IT = 1055.05585262 J, 5/9 K per degree Rankine; NIST SP 811 App. B.8 and the 1959 international yard and pound agreement). Previously wrong or inverted, with the size of the error:

| Unit or ratio | Was | Now | Error |
|---|---|---|---|
| J-integral ft-lbs/sqin to J/m2 | 0.000475511 (inverted) | 2101.522 | factor 4.4e6 |
| Stefan-Boltzmann Btu/hr/sq.ft/R4 to W/m2/K4 | 0.3005 | 33.11563 | factor 110 |
| Boltzmann ft-lb/R to J/K | 7.24e22 (k_B used as the ratio, with `anchor_shift`) | 2.44047 | factor 3e22 |
| Boltzmann ev/K | 1/k_B with `anchor_shift` | 1.602176634e-19 J/K | factor 4e41 |
| Area-moment in4 to m4 | 1/2400000 | 1/2402509.61 | 1.05e-3 |
| Area-moment ft4 | 1/207346 in4 | 20736 in4 | factor 4.3e9 |
| Stress-Intensity-Factor ksi-sqr(in) to MPa-sqrt(m) | 1.0978334 | 1.0988435 | 9.2e-4 |
| Temperature-gradient F/ft to K/m | 1/0.5485961 | (5/9)/0.3048 | 8e-5 |
| Force kgf, tfM; Mass-moment kgfms2; Specific-heat kgf-m/kg/C | inverted (1/9.80665 etc.) | 9.80665 etc. | factor 96 |
| Moment pdl-ft, pdl-in | inverted (43.62 and 523.5 N m) | 0.04214011 and 0.003511676 N m | factor 1035 |
| Thermal-conductivity Btu.in/hr/sq.ft/F | 20.77 W/m/K | 0.1442279 | factor 144 |
| Thermal-conductivity Btu.in/s/sq.ft/F | 0.005711 W/m/K | 519.2204 | factor 9.1e4 |
| Section-modulus zcm3, zmm3 | 1e6, 1e9 zm3 (inverted) | 1e-6, 1e-9 | factor 1e12, 1e18 |
| Thermal-conductivity W/mm/C, W/cm/C | 1e-3, 1e-2 W/m/C (inverted) | 1e3, 1e2 | factor 1e6, 1e4 |
| Specific-heat J/g/C | 1e-3 J/kg/C (inverted) | 1e3 | factor 1e6 |
| Specific-heat mJ/kg/C, mJ/kg/K | 1e3 (milli key, mega value) | 1e-3, named Milli-Joule | factor 1e6 |

Truncated decimals replaced by exact or derived values (relative error of the old value): Volume and VolumeFlowRate fl oz, in3, ft3 (4.6e-6); Density long ton and imperial densities (2.9e-6); Area ft2 (9.7e-7); Section-modulus in3 (2.6e-7); Length and Acceleration ft (3.2e-8); Stefan-Boltzmann and thermal-conductivity Btu factors (1.9e-7); Energy Btu_IT (1.4e-7), `quad` (4e-6) and `ft-lb`; Torque and Moment lbf ft (6.7e-8); HeatGen (1.3e-7); Illuminance footcandle (3.9e-8); Mass `slug`, `ozt`, `lbt`, `dwt` (1.5e-6); Length `pc` (7e-6); Pressure `mmHg`, `cmHg` (3e-6), `inHg` and `inH2O`; Moment `tfsm`, `tflm` (4e-7); Power `hp-mech` (2e-9) and `tonRef` (1e-8); Speed `knot` and `ft/s` (4e-7, 2.7e-7); Pace `min/mi` (3.2e-6); Viscosity `reyn` (4e-8); Luminance `fL`; Charge `statC`, `Fr` and Current `statA` (2.9e-7); Resistance `statΩ` and Inductance `statH` (6e-6); Force `a_u_force` (1.6e-8); Length `nMi` is exactly 1852 m and `ft-us` exactly 1200/3937 m. `therm` stays 105,506,000 J (NIST, EC therm).

Every physical unit is now checked against pint 0.26.1 to 1e-12, for every pair of units in its measure (`test/pint.js`, `pint-check/`). Only Currency and Speed `mach` are excluded. The check found these, now fixed (relative error of the old value):

- Physical constants move from CODATA 2018 to CODATA 2022. Atomic and Planck units are now derived from the constants in `lib/constants.js` instead of rounded published values: Mass `m_e` (1.4e-9), `m_p` (1.4e-9), `m_n` (1.5e-9), `u` and `Da` (1.4e-9), `mP` (1.3e-9); Length `a0` (6.8e-10), `lP` (1.5e-8); Time `tP` (8.3e-8); Force `a_u_force` (6.7e-10); Electric-field `a_u_E` (6.8e-10); Magnetic-moment `mu_B`, `mu_N` (1.4e-9); Energy `Ry` (1.4e-12), `Eh` (2.5e-13).
- Charge `faraday` is exactly e N_A (3.4e-11).
- Logarithmic-ratio `Np` is exactly 20/ln 10 dB (7.5e-12).
- Area `darcy` is exactly 1 cP cm2/(s atm) (3.4e-8).
- Time `sidereal-day`, `sidereal-yr` and `tropical-yr` use the full J2000 values (3.6e-10, 7.5e-9, 7.9e-9).

Other fixes:

- The Moment and Mass-moment imperial anchor units are now `lbf-ft` and `lb-ft2`, and Stress-Intensity-Factor's is `ksi-sqr(in)`; they named non-existent keys in the generated `latexUnitTypes`.
- HeatFlux, HeatGen and FilmCoeff imperial unit names now say British thermal (IT).

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


