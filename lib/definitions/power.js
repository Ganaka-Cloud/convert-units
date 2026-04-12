"use strict";

const { expandSI } = require("../siPrefixes");

const power = {
  ...expandSI("W", "watt", 1, ["p", "n", "μ", "m", "k", "M", "G", "T"]),
  "hp-mech": {
    name: {
      singular: "mechanical horsepower",
      plural: "mechanical horsepower",
    },
    to_anchor: 745.69987,
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
    to_anchor: 3516.8528,
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
