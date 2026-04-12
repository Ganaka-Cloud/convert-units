"use strict";
var metric
  , imperial;

metric = {
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
