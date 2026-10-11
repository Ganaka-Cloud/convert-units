"use strict";
// Temperature gradient: temperature difference per unit length, SI base K/m.
// A difference, so no offset applies. 1 F/ft = (5/9) / 0.3048 = 1.8228346457 K/m.
var metric, imperial;

metric = {
  "K/m": {
    name: { singular: "Kelvin per meter", plural: "Kelvins per meter" },
    to_anchor: 1,
  },
  "K/cm": {
    name: { singular: "Kelvin per centimeter", plural: "Kelvins per centimeter" },
    to_anchor: 100,
  },
  "K/mm": {
    name: { singular: "Kelvin per millimeter", plural: "Kelvins per millimeter" },
    to_anchor: 1000,
  },
};

imperial = {
  "F/ft": {
    name: { singular: "Degree Fahrenheit per foot", plural: "Degrees Fahrenheit per foot" },
    to_anchor: 1,
  },
  "F/in": {
    name: { singular: "Degree Fahrenheit per inch", plural: "Degrees Fahrenheit per inch" },
    to_anchor: 12,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "K/m", ratio: 1 / 1.8228346457 },
    imperial: { unit: "F/ft", ratio: 1.8228346457 },
  },
};
