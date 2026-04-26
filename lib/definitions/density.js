"use strict";
var metric, imperial;

// Anchor: kgpcm = kg/m^3
// All to_anchor values multiply to give kg/m^3 (metric) or long-ton/yd^3 (imperial).

metric = {
  gpcc: {
    name: {
      singular: "Gram per cubic centimeter",
      plural: "Grams per cubic centimeter",
    },
    to_anchor: 1000,
  },
  gpcm: {
    name: {
      singular: "Gram per cubic meter",
      plural: "Grams per cubic meter",
    },
    to_anchor: 0.001,
  },
  kgpcm: {
    name: {
      singular: "Kilogram per cubic meter",
      plural: "Kilograms per cubic meter",
    },
    to_anchor: 1,
  },
  tpcmm: {
    name: {
      singular: "tonne long per cubic millimeter",
      plural: "tonnes long per cubic millimeter",
    },
    to_anchor: 1e12,
  },
  kgpl: {
    name: {
      singular: "Kilogram per litre",
      plural: "Kilograms per litre",
    },
    to_anchor: 1000,
  },
  gpl: {
    name: {
      singular: "Gram per litre",
      plural: "Grams per litre",
    },
    to_anchor: 1,
  },
};

// Imperial anchor: tlpcy (long ton per cubic yard)
// 1 long ton = 2240 lb = 1016.047 kg; 1 yd^3 = 0.764555 m^3
// => 1 tlpcy = 1016.047 / 0.764555 ≈ 1328.939 kg/m^3
// Conversion factors computed from SI definitions:
//   1 oz = 0.0283495 kg; 1 in^3 = 16.3871e-6 m^3; 1 ft^3 = 0.0283168 m^3
//   1 US gal = 3.78541e-3 m^3; 1 UK gal = 4.54609e-3 m^3
//   1 lb = 0.453592 kg; 1 slug = 14.5939 kg; 1 short ton = 907.185 kg
imperial = {
  ozpcin: {
    name: {
      singular: "ounce per cubic inch",
      plural: "ounces per cubic inch",
    },
    // 1 oz/in^3 = 0.0283495/16.3871e-6 kg/m^3 / 1328.939 = ~1.3018 tlpcy
    to_anchor: 1.30178191,
  },
  ozpcft: {
    name: {
      singular: "ounce per cubic foot",
      plural: "ounces per cubic foot",
    },
    // 1 oz/ft^3 = 0.0283495/0.0283168 kg/m^3 / 1328.939 = ~7.534e-4 tlpcy
    to_anchor: 7.53348912e-4,
  },
  ozspg: {
    name: {
      singular: "ounce per gallon US",
      plural: "ounces per gallon US",
    },
    // 1 oz/gal-US = 0.0283495/3.78541e-3 kg/m^3 / 1328.939 = ~5.635e-3 tlpcy
    to_anchor: 5.63543459e-3,
  },
  ozlpg: {
    name: {
      singular: "ounce per gallon UK",
      plural: "ounces per gallon UK",
    },
    // 1 oz/gal-UK = 0.0283495/4.54609e-3 kg/m^3 / 1328.939 = ~4.692e-3 tlpcy
    to_anchor: 4.69247869e-3,
  },
  tspcy: {
    name: {
      singular: "ton short per cubic yard",
      plural: "tons short per cubic yard",
    },
    // 1 short ton/yd^3 = 907.185/0.764555 kg/m^3 / 1328.939 = ~0.89286 tlpcy
    to_anchor: 0.89285732,
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
    // 1 lb/in^3 = 0.453592/16.3871e-6 kg/m^3 / 1328.939 = ~20.8285 tlpcy
    to_anchor: 20.82851068,
  },
  lbpcft: {
    name: {
      singular: "Pound per cubic foot",
      plural: "Pounds per cubic foot",
    },
    // 1 lb/ft^3 = 0.453592/0.0283168 kg/m^3 / 1328.939 = ~0.012054 tlpcy
    to_anchor: 0.012053583,
  },
  lbpcy: {
    name: {
      singular: "Pound per cubic yard",
      plural: "Pounds per cubic yard",
    },
    // 1 lb/yd^3 = 0.453592/0.764555 kg/m^3 / 1328.939 = ~4.464e-4 tlpcy
    to_anchor: 4.46428167e-4,
  },
  lbspg: {
    name: {
      singular: "pound per gallon US",
      plural: "pounds per gallon US",
    },
    // 1 lb/gal-US = 0.453592/3.78541e-3 kg/m^3 / 1328.939 = ~0.09017 tlpcy
    to_anchor: 0.090166953,
  },
  lblpg: {
    name: {
      singular: "pound per gallon UK",
      plural: "pounds per gallon UK",
    },
    // 1 lb/gal-UK = 0.453592/4.54609e-3 kg/m^3 / 1328.939 = ~0.07508 tlpcy
    to_anchor: 0.075079659,
  },
  slpcft: {
    name: {
      singular: "Slug per cubic foot",
      plural: "Slugs per cubic foot",
    },
    // 1 slug/ft^3 = 14.5939/0.0283168 kg/m^3 / 1328.939 = ~0.38781 tlpcy
    to_anchor: 0.38781279,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "kgpcm",
      // 1 kg/m^3 = 1/1328.939 tlpcy
      ratio: 1 / 1328.939,
    },
    imperial: {
      unit: "tlpcy",
      // 1 tlpcy = 1328.939 kg/m^3
      ratio: 1328.939,
    },
  },
};
