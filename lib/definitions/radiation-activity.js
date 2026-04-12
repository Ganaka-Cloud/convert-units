"use strict";
var metric;

metric = {
  Bq: {
    name: {
      singular: "Becquerel",
      plural: "Becquerels",
    },
    to_anchor: 1,
  },
  kBq: {
    name: {
      singular: "Kilobecquerel",
      plural: "Kilobecquerels",
    },
    to_anchor: 1000,
  },
  MBq: {
    name: {
      singular: "Megabecquerel",
      plural: "Megabecquerels",
    },
    to_anchor: 1e6,
  },
  GBq: {
    name: {
      singular: "Gigabecquerel",
      plural: "Gigabecquerels",
    },
    to_anchor: 1e9,
  },
  Ci: {
    name: {
      singular: "Curie",
      plural: "Curies",
    },
    to_anchor: 3.7e10,
  },
  mCi: {
    name: {
      singular: "Millicurie",
      plural: "Millicuries",
    },
    to_anchor: 3.7e7,
  },
  "μCi": {
    name: {
      singular: "Microcurie",
      plural: "Microcuries",
    },
    to_anchor: 3.7e4,
  },
  Rd: {
    name: {
      singular: "Rutherford",
      plural: "Rutherfords",
    },
    to_anchor: 1e6,
  },
};

module.exports = {
  metric: metric,
  _anchors: {
    metric: {
      unit: "Bq",
      ratio: 1,
    },
  },
};
