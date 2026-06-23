"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

// Identity
tests["N/m to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/m").to("N/m"), 1);
};
tests["lbf/ft to lbf/ft"] = function () {
  assert.strictEqual(convert(1).from("lbf/ft").to("lbf/ft"), 1);
};

// within metric
tests["kN/m to N/m"] = function () {
  assert.strictEqual(convert(1).from("kN/m").to("N/m"), 1000);
};
tests["N/mm to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/mm").to("N/m"), 1000);
};
tests["N/cm to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/cm").to("N/m"), 100);
};

// within imperial
tests["lbf/in to lbf/ft"] = function () {
  assert.strictEqual(convert(1).from("lbf/in").to("lbf/ft"), 12);
};
tests["kip/ft to lbf/ft"] = function () {
  assert.strictEqual(convert(1).from("kip/ft").to("lbf/ft"), 1000);
};

// cross-system (1 lbf/ft = 14.593902937 N/m)
tests["lbf/ft to N/m"] = function () {
  var actual = convert(1).from("lbf/ft").to("N/m"),
    expected = 14.593902937;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["N/m to lbf/ft"] = function () {
  var actual = convert(14.593902937).from("N/m").to("lbf/ft"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["lbf/in to N/m"] = function () {
  var actual = convert(1).from("lbf/in").to("N/m"),
    expected = 175.12683524;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
