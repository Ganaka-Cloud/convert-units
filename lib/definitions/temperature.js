"use strict";
var metric
  , imperial;

metric = {
  C: {
    name: {
      singular: 'degree Celsius'
    , plural: 'degrees Celsius'
    }
  , to_anchor: 1
  , anchor_shift: -273.15
  },
  K: {
    name: {
      singular: 'degree Kelvin'
    , plural: 'degrees Kelvin'
    }
  , to_anchor: 1
  , anchor_shift: 0
  },
  Re: {
    name: {
      singular: 'degree Réaumur'
    , plural: 'degrees Réaumur'
    }
  , to_anchor: 5/4
  , anchor_shift: -273.15
  }
};

imperial = {
  F: {
    name: {
      singular: 'degree Fahrenheit'
    , plural: 'degrees Fahrenheit'
    }
  , to_anchor: 1
  },
  R: {
    name: {
      singular: 'degree Rankine'
    , plural: 'degrees Rankine'
    }
  , to_anchor: 1
  , anchor_shift: 459.67
  }
};

module.exports = {
  metric: metric
, imperial: imperial
, _anchors: {
    metric: {
      unit: 'K'
    , transform: function (K) { return K * 9/5 - 459.67 }
    }
  , imperial: {
      unit: 'F'
    , transform: function (F) { return (F + 459.67) * 5/9 }
    }
  }
};
