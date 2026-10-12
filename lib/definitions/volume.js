"use strict";
var C = require("../constants");
var metric
  , imperial;

metric = {
  mm3: {
      name: {
        singular: 'Cubic Millimeter'
      , plural: 'Cubic Millimeters'
      }
    , to_anchor: 1e-9
  }
, cm3: {
    name: {
      singular: 'Cubic Centimeter'
    , plural: 'Cubic Centimeters'
    }
  , to_anchor: 1e-6
  }
, ml: {
    name: {
      singular: 'Millilitre'
    , plural: 'Millilitres'
    }
  , to_anchor: 1e-6
  }
, cl: {
    name: {
      singular: 'Centilitre'
    , plural: 'Centilitres'
    }
  , to_anchor: 1e-5
  }
, dl: {
    name: {
      singular: 'Decilitre'
    , plural: 'Decilitres'
    }
  , to_anchor: 1e-4
  }
, l: {
    name: {
      singular: 'Litre'
    , plural: 'Litres'
    }
  , to_anchor: 1e-3
  }
, kl: {
    name: {
      singular: 'Kilolitre'
    , plural: 'Kilolitres'
    }
  , to_anchor: 1
  }
, m3: {
    name: {
      singular: 'Cubic meter'
    , plural: 'Cubic meters'
    }
  , to_anchor: 1
  }
, km3: {
    name: {
      singular: 'Cubic kilometer'
    , plural: 'Cubic kilometers'
    }
  , to_anchor: 1e9
  }
};

// Imperial volumes in US fluid ounces, from the exact inch, foot and gallon definitions.
var IN3F = (C.IN * C.IN * C.IN) / C.FLOZ_US,
  FT3F = (C.FT * C.FT * C.FT) / C.FLOZ_US,
  UK_FLOZ = 4.54609e-3 / 160 / C.FLOZ_US;

imperial = {
  tsp: {
    name: {
      singular: 'Teaspoon'
    , plural: 'Teaspoons'
    }
  , to_anchor: 1/6
  }
, Tbs: {
    name: {
      singular: 'Tablespoon'
    , plural: 'Tablespoons'
    }
  , to_anchor: 1/2
  }
, in3: {
    name: {
      singular: 'Cubic inch'
    , plural: 'Cubic inches'
    }
  , to_anchor: IN3F
  }
, 'fl-oz': {
    name: {
      singular: 'Fluid Ounce'
    , plural: 'Fluid Ounces'
    }
  , to_anchor: 1
  }
, cup: {
    name: {
      singular: 'Cup'
    , plural: 'Cups'
    }
  , to_anchor: 8
  }
, pnt: {
    name: {
      singular: 'Pint'
    , plural: 'Pints'
    }
  , to_anchor: 16
  }
, qt: {
    name: {
      singular: 'Quart'
    , plural: 'Quarts'
    }
  , to_anchor: 32
  }
, gal: {
    name: {
      singular: 'Gallon'
    , plural: 'Gallons'
    }
  , to_anchor: 128
  }
, ft3: {
    name: {
      singular: 'Cubic foot'
    , plural: 'Cubic feet'
    }
  , to_anchor: FT3F
  }
, yd3: {
    name: {
      singular: 'Cubic yard'
    , plural: 'Cubic yards'
    }
  , to_anchor: 27 * FT3F
  }
, gill: {
    name: {
      singular: 'Gill'
    , plural: 'Gills'
    }
  , to_anchor: 4
  }
, 'bbl-oil': {
    name: {
      singular: 'Oil barrel'
    , plural: 'Oil barrels'
    }
  , to_anchor: 5376
  }
, 'bbl-beer': {
    name: {
      singular: 'Beer barrel'
    , plural: 'Beer barrels'
    }
  , to_anchor: 3968
  }
, bu: {
    name: {
      singular: 'Bushel'
    , plural: 'Bushels'
    }
  , to_anchor: 2150.42 * IN3F
  }
, pk: {
    name: {
      singular: 'Peck'
    , plural: 'Pecks'
    }
  , to_anchor: 2150.42 * IN3F / 4
  }
, 'fl-oz-UK': {
    name: {
      singular: 'UK fluid ounce'
    , plural: 'UK fluid ounces'
    }
  , to_anchor: UK_FLOZ
  }
, 'UK-gal': {
    name: {
      singular: 'UK gallon'
    , plural: 'UK gallons'
    }
  , to_anchor: 160 * UK_FLOZ
  }
, 'UK-pt': {
    name: {
      singular: 'UK pint'
    , plural: 'UK pints'
    }
  , to_anchor: 20 * UK_FLOZ
  }
, 'UK-gill': {
    name: {
      singular: 'UK gill'
    , plural: 'UK gills'
    }
  , to_anchor: 5 * UK_FLOZ
  }
, 'US-dry-gal': {
    name: {
      singular: 'US dry gallon'
    , plural: 'US dry gallons'
    }
  , to_anchor: 268.8025 * IN3F
  }
, 'US-dry-qt': {
    name: {
      singular: 'US dry quart'
    , plural: 'US dry quarts'
    }
  , to_anchor: (268.8025 * IN3F) / 4
  }
, 'US-dry-pt': {
    name: {
      singular: 'US dry pint'
    , plural: 'US dry pints'
    }
  , to_anchor: (268.8025 * IN3F) / 8
  }
, bdft: {
    name: {
      singular: 'board foot'
    , plural: 'board feet'
    }
  , to_anchor: 144 * IN3F
  }
, 'acre-ft': {
    name: {
      singular: 'acre-foot'
    , plural: 'acre-feet'
    }
  , to_anchor: 43560 * FT3F
  }
, jigger: {
    name: {
      singular: 'jigger'
    , plural: 'jiggers'
    }
  , to_anchor: 1.5
  }
, 'fl-dr': {
    name: {
      singular: 'fluid dram'
    , plural: 'fluid drams'
    }
  , to_anchor: 1/8
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'm3'
    , ratio: 1 / C.FLOZ_US
    }
  , imperial: {
      unit: 'fl-oz'
    , ratio: C.FLOZ_US
    }
  }
};
