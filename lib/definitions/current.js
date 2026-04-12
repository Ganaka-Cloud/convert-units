"use strict";

const { expandSI } = require("../siPrefixes");

const current = {
  ...expandSI("A", "ampere", 1, ["p", "n", "μ", "m", "k", "M"]),
};

module.exports = {
  metric: current,
  _anchors: {
    metric: {
      unit: "A",
      ratio: 1,
    },
  },
};
