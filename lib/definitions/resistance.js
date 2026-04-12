"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("Ω", "ohm", 1, ["m", "k", "M", "G"], { baseLatex: "\\Omega" }),
  "abΩ": {
    name: { singular: "Abohm", plural: "Abohms" },
    to_anchor: 1e-9,
  },
  "statΩ": {
    name: { singular: "Statohm", plural: "Statohms" },
    to_anchor: 8.9876e11,
  },
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
