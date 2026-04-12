"use strict";
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
    to_anchor: 9.2740100783e-24,
  },
  mu_N: {
    name: {
      singular: "Nuclear magneton",
      plural: "Nuclear magnetons",
    },
    to_anchor: 5.0507837461e-27,
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
