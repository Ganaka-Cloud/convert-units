"use strict";
// Heat flux: power per unit area, SI base W/m2.
// 1 Btu(IT)/(h·ft2) = 1055.05585262 / (3600 · 0.3048^2) = 3.154590745 W/m2.
var metric, imperial;

metric = {
  "W/m2": {
    name: { singular: "Watt per square meter", plural: "Watts per square meter" },
    to_anchor: 1,
  },
  "kW/m2": {
    name: { singular: "kilowatt per square meter", plural: "kilowatts per square meter" },
    to_anchor: 1000,
  },
  "mW/m2": {
    name: { singular: "milliwatt per square meter", plural: "milliwatts per square meter" },
    to_anchor: 0.001,
  },
};

imperial = {
  "Btu/hr/ft2": {
    name: { singular: "Btu per hour per square foot", plural: "Btu per hour per square foot" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "W/m2", ratio: 1 / 3.154590745 },
    imperial: { unit: "Btu/hr/ft2", ratio: 3.154590745 },
  },
};
