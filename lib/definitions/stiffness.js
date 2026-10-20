"use strict";
var C = require("../constants");
// Translational spring stiffness: force per unit displacement, SI base N/m. Same dimension as
// LineLoad, so N/m, kN/m, N/mm, lbf/in and lbf/ft are shared abbreviations: address them with
// the measure, convert(v).from("N/m", "Stiffness"). 1 lbf/in = 4.4482216152605 / 0.0254 = 175.126835 N/m.
var metric, imperial;

metric = {
  "N/m": {
    name: { singular: "Newton per meter", plural: "Newtons per meter" },
    to_anchor: 1,
  },
  "kN/m": {
    name: { singular: "Kilonewton per meter", plural: "Kilonewtons per meter" },
    to_anchor: 1000,
  },
  "MN/m": {
    name: { singular: "Meganewton per meter", plural: "Meganewtons per meter" },
    to_anchor: 1000000,
  },
  "N/mm": {
    name: { singular: "Newton per millimeter", plural: "Newtons per millimeter" },
    to_anchor: 1000,
  },
  "kN/mm": {
    name: { singular: "Kilonewton per millimeter", plural: "Kilonewtons per millimeter" },
    to_anchor: 1000000,
  },
};

imperial = {
  "lbf/in": {
    name: { singular: "Pound-force per inch", plural: "Pounds-force per inch" },
    to_anchor: 1,
  },
  "lbf/ft": {
    name: { singular: "Pound-force per foot", plural: "Pounds-force per foot" },
    to_anchor: 1 / 12,
  },
  "kip/in": {
    name: { singular: "Kip per inch", plural: "Kips per inch" },
    to_anchor: 1000,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "N/m",
      ratio: 1 / (C.LBF / C.IN),
    },
    imperial: {
      unit: "lbf/in",
      ratio: C.LBF / C.IN,
    },
  },
};
