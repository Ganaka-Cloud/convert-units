"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("S", "siemens", 1, ["m", "μ", "n"], { pluralName: "siemens" }),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "S",
      ratio: 1,
    },
  },
};
