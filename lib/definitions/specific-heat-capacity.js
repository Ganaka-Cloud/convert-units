var metric, imperial;

metric = {
  "J/g/C": {
    name: {
      singular: "Joule/gram/°Celsius",
      plural: "Joules/gram/°Celsius",
    },
    to_anchor: 1 / 1000,
  },
  "J/kg/C": {
    name: {
      singular: "Joule/Kilogram/°Celsius",
      plural: "Joules/Kilogram/°Celsius",
    },
    to_anchor: 1,
  },
  "mJ/kg/C": {
    name: {
      singular: "Joule/Kilogram/°Celsius",
      plural: "Joules/Kilogram/°Celsius",
    },
    to_anchor: 1000,
  },
  "kJ/kg/C": {
    name: {
      singular: "Kilo-Joule/Kilogram/°Celsius",
      plural: "Kilo-Joules/Kilogram/°Celsius",
    },
    to_anchor: 1000,
  },
  "mJ/kg/K": {
    name: {
      singular: "Joule/Kilogram/°Kelvin",
      plural: "Joules/Kilogram/°Kelvin",
    },
    to_anchor: 1000,
  },
  "J/kg/K": {
    name: {
      singular: "Joule/Kilogram/°Kelvin",
      plural: "Joules/Kilogram/°Kelvin",
    },
    to_anchor: 1,
  },
  "kJ/kg/K": {
    name: {
      singular: "Kilo-Joule/Kilogram/°Kelvin",
      plural: "Kilo-Joules/Kilogram/°Kelvin",
    },
    to_anchor: 1000,
  },
  "kgf-m/kg/C": {
    name: {
      singular: "Kilogram-force-metre/Kilogram/°Celsius",
      plural: "Kilogram-force-metres/Kilogram/°Celsius",
    },
    to_anchor: 1 / 9.80665,
  },
};

imperial = {
  "Btu/lbm/F": {
    name: {
      singular: "British thermal (IT) unit per pound per degree fahrenheit",
      plural: "British thermal (IT) units per pound per degree fahrenheit",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J/kg/C",
      ratio: 4186.8,
    },
    imperial: {
      unit: "Btu(IT)/lbm/F",
      ratio: 1 / 4186.8,
    },
  },
};
