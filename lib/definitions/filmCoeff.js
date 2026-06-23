"use strict";
// Convective film / heat-transfer coefficient: power per area per temperature, SI base W/m2/K.
// 1 Btu(IT)/(h·ft2·°F) = 5.678263341 W/(m2·K).
var metric, imperial;

metric = {
  "W/m2/K": {
    name: { singular: "Watt per square meter per kelvin", plural: "Watts per square meter per kelvin" },
    to_anchor: 1,
  },
  "kW/m2/K": {
    name: { singular: "kilowatt per square meter per kelvin", plural: "kilowatts per square meter per kelvin" },
    to_anchor: 1000,
  },
};

imperial = {
  "Btu/hr/ft2/F": {
    name: {
      singular: "Btu per hour per square foot per Fahrenheit",
      plural: "Btu per hour per square foot per Fahrenheit",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "W/m2/K", ratio: 1 / 5.678263341 },
    imperial: { unit: "Btu/hr/ft2/F", ratio: 5.678263341 },
  },
};
