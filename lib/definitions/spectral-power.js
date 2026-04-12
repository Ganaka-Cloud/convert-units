"use strict";
var metric;

metric = {
  "W*m2": {
    name: {
      singular: "Watt-square metre",
      plural: "Watt-square metres",
    },
    to_anchor: 1,
  },
  "mW*m2": {
    name: {
      singular: "Milliwatt-square metre",
      plural: "Milliwatt-square metres",
    },
    to_anchor: 1e-3,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "W*m2",
      ratio: 1,
    },
  },
};
