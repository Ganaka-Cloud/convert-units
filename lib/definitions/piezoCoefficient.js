"use strict";
// Piezoelectric strain coefficient (converse effect): strain per electric field,
// SI base m/V (identical to C/N).
var metric;

metric = {
  "m/V": {
    name: { singular: "meter per volt", plural: "meters per volt" },
    to_anchor: 1,
  },
  "nm/V": {
    name: { singular: "nanometer per volt", plural: "nanometers per volt" },
    to_anchor: 1e-9,
  },
  "pm/V": {
    name: { singular: "picometer per volt", plural: "picometers per volt" },
    to_anchor: 1e-12,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "m/V", ratio: 1 },
  },
};
