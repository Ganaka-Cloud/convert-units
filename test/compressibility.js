"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["1/Pa to 1/Pa"] = function () {
  assert.strictEqual(convert(1).from("1/Pa").to("1/Pa"), 1);
};
tests["1/kPa to 1/Pa"] = function () {
  assert.strictEqual(convert(1000).from("1/kPa").to("1/Pa"), 1);
};
tests["1/MPa to 1/GPa"] = function () {
  assert.ok(Math.abs(convert(1).from("1/MPa").to("1/GPa") - 1000) < 1e-9);
};
tests["1/bar to 1/Pa"] = function () {
  assert.ok(Math.abs(convert(1e5).from("1/bar").to("1/Pa") - 1) < 1e-9);
};
tests["1/ksi to 1/psi"] = function () {
  assert.strictEqual(convert(1000).from("1/ksi").to("1/psi"), 1);
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
tests["1/GPa to 1/psi"] = function () {
  var actual = convert(1).from("1/GPa").to("1/psi"),
    expected = 6.894757293e-6;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
