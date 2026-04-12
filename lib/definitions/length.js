"use strict";
var metric,
  imperial;

metric = {
  pm: {
    name: {
      singular: "Picometer",
      plural: "Picometers",
    },
    to_anchor: 1e-12,
  },
  fm: {
    name: {
      singular: "Femtometer",
      plural: "Femtometers",
    },
    to_anchor: 1e-15,
  },
  nm: {
    name: {
      singular: "Nanometer",
      plural: "Nanometers",
    },
    to_anchor: 1/1000000000,
  },
  μm: {
    name: {
      singular: "Micrometer",
      plural: "Micrometers",
    },
    to_anchor: 1/1000000,
  },
  mm: {
    name: {
      singular: "Millimeter",
      plural: "Millimeters",
    },
    to_anchor: 1 / 1000,
  },
  cm: {
    name: {
      singular: "Centimeter",
      plural: "Centimeters",
    },
    to_anchor: 1 / 100,
  },
  m: {
    name: {
      singular: "Meter",
      plural: "Meters",
    },
    to_anchor: 1,
  },
  km: {
    name: {
      singular: "Kilometer",
      plural: "Kilometers",
    },
    to_anchor: 1000,
  },
  Å: {
    name: {
      singular: "Angstrom",
      plural: "Angstroms",
    },
    to_anchor: 1e-10,
  },
  ly: {
    name: {
      singular: "light-year",
      plural: "light-years",
    },
    to_anchor: 9.4607e15,
  },
  AU: {
    name: {
      singular: "astronomical unit",
      plural: "astronomical units",
    },
    to_anchor: 1.495978707e11,
  },
  pc: {
    name: {
      singular: "parsec",
      plural: "parsecs",
    },
    to_anchor: 3.0857e16,
  },
  Mm: {
    name: {
      singular: "Megameter",
      plural: "Megameters",
    },
    to_anchor: 1e6,
  },
};

imperial = {
  in: {
    name: {
      singular: "Inch",
      plural: "Inches",
    },
    to_anchor: 1 / 12,
  },
  yd: {
    name: {
      singular: "Yard",
      plural: "Yards",
    },
    to_anchor: 3,
  },
  "ft-us": {
    name: {
      singular: "US Survey Foot",
      plural: "US Survey Feet",
    },
    to_anchor: 1.000002,
  },
  ft: {
    name: {
      singular: "Foot",
      plural: "Feet",
    },
    to_anchor: 1,
  },
  mi: {
    name: {
      singular: "Mile",
      plural: "Miles",
    },
    to_anchor: 5280,
  },
  nMi: {
    name: {
      singular: "Nautical Mile",
      plural: "Nautical Miles",
    },
    to_anchor: 6076.12,
  },
  fathom: {
    name: {
      singular: "fathom",
      plural: "fathoms",
    },
    to_anchor: 6,
  },
  furlong: {
    name: {
      singular: "furlong",
      plural: "furlongs",
    },
    to_anchor: 660,
  },
  chain: {
    name: {
      singular: "chain",
      plural: "chains",
    },
    to_anchor: 66,
  },
  league: {
    name: {
      singular: "league",
      plural: "leagues",
    },
    to_anchor: 15840,
  },
  hand: {
    name: {
      singular: "hand",
      plural: "hands",
    },
    to_anchor: 1/3,
  },
  rod: {
    name: {
      singular: "rod",
      plural: "rods",
    },
    to_anchor: 16.5,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'm',
      ratio: 3.28084
    },
    imperial: {
      unit: 'ft',
      ratio: 1/3.28084
    }
  }
};
