"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("Ω", "ohm", 1, ["m", "k", "M", "G"], { baseLatex: "\\Omega" }),
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "Ω",
      ratio: 1,
    },
  },
};
