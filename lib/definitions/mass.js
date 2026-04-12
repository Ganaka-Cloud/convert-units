"use strict";
var metric
  , imperial;

metric = {
  pg: {
    name: {
      singular: "Picogram",
      plural: "Picograms",
    },
    to_anchor: 1e-12,
  },
  ng: {
    name: {
      singular: "Nanogram",
      plural: "Nanograms",
    },
    to_anchor: 1e-9,
  },
  μg: {
    name: {
      singular: "Microgram",
      plural: "Micrograms",
    },
    to_anchor: 1 / 1000000,
  },
  mg: {
    name: {
      singular: "Milligram",
      plural: "Milligrams",
    },
    to_anchor: 1 / 1000,
  },
  g: {
    name: {
      singular: "Gram",
      plural: "Grams",
    },
    to_anchor: 1,
  },
  kg: {
    name: {
      singular: "Kilogram",
      plural: "Kilograms",
    },
    to_anchor: 1000,
  },
  mt: {
    name: {
      singular: "Metric Tonne",
      plural: "Metric Tonnes",
    },
    to_anchor: 1000000,
  },
  u: {
    name: {
      singular: "atomic mass unit",
      plural: "atomic mass units",
    },
    to_anchor: 1.66053906660e-24,
  },
  Da: {
    name: {
      singular: "dalton",
      plural: "daltons",
    },
    to_anchor: 1.66053906660e-24,
  },
  ct: {
    name: {
      singular: "carat",
      plural: "carats",
    },
    to_anchor: 0.2,
  },
  m_e: {
    name: {
      singular: "electron mass",
      plural: "electron masses",
    },
    to_anchor: 9.1093837015e-28,
  },
  m_p: {
    name: {
      singular: "proton mass",
      plural: "proton masses",
    },
    to_anchor: 1.67262192369e-24,
  },
  m_n: {
    name: {
      singular: "neutron mass",
      plural: "neutron masses",
    },
    to_anchor: 1.67492749804e-24,
  },
  mP: {
    name: {
      singular: "Planck mass",
      plural: "Planck masses",
    },
    to_anchor: 2.17643434e-05,
  },
};

imperial = {
  oz: {
    name: {
      singular: 'Ounce'
    , plural: 'Ounces'
    }
  , to_anchor: 1/16
  }
, lb: {
    name: {
      singular: 'Pound'
    , plural: 'Pounds'
    }
  , to_anchor: 1
}, t: {
  name: {
    singular: 'Ton',
    plural: 'Tons',
  },
    to_anchor: 2000,
  },
  stone: {
    name: {
      singular: 'stone',
      plural: 'stone',
    },
    to_anchor: 14,
  },
  grain: {
    name: {
      singular: 'grain',
      plural: 'grains',
    },
    to_anchor: 1/7000,
  },
  slug: {
    name: {
      singular: 'slug',
      plural: 'slugs',
    },
    to_anchor: 32.174,
  },
  ozt: {
    name: {
      singular: 'troy ounce',
      plural: 'troy ounces',
    },
    to_anchor: 31.1035/453.592,
  },
  lbt: {
    name: {
      singular: 'troy pound',
      plural: 'troy pounds',
    },
    to_anchor: 12 * 31.1035/453.592,
  },
  cwt: {
    name: {
      singular: 'hundredweight',
      plural: 'hundredweights',
    },
    to_anchor: 100,
  },
  dr: {
    name: {
      singular: 'dram',
      plural: 'drams',
    },
    to_anchor: 1/256,
  },
  dwt: {
    name: {
      singular: 'pennyweight',
      plural: 'pennyweights',
    },
    to_anchor: (1/20) * 31.1035/453.592,
  },
  'long-ton': {
    name: {
      singular: 'long ton',
      plural: 'long tons',
    },
    to_anchor: 2240,
  },
  'short-ton': {
    name: {
      singular: 'short ton',
      plural: 'short tons',
    },
    to_anchor: 2000,
  },
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'g'
    , ratio: 1/453.592
    }
  , imperial: {
      unit: 'lb'
    , ratio: 453.592
    }
  }
};
