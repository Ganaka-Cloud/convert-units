"use strict";
var metric;

metric = {
  c: {
    name: {
      singular: "Coulomb",
      plural: "Coulombs",
    },
    to_anchor: 1,
  },
  mC: {
    name: {
      singular: "Millicoulomb",
      plural: "Millicoulombs",
    },
    to_anchor: 1 / 1000,
  },
  μC: {
    name: {
      singular: "Microcoulomb",
      plural: "Microcoulombs",
    },
    to_anchor: 1e-6,
  },
  nC: {
    name: {
      singular: "Nanocoulomb",
      plural: "Nanocoulombs",
    },
    to_anchor: 1e-9,
  },
  pC: {
    name: {
      singular: "Picocoulomb",
      plural: "Picocoulombs",
    },
    to_anchor: 1e-12,
  },
  Ah: {
    name: {
      singular: "Ampere-hour",
      plural: "Ampere-hours",
    },
    to_anchor: 3600,
  },
  mAh: {
    name: {
      singular: "Milliampere-hour",
      plural: "Milliampere-hours",
    },
    to_anchor: 3.6,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "c",
      ratio: 1,
    },
  },
};
