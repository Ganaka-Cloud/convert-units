"use strict";
var C = require("../constants");
var metric;

metric = {
  "cd/m2": {
    name: {
      singular: "Candela per square meter",
      plural: "Candelas per square meter",
    },
    to_anchor: 1,
  },
  sb: {
    name: {
      singular: "Stilb",
      plural: "Stilbs",
    },
    to_anchor: 1e4,
  },
  La: {
    name: {
      singular: "Lambert",
      plural: "Lamberts",
    },
    to_anchor: 10000 / Math.PI,
  },
  fL: {
    name: {
      singular: "Foot-lambert",
      plural: "Foot-lamberts",
    },
    to_anchor: 1 / (Math.PI * C.FT * C.FT),
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "cd/m2",
      ratio: 1,
    },
  },
};
