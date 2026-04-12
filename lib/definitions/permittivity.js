"use strict";
var metric;

metric = {
  "F/m": {
    name: {
      singular: "Farad per metre",
      plural: "Farads per metre",
    },
    to_anchor: 1,
  },
  "pF/m": {
    name: {
      singular: "Picofarad per metre",
      plural: "Picofarads per metre",
    },
    to_anchor: 1e-12,
  },
  "nF/m": {
    name: {
      singular: "Nanofarad per metre",
      plural: "Nanofarads per metre",
    },
    to_anchor: 1e-9,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "F/m",
      ratio: 1,
    },
  },
};
