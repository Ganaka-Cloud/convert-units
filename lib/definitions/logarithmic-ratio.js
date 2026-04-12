"use strict";
var metric;

metric = {
  dB: {
    name: {
      singular: "Decibel",
      plural: "Decibels",
    },
    to_anchor: 1,
  },
  Np: {
    name: {
      singular: "Neper",
      plural: "Nepers",
    },
    to_anchor: 8.685889638,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "dB",
      ratio: 1,
    },
  },
};
