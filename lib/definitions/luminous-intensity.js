"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("cd", "candela", 1, ["m", "k"]),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "cd",
      ratio: 1,
    },
  },
};
