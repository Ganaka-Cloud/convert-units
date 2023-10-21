var metric, imperial;

metric = {
  "W/m2/K4": {
    name: {
      singular: "Watt per square metre per degree Kelvin",
      plural: "Watts per square metre per degree Kelvin",
    },
    to_anchor: 1,
  },
};
imperial = {
  "Btu/hr/sq.ft/R4": {
    name: {
      singular:
        "British thermal (IT) unit per hour per square foot per degree Rankine",
      plural:
        "British thermal (IT) units per hour per square foot per degree Rankine",
    },
    to_anchor: 1,
    anchor_shift: 0.1714e-8,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "W/m2/K4",
      ratio: 5.669e-8,
    },
    imperial: {
      unit: "Btu/hr/sq.ft/R4",
      ratio: 1 / 5.669e-8,
    },
  },
};
