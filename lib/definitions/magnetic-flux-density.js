"use strict";

const { expandSI } = require("../siPrefixes");

var metric, cgs;

metric = {
  ...expandSI("T", "tesla", 1, ["p", "n", "μ", "m"]),
};

cgs = {
  G: {
    name: {
      singular: "Gauss",
      plural: "Gauss",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  cgs: cgs,
  _anchors: {
    metric: {
      unit: "T",
      ratio: 1e4,
    },
    cgs: {
      unit: "G",
      ratio: 1e-4,
    },
  },
};
