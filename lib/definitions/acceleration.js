"use strict";
var metric, imperial;

metric = {
  "km/s2": {
    name: {
      singular: "Kilometre per square second",
      plural: "Kilometres per square second",
    },
    to_anchor: 1000,
  },
  "m/s2": {
    name: {
      singular: "Metre per square second",
      plural: "Metres per square second",
    },
    to_anchor: 1,
  },
  "dm/s2": {
    name: {
      singular: "Decimetre per square second",
      plural: "Decimetres per square second",
    },
    to_anchor: 0.1,
  },
  "cm/s2": {
    name: {
      singular: "Centimetre per square second",
      plural: "Centimetres per square second",
    },
    to_anchor: 0.01,
  },
  "mm/s2": {
    name: {
      singular: "Millimetre per square second",
      plural: "Millimetres per square second",
    },
    to_anchor: 0.001,
  },
  "g-force": {
    name: {
      singular: "g-force",
      plural: "g-forces",
    },
    to_anchor: 9.80665,
  },
};

imperial = {
  "in/s2": {
    name: {
      singular: "Inch per square second",
      plural: "Inches per square second",
    },
    to_anchor: 1 / 12,
  },
  "ft/s2": {
    name: {
      singular: "Foot per square second",
      plural: "Feet per square second",
    },
    to_anchor: 1,
  },
  "yd/s2": {
    name: {
      singular: "Yard per square second",
      plural: "Yards per square second",
    },
    to_anchor: 3,
  },
  "mi/s2": {
    name: {
      singular: "Mile per square second",
      plural: "Miles per square second",
    },
    to_anchor: 5280,
  },
  "g-force:US": {
    name: {
      singular: "g-force in US",
      plural: "g-forces in US",
    },
    to_anchor: 32.17404856,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "m/s2",
      ratio: 3.28084,
    },
    imperial: {
      unit: "ft/s2",
      ratio: 1 / 3.28084,
    },
  },
};
