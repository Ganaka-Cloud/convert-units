var metric, imperial;

metric = {
  percent: {
    name: {
      singular: "%",
      plural: "%",
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
      unit: "%",
      ratio: 1,
    },
    imperial: {
      unit: "%",
      ratio: 1,
    },
  },
};
