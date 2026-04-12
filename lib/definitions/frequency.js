"use strict";

const { expandSI } = require("../siPrefixes");

var metric;

metric = {
  ...expandSI("Hz", "hertz", 1, ["μ", "m", "k", "M", "G", "T"], { pluralName: "hertz" }),
  rpm: {
    name: {
      singular: "rotation per minute",
      plural: "rotations per minute",
    },
    to_anchor: 1 / 60,
  },
  "deg/s": {
    name: {
      singular: "degree per second",
      plural: "degrees per second",
    },
    to_anchor: 1 / 360,
  },
  "rad/s": {
    name: {
      singular: "radian per second",
      plural: "radians per second",
    },
    to_anchor: 1 / (Math.PI * 2),
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "hz",
      ratio: 1,
    },
  },
};
