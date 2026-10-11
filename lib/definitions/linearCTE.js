"use strict";
// Linear coefficient of thermal expansion: per unit temperature difference, so no
// offset applies. A degree Celsius equals a kelvin and a degree Fahrenheit equals a
// rankine in size; 1 /K = 5/9 /F. 1/C and 1/K are the tag-grammar spellings of /C and /K.
var metric, imperial;

metric = {
  "/C": {
    name: { singular: "per degree Celsius", plural: "per degree Celsius" },
    to_anchor: 1,
  },
  "1/C": {
    name: { singular: "per degree Celsius", plural: "per degree Celsius" },
    to_anchor: 1,
  },
  "/K": {
    name: { singular: "per degree Kelvin", plural: "per degree Kelvin" },
    to_anchor: 1,
  },
  "1/K": {
    name: { singular: "per degree Kelvin", plural: "per degree Kelvin" },
    to_anchor: 1,
  },
};

imperial = {
  "/F": {
    name: { singular: "per degree Fahrenheit", plural: "per degree Fahrenheit" },
    to_anchor: 1,
  },
  "/R": {
    name: { singular: "per degree Rankine", plural: "per degree Rankine" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "/K", ratio: 5 / 9 },
    imperial: { unit: "/F", ratio: 9 / 5 },
  },
};
