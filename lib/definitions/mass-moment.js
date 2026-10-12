"use strict";
var C = require("../constants");
var metric,
  imperial;

metric = {
  "kg*m2": {
    name: {
      singular: 'kilogram square metre',
      plural: 'kilogram square metre'
    },
    to_anchor: 1
  },
  "kg*cm2": {
    name: {
      singular: 'kilogram square centi-metre',
      plural: 'kilogram square centi-metres'
    },
    to_anchor: 1/10000
  },
  "kg*mm2": {
    name: {
      singular: 'kilogram square milli-metre',
      plural: 'kilogram square milli-metres'
    },
    to_anchor: 1/1000000
  },
  kgfms2: {
    name: {
      singular: 'kilogram-force square metre second',
      plural: 'kilogram-force square metre second',
    },
    to_anchor: C.G
  },
};
imperial = {
  'lb-in2': {
    name: {
      singular: 'pound square inch',
      plural: 'pound square inches',
    },
    to_anchor: 1/144
  },
  'lb-ft2': {
    name: {
      singular: 'pound square foor',
      plural: 'pound square feet',
    },
    to_anchor: 1
  },
  'lbf-ins2': {
    name: {
      singular: 'pound-force inch square second',
      plural: 'pound-force inch square second',
    },
    to_anchor: C.LBF * C.IN / (C.LB * C.FT * C.FT)
  },
  'lbf-fts2': {
    name: {
      singular: 'pound-force foot square second',
      plural: 'pound-force feet square second',
    },
    to_anchor: C.LBF * C.FT / (C.LB * C.FT * C.FT)
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'kg*m2',
      ratio: 1 / (C.LB * C.FT * C.FT)
    },
    imperial: {
      unit: 'lb-ft2',
      ratio: (C.LB * C.FT * C.FT)
    }
  }
};
