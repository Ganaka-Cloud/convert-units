"use strict";
// Surface (areal) electric charge density, SI base C/m2. Metric only.
var metric;

metric = {
  "C/m2": {
    name: { singular: "Coulomb per square meter", plural: "Coulombs per square meter" },
    to_anchor: 1,
  },
  "mC/m2": {
    name: { singular: "milliCoulomb per square meter", plural: "milliCoulombs per square meter" },
    to_anchor: 0.001,
  },
  "μC/m2": {
    name: { singular: "microCoulomb per square meter", plural: "microCoulombs per square meter" },
    to_anchor: 0.000001,
  },
  "C/cm2": {
    name: { singular: "Coulomb per square centimeter", plural: "Coulombs per square centimeter" },
    to_anchor: 10000,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "C/m2", ratio: 1 },
  },
};
