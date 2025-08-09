"use strict";
var metric, imperial;

metric = {
  "Pa-sqrt(m)": {
    name: {
      singular: "pascal squareroot of meter",
      plural: "pascals squareroot of meter",
    },
    to_anchor: 1e-6,
  },
  "kPa-sqrt(m)": {
    name: {
      singular: "kilopascal squareroot of meter",
      plural: "kilopascals squareroot of meter",
    },
    to_anchor: 1e-3,
  },
  "hPa-sqrt(m)": {
    name: {
      singular: "hectopascal squareroot of meter",
      plural: "hectopascals squareroot of meter",
    },
    to_anchor: 1e-4,
  },
  "MPa-sqrt(m)": {
    name: {
      singular: "megapascal squareroot of meter",
      plural: "megapascals squareroot of meter",
    },
    to_anchor: 1,
  },
};
imperial = {
  "psi-sqrt(in)": {
    name: {
      singular: "pound per square inch squareroot of inch",
      plural: "pounds per square inch squareroot of inch",
    },
    to_anchor: 1e-3,
  },
  "ksi-sqr(in)": {
    name: {
      singular: "kilopound per square inch squareroot of inch",
      plural: "kilopound per square inch squareroot of inch",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "MPa-sqrt(m)",
      ratio: 0.910885,
    },
    imperial: {
      unit: "ksi-sqrt(in)",
      ratio: 1/0.910885,
    },
  },
};
