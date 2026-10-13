"use strict";
var C = require("../constants");
var metric;

metric = {
  "A*m2": {
    name: {
      singular: "Ampere-square metre",
      plural: "Ampere-square metres",
    },
    to_anchor: 1,
  },
  mu_B: {
    name: {
      singular: "Bohr magneton",
      plural: "Bohr magnetons",
    },
    to_anchor: (C.E * C.HBAR) / (2 * C.M_E),
  },
  mu_N: {
    name: {
      singular: "Nuclear magneton",
      plural: "Nuclear magnetons",
    },
    to_anchor: (C.E * C.HBAR) / (2 * C.M_P),
  },
  "erg/G": {
    name: {
      singular: "Erg per gauss",
      plural: "Ergs per gauss",
    },
    to_anchor: 1e-3,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "A*m2",
      ratio: 1,
    },
  },
};
