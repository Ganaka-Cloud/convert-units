"use strict";
var metric, cgs;

metric = {
  "A/m": {
    name: {
      singular: "Ampere per meter",
      plural: "Amperes per meter",
    },
    to_anchor: 1,
  },
  "kA/m": {
    name: {
      singular: "Kiloampere per meter",
      plural: "Kiloamperes per meter",
    },
    to_anchor: 1000,
  },
};

cgs = {
  Oe: {
    name: {
      singular: "Oersted",
      plural: "Oersteds",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  cgs: cgs,
  _anchors: {
    metric: {
      unit: "A/m",
      ratio: 0.012566370614,
    },
    cgs: {
      unit: "Oe",
      ratio: 1 / 0.012566370614,
    },
  },
};
