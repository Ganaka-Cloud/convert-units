"use strict";
var time;
var daysInYear = 365.25;

time = {
  ns: {
    name: {
      singular: "Nanosecond",
      plural: "Nanoseconds",
    },
    to_anchor: 1 / 1000000000,
  },
  μs: {
    name: {
      singular: "Microsecond",
      plural: "Microseconds",
    },
    to_anchor: 1 / 1000000,
  },
  ms: {
    name: {
      singular: "Millisecond",
      plural: "Milliseconds",
    },
    to_anchor: 1 / 1000,
  },
  s: {
    name: {
      singular: "Second",
      plural: "Seconds",
    },
    to_anchor: 1,
  },
  min: {
    name: {
      singular: "Minute",
      plural: "Minutes",
    },
    to_anchor: 60,
  },
  h: {
    name: {
      singular: "Hour",
      plural: "Hours",
    },
    to_anchor: 60 * 60,
  },
  d: {
    name: {
      singular: "Day",
      plural: "Days",
    },
    to_anchor: 60 * 60 * 24,
  },
  week: {
    name: {
      singular: "Week",
      plural: "Weeks",
    },
    to_anchor: 60 * 60 * 24 * 7,
  },
  month: {
    name: {
      singular: "Month",
      plural: "Months",
    },
    to_anchor: (60 * 60 * 24 * daysInYear) / 12,
  },
  year: {
    name: {
      singular: "Year",
      plural: "Years",
    },
    to_anchor: 60 * 60 * 24 * daysInYear,
  },
  fortnight: {
    name: {
      singular: "Fortnight",
      plural: "Fortnights",
    },
    to_anchor: 1209600,
  },
  shake: {
    name: {
      singular: "shake",
      plural: "shakes",
    },
    to_anchor: 1e-8,
  },
  svedberg: {
    name: {
      singular: "svedberg",
      plural: "svedbergs",
    },
    to_anchor: 1e-13,
  },
  'yr-julian': {
    name: {
      singular: "Julian year",
      plural: "Julian years",
    },
    to_anchor: 31557600,
  },
};

module.exports = {
  metric: time,
  _anchors: {
    metric: {
      unit: 's'
    , ratio: 1
    }
  }
};
