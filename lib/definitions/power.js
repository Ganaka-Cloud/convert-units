"use strict";
var C = require("../constants");

const { expandSI } = require("../siPrefixes");

const power = {
  ...expandSI("W", "watt", 1, ["p", "n", "μ", "m", "k", "M", "G", "T"]),
  "hp-mech": {
    name: {
      singular: "mechanical horsepower",
      plural: "mechanical horsepower",
    },
    to_anchor: 550 * C.FT * C.LBF,
  },
  "hp-met": {
    name: {
      singular: "metric horsepower",
      plural: "metric horsepower",
    },
    to_anchor: 735.49875,
  },
  "hp-elec": {
    name: {
      singular: "electrical horsepower",
      plural: "electrical horsepower",
    },
    to_anchor: 746,
  },
  "hp-boiler": {
    name: {
      singular: "boiler horsepower",
      plural: "boiler horsepower",
    },
    to_anchor: 9809.5,
  },
  tonRef: {
    name: {
      singular: "ton of refrigeration",
      plural: "tons of refrigeration",
    },
    to_anchor: 12000 * C.BTU_IT / C.HR,
  },
};

module.exports = {
  metric: power,
  _anchors: {
    metric: {
      unit: "W",
      ratio: 1,
    },
  },
};
