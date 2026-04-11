# Extend @pandala/convert-units to Full Pint Coverage

**Date:** 2026-04-11
**Branch:** develop (v2.5.1)
**Approach:** Hybrid — Runtime prefix expansion + JSON export (no build step for JS)

## Context

The Ganaka UI workspace-block-composition spec (Activity A, Agent 5) calls for extending `@pandala/convert-units` from 42 measures / ~596 units to 50+ measures / 1000+ units, achieving Python Pint-level unit coverage for conversion only (no dimensional analysis). The library serves as the single source of truth for both the JS frontend (ganaka-ui) and the future Go DimEngine.

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
  "μN": { name: { singular: "Micronewton", plural: "Micronewtons" }, to_anchor: 1e-6, _latex: "$\\mu N$" },
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
| μ | micro | 10⁻⁶ | `$\\mu$` |
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

### 2. New Measures (14 new definition files + 1 fix)

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
| Logarithmic | `logarithmic.js` | dBW (1) | dBW, dBm, dB, Np (neper) | special | Non-linear: requires `transform` functions |

**Logarithmic units — special handling:**

dB-based conversions are non-linear. The engine already supports `transform` functions (used by temperature). Logarithmic units will use the same mechanism.

There are two distinct use cases:
1. **Absolute power levels** (dBW, dBm): These have a fixed reference and can be inter-converted. Anchor: dBW. dBm → dBW via `anchor_shift: -30` (since dBm = dBW + 30). This uses the existing `anchor_shift` mechanism, same as temperature — no `transform` needed.
2. **Neper ↔ dB**: Np → dB is a linear scaling (`1 Np = 8.685889638 dB`), so it uses a standard `to_anchor` ratio within a single system.

Note: bare "dB" is a relative/dimensionless ratio and cannot be converted to an absolute level like dBW. It will exist in the Logarithmic measure for Np ↔ dB conversion only, not for dB → dBW conversion. The measure will be split into two systems:
- `absolute`: dBW (anchor), dBm (anchor_shift: 30)
- `relative`: dB (anchor), Np (to_anchor: 8.685889638)

Cross-system conversion between absolute and relative is **not supported** (they are physically incompatible without a reference power). The engine will throw "Cannot convert incompatible measures" if attempted — which is correct behavior.

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
| Mass | `mass.js` | u/Da (1.66054e-27 kg), grain (6.47989e-5 kg) | metric |
| Mass | `mass.js` | slug (14.5939 kg as imperial), stone (14 lb), grain (1/7000 lb) | imperial |
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
    "μN": "$\\mu N$"
  }
}
```

**`dist/latexUnitTypes.json`** — drop-in for ganaka-ui:
```json
[
  { "id": 1, "name": "Length", "siunit": "m", "imperialunit": "ft" },
  { "id": 44, "name": "Viscosity", "siunit": "Pa·s", "imperialunit": "" }
]
```

Existing IDs preserved; new measures get sequential IDs starting after the current max.

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

### 7. What Does NOT Change

- **Public API:** `.from().to()`, `.possibilities()`, `.describe()`, `.measures()`, `.list()`, `.toBest()` — all signatures and return shapes identical
- **Currency definitions:** `lib/definitions/currency.js` structure unchanged; ganaka-ui's `currencyInit.js` mutation pattern continues working
- **Engine logic:** `lib/index.js` `Converter.to()` method unchanged — `to_anchor`, `anchor_shift`, `transform` all work as before
- **Package name:** Stays `convert-units` in package.json (scoped name handled at publish time)

### 8. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Abbreviation collisions across measures | `getUnit()` returns wrong measure | Collision checker in CI; manual audit of all new abbreviations |
| Logarithmic transform complexity | Incorrect dB conversions | Cross-validate against Pint's dB conversion test cases |
| `charge.js` has copy-paste bug (imperial section has acceleration units) | Wiring it into index.js would expose broken units | Fix imperial section before wiring; add tests |
| LaTeX generation doesn't match ganaka-ui expectations | Broken unit display | Compare generated output against existing `latexUnits.json`; ensure all 562 existing entries preserved |
| Conversion factor accuracy | Incorrect conversions | Use NIST/BIPM reference values; cross-validate against Pint for all shared units |

## Verification

1. **All existing tests pass:** `npm test` (46 test files)
2. **New unit tests:** One test file per new measure, testing anchor conversions and cross-system where applicable
3. **Parametric prefix test:** `test/si-prefixes.js` — for every `expandSI` call, verify all generated units round-trip correctly
4. **Collision check:** `npm run check:collisions` — zero collisions
5. **Registry consistency:** `test/registry-consistency.js` — verify `dist/units-registry.json` matches live library output
6. **LaTeX backward compatibility:** verify all 562 existing `latexUnits.json` entries are preserved in generated output
7. **Lint + format:** `npm run ci:lint` passes
8. **Cross-validation with Pint:** For overlapping units, verify conversion results match Python Pint within 1e-9 relative error