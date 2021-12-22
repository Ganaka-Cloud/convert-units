var metric,
imperial;

metric = {
  zm3: {
    name: {
      singular: 'metre power 3',
      plural: 'metre power 3'
    },
    to_anchor: 1
  },
  zcm3: {
    name: {
      singular: 'centimetre power 3',
      plural: 'centimetre power 3'
    },
    to_anchor: 1000000
  },
  zmm3: {
    name: {
      singular: 'millimetre power 3',
      plural: 'millimetre power 3'
    },
    to_anchor: 1000000000
  },
};

imperial = {
  zin3: {
    name: {
      singular: 'inch power 3',
      plural: 'inch power 3',
    },
    to_anchor: 1
  },
  zft3: {
    name: {
      singular: 'foot power 3',
      plural: 'feet power 3',
    },
    to_anchor: 1728
  },
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'zm3',
      ratio: 61023.76
    },
    imperial: {
      unit: 'zin3',
      ratio: 1/61023.76
    }
  }
};
