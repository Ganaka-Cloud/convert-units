"use strict";
// Body force / self-weight: force per unit volume, SI base N/m3.
// 1 lbf/ft3 = 4.4482216153 / 0.3048^3 = 157.0874638 N/m3.  1 lbf/in3 = 1728 lbf/ft3.
var metric, imperial;

metric = {
  "N/m3": {
    name: { singular: "Newton per cubic meter", plural: "Newtons per cubic meter" },
    to_anchor: 1,
  },
  "kN/m3": {
    name: { singular: "kilonewton per cubic meter", plural: "kilonewtons per cubic meter" },
    to_anchor: 1000,
  },
};

imperial = {
  "lbf/ft3": {
    name: { singular: "Pound-force per cubic foot", plural: "Pound-force per cubic foot" },
    to_anchor: 1,
  },
  "lbf/in3": {
    name: { singular: "Pound-force per cubic inch", plural: "Pound-force per cubic inch" },
    to_anchor: 1728,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "N/m3", ratio: 1 / 157.0874638 },
    imperial: { unit: "lbf/ft3", ratio: 157.0874638 },
  },
};
