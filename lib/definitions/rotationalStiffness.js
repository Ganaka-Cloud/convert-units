"use strict";
var C = require("../constants");
// Rotational spring stiffness: moment per unit rotation, SI base N*m/rad.
// 1 lbf*in/rad = 4.4482216152605 x 0.0254 = 0.112984829 N*m/rad.
var metric, imperial;

metric = {
  "N*m/rad": {
    name: { singular: "Newton-meter per radian", plural: "Newton-meters per radian" },
    to_anchor: 1,
  },
  "kN*m/rad": {
    name: { singular: "Kilonewton-meter per radian", plural: "Kilonewton-meters per radian" },
    to_anchor: 1000,
  },
  "MN*m/rad": {
    name: { singular: "Meganewton-meter per radian", plural: "Meganewton-meters per radian" },
    to_anchor: 1000000,
  },
};

imperial = {
  "lbf*in/rad": {
    name: { singular: "Pound-force inch per radian", plural: "Pound-force inches per radian" },
    to_anchor: 1,
  },
  "lbf*ft/rad": {
    name: { singular: "Pound-force foot per radian", plural: "Pound-force feet per radian" },
    to_anchor: 12,
  },
  "kip*in/rad": {
    name: { singular: "Kip inch per radian", plural: "Kip inches per radian" },
    to_anchor: 1000,
  },
  "kip*ft/rad": {
    name: { singular: "Kip foot per radian", plural: "Kip feet per radian" },
    to_anchor: 12000,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "N*m/rad",
      ratio: 1 / (C.LBF * C.IN),
    },
    imperial: {
      unit: "lbf*in/rad",
      ratio: C.LBF * C.IN,
    },
  },
};
