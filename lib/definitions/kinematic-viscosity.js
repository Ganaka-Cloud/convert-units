"use strict";
var metric;

metric = {
  "m2/s": {
    name: {
      singular: "Square meter per second",
      plural: "Square meters per second",
    },
    to_anchor: 1,
  },
  St: {
    name: {
      singular: "Stokes",
      plural: "Stokes",
    },
    to_anchor: 1e-4,
  },
  cSt: {
    name: {
      singular: "Centistokes",
      plural: "Centistokes",
    },
    to_anchor: 1e-6,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "m2/s",
      ratio: 1,
    },
  },
};
