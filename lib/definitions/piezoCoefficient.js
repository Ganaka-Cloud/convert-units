"use strict";
// Piezoelectric strain coefficient (converse effect): strain per electric field,
// SI base m/V (identical to C/N).
var metric;

metric = {
  "m/V": {
    name: { singular: "meter per volt", plural: "meters per volt" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "m/V", ratio: 1 },
  },
};
