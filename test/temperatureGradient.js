"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["K/m to K/m"] = function () {
  assert.strictEqual(convert(1).from("K/m").to("K/m"), 1);
};

// 1 F/ft = (5/9) / 0.3048 K/m = 1.8228346 K/m (a difference, so no offset)
tests["F/ft to K/m"] = function () {
  var actual = convert(1).from("F/ft").to("K/m"),
    expected = 1.8228346;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["K/m to F/ft"] = function () {
  var actual = convert(1.8228346).from("K/m").to("F/ft"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
