"use strict";

const { expandSI } = require("../siPrefixes");

var metric, imperial;

metric = {
  ...expandSI("J", "joule", 1, ["f", "p", "n", "μ", "m", "k", "M", "G", "T", "P"]),
  Wh: {
    name: {
      singular: "Watt-hour",
      plural: "Watt-hours",
    },
    to_anchor: 3600,
  },
  mWh: {
    name: {
      singular: "Milliwatt-hour",
      plural: "Milliwatt-hours",
    },
    to_anchor: 3.6,
  },
  kWh: {
    name: {
      singular: "Kilowatt-hour",
      plural: "Kilowatt-hours",
    },
    to_anchor: 3600000,
  },
  MWh: {
    name: {
      singular: "Megawatt-hour",
      plural: "Megawatt-hours",
    },
    to_anchor: 3600000000,
  },
  GWh: {
    name: {
      singular: "Gigawatt-hour",
      plural: "Gigawatt-hours",
    },
    to_anchor: 3600000000000,
  },
  cal: {
    name: {
      singular: "calorie",
      plural: "calories",
    },
    to_anchor: 4.184,
  },
  kcal: {
    name: {
      singular: "kilocalorie",
      plural: "kilocalories",
    },
    to_anchor: 4184,
  },
  erg: {
    name: {
      singular: "erg",
      plural: "ergs",
    },
    to_anchor: 1e-7,
  },
  eV: {
    name: {
      singular: "electronvolt",
      plural: "electronvolts",
    },
    to_anchor: 1.602176634e-19,
  },
  keV: {
    name: {
      singular: "kiloelectronvolt",
      plural: "kiloelectronvolts",
    },
    to_anchor: 1.602176634e-16,
  },
  MeV: {
    name: {
      singular: "megaelectronvolt",
      plural: "megaelectronvolts",
    },
    to_anchor: 1.602176634e-13,
  },
  therm: {
    name: {
      singular: "therm",
      plural: "therms",
    },
    to_anchor: 1.05506e8,
  },
  quad: {
    name: {
      singular: "quad",
      plural: "quads",
    },
    to_anchor: 1.05506e18,
  },
  toe: {
    name: {
      singular: "tonne of oil equivalent",
      plural: "tonnes of oil equivalent",
    },
    to_anchor: 4.1868e10,
  },
  Eh: {
    name: {
      singular: "hartree",
      plural: "hartrees",
    },
    to_anchor: 4.3597447222071e-18,
  },
  Ry: {
    name: {
      singular: "rydberg",
      plural: "rydbergs",
    },
    to_anchor: 2.1798723611e-18,
  },
  tTNT: {
    name: {
      singular: "ton of TNT",
      plural: "tons of TNT",
    },
    to_anchor: 4.184e9,
  },
  'ft-lb': {
    name: {
      singular: "foot-pound",
      plural: "foot-pounds",
    },
    to_anchor: 1.3558179483,
  },
};

imperial = {
  "Btu(IT)": {
    name: {
      singular: "British thermal (IT)",
      plural: "British thermal (IT) units",
    },
    to_anchor: 1,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: "J",
      ratio: 1055.1,
    },
    imperial: {
      unit: "Btu(IT)",
      ratio: 1 / 1055.1,
    },
  },
};
