# Changelog

All notable changes to this project will be documented in this file.

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


