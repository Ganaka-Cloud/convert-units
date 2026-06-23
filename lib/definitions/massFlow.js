"use strict";
// Mass flow rate, SI base kg/s. 1 lb/s = 0.45359237 kg/s.
var metric, imperial;

metric = {
  "kg/s": {
    name: { singular: "kilogram per second", plural: "kilograms per second" },
    to_anchor: 1,
  },
  "g/s": {
    name: { singular: "gram per second", plural: "grams per second" },
    to_anchor: 0.001,
  },
  "kg/min": {
    name: { singular: "kilogram per minute", plural: "kilograms per minute" },
    to_anchor: 1 / 60,
  },
  "kg/h": {
    name: { singular: "kilogram per hour", plural: "kilograms per hour" },
    to_anchor: 1 / 3600,
  },
  "t/h": {
    name: { singular: "tonne per hour", plural: "tonnes per hour" },
    to_anchor: 1000 / 3600,
  },
};

imperial = {
  "lb/s": {
    name: { singular: "pound per second", plural: "pounds per second" },
    to_anchor: 1,
  },
  "lb/min": {
    name: { singular: "pound per minute", plural: "pounds per minute" },
    to_anchor: 1 / 60,
  },
  "lb/h": {
    name: { singular: "pound per hour", plural: "pounds per hour" },
    to_anchor: 1 / 3600,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "kg/s", ratio: 1 / 0.45359237 },
    imperial: { unit: "lb/s", ratio: 0.45359237 },
  },
};
