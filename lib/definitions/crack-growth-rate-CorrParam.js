var metric, imperial;

metric = {
  "MPam/h": {
    name: {
      singular: "Mega Pascal meter per hour",
      plural: "Mega Pascals meter per hour",
    },
    to_anchor: 1,
  },
};
imperial = {};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "MPam/h",
      ratio: 1,
    },
    imperial: {},
  },
};
