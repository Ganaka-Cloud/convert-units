"use strict";
var C = require("../constants");
// Square root of a pressure, √Pa: the unit of the elastic coefficient in contact (Hertz) stress,
// Z_E in ISO 6336 / C_p in AGMA and Shigley, quoted in √MPa or √psi. SI base √Pa.
// 1 psi = 1 lbf/in² = 4.4482216152605 / 0.0254² Pa, so 1 √psi = √6894.757293168… √Pa.
var PSI = C.LBF / (C.IN * C.IN);
var metric, imperial;

metric = {
  "sqrt(Pa)": {
    name: { singular: "Square root of pascal", plural: "Square root of pascals" },
    to_anchor: 1,
  },
  "sqrt(kPa)": {
    name: { singular: "Square root of kilopascal", plural: "Square root of kilopascals" },
    to_anchor: Math.sqrt(1e3),
  },
  "sqrt(MPa)": {
    name: { singular: "Square root of megapascal", plural: "Square root of megapascals" },
    to_anchor: 1e3,
  },
  "sqrt(GPa)": {
    name: { singular: "Square root of gigapascal", plural: "Square root of gigapascals" },
    to_anchor: Math.sqrt(1e9),
  },
};

imperial = {
  "sqrt(psi)": {
    name: { singular: "Square root of psi", plural: "Square root of psi" },
    to_anchor: 1,
  },
  "sqrt(ksi)": {
    name: { singular: "Square root of ksi", plural: "Square root of ksi" },
    to_anchor: Math.sqrt(1e3),
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "sqrt(Pa)",
      ratio: 1 / Math.sqrt(PSI),
    },
    imperial: {
      unit: "sqrt(psi)",
      ratio: Math.sqrt(PSI),
    },
  },
};
