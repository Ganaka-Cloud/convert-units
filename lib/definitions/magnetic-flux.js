"use strict";
var metric, cgs;

metric = {
  Wb: {
    name: {
      singular: "Weber",
      plural: "Webers",
    },
    to_anchor: 1,
  },
  mWb: {
    name: {
      singular: "Milliweber",
      plural: "Milliwebers",
    },
    to_anchor: 0.001,
  },
  "μWb": {
    name: {
      singular: "Microweber",
      plural: "Microwebers",
    },
    to_anchor: 1e-6,
  },
};

cgs = {
  Mx: {
    name: {
      singular: "Maxwell",
      plural: "Maxwells",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  cgs: cgs,
  _anchors: {
    metric: {
      unit: "Wb",
      ratio: 1e8,
    },
    cgs: {
      unit: "Mx",
      ratio: 1e-8,
    },
  },
};
