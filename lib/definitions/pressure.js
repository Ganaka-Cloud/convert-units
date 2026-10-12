"use strict";
var C = require("../constants");

const { expandSI } = require("../siPrefixes");

var metric, imperial;

metric = {
  ...expandSI("Pa", "pascal", 1, ["μ", "m", "h", "k", "M", "G"]),
  bar: {
    name: {
      singular: "bar",
      plural: "bar",
    },
    to_anchor: 100000,
  },
  torr: {
    name: {
      singular: "torr",
      plural: "torr",
    },
    to_anchor: 101325 / 760,
  },
  atm: {
    name: {
      singular: "atmosphere",
      plural: "atmospheres",
    },
    to_anchor: 101325,
  },
  mmHg: {
    name: {
      singular: "millimeter of mercury",
      plural: "millimeters of mercury",
    },
    to_anchor: 13595.1 * C.G / 1000,
  },
  cmH2O: {
    name: {
      singular: "centimeter of water",
      plural: "centimeters of water",
    },
    to_anchor: 98.0665,
  },
  mbar: {
    name: {
      singular: "millibar",
      plural: "millibar",
    },
    to_anchor: 100,
  },
  cmHg: {
    name: {
      singular: "centimeter of mercury",
      plural: "centimeters of mercury",
    },
    to_anchor: 13595.1 * C.G / 100,
  },
  Ba: {
    name: {
      singular: "barye",
      plural: "baryes",
    },
    to_anchor: 0.1,
  },
  at: {
    name: {
      singular: "technical atmosphere",
      plural: "technical atmospheres",
    },
    to_anchor: 98066.5,
  },
};

imperial = {
  psi: {
    name: {
      singular: "pound per square inch",
      plural: "pounds per square inch",
    },
    to_anchor: 1,
  },
  ksi: {
    name: {
      singular: "kilopound per square inch",
      plural: "kilopound per square inch",
    },
    to_anchor: 1000,
  },
  inHg: {
    name: {
      singular: "inch of mercury",
      plural: "inches of mercury",
    },
    to_anchor: (13595.1 * C.G * C.IN) / (C.LBF / (C.IN * C.IN)),
  },
  inH2O: {
    name: {
      singular: "inch of water",
      plural: "inches of water",
    },
    to_anchor: (1000 * C.G * C.IN) / (C.LBF / (C.IN * C.IN)),
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "Pa",
      ratio: 1 / (C.LBF / (C.IN * C.IN)),
    },
    imperial: {
      unit: "psi",
      ratio: (C.LBF / (C.IN * C.IN)),
    },
  },
};
