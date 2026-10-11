"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["K/m to K/m"] = function () {
  assert.strictEqual(convert(1).from("K/m").to("K/m"), 1);
};
tests["K/cm to K/m"] = function () {
  assert.strictEqual(convert(1).from("K/cm").to("K/m"), 100);
};
tests["K/mm to K/m"] = function () {
  assert.strictEqual(convert(1).from("K/mm").to("K/m"), 1000);
};
tests["K/m to K/mm"] = function () {
  assert.strictEqual(convert(1000).from("K/m").to("K/mm"), 1);
};
tests["F/in to F/ft"] = function () {
  assert.strictEqual(convert(1).from("F/in").to("F/ft"), 12);
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
