"use strict";
// Temperature difference (a change or interval, not a point on a scale): converts by scale
// only, with no offset. SI base is the kelvin.
// NIST SP 811 (2008) 4.2.1.1: a Celsius temperature interval equals the kelvin interval.
// NIST SP 811 (2008) App. B.8: a degree Fahrenheit interval = 5/9 K, a degree Rankine interval = 5/9 K.
// The abbreviations K, C, F and R are those of the Temperature measure; they are shared by
// design and resolve per measure (see scripts/sharedAbbreviations.js).
var metric, imperial;

metric = {
  K: {
    name: { singular: "Kelvin (difference)", plural: "Kelvin (difference)" },
    to_anchor: 1,
  },
  C: {
    name: { singular: "Degree Celsius (difference)", plural: "Degrees Celsius (difference)" },
    to_anchor: 1,
  },
};

imperial = {
  F: {
    name: { singular: "Degree Fahrenheit (difference)", plural: "Degrees Fahrenheit (difference)" },
    to_anchor: 1,
  },
  R: {
    name: { singular: "Degree Rankine (difference)", plural: "Degrees Rankine (difference)" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "K",
      ratio: 9 / 5,
    },
    imperial: {
      unit: "F",
      ratio: 5 / 9,
    },
  },
};
