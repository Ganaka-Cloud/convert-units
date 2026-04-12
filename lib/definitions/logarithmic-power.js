"use strict";
var metric;

metric = {
  dBW: {
    name: {
      singular: "Decibel-watt",
      plural: "Decibel-watts",
    },
    to_anchor: 1,
    anchor_shift: 0,
  },
  dBm: {
    name: {
      singular: "Decibel-milliwatt",
      plural: "Decibel-milliwatts",
    },
    to_anchor: 1,
    anchor_shift: 30,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "dBW",
      ratio: 1,
    },
  },
};
