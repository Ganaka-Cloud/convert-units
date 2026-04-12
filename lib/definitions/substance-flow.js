"use strict";
var metric;

metric = {
  "mol/s": {
    name: {
      singular: "Mole per second",
      plural: "Moles per second",
    },
    to_anchor: 1,
  },
  "mol/min": {
    name: {
      singular: "Mole per minute",
      plural: "Moles per minute",
    },
    to_anchor: 1 / 60,
  },
  "mmol/s": {
    name: {
      singular: "Millimole per second",
      plural: "Millimoles per second",
    },
    to_anchor: 0.001,
  },
  "μmol/s": {
    name: {
      singular: "Micromole per second",
      plural: "Micromoles per second",
    },
    to_anchor: 1e-6,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "mol/s",
      ratio: 1,
    },
  },
};
