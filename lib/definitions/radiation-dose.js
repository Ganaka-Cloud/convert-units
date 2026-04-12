"use strict";
var metric, legacy;

metric = {
  Gy: {
    name: {
      singular: "Gray",
      plural: "Grays",
    },
    to_anchor: 1,
  },
  Sv: {
    name: {
      singular: "Sievert",
      plural: "Sieverts",
    },
    to_anchor: 1,
  },
  mGy: {
    name: {
      singular: "Milligray",
      plural: "Milligrays",
    },
    to_anchor: 0.001,
  },
  mSv: {
    name: {
      singular: "Millisievert",
      plural: "Millisieverts",
    },
    to_anchor: 0.001,
  },
  "μGy": {
    name: {
      singular: "Microgray",
      plural: "Micrograys",
    },
    to_anchor: 1e-6,
  },
  "μSv": {
    name: {
      singular: "Microsievert",
      plural: "Microsieverts",
    },
    to_anchor: 1e-6,
  },
};

legacy = {
  RAD: {
    name: {
      singular: "Rad",
      plural: "Rads",
    },
    to_anchor: 1,
  },
  rem: {
    name: {
      singular: "Rem",
      plural: "Rems",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  legacy: legacy,
  _anchors: {
    metric: {
      unit: "Gy",
      ratio: 100,
    },
    legacy: {
      unit: "RAD",
      ratio: 0.01,
    },
  },
};
