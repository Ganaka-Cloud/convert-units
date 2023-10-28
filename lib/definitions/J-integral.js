var metric, imperial;

metric = {
  "J/sqm": {
    name: {
      singular: "Joule per square metre",
      plural: "Joules per square metre",
    },
    to_anchor: 1,
  },
  "kJ/sqm": {
    name: {
      singular: "Kilojoule per square metre",
      plural: "Kilojoules per square metre",
    },
    to_anchor: 1000,
  },
};
imperial = {
  "ft-lbs/sqin": {
    name: {
      singular: "pound foot per square inch",
      plural: "pounds feet per square inch",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J/sqm",
      ratio: 2103,
    },
    imperial: {
      unit: "ft-lbs/sqin",
      ratio: 1 / 2103,
    },
  },
};
