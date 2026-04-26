"use strict";
var metric
  , imperial;

metric = {
  'm/s': {
    name: {
      singular: 'Metre per second'
    , plural: 'Metres per second'
    }
  , to_anchor: 1
  }
, 'km/h': {
    name: {
      singular: 'Kilometre per hour'
    , plural: 'Kilometres per hour'
    }
  , to_anchor: 1/3.6
  }
, mach: {
    name: {
      singular: 'Mach'
    , plural: 'Mach'
    }
  , to_anchor: 340.29
  }
, c_light: {
    name: {
      singular: 'Speed of light'
    , plural: 'Speed of light'
    }
  , to_anchor: 299792458
  }
}

  imperial = {
    mph: {
      name: {
        singular: 'Mile per hour'
      , plural: 'Miles per hour'
      }
    , to_anchor: 1
    }
  , knot: {
      name: {
        singular: 'Knot'
      , plural: 'Knots'
      }
    , to_anchor: 1.150779
    }
  , 'ft/s': {
      name: {
        singular: 'Foot per second'
      , plural: 'Feet per second'
      }
    , to_anchor: 0.681818
      }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'm/s'
    , ratio: 2.2369362920544
    }
  , imperial: {
      unit: 'mph'
    , ratio: 1/2.2369362920544
    }
  }
};
