"use strict";
// Electric current density, SI base A/m2. Metric only (no customary imperial unit).
var metric;

metric = {
  "A/m2": {
    name: { singular: "Ampere per square meter", plural: "Amperes per square meter" },
    to_anchor: 1,
  },
  "kA/m2": {
    name: { singular: "kiloampere per square meter", plural: "kiloamperes per square meter" },
    to_anchor: 1000,
  },
  "A/cm2": {
    name: { singular: "Ampere per square centimeter", plural: "Amperes per square centimeter" },
    to_anchor: 10000,
  },
  "A/mm2": {
    name: { singular: "Ampere per square millimeter", plural: "Amperes per square millimeter" },
    to_anchor: 1000000,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "A/m2", ratio: 1 },
  },
};
