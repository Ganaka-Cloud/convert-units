"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["W/m3 to W/m3"] = function () {
  assert.strictEqual(convert(1).from("W/m3").to("W/m3"), 1);
};
tests["kW/m3 to W/m3"] = function () {
  assert.strictEqual(convert(1).from("kW/m3").to("W/m3"), 1000);
};
tests["MW/m3 to W/m3"] = function () {
  assert.strictEqual(convert(1).from("MW/m3").to("W/m3"), 1000000);
};

// cross-system (1 Btu(IT)/h/ft3 = 10.34970856 W/m3)
tests["Btu/hr/ft3 to W/m3"] = function () {
  var actual = convert(1).from("Btu/hr/ft3").to("W/m3"),
    expected = 10.34970856;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["W/m3 to Btu/hr/ft3"] = function () {
  var actual = convert(10.34970856).from("W/m3").to("Btu/hr/ft3"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
