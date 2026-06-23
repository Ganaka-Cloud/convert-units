"use strict";
// Line load / distributed load along a length, and (same dimension) elastic stiffness:
// force per unit length, SI base N/m. 1 lbf/ft = 4.4482216153 / 0.3048 = 14.593902937 N/m.
var metric, imperial;

metric = {
  "N/m": {
    name: { singular: "Newton per meter", plural: "Newtons per meter" },
    to_anchor: 1,
  },
  "N/mm": {
    name: { singular: "Newton per millimeter", plural: "Newtons per millimeter" },
    to_anchor: 1000,
  },
  "N/cm": {
    name: { singular: "Newton per centimeter", plural: "Newtons per centimeter" },
    to_anchor: 100,
  },
  "kN/m": {
    name: { singular: "kilonewton per meter", plural: "kilonewtons per meter" },
    to_anchor: 1000,
  },
};

imperial = {
  "lbf/ft": {
    name: { singular: "Pound-force per foot", plural: "Pound-force per foot" },
    to_anchor: 1,
  },
  "lbf/in": {
    name: { singular: "Pound-force per inch", plural: "Pound-force per inch" },
    to_anchor: 12,
  },
  "kip/ft": {
    name: { singular: "Kilopound-force per foot", plural: "Kilopound-force per foot" },
    to_anchor: 1000,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "N/m",
      ratio: 1 / 14.593902937,
    },
    imperial: {
      unit: "lbf/ft",
      ratio: 14.593902937,
    },
  },
};
