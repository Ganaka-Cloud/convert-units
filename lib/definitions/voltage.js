"use strict";

const { expandSI } = require("../siPrefixes");

const voltage = {
  ...expandSI("V", "volt", 1, ["n", "μ", "m", "k", "M"]),
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
