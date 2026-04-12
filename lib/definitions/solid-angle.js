"use strict";
var metric;

metric = {
  sr: {
    name: {
      singular: "Steradian",
      plural: "Steradians",
    },
    to_anchor: 1,
  },
  deg2: {
    name: {
      singular: "Square degree",
      plural: "Square degrees",
    },
    to_anchor: (Math.PI / 180) * (Math.PI / 180),
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "sr",
      ratio: 1,
    },
  },
};
