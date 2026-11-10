"use strict";
var C = require("../constants");
// Linear density: mass per unit length of a belt, chain, cable or bar. SI base kg/m.
// 1 lb/ft = 0.45359237 / 0.3048 kg/m (1 lb = 0.45359237 kg, 1 ft = 0.3048 m).
var metric, imperial;

metric = {
  "kg/m": {
    name: { singular: "Kilogram per meter", plural: "Kilograms per meter" },
    to_anchor: 1,
  },
  "g/m": {
    name: { singular: "Gram per meter", plural: "Grams per meter" },
    to_anchor: 1e-3,
  },
  "kg/km": {
    name: { singular: "Kilogram per kilometer", plural: "Kilograms per kilometer" },
    to_anchor: 1e-3,
  },
};

imperial = {
  "lb/ft": {
    name: { singular: "Pound per foot", plural: "Pounds per foot" },
    to_anchor: 1,
  },
  "lb/in": {
    name: { singular: "Pound per inch", plural: "Pounds per inch" },
    to_anchor: 12,
  },
  "lb/yd": {
    name: { singular: "Pound per yard", plural: "Pounds per yard" },
    to_anchor: 1 / 3,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "kg/m",
      ratio: C.FT / C.LB,
    },
    imperial: {
      unit: "lb/ft",
      ratio: C.LB / C.FT,
    },
  },
};
