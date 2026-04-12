"use strict";

const { expandSI } = require("../siPrefixes");

var metric, cgs;

metric = {
  ...expandSI("Wb", "weber", 1, ["n", "μ", "m", "k"]),
};

cgs = {
  Mx: {
    name: {
      singular: "Maxwell",
      plural: "Maxwells",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  cgs: cgs,
  _anchors: {
    metric: {
      unit: "Wb",
      ratio: 1e8,
    },
    cgs: {
      unit: "Mx",
      ratio: 1e-8,
    },
  },
};
