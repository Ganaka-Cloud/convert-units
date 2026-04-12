"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("lm", "lumen", 1, ["m", "k"]),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "lm",
      ratio: 1,
    },
  },
};
