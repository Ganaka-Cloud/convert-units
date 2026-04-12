"use strict";

const { expandSI } = require("../siPrefixes");

var metric, imperial;

metric = {
  dyn: {
    name: {
      singular: "dyne",
      plural: "dynes",
    },
    to_anchor: 1 / 100000,
  },
  ...expandSI("N", "newton", 1, ["μ", "m", "k", "M"]),
  daN: {
    name: {
      singular: "dekanewton",
      plural: "dekanewtons",
    },
    to_anchor: 10,
  },
  kgf: {
    name: {
      singular: "kilogram-force",
      plural: "kilogram-force",
    },
    to_anchor: 1 / 9.80665,
  },
  tfM: {
    name: {
      singular: "ton-force (Metric)",
      plural: "ton-force (Metric)",
    },
    to_anchor: 1 / 9806.65,
  },
  pond: {
    name: {
      singular: "pond",
      plural: "pond",
    },
    to_anchor: 9.80665e-3,
  },
  kp: {
    name: {
      singular: "kilopond",
      plural: "kilopond",
    },
    to_anchor: 9.80665,
  },
  a_u_force: {
    name: {
      singular: "atomic unit of force",
      plural: "atomic units of force",
    },
    to_anchor: 8.23872336e-08,
  },
};

imperial = {
  lbf: {
    name: {
      singular: "Pound-force",
      plural: "Pound-forces",
    },
    to_anchor: 1,
  },
  kipf: {
    name: {
      singular: "kilopound-force",
      plural: "kilopound-forces",
    },
    to_anchor: 1000,
  },
  pdl: {
    name: {
      singular: "poundal",
      plural: "poundals",
    },
    to_anchor: 1 / 32.174048556,
  },
  tfs: {
    name: {
      singular: "ton-force-short(US)",
      plural: "ton-force-short(US)",
    },
    to_anchor: 2000,
  },
  tfl: {
    name: {
      singular: "ton-force-long(Uk)",
      plural: "ton-force-long(Uk)",
    },
    to_anchor: 2240,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "N",
      ratio: 1 / 4.4482216153,
    },
    imperial: {
      unit: "lbf",
      ratio: 4.4482216153,
    },
  },
};
