"use strict";

const { expandSI } = require("../siPrefixes");

const current = {
  ...expandSI("A", "ampere", 1, ["p", "n", "μ", "m", "k", "M"]),
  abA: {
    name: { singular: "Abampere", plural: "Abamperes" },
    to_anchor: 10,
  },
  Bi: {
    name: { singular: "Biot", plural: "Biots" },
    to_anchor: 10,
  },
  statA: {
    name: { singular: "Statampere", plural: "Statamperes" },
    to_anchor: 3.33564e-10,
  },
  a_u_current: {
    name: { singular: "atomic unit of current", plural: "atomic units of current" },
    to_anchor: 6.623618237510e-03,
  },
};

module.exports = {
  metric: current,
  _anchors: {
    metric: {
      unit: "A",
      ratio: 1,
    },
  },
};
