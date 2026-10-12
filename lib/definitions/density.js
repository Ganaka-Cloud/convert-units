"use strict";
var C = require("../constants");
var metric, imperial;

// Anchor: kg/m3
// All to_anchor values multiply to give kg/m^3 (metric) or long-ton/yd^3 (imperial).

metric = {
  "g/cm3": {
    name: {
      singular: "Gram per cubic centimeter",
      plural: "Grams per cubic centimeter",
    },
    to_anchor: 1000,
  },
  "g/m3": {
    name: {
      singular: "Gram per cubic meter",
      plural: "Grams per cubic meter",
    },
    to_anchor: 0.001,
  },
  "kg/m3": {
    name: {
      singular: "Kilogram per cubic meter",
      plural: "Kilograms per cubic meter",
    },
    to_anchor: 1,
  },
  "t/mm3": {
    name: {
      singular: "tonne per cubic millimeter",
      plural: "tonnes per cubic millimeter",
    },
    to_anchor: 1e12,
  },
  "kg/l": {
    name: {
      singular: "Kilogram per litre",
      plural: "Kilograms per litre",
    },
    to_anchor: 1000,
  },
  "g/l": {
    name: {
      singular: "Gram per litre",
      plural: "Grams per litre",
    },
    to_anchor: 1,
  },
};

// Imperial anchor: tlpcy (long ton per cubic yard), 2240 lb / yd^3 in kg/m^3.
var IN3 = C.IN * C.IN * C.IN,
  FT3 = C.FT * C.FT * C.FT,
  YD3 = C.YD * C.YD * C.YD,
  UK_GAL = 4.54609e-3,
  TLPCY = 2240 * C.LB / YD3;

imperial = {
  ozpcin: {
    name: {
      singular: "ounce per cubic inch",
      plural: "ounces per cubic inch",
    },
    to_anchor: (C.LB / 16 / IN3) / TLPCY,
  },
  ozpcft: {
    name: {
      singular: "ounce per cubic foot",
      plural: "ounces per cubic foot",
    },
    to_anchor: (C.LB / 16 / FT3) / TLPCY,
  },
  ozspg: {
    name: {
      singular: "ounce per gallon US",
      plural: "ounces per gallon US",
    },
    to_anchor: (C.LB / 16 / C.GAL_US) / TLPCY,
  },
  ozlpg: {
    name: {
      singular: "ounce per gallon UK",
      plural: "ounces per gallon UK",
    },
    to_anchor: (C.LB / 16 / UK_GAL) / TLPCY,
  },
  tspcy: {
    name: {
      singular: "ton short per cubic yard",
      plural: "tons short per cubic yard",
    },
    to_anchor: (2000 * C.LB / YD3) / TLPCY,
  },
  tlpcy: {
    name: {
      singular: "ton long per cubic yard",
      plural: "ton long per cubic yard",
    },
    to_anchor: 1,
  },
  lbpcin: {
    name: {
      singular: "Pound per cubic inch",
      plural: "Pounds per cubic inch",
    },
    to_anchor: (C.LB / IN3) / TLPCY,
  },
  lbpcft: {
    name: {
      singular: "Pound per cubic foot",
      plural: "Pounds per cubic foot",
    },
    to_anchor: (C.LB / FT3) / TLPCY,
  },
  lbpcy: {
    name: {
      singular: "Pound per cubic yard",
      plural: "Pounds per cubic yard",
    },
    to_anchor: (C.LB / YD3) / TLPCY,
  },
  lbspg: {
    name: {
      singular: "pound per gallon US",
      plural: "pounds per gallon US",
    },
    to_anchor: (C.LB / C.GAL_US) / TLPCY,
  },
  lblpg: {
    name: {
      singular: "pound per gallon UK",
      plural: "pounds per gallon UK",
    },
    to_anchor: (C.LB / UK_GAL) / TLPCY,
  },
  slpcft: {
    name: {
      singular: "Slug per cubic foot",
      plural: "Slugs per cubic foot",
    },
    to_anchor: (C.LBF / C.FT / FT3) / TLPCY,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "kg/m3",
      ratio: 1 / (2240 * C.LB / (C.YD * C.YD * C.YD)),
    },
    imperial: {
      unit: "tlpcy",
      ratio: (2240 * C.LB / (C.YD * C.YD * C.YD)),
    },
  },
};
