"use strict";
var metric;

metric = {
  "H/m": {
    name: {
      singular: "Henry per metre",
      plural: "Henrys per metre",
    },
    to_anchor: 1,
  },
  "mH/m": {
    name: {
      singular: "Millihenry per metre",
      plural: "Millihenrys per metre",
    },
    to_anchor: 1e-3,
  },
  "μH/m": {
    name: {
      singular: "Microhenry per metre",
      plural: "Microhenrys per metre",
    },
    to_anchor: 1e-6,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "H/m",
      ratio: 1,
    },
  },
};
