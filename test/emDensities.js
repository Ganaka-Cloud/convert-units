"use strict";
// Metric-only electromagnetic density measures: CurrentDensity, ChargeDensity, SurfCharge.
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// CurrentDensity (A/m2)
tests["A/mm2 to A/m2"] = function () {
  assert.strictEqual(convert(1).from("A/mm2").to("A/m2"), 1000000);
};
tests["A/cm2 to A/m2"] = function () {
  assert.strictEqual(convert(1).from("A/cm2").to("A/m2"), 10000);
};
tests["kA/m2 to A/m2"] = function () {
  assert.strictEqual(convert(1).from("kA/m2").to("A/m2"), 1000);
};

// ChargeDensity (C/m3)
tests["C/cm3 to C/m3"] = function () {
  assert.strictEqual(convert(1).from("C/cm3").to("C/m3"), 1000000);
};
tests["mC/m3 to C/m3"] = function () {
  assert.strictEqual(convert(1000).from("mC/m3").to("C/m3"), 1);
};

// SurfCharge (C/m2)
tests["C/cm2 to C/m2"] = function () {
  assert.strictEqual(convert(1).from("C/cm2").to("C/m2"), 10000);
};
tests["mC/m2 to C/m2"] = function () {
  assert.strictEqual(convert(1000).from("mC/m2").to("C/m2"), 1);
};

module.exports = tests;
