"use strict";
var metric, imperial;

metric = {
  "mm/mm": {
    name: {
      singular: "Millimeter/Millimeter",
      plural: "Millimeters/Millimeters",
    },
    to_anchor: 1,
  },
  "cm/cm": {
    name: {
      singular: "Centimeter/Centimeter",
      plural: "Centimeters/Centimeters",
    },
    to_anchor: 1,
  },
  "m/m": {
    name: {
      singular: "Meter/Meter",
      plural: "Meters/Meters",
    },
    to_anchor: 1,
  },
};

imperial = {
  "in/in": {
    name: {
      singular: "Inch/Inch",
      plural: "Inches/Inches",
    },
    to_anchor: 1,
  },
  "yd/yd": {
    name: {
      singular: "Yard/Yard",
      plural: "Yards/Yards",
    },
    to_anchor: 1,
  },
  "ft-us/ft-us": {
    name: {
      singular: "US Survey Foot/Foot",
      plural: "US Survey Feet/Feet",
    },
    to_anchor: 1,
  },
  "ft/ft": {
    name: {
      singular: "Foot/Foot",
      plural: "Feet/Feet",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "m/m",
      ratio: 1,
    },
    imperial: {
      unit: "ft/ft",
      ratio: 1,
    },
  },
};
