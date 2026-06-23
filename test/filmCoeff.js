"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["W/m2/K to W/m2/K"] = function () {
  assert.strictEqual(convert(1).from("W/m2/K").to("W/m2/K"), 1);
};
tests["kW/m2/K to W/m2/K"] = function () {
  assert.strictEqual(convert(1).from("kW/m2/K").to("W/m2/K"), 1000);
};

// cross-system (1 Btu(IT)/h/ft2/F = 5.678263341 W/m2/K)
tests["Btu/hr/ft2/F to W/m2/K"] = function () {
  var actual = convert(1).from("Btu/hr/ft2/F").to("W/m2/K"),
    expected = 5.678263341;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["W/m2/K to Btu/hr/ft2/F"] = function () {
  var actual = convert(5.678263341).from("W/m2/K").to("Btu/hr/ft2/F"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
