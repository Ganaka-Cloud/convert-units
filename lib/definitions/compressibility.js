"use strict";
// Compressibility: inverse pressure, SI base 1/Pa.
// 1 psi = 6894.757293168 Pa, so 1 (1/Pa) = 6894.757293168 (1/psi).
var metric, imperial;

metric = {
  "1/Pa": {
    name: { singular: "per pascal", plural: "per pascal" },
    to_anchor: 1,
  },
  "1/kPa": {
    name: { singular: "per kilopascal", plural: "per kilopascal" },
    to_anchor: 0.001,
  },
  "1/MPa": {
    name: { singular: "per megapascal", plural: "per megapascal" },
    to_anchor: 0.000001,
  },
  "1/GPa": {
    name: { singular: "per gigapascal", plural: "per gigapascal" },
    to_anchor: 0.000000001,
  },
  "1/bar": {
    name: { singular: "per bar", plural: "per bar" },
    to_anchor: 0.00001,
  },
};

imperial = {
  "1/psi": {
    name: { singular: "per pound-force per square inch", plural: "per pound-force per square inch" },
    to_anchor: 1,
  },
  "1/ksi": {
    name: { singular: "per kilopound-force per square inch", plural: "per kilopound-force per square inch" },
    to_anchor: 0.001,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "1/Pa", ratio: 6894.757293168 },
    imperial: { unit: "1/psi", ratio: 1 / 6894.757293168 },
  },
};
