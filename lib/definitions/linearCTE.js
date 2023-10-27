var metric, imperial;

metric = {
  perC: {
    name: {
      singular: "per degree Celsius",
      plural: "per degree Celsius",
    },
    to_anchor: 1,
    anchor_shift: 0,
  },
  perK: {
    name: {
      singular: "per degree Kelvin",
      plural: "per degree Kelvin",
    },
    to_anchor: 1,
    anchor_shift: 1 / 273.15,
  },
};

imperial = {
  perF: {
    name: {
      singular: "per degree Fahrenheit",
      plural: "per degree Fahrenheit",
    },
    to_anchor: 1,
  },
  perR: {
    name: {
      singular: "per degree Rankine",
      plural: "per degree Rankine",
    },
    to_anchor: 1,
    anchor_shift: 1 / 459.67,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "/C",
      transform: function (C) {
        return 1 / (C / (5 / 9) + 32);
      },
    },
    imperial: {
      unit: "/F",
      transform: function (F) {
        return 1 / ((F - 32) * (5 / 9));
      },
    },
  },
};
