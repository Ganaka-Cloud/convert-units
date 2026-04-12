"use strict";

const { expandSI } = require("../siPrefixes");

var metric;

metric = {
  ...expandSI("Bq", "becquerel", 1, ["μ", "k", "M", "G", "T"]),
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
