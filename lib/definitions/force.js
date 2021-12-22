var metric,
imperial;

metric = {
  dyn: {
    name: {
      singular: 'dyne',
      plural: 'dynes',
    },
    to_anchor: 1/100000,
  },
  N: {
    name: {
      singular: 'Newton',
      plural: 'Newtons',
    },
    to_anchor: 1,
  },
  daN: {
    name: {
      singular: 'dekanewton',
      plural: 'dekanewtons',
    },
    to_anchor: 10,
  },
  kN: {
    name: {
      singular: 'Kilonewton',
      plural: 'Kilonewtons',
    },
    to_anchor: 1000,
  },
  kgf: {
    name: {
      singular: 'kilogram-force',
      plural: 'kilogram-force',
    },
    to_anchor: 1/9.80665,
  },
  tfM: {
    name: {
      singular: 'ton-force (Metric)',
      plural: 'ton-force (Metric)',
    },
    to_anchor: 1/9806.65,
  },
}
imperial={
  lbf: {
    name: {
      singular: 'Pound-force',
      plural: 'Pound-forces',
    },
    to_anchor: 1,
  },
  kipf: {
    name: {
      singular: 'kilopound-force',
      plural: 'kilopound-forces',
    },
    to_anchor: 1000,
  },
  pdl: {
    name: {
      singular: 'poundal',
      plural: 'poundals',
    },
    to_anchor: 1/32.174048556,
  },
  tfs: {
    name: {
      singular: 'ton-force-short(US)',
      plural: 'ton-force-short(US)',
    },
    to_anchor: 2000,
  },
  tfl: {
    name: {
      singular: 'ton-force-long(Uk)',
      plural: 'ton-force-long(Uk)',
    },
    to_anchor: 2240,
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'N',
      ratio: 1/4.4482216153,
    },
    imperial:{
      unit: 'lbf',
      ratio: 4.4482216153,
    }
  },
};