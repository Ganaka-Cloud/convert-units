var metric, imperial;

metric = {
  m4: {
    name: {
      singular: "metre power four",
      plural: "metre power four",
    },
    to_anchor: 1,
  },
  cm4: {
    name: {
      singular: "centimetre power four",
      plural: "centimetre power four",
    },
    to_anchor: 1 / 100000000,
  },
  mm4: {
    name: {
      singular: "millimetre power four",
      plural: "millimetre power four",
    },
    to_anchor: 1 / 1000000000000,
  },
};

imperial = {
  in4: {
    name: {
      singular: "inch power 4",
      plural: "inch power 4",
    },
    to_anchor: 1,
  },
  ft4: {
    name: {
      singular: "foot power 4",
      plural: "feet power 4",
    },
    to_anchor: 1 / 207346,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "m4",
      ratio: 2400000,
    },
    imperial: {
      unit: "in4",
      ratio: 1 / 2400000,
    },
  },
};
