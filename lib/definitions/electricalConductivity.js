"use strict";
// Electrical conductivity: conductance per unit length, SI base S/m.
// 1 mS/cm = 0.1 S/m; 1 uS/cm = 1e-4 S/m.
var metric;

metric = {
  "S/m": {
    name: { singular: "Siemens per meter", plural: "Siemens per meter" },
    to_anchor: 1,
  },
  "mS/m": {
    name: { singular: "millisiemens per meter", plural: "millisiemens per meter" },
    to_anchor: 0.001,
  },
  "S/cm": {
    name: { singular: "Siemens per centimeter", plural: "Siemens per centimeter" },
    to_anchor: 100,
  },
  "mS/cm": {
    name: { singular: "millisiemens per centimeter", plural: "millisiemens per centimeter" },
    to_anchor: 0.1,
  },
  "μS/cm": {
    name: { singular: "microsiemens per centimeter", plural: "microsiemens per centimeter" },
    to_anchor: 0.0001,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "S/m", ratio: 1 },
  },
};
