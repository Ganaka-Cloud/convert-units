"use strict";
var metric;

metric = {
  "J*s": {
    name: {
      singular: "Joule-second",
      plural: "Joule-seconds",
    },
    to_anchor: 1,
  },
  "eV*s": {
    name: {
      singular: "Electronvolt-second",
      plural: "Electronvolt-seconds",
    },
    to_anchor: 1.602176634e-19,
  },
  "erg*s": {
    name: {
      singular: "Erg-second",
      plural: "Erg-seconds",
    },
    to_anchor: 1e-7,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "J*s",
      ratio: 1,
    },
  },
};
