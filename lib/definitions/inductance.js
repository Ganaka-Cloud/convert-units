"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("H", "henry", 1, ["μ", "m"], { pluralName: "henrys" }),
  abH: {
    name: { singular: "Abhenry", plural: "Abhenrys" },
    to_anchor: 1e-9,
  },
  statH: {
    name: { singular: "Stathenry", plural: "Stathenrys" },
    to_anchor: 8.9876e11,
  },
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
