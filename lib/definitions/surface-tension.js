"use strict";
var metric;

metric = {
  "N/m": {
    name: {
      singular: "Newton per meter",
      plural: "Newtons per meter",
    },
    to_anchor: 1,
  },
  "mN/m": {
    name: {
      singular: "Millinewton per meter",
      plural: "Millinewtons per meter",
    },
    to_anchor: 0.001,
  },
  "dyn/cm": {
    name: {
      singular: "Dyne per centimeter",
      plural: "Dynes per centimeter",
    },
    to_anchor: 0.001,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "N/m",
      ratio: 1,
    },
  },
};
