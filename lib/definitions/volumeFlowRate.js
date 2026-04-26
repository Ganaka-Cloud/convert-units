"use strict";
var metric
  , imperial;

metric = {
  'mm3/s': {
      name: {
        singular: 'Cubic Millimeter per second'
      , plural: 'Cubic Millimeters per second'
      }
    , to_anchor: 1e-9
  }
, 'cm3/s': {
    name: {
      singular: 'Cubic Centimeter per second'
    , plural: 'Cubic Centimeters per second'
    }
  , to_anchor: 1e-6
  }
, 'ml/s': {
    name: {
      singular: 'Millilitre per second'
    , plural: 'Millilitres per second'
    }
  , to_anchor: 1e-6
  }
, 'cl/s': {
    name: {
      singular: 'Centilitre per second'
    , plural: 'Centilitres per second'
    }
  , to_anchor: 1e-5
  }
, 'dl/s': {
    name: {
      singular: 'Decilitre per second'
    , plural: 'Decilitres per second'
    }
  , to_anchor: 1e-4
  }
, 'l/s': {
    name: {
      singular: 'Litre per second'
    , plural: 'Litres per second'
    }
  , to_anchor: 1e-3
  }
, 'l/min': {
    name: {
      singular: 'Litre per minute'
    , plural: 'Litres per minute'
    }
  , to_anchor: 1e-3/60
  }
, 'l/h': {
    name: {
      singular: 'Litre per hour'
    , plural: 'Litres per hour'
    }
  , to_anchor: 1e-3/3600
  }
, 'kl/s': {
    name: {
      singular: 'Kilolitre per second'
    , plural: 'Kilolitres per second'
    }
  , to_anchor: 1
  }
, 'kl/min': {
    name: {
      singular: 'Kilolitre per minute'
    , plural: 'Kilolitres per minute'
    }
  , to_anchor: 1/60
  }
, 'kl/h': {
    name: {
      singular: 'Kilolitre per hour'
    , plural: 'Kilolitres per hour'
    }
  , to_anchor: 1/3600
  }
, 'm3/s': {
    name: {
      singular: 'Cubic meter per second'
    , plural: 'Cubic meters per second'
    }
  , to_anchor: 1
  }
, 'm3/min': {
    name: {
      singular: 'Cubic meter per minute'
    , plural: 'Cubic meters per minute'
    }
  , to_anchor: 1/60
  }
, 'm3/h': {
    name: {
      singular: 'Cubic meter per hour'
    , plural: 'Cubic meters per hour'
    }
  , to_anchor: 1/3600
  }
, 'km3/s': {
    name: {
      singular: 'Cubic kilometer per second'
    , plural: 'Cubic kilometers per second'
    }
  , to_anchor: 1e9
  }
};

imperial = {
  'tsp/s': {
    name: {
      singular: 'Teaspoon per second'
    , plural: 'Teaspoons per second'
    }
  , to_anchor: 1/6
  }
, 'Tbs/s': {
    name: {
      singular: 'Tablespoon per second'
    , plural: 'Tablespoons per second'
    }
  , to_anchor: 1/2
  }
, 'in3/s': {
    name: {
      singular: 'Cubic inch per second'
    , plural: 'Cubic inches per second'
    }
  , to_anchor: 0.55411
  }
, 'in3/min': {
    name: {
      singular: 'Cubic inch per minute'
    , plural: 'Cubic inches per minute'
    }
  , to_anchor: 0.55411/60
  }
, 'in3/h': {
    name: {
      singular: 'Cubic inch per hour'
    , plural: 'Cubic inches per hour'
    }
  , to_anchor: 0.55411/3600
  }
, 'fl-oz/s': {
    name: {
      singular: 'Fluid Ounce per second'
    , plural: 'Fluid Ounces per second'
    }
  , to_anchor: 1
  }
, 'fl-oz/min': {
    name: {
      singular: 'Fluid Ounce per minute'
    , plural: 'Fluid Ounces per minute'
    }
  , to_anchor: 1/60
  }
, 'fl-oz/h': {
    name: {
      singular: 'Fluid Ounce per hour'
    , plural: 'Fluid Ounces per hour'
    }
  , to_anchor: 1/3600
  }
, 'cup/s': {
    name: {
      singular: 'Cup per second'
    , plural: 'Cups per second'
    }
  , to_anchor: 8
  }
, 'pnt/s': {
    name: {
      singular: 'Pint per second'
    , plural: 'Pints per second'
    }
  , to_anchor: 16
  }
, 'pnt/min': {
    name: {
      singular: 'Pint per minute'
    , plural: 'Pints per minute'
    }
  , to_anchor: 4/15
  }
, 'pnt/h': {
    name: {
      singular: 'Pint per hour'
    , plural: 'Pints per hour'
    }
  , to_anchor: 1/225
  }
, 'qt/s': {
    name: {
      singular: 'Quart per second'
    , plural: 'Quarts per second'
    }
  , to_anchor: 32
  }
, 'gal/s': {
    name: {
      singular: 'Gallon per second'
    , plural: 'Gallons per second'
    }
  , to_anchor: 128
  }
, 'gal/min': {
    name: {
      singular: 'Gallon per minute'
    , plural: 'Gallons per minute'
    }
  , to_anchor: 32/15
  }
, 'gal/h': {
    name: {
      singular: 'Gallon per hour'
    , plural: 'Gallons per hour'
    }
  , to_anchor: 8/225
  }
, 'ft3/s': {
    name: {
      singular: 'Cubic foot per second'
    , plural: 'Cubic feet per second'
    }
  , to_anchor: 957.506
  }
, 'ft3/min': {
    name: {
      singular: 'Cubic foot per minute'
    , plural: 'Cubic feet per minute'
    }
  , to_anchor: 957.506/60
  }
, 'ft3/h': {
    name: {
      singular: 'Cubic foot per hour'
    , plural: 'Cubic feet per hour'
    }
  , to_anchor: 957.506/3600
  }
, 'yd3/s': {
    name: {
      singular: 'Cubic yard per second'
    , plural: 'Cubic yards per second'
    }
  , to_anchor: 25852.7
  }
, 'yd3/min': {
    name: {
      singular: 'Cubic yard per minute'
    , plural: 'Cubic yards per minute'
    }
  , to_anchor: 25852.7/60
  }
, 'yd3/h': {
    name: {
      singular: 'Cubic yard per hour'
    , plural: 'Cubic yards per hour'
    }
  , to_anchor: 25852.7/3600
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'm3/s'
    , ratio: 33814.0227
    }
  , imperial: {
      unit: 'fl-oz/s'
    , ratio: 1/33814.0227
    }
  }
};
