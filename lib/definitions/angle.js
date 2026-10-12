"use strict";
var angle;

angle = {
  rad: {
    name: {
      singular: "radian",
      plural: "radians",
    },
    to_anchor: 1,
  },
  deg: {
    name: {
      singular: "degree",
      plural: "degrees",
    },
    to_anchor: Math.PI / 180,
  },
  grad: {
    name: {
      singular: "gradian",
      plural: "gradians",
    },
    to_anchor: Math.PI / 200,
  },
  arcmin: {
    name: {
      singular: "arcminute",
      plural: "arcminutes",
    },
    to_anchor: Math.PI / (180 * 60),
  },
  arcsec: {
    name: {
      singular: "arcsecond",
      plural: "arcseconds",
    },
    to_anchor: Math.PI / (180 * 3600),
  },
  rev: {
    name: {
      singular: "revolution",
      plural: "revolutions",
    },
    to_anchor: 2 * Math.PI,
  },
  mil: {
    name: {
      singular: "mil",
      plural: "mils",
    },
    to_anchor: (2 * Math.PI) / 6400,
  },
};

module.exports = {
  metric: angle,
  _anchors: {
    metric: {
      unit: "rad",
      ratio: 1,
    },
  },
};
