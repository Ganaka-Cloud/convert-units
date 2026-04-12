"use strict";
var metric, cgs;

metric = {
  T: {
    name: {
      singular: "Tesla",
      plural: "Teslas",
    },
    to_anchor: 1,
  },
  mT: {
    name: {
      singular: "Millitesla",
      plural: "Milliteslas",
    },
    to_anchor: 0.001,
  },
  "μT": {
    name: {
      singular: "Microtesla",
      plural: "Microteslas",
    },
    to_anchor: 1e-6,
  },
  nT: {
    name: {
      singular: "Nanotesla",
      plural: "Nanoteslas",
    },
    to_anchor: 1e-9,
  },
};

cgs = {
  G: {
    name: {
      singular: "Gauss",
      plural: "Gauss",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  cgs: cgs,
  _anchors: {
    metric: {
      unit: "T",
      ratio: 1e4,
    },
    cgs: {
      unit: "G",
      ratio: 1e-4,
    },
  },
};
