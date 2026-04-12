"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("H", "henry", 1, ["μ", "m"], { pluralName: "henrys" }),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "H",
      ratio: 1,
    },
  },
};
