var metric,
imperial;

metric = {
  kgm2: {
    name: {
      singular: 'kilogram square metre',
      plural: 'kilogram square metre'
    },
    to_anchor: 1
  },
  kgcm2: {
    name: {
      singular: 'kilogram square centi-metre',
      plural: 'kilogram square centi-metres'
    },
    to_anchor: 1/10000
  },
  kgmm2: {
    name: {
      singular: 'kilogram square milli-metre',
      plural: 'kilogram square milli-metres'
    },
    to_anchor: 1/1000000
  },
  kgfms2: {
    name: {
      singular: 'kilogram-force square metre second',
      plural: 'kilogram-force square metre second',
    },
    to_anchor: 1/9.8066499998
  },
};
imperial = {
  'lb-in2': {
    name: {
      singular: 'pound square inch',
      plural: 'pound square inches',
    },
    to_anchor: 1/144
  },
  'lb-ft2': {
    name: {
      singular: 'pound square foor',
      plural: 'pound square feet',
    },
    to_anchor: 1
  },
  'lbf-ins2': {
    name: {
      singular: 'pound-force inch square second',
      plural: 'pound-force inch square second',
    },
    to_anchor: 2.6811707398
  },
  'lbf-fts2': {
    name: {
      singular: 'pound-force foot square second',
      plural: 'pound-force feet square second',
    },
    to_anchor: 32.174048878
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'kgm2',
      ratio: 23.730360404
    },
    imperial: {
      unit: 'lb-ft',
      ratio: 1/23.730360404
    }
  }
};
