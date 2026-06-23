"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

tests["kg/s to kg/s"] = function () {
  assert.strictEqual(convert(1).from("kg/s").to("kg/s"), 1);
};
tests["g/s to kg/s"] = function () {
  assert.strictEqual(convert(1000).from("g/s").to("kg/s"), 1);
};
tests["kg/h to kg/s"] = function () {
  assert.strictEqual(convert(3600).from("kg/h").to("kg/s"), 1);
};
tests["t/h to kg/h"] = function () {
  assert.strictEqual(convert(1).from("t/h").to("kg/h"), 1000);
};
tests["lb/min to lb/s"] = function () {
  assert.strictEqual(convert(60).from("lb/min").to("lb/s"), 1);
};

// cross-system (1 lb/s = 0.45359237 kg/s)
tests["lb/s to kg/s"] = function () {
  var actual = convert(1).from("lb/s").to("kg/s"),
    expected = 0.45359237;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["kg/s to lb/s"] = function () {
  var actual = convert(0.45359237).from("kg/s").to("lb/s"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
