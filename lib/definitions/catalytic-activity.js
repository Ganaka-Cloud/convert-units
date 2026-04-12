"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("kat", "katal", 1, ["m", "μ", "n"]),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "kat",
      ratio: 1,
    },
  },
};
