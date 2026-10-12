"use strict";
var C = require("../constants");
var metric, imperial;

metric = {
  "J/m2": {
    name: {
      singular: "Joule per square metre",
      plural: "Joules per square metre",
    },
    to_anchor: 1,
  },
  "kJ/m2": {
    name: {
      singular: "Kilojoule per square metre",
      plural: "Kilojoules per square metre",
    },
    to_anchor: 1000,
  },
};
imperial = {
  "ft-lbs/sqin": {
    name: {
      singular: "pound foot per square inch",
      plural: "pounds feet per square inch",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J/m2",
      ratio: 1 / (C.LBF * C.FT / (C.IN * C.IN)),
    },
    imperial: {
      unit: "ft-lbs/sqin",
      ratio: (C.LBF * C.FT / (C.IN * C.IN)),
    },
  },
};
