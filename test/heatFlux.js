"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["W/m2 to W/m2"] = function () {
  assert.strictEqual(convert(1).from("W/m2").to("W/m2"), 1);
};
tests["kW/m2 to W/m2"] = function () {
  assert.strictEqual(convert(1).from("kW/m2").to("W/m2"), 1000);
};
tests["mW/m2 to W/m2"] = function () {
  assert.strictEqual(convert(1000).from("mW/m2").to("W/m2"), 1);
};

// cross-system (1 Btu(IT)/h/ft2 = 3.154590745 W/m2)
tests["Btu/hr/ft2 to W/m2"] = function () {
  var actual = convert(1).from("Btu/hr/ft2").to("W/m2"),
    expected = 3.154590745;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["W/m2 to Btu/hr/ft2"] = function () {
  var actual = convert(3.154590745).from("W/m2").to("Btu/hr/ft2"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
