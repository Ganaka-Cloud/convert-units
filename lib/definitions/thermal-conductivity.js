var metric, imperial;

metric = {
  "W/mm/°C": {
    name: {
      singular: "Watt/millimetre/°Celsius",
      plural: "Watts/millimetre/°Celsius",
    },
    to_anchor: 1 / 1000,
  },
  "W/cm/°C": {
    name: {
      singular: "Watt/centimetre/°Celsius",
      plural: "Watts/centimetre/°Celsius",
    },
    to_anchor: 1 / 100,
  },
  "mW/m/°C": {
    name: {
      singular: "Watt/metre/°Celsius",
      plural: "Watts/metre/°Celsius",
    },
    to_anchor: 1 / 1000,
  },
  "cW/m/°C": {
    name: {
      singular: "Centi-Watt/metre/°Celsius",
      plural: "Centi-Watts/metre/°Celsius",
    },
    to_anchor: 1 / 100,
  },
  "W/m/°C": {
    name: {
      singular: "Watt/metre/°Celsius",
      plural: "Watts/metre/°Celsius",
    },
    to_anchor: 1,
  },
  "kW/m/°C": {
    name: {
      singular: "Kilo-Watt/metre/°Celsius",
      plural: "Kilo-Watts/metre/°Celsius",
    },
    to_anchor: 1000,
  },
  "W/m/°K": {
    name: {
      singular: "Watt/metre/°Kelvin",
      plural: "Watts/metre/°Kelvin",
    },
    to_anchor: 1,
  },
  "kW/m/°K": {
    name: {
      singular: "Kilo-Watt/metre/°Kelvin",
      plural: "Kilo-Watts/metre/°Kelvin",
    },
    to_anchor: 1000,
  },
};

imperial = {
  "Btu(IT).in/h/sq.ft/°F": {
    name: {
      singular:
        "British thermal (IT) unit inch per hour square foot per degree fahrenheit",
      plural:
        "British thermal (IT) units inch per hour square foot per degree fahrenheit",
    },
    to_anchor: 12,
  },
  "Btu(IT).in/s/sq.ft/°F": {
    name: {
      singular:
        "British thermal (IT) unit inch per second square foot per degree fahrenheit",
      plural:
        "British thermal (IT) units inch per second square foot per degree fahrenheit",
    },
    to_anchor: 0.0033,
  },
  "Btu(IT)/h/ft/°F": {
    name: {
      singular:
        "British thermal (IT) unit per hour per foot per degree fahrenheit",
      plural:
        "British thermal (IT) units per hour per foot per degree fahrenheit",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "W/m/°C",
      ratio: 1.730735,
    },
    imperial: {
      unit: "Btu(IT)/h/ft/°F",
      ratio: 1 / 1.730735,
    },
  },
};
