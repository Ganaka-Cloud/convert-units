"use strict";
var angle;

angle = {
  rad: {
    name: {
      singular: "radian",
      plural: "radians",
    },
    to_anchor: 180 / Math.PI,
  },
  deg: {
    name: {
      singular: "degree",
      plural: "degrees",
    },
    to_anchor: 1,
  },
  grad: {
    name: {
      singular: "gradian",
      plural: "gradians",
    },
    to_anchor: 9 / 10,
  },
  arcmin: {
    name: {
      singular: "arcminute",
      plural: "arcminutes",
    },
    to_anchor: 1 / 60,
  },
  arcsec: {
    name: {
      singular: "arcsecond",
      plural: "arcseconds",
    },
    to_anchor: 1 / 3600,
  },
  rev: {
    name: {
      singular: "revolution",
      plural: "revolutions",
    },
    to_anchor: 360,
  },
  mil: {
    name: {
      singular: "mil",
      plural: "mils",
    },
    to_anchor: 360 / 6400,
  },
};

module.exports = {
  metric: angle,
  _anchors: {
    metric: {
      unit: "deg",
      ratio: 1,
    },
  },
};
