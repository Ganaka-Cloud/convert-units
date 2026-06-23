"use strict";
// Volumetric heat generation: power per unit volume, SI base W/m3.
// 1 Btu(IT)/(h·ft3) = 1055.05585262 / (3600 · 0.3048^3) = 10.34970856 W/m3.
var metric, imperial;

metric = {
  "W/m3": {
    name: { singular: "Watt per cubic meter", plural: "Watts per cubic meter" },
    to_anchor: 1,
  },
  "kW/m3": {
    name: { singular: "kilowatt per cubic meter", plural: "kilowatts per cubic meter" },
    to_anchor: 1000,
  },
  "MW/m3": {
    name: { singular: "megawatt per cubic meter", plural: "megawatts per cubic meter" },
    to_anchor: 1000000,
  },
};

imperial = {
  "Btu/hr/ft3": {
    name: { singular: "Btu per hour per cubic foot", plural: "Btu per hour per cubic foot" },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "W/m3", ratio: 1 / 10.34970856 },
    imperial: { unit: "Btu/hr/ft3", ratio: 10.34970856 },
  },
};
