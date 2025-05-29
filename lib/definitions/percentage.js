var metric, imperial;

metric = {
  percent: {
    name: {
      singular: "percent",
      plural: "percent",
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
      unit: "percent",
      ratio: 1,
    },
    imperial: {
      unit: "percent",
      ratio: 1,
    },
  },
};
