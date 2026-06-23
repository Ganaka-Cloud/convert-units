"use strict";
// Surface tension: force per unit length, but kept on the milli-scale base (mN/m) so it does
// NOT collide with the LineLoad / stiffness measure, which owns "N/m". 1 mN/m = 1 dyn/cm.
// (Water ≈ 72 mN/m, so mN/m is the natural working unit for surface tension anyway.)
var metric;

metric = {
  "mN/m": {
    name: {
      singular: "Millinewton per meter",
      plural: "Millinewtons per meter",
    },
    to_anchor: 1,
  },
  "dyn/cm": {
    name: {
      singular: "Dyne per centimeter",
      plural: "Dynes per centimeter",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "mN/m",
      ratio: 1,
    },
  },
};
