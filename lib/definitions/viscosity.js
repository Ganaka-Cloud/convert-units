"use strict";
var metric;

metric = {
  "Pa*s": {
    name: {
      singular: "Pascal-second",
      plural: "Pascal-seconds",
    },
    to_anchor: 1,
  },
  P: {
    name: {
      singular: "Poise",
      plural: "Poise",
    },
    to_anchor: 0.1,
  },
  cP: {
    name: {
      singular: "Centipoise",
      plural: "Centipoise",
    },
    to_anchor: 0.001,
  },
  reyn: {
    name: {
      singular: "reyn",
      plural: "reyns",
    },
    to_anchor: 6894.757,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "Pa*s",
      ratio: 1,
    },
  },
};
