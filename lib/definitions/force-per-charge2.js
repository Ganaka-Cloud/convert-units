"use strict";
var metric;

metric = {
  "N*m2/C2": {
    name: {
      singular: "Newton-square metre per coulomb squared",
      plural: "Newton-square metres per coulomb squared",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "N*m2/C2",
      ratio: 1,
    },
  },
};
