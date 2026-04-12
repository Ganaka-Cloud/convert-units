"use strict";

const { expandSI } = require("../siPrefixes");

var metric = {
  ...expandSI("S", "siemens", 1, ["m", "μ", "n"], { pluralName: "siemens" }),
  mho: {
    name: { singular: "Mho", plural: "Mhos" },
    to_anchor: 1,
  },
  abS: {
    name: { singular: "Absiemens", plural: "Absiemens" },
    to_anchor: 1e9,
  },
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
