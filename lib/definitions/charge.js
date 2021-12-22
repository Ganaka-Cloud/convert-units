var metric, imperial;

metric = {
  c: {
    name: {
      singular: "Coulomb",
      plural: "Coulombs",
    },
    to_anchor: 1,
  },
  mC: {
    name: {
      singular: "Millicoulomb",
      plural: "Millicoulombs",
    },
    to_anchor: 1 / 1000,
  },
  μC: {
    name: {
      singular: "Microcoulomb",
      plural: "Microcoulombs",
    },
    to_anchor: 1 / 1000000,
  },
  nC: {
    name: {
      singular: "Nanocoulomb",
      plural: "Nanocoulombs",
    },
    to_anchor: 1e-9,
  },
  pC: {
    name: {
      singular: "Picocoulomb",
      plural: "Picocoulombs",
    },
    to_anchor: 1e-12,
  },
};

imperial = {
  "in/s2": {
    name: {
      singular: "Inch per square second",
      plural: "Inches per square second",
    },
    to_anchor: 1,
  },
  "ft/s2": {
    name: {
      singular: "Foot per square second",
      plural: "Feet per square second",
    },
    to_anchor: 1 / 12,
  },
  "yd/s2": {
    name: {
      singular: "Yard per square second",
      plural: "Yards per square second",
    },
    to_anchor: 1 / 36,
  },
  "mi/s2": {
    name: {
      singular: "Mile per square second",
      plural: "Miles per square second",
    },
    to_anchor: 1 / 63360,
  },
  "g-US": {
    name: {
      singular: "g in US",
      plural: "gs in US",
    },
    to_anchor: 1 / 386.08858268,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "m/s2",
      ratio: 1 / 3.28084,
    },
    imperial: {
      unit: "m/h",
      ratio: 3.28084,
    },
  },
};
