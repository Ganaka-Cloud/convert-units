"use strict";
var C = require("../constants");
var metric, imperial;

metric = {
  lx: {
    name: {
      singular: "Lux",
      plural: "Lux",
    },
    to_anchor: 1,
  },
};

imperial = {
  "ft-cd": {
    name: {
      singular: "Foot-candle",
      plural: "Foot-candles",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "lx",
      ratio: 1 / (1 / (C.FT * C.FT)),
    },
    imperial: {
      unit: "ft-cd",
      ratio: (1 / (C.FT * C.FT)),
    },
  },
};
