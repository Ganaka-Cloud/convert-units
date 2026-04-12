"use strict";
var metric, imperial;

metric = {
  Pa: {
    name: {
      singular: "pascal",
      plural: "pascals",
    },
    to_anchor: 1 / 1000,
  },
  kPa: {
    name: {
      singular: "kilopascal",
      plural: "kilopascals",
    },
    to_anchor: 1,
  },
  MPa: {
    name: {
      singular: "megapascal",
      plural: "megapascals",
    },
    to_anchor: 1000,
  },
  GPa: {
    name: {
      singular: "Gigapascal",
      plural: "Gigapascals",
    },
    to_anchor: 1000000,
  },
  hPa: {
    name: {
      singular: "hectopascal",
      plural: "hectopascals",
    },
    to_anchor: 1 / 10,
  },
  bar: {
    name: {
      singular: "bar",
      plural: "bar",
    },
    to_anchor: 100,
  },
  torr: {
    name: {
      singular: "torr",
      plural: "torr",
    },
    to_anchor: 101325 / 760000,
  },
  atm: {
    name: {
      singular: "atmosphere",
      plural: "atmospheres",
    },
    to_anchor: 101.325,
  },
  mmHg: {
    name: {
      singular: "millimeter of mercury",
      plural: "millimeters of mercury",
    },
    to_anchor: 0.133322,
  },
  cmH2O: {
    name: {
      singular: "centimeter of water",
      plural: "centimeters of water",
    },
    to_anchor: 0.0980665,
  },
  mbar: {
    name: {
      singular: "millibar",
      plural: "millibar",
    },
    to_anchor: 0.1,
  },
};

imperial = {
  psi: {
    name: {
      singular: "pound per square inch",
      plural: "pounds per square inch",
    },
    to_anchor: 1 / 1000,
  },
  ksi: {
    name: {
      singular: "kilopound per square inch",
      plural: "kilopound per square inch",
    },
    to_anchor: 1,
  },
  inHg: {
    name: {
      singular: "inch of mercury",
      plural: "inches of mercury",
    },
    to_anchor: 0.491154 / 1000,
  },
  inH2O: {
    name: {
      singular: "inch of water",
      plural: "inches of water",
    },
    to_anchor: 0.0361273 / 1000,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "kPa",
      ratio: 0.00014503768078,
    },
    imperial: {
      unit: "psi",
      ratio: 1 / 0.00014503768078,
    },
  },
};
