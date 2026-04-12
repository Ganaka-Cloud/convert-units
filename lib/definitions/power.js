"use strict";

const power = {
  W: {
    name: {
      singular: 'Watt',
      plural: 'Watts'
    },
    to_anchor: 1
  },
  mW: {
    name: {
      singular: 'Milliwatt',
      plural: 'Milliwatts'
    },
    to_anchor: 0.001
  },
  kW: {
    name: {
      singular: 'Kilowatt',
      plural: 'Kilowatts'
    },
    to_anchor: 1000
  },
  MW: {
    name: {
      singular: 'Megawatt',
      plural: 'Megawatts'
    },
    to_anchor: 1000000
  },
  GW: {
    name: {
      singular: 'Gigawatt',
      plural: 'Gigawatts'
    },
    to_anchor: 1000000000
  },
  'hp-mech': {
    name: {
      singular: 'mechanical horsepower',
      plural: 'mechanical horsepower'
    },
    to_anchor: 745.69987
  },
  'hp-met': {
    name: {
      singular: 'metric horsepower',
      plural: 'metric horsepower'
    },
    to_anchor: 735.49875
  },
  'hp-elec': {
    name: {
      singular: 'electrical horsepower',
      plural: 'electrical horsepower'
    },
    to_anchor: 746
  },
  'hp-boiler': {
    name: {
      singular: 'boiler horsepower',
      plural: 'boiler horsepower'
    },
    to_anchor: 9809.5
  },
  tonRef: {
    name: {
      singular: 'ton of refrigeration',
      plural: 'tons of refrigeration'
    },
    to_anchor: 3516.8528
  }
};

module.exports = {
  metric: power,
  _anchors: {
    metric: {
      unit: 'W',
      ratio: 1
    }
  }
};
