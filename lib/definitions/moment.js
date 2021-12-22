var metric,
imperial;

metric = {
  μNm: {
    name: {
      singular: "Micro Newton-meter",
      plural: "Micro Newton-meters",
    },
    to_anchor: 1 / 1000000,
  },
  Nmm: {
    name: {
      singular: "Newton-Millimeter",
      plural: "Newton-Millimeters",
    },
    to_anchor: 1 / 1000,
  },
  Ncm: {
    name: {
      singular: "Newton-Centimeter",
      plural: "Newton-Centimeters",
    },
    to_anchor: 1 / 100,
  },
  Nm: {
    name: {
      singular: "Newton-Meter",
      plural: "Newton-Meters",
    },
    to_anchor: 1,
  },
  kNm: {
    name: {
      singular: "Kilo Newton-meter",
      plural: "Kilo Newton-meters",
    },
    to_anchor: 1000,
  },
  kgfm: {
    name: {
      singular: "kilogram-force-meter",
      plural: "kilogram-force-meter",
    },
    to_anchor: 9.80665,
  },
  tfMm: {
    name: {
      singular: "Ton Force (Metric)",
      plural: "Ton Force (Metric)",
    },
    to_anchor: 9806.65,
  },
  tfsm: {
    name: {
      singular: "Ton Force (Short)-meter",
      plural: "Ton Force (Short)-meter",
    },
    to_anchor: 8896.44,
  },
  tflm: {
    name: {
      singular: "Ton Force (long)-meter",
      plural: "Ton Force (long)-meter",
    },
    to_anchor: 9964.02,
  },
};

imperial = {
  'lbf-in': {
    name: {
      singular: 'pound-force foot',
      plural: 'pound-force feet'
    },
    to_anchor: 1/12
  },
  'lbf-ft': {
    name: {
      singular: 'pound-force foot',
      plural: 'pound-force feet'
    },
    to_anchor: 1
  },
  'pdl-ft': {
    name: {
      singular: 'Poundal Foot',
      plural: 'Poundal Feet'
    },
    to_anchor: 32.17410495
  },
  'pdl-in': {
    name: {
      singular: 'Poundal inch',
      plural: 'Poundal inches'
    },
    to_anchor: 386.0892594
  }
};

module.exports = {
  metric: metric,
  imperial: imperial,
  _anchors: {
    metric: {
      unit: 'Nm',
      ratio: 1/1.35582
    },
    imperial: {
      unit: 'lb-ft',
      ratio: 1.35582
    }
  }
};
