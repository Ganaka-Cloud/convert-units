"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("mol", "mole", 1, ["m", "μ", "n", "p"]),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "mol",
      ratio: 1,
    },
  },
};
