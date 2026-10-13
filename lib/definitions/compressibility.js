"use strict";
var C = require("../constants");
// Compressibility: inverse pressure, SI base 1/Pa.
// 1 psi = 6894.757293168 Pa, so 1 (1/Pa) = 6894.757293168 (1/psi).
var metric, imperial;

metric = {
  "1/Pa": {
    name: { singular: "per pascal", plural: "per pascal" },
    to_anchor: 1,
  },
};

imperial = {
  "1/psi": {
    name: { singular: "per pound-force per square inch", plural: "per pound-force per square inch" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "1/Pa", ratio: 1 / ((C.IN * C.IN) / C.LBF)},
    imperial: { unit: "1/psi", ratio: ((C.IN * C.IN) / C.LBF)},
  },
};
