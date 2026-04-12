"use strict";
var metric;

metric = {
  "J/mol/K": {
    name: {
      singular: "Joule per mole per kelvin",
      plural: "Joules per mole per kelvin",
    },
    to_anchor: 1,
  },
  "cal/mol/K": {
    name: {
      singular: "Calorie per mole per kelvin",
      plural: "Calories per mole per kelvin",
    },
    to_anchor: 4.184,
  },
  "L*atm/mol/K": {
    name: {
      singular: "Litre-atmosphere per mole per kelvin",
      plural: "Litre-atmospheres per mole per kelvin",
    },
    to_anchor: 101.325,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "J/mol/K",
      ratio: 1,
    },
  },
};
