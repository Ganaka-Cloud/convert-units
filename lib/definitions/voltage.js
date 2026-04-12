"use strict";

const { expandSI } = require("../siPrefixes");

const voltage = {
  ...expandSI("V", "volt", 1, ["n", "μ", "m", "k", "M"]),
  abV: {
    name: { singular: "Abvolt", plural: "Abvolts" },
    to_anchor: 1e-8,
  },
  statV: {
    name: { singular: "Statvolt", plural: "Statvolts" },
    to_anchor: 299.792458,
  },
};

module.exports = {
  metric: voltage,
  _anchors: {
    metric: {
      unit: "V",
      ratio: 1,
    },
  },
};
