"use strict";
// Electrical conductivity: conductance per unit length, SI base S/m.
var metric;

metric = {
  "S/m": {
    name: { singular: "Siemens per meter", plural: "Siemens per meter" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: { unit: "S/m", ratio: 1 },
  },
};
