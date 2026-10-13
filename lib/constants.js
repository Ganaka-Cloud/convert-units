"use strict";
// Exact definitions the metric<->imperial anchor ratios are derived from.
// NIST SP 811 App. B.8 / 1959 international yard and pound agreement:
// 1 yd = 0.9144 m, 1 lb = 0.45359237 kg; standard gravity 9.80665 m/s2.
var FT = 0.3048,
  IN = 0.0254,
  YD = 0.9144,
  LB = 0.45359237,
  G = 9.80665,
  LBF = LB * G,
  HR = 3600,
  // A degree Rankine or Fahrenheit interval is 5/9 K.
  RANKINE = 5 / 9,
  // IT calorie = 4.1868 J exactly; Btu_IT = 1 lb x 1 degR x cal_IT/(g K) = 1055.05585262 J.
  BTU_IT = LB * 1000 * RANKINE * 4.1868,
  // US gallon = 231 in3 exactly; 1 US fl oz = gal/128.
  GAL_US = 231 * IN * IN * IN,
  FLOZ_US = GAL_US / 128,
  // SI 2019 exact defining constants.
  H = 6.62607015e-34,
  E = 1.602176634e-19,
  NA = 6.02214076e23,
  CLIGHT = 299792458,
  HBAR = H / (2 * Math.PI),
  // CODATA 2022 measured constants. Atomic and Planck units derive from these through
  // their defining relations rather than CODATA's rounded published values.
  NEWTON_G = 6.6743e-11,
  R_INF = 1.0973731568157e7,
  M_E = 9.1093837139e-31,
  M_P = 1.67262192595e-27,
  M_N = 1.67492750056e-27,
  M_U = 1.66053906892e-27,
  ALPHA = Math.sqrt((2 * H * R_INF) / (M_E * CLIGHT)),
  RYDBERG = R_INF * H * CLIGHT,
  HARTREE = 2 * RYDBERG,
  BOHR_RADIUS = HBAR / (ALPHA * M_E * CLIGHT);

module.exports = {
  FT: FT,
  IN: IN,
  YD: YD,
  LB: LB,
  G: G,
  LBF: LBF,
  HR: HR,
  RANKINE: RANKINE,
  BTU_IT: BTU_IT,
  GAL_US: GAL_US,
  FLOZ_US: FLOZ_US,
  H: H,
  E: E,
  NA: NA,
  CLIGHT: CLIGHT,
  HBAR: HBAR,
  NEWTON_G: NEWTON_G,
  M_E: M_E,
  M_P: M_P,
  M_N: M_N,
  M_U: M_U,
  RYDBERG: RYDBERG,
  HARTREE: HARTREE,
  BOHR_RADIUS: BOHR_RADIUS,
};
