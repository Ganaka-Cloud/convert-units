"use strict";
var metric;

metric = {
  "m*K": {
    name: {
      singular: "Metre-kelvin",
      plural: "Metre-kelvins",
    },
    to_anchor: 1,
  },
  "cm*K": {
    name: {
      singular: "Centimetre-kelvin",
      plural: "Centimetre-kelvins",
    },
    to_anchor: 0.01,
  },
  "mm*K": {
    name: {
      singular: "Millimetre-kelvin",
      plural: "Millimetre-kelvins",
    },
    to_anchor: 0.001,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "m*K",
      ratio: 1,
    },
  },
};
