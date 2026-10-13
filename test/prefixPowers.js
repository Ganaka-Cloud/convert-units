"use strict";
// A prefixed unit must differ from its unprefixed base by exactly the prefix power
// (and by the power of the exponent for m2/m3/m4 families).
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

var PREFIX = { p: 1e-12, n: 1e-9, "μ": 1e-6, m: 1e-3, c: 1e-2, d: 1e-1, h: 1e2, k: 1e3, M: 1e6, G: 1e9, T: 1e12 };

// [prefixed unit, base unit, expected ratio]
var CASES = [
  ["zcm3", "zm3", 1e-6], ["zmm3", "zm3", 1e-9],
  ["W/mm/C", "W/m/C", 1e3], ["W/cm/C", "W/m/C", 1e2], ["mW/m/C", "W/m/C", 1e-3], ["cW/m/C", "W/m/C", 1e-2],
  ["kW/m/C", "W/m/C", 1e3], ["kW/m/K", "W/m/K", 1e3],
  ["J/g/C", "J/kg/C", 1e3], ["mJ/kg/C", "J/kg/C", 1e-3], ["kJ/kg/C", "J/kg/C", 1e3],
  ["mJ/kg/K", "J/kg/K", 1e-3], ["kJ/kg/K", "J/kg/K", 1e3],
  ["cm4", "m4", 1e-8], ["mm4", "m4", 1e-12], ["cm2", "m2", 1e-4], ["mm2", "m2", 1e-6], ["km2", "m2", 1e6],
  ["cm3", "m3", 1e-6], ["mm3", "m3", 1e-9], ["km3", "m3", 1e9],
  ["kg*cm2", "kg*m2", 1e-4], ["kg*mm2", "kg*m2", 1e-6],
  ["kJ/m2", "J/m2", 1e3], ["N/cm", "N/m", 1e2], ["N/mm", "N/m", 1e3],
  ["A/cm2", "A/m2", 1e4], ["A/mm2", "A/m2", 1e6], ["C/cm3", "C/m3", 1e6], ["C/cm2", "C/m2", 1e4],
  ["g/cm3", "kg/m3", 1e3], ["g/m3", "kg/m3", 1e-3], ["t/mm3", "kg/m3", 1e12], ["kg/l", "kg/m3", 1e3], ["g/l", "kg/m3", 1],
];
CASES.forEach(function (c) {
  tests[c[0] + " is " + c[2] + " " + c[1]] = function () {
    assert.ok(Math.abs(convert(1).from(c[0]).to(c[1]) / c[2] - 1) < 1e-12, c[0] + " to " + c[1]);
  };
});

// Every unit that is a plain SI prefix on another unit of the same measure.
tests["plain SI prefixes match their power"] = function () {
  var units = convert().list();
  var byMeasure = {};
  units.forEach(function (u) {
    (byMeasure[u.measure] = byMeasure[u.measure] || {})[u.abbr] = true;
  });
  units.forEach(function (u) {
    if (u.measure === "Currency" || u.measure === "Digital" || u.measure === "Mass") return;
    var p = u.abbr.charAt(0);
    var base = u.abbr.slice(1);
    if (!PREFIX.hasOwnProperty(p) || !byMeasure[u.measure][base]) return;
    // area, volume and moment families scale by the prefix to the power in the base's exponent
    if (/\d/.test(base)) return;
    var v = convert(1).from(u.abbr).to(base);
    assert.ok(Math.abs(v / PREFIX[p] - 1) < 1e-9, u.abbr + " to " + base + " = " + v);
  });
};

module.exports = tests;
