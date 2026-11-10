"use strict";
var C = require("../constants");
// Resistance (or reactance) per unit length of a conductor: a line or cable's series impedance
// per length, as IEC 60909 and cable data give it. SI base Ω/m. 1 Ω/ft = 1/0.3048 Ω/m (1 ft = 0.3048 m).
var metric, imperial;

metric = {
  "Ω/m": {
    name: { singular: "Ohm per meter", plural: "Ohms per meter" },
    to_anchor: 1,
  },
  "mΩ/m": {
    name: { singular: "Milliohm per meter", plural: "Milliohms per meter" },
    to_anchor: 1e-3,
  },
  "μΩ/m": {
    name: { singular: "Microohm per meter", plural: "Microohms per meter" },
    to_anchor: 1e-6,
  },
  "Ω/km": {
    name: { singular: "Ohm per kilometer", plural: "Ohms per kilometer" },
    to_anchor: 1e-3,
  },
};

imperial = {
  "Ω/ft": {
    name: { singular: "Ohm per foot", plural: "Ohms per foot" },
    to_anchor: 1,
  },
  "Ω/kft": {
    name: { singular: "Ohm per thousand feet", plural: "Ohms per thousand feet" },
    to_anchor: 1e-3,
  },
  "Ω/mi": {
    name: { singular: "Ohm per mile", plural: "Ohms per mile" },
    to_anchor: 1 / 5280,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "Ω/m",
      ratio: C.FT,
    },
    imperial: {
      unit: "Ω/ft",
      ratio: 1 / C.FT,
    },
  },
};
