"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["1/Pa to 1/Pa"] = function () {
  assert.strictEqual(convert(1).from("1/Pa").to("1/Pa"), 1);
};

// 1 psi = 6894.757 Pa, so 1 (1/psi) = 1/6894.757 (1/Pa)
tests["1/psi to 1/Pa"] = function () {
  var actual = convert(1).from("1/psi").to("1/Pa"),
    expected = 1 / 6894.757293168;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["1/Pa to 1/psi"] = function () {
  var actual = convert(1).from("1/Pa").to("1/psi"),
    expected = 6894.757293168;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
