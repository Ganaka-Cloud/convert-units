var metric, imperial;

metric = {
  gpcc: {
    name: {
      singular: "Gram per cubic centimeter",
      plural: "Grams per cubic centimeter",
    },
    to_anchor: 1 / 1000,
  },
  gpcm: {
    name: {
      singular: "Gram per cubic meter",
      plural: "Grams per cubic meter",
    },
    to_anchor: 1 / 1000,
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
    to_anchor: 1000000000000,
  },
  kgpl: {
    name: {
      singular: "Kilogram per litre",
      plural: "Kilograms per litre",
    },
    to_anchor: 1 / 1000,
  },
  gpl: {
    name: {
      singular: "Gram per litre",
      plural: "Grams per litre",
    },
    to_anchor: 1,
  },
};

imperial = {
  ozpcin: {
    name: {
      singular: "ounce per cubic inch",
      plural: "ounces per cubic inch",
    },
    to_anchor: 0.768175583,
  },
  ozpcft: {
    name: {
      singular: "ounce per cubic yard",
      plural: "ounces per cubic yard",
    },
    to_anchor: 1327.4074074,
  },
  ozspg: {
    name: {
      singular: "ounce per gallon US",
      plural: "ounces per gallon US",
    },
    to_anchor: 177.44855967,
  },
  ozlpg: {
    name: {
      singular: "ounce per gallon UK",
      plural: "ounces per gallon UK",
    },
    to_anchor: 213.10683452,
  },
  tspcy: {
    name: {
      singular: "ton short per cubic yard",
      plural: "tons short per cubic yard",
    },
    to_anchor: 1.12,
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
    to_anchor: 0.0480109739,
  },
  lbpcft: {
    name: {
      singular: "Pound per cubic foot",
      plural: "Pounds per cubic foot",
    },
    to_anchor: 82.962962963,
  },
  lbpcy: {
    name: {
      singular: "Pound per cubic yard",
      plural: "Pounds per cubic yard",
    },
    to_anchor: 2240,
  },
  lbspg: {
    name: {
      singular: "pound per gallon US",
      plural: "pounds per gallon US",
    },
    to_anchor: 11.090534979,
  },
  lblpg: {
    name: {
      singular: "pound per gallon UK",
      plural: "pounds per gallon UK",
    },
    to_anchor: 13.319177157,
  },
  slpcft: {
    name: {
      singular: "Slug per cubic foot",
      plural: "Slugs per cubic foot",
    },
    to_anchor: 2.5785677179,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "kgpcm",
      ratio: 1328.9391836,
    },
    imperial: {
      unit: "tlpcy",
      ratio: 1 / 1328.9391836,
    },
  },
};
