"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["N/m3 to N/m3"] = function () {
  assert.strictEqual(convert(1).from("N/m3").to("N/m3"), 1);
};
tests["kN/m3 to N/m3"] = function () {
  assert.strictEqual(convert(1).from("kN/m3").to("N/m3"), 1000);
};
tests["lbf/in3 to lbf/ft3"] = function () {
  assert.strictEqual(convert(1).from("lbf/in3").to("lbf/ft3"), 1728);
};

// cross-system (1 lbf/ft3 = 157.0874638 N/m3)
tests["lbf/ft3 to N/m3"] = function () {
  var actual = convert(1).from("lbf/ft3").to("N/m3"),
    expected = 157.0874638;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["N/m3 to lbf/ft3"] = function () {
  var actual = convert(157.0874638).from("N/m3").to("lbf/ft3"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
