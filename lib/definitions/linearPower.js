"use strict";
var C = require("../constants");
// Linear power: power per unit length, such as a fuel rod's linear heat rate q' or a heater
// cable's rating. SI base W/m.
// 1 Btu(IT)/(h·ft) = 1055.05585262 / (3600 · 0.3048) = 0.9615193 W/m
// (NIST SP 811 App. B.8: Btu_IT/h = 0.2930711 W, ft = 0.3048 m exactly).
var metric, imperial;

metric = {
  "W/m": {
    name: { singular: "Watt per meter", plural: "Watts per meter" },
    to_anchor: 1,
  },
  "W/cm": {
    name: { singular: "Watt per centimeter", plural: "Watts per centimeter" },
    to_anchor: 100,
  },
  "kW/m": {
    name: { singular: "Kilowatt per meter", plural: "Kilowatts per meter" },
    to_anchor: 1000,
  },
  "MW/m": {
    name: { singular: "Megawatt per meter", plural: "Megawatts per meter" },
    to_anchor: 1000000,
  },
};

imperial = {
  "Btu/hr/ft": {
    name: {
      singular: "British thermal (IT) unit per hour per foot",
      plural: "British thermal (IT) units per hour per foot",
    },
    to_anchor: 1,
  },
  "kW/ft": {
    name: { singular: "Kilowatt per foot", plural: "Kilowatts per foot" },
    to_anchor: (1000 * C.HR) / C.BTU_IT,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: { unit: "W/m", ratio: 1 / (C.BTU_IT / C.HR / C.FT) },
    imperial: { unit: "Btu/hr/ft", ratio: C.BTU_IT / C.HR / C.FT },
  },
};
