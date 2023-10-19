var metric, imperial;

metric = {
  "W/m^2/°K^4": {
    name: {
      singular: "Watt per square metre per degree Kelvin",
      plural: "Watts per square metre per degree Kelvin",
    },
    to_anchor: 1,
  },
};
imperial = {
  "Btu(IT)/hr/sqft/°R^4": {
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
      unit: "W/m^2/°K^4",
      ratio: 5.669e-8,
    },
    imperial: {
      unit: "Btu(IT)/h/sqft/°R^4",
      ratio: 1 / 5.669e-8,
    },
  },
};
