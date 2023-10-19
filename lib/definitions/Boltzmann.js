var metric, imperial;

metric = {
  "J/°K": {
    name: {
      singular: "Joule per degree Kelvin",
      plural: "Joules per degree Kelvin",
    },
    to_anchor: 1,
  },
  "ev/°K": {
    name: {
      singular: "Electron Volt per degree Kelvin",
      plural: "Electron Volts per degree Kelvin",
    },
    to_anchor: 1 / 1.380649e-23,
    anchor_shift: 8.617333262e-5,
  },
};
imperial = {
  "ft-lb/°R": {
    name: {
      singular: "Pound-feet per degree Rankine",
      plural: "Pounds-feet per degree Rankine",
    },
    to_anchor: 1,
    anchor_shift: 5.657302466e-24,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J/°K",
      ratio: 1.380649e-23,
    },
    imperial: {
      unit: "ft-lb/°R",
      ratio: 1 / 1.380649e-23,
    },
  },
};
