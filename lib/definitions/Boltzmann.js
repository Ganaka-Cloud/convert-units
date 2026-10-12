"use strict";
var C = require("../constants");
var metric, imperial;

metric = {
  "J/K": {
    name: {
      singular: "Joule per degree Kelvin",
      plural: "Joules per degree Kelvin",
    },
    to_anchor: 1,
  },
  "ev/K": {
    name: {
      singular: "Electron Volt per degree Kelvin",
      plural: "Electron Volts per degree Kelvin",
    },
    to_anchor: 1.602176634e-19,
  },
};
imperial = {
  "ft-lb/R": {
    name: {
      singular: "Pound-feet per degree Rankine",
      plural: "Pounds-feet per degree Rankine",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J/K",
      ratio: 1 / (C.LBF * C.FT / C.RANKINE),
    },
    imperial: {
      unit: "ft-lb/R",
      ratio: (C.LBF * C.FT / C.RANKINE),
    },
  },
};
