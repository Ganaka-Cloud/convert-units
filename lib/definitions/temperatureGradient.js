"use strict";
var C = require("../constants");
// Temperature gradient: temperature difference per unit length, SI base K/m.
// A difference, so no offset applies. 1 F/ft = (5/9) / 0.3048 = 1.8228346457 K/m.
var metric, imperial;

metric = {
  "K/m": {
    name: { singular: "Kelvin per meter", plural: "Kelvins per meter" },
    to_anchor: 1,
  },
};

imperial = {
  "F/ft": {
    name: { singular: "Degree Fahrenheit per foot", plural: "Degrees Fahrenheit per foot" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "K/m", ratio: 1 / (C.RANKINE / C.FT)},
    imperial: { unit: "F/ft", ratio: (C.RANKINE / C.FT)},
  },
};
