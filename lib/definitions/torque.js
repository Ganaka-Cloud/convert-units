"use strict";
var metric, imperial;

metric = {
  "N*m": {
    name: {
      singular: "Newton-meter",
      plural: "Newton-meters",
    },
    to_anchor: 1,
  },
  "kN*m": {
    name: {
      singular: "Kilonewton-meter",
      plural: "Kilonewton-meters",
    },
    to_anchor: 1000,
  },
  "MN*m": {
    name: {
      singular: "Meganewton-meter",
      plural: "Meganewton-meters",
    },
    to_anchor: 1e6,
  },
};

imperial = {
  "lbf*ft": {
    name: {
      singular: "Pound-force foot",
      plural: "Pound-force feet",
    },
    to_anchor: 1,
  },
  "ozf*in": {
    name: {
      singular: "Ounce-force inch",
      plural: "Ounce-force inches",
    },
    to_anchor: 1 / 192,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "N*m",
      ratio: 0.7375621,
    },
    imperial: {
      unit: "lbf*ft",
      ratio: 1 / 0.7375621,
    },
  },
};
