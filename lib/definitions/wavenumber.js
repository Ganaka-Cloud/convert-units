"use strict";
var metric;

metric = {
  "1/m": {
    name: {
      singular: "Reciprocal metre",
      plural: "Reciprocal metres",
    },
    to_anchor: 1,
  },
  "1/cm": {
    name: {
      singular: "Reciprocal centimetre (kayser)",
      plural: "Reciprocal centimetres (kaysers)",
    },
    to_anchor: 100,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "1/m",
      ratio: 1,
    },
  },
};
