"use strict";
var C = require("../constants");
var metric;

metric = {
  "V/m": {
    name: {
      singular: "Volt per meter",
      plural: "Volts per meter",
    },
    to_anchor: 1,
  },
  "kV/m": {
    name: {
      singular: "Kilovolt per meter",
      plural: "Kilovolts per meter",
    },
    to_anchor: 1000,
  },
  "MV/m": {
    name: {
      singular: "Megavolt per meter",
      plural: "Megavolts per meter",
    },
    to_anchor: 1e6,
  },
  "mV/m": {
    name: {
      singular: "Millivolt per meter",
      plural: "Millivolts per meter",
    },
    to_anchor: 0.001,
  },
  a_u_E: {
    name: {
      singular: "atomic unit of electric field",
      plural: "atomic units of electric field",
    },
    to_anchor: C.HARTREE / (C.E * C.BOHR_RADIUS),
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "V/m",
      ratio: 1,
    },
  },
};
