"use strict";

var metric = {
  pF: {
    name: { singular: "Picofarad", plural: "Picofarads" },
    to_anchor: 1e-6,
  },
  nF: {
    name: { singular: "Nanofarad", plural: "Nanofarads" },
    to_anchor: 1e-3,
  },
  μF: {
    name: { singular: "Microfarad", plural: "Microfarads" },
    to_anchor: 1,
  },
  mF: {
    name: { singular: "Millifarad", plural: "Millifarads" },
    to_anchor: 1e3,
  },
  abF: {
    name: { singular: "Abfarad", plural: "Abfarads" },
    to_anchor: 1e15,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "μF",
      ratio: 1,
    },
  },
};
