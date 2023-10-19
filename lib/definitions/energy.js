var metric, imperial;

metric = {
  Wh: {
    name: {
      singular: "Watt-hour",
      plural: "Watt-hours",
    },
    to_anchor: 3600,
  },
  mWh: {
    name: {
      singular: "Milliwatt-hour",
      plural: "Milliwatt-hours",
    },
    to_anchor: 3.6,
  },
  kWh: {
    name: {
      singular: "Kilowatt-hour",
      plural: "Kilowatt-hours",
    },
    to_anchor: 3600000,
  },
  MWh: {
    name: {
      singular: "Megawatt-hour",
      plural: "Megawatt-hours",
    },
    to_anchor: 3600000000,
  },
  GWh: {
    name: {
      singular: "Gigawatt-hour",
      plural: "Gigawatt-hours",
    },
    to_anchor: 3600000000000,
  },
  J: {
    name: {
      singular: "Joule",
      plural: "Joules",
    },
    to_anchor: 1,
  },
  kJ: {
    name: {
      singular: "Kilojoule",
      plural: "Kilojoules",
    },
    to_anchor: 1000,
  },
};
imperial = {
  "Btu(IT)": {
    name: {
      singular: "British thermal (IT)",
      plural: "British thermal (IT) units",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J",
      ratio: 1055.1,
    },
    imperial: {
      unit: "Btu(IT)",
      ratio: 1 / 1055.1,
    },
  },
};
