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
  FLOZ_US = GAL_US / 128;

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
};
