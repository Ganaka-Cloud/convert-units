"use strict";
// Volumetric electric charge density, SI base C/m3. Metric only.
var metric;

metric = {
  "C/m3": {
    name: { singular: "Coulomb per cubic meter", plural: "Coulombs per cubic meter" },
    to_anchor: 1,
  },
  "mC/m3": {
    name: { singular: "milliCoulomb per cubic meter", plural: "milliCoulombs per cubic meter" },
    to_anchor: 0.001,
  },
  "μC/m3": {
    name: { singular: "microCoulomb per cubic meter", plural: "microCoulombs per cubic meter" },
    to_anchor: 0.000001,
  },
  "C/cm3": {
    name: { singular: "Coulomb per cubic centimeter", plural: "Coulombs per cubic centimeter" },
    to_anchor: 1000000,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "C/m3", ratio: 1 },
  },
};
