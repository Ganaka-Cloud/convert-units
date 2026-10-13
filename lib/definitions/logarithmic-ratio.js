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
    // 1 Np = 20 log10(e) dB: both measure field amplitude ratios.
    to_anchor: 20 / Math.LN10,
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
