"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError"),
  tests = {};

// Identity
tests["N/m to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/m", "LineLoad").to("N/m", "LineLoad"), 1);
};
tests["lbf/ft to lbf/ft"] = function () {
  assert.strictEqual(convert(1).from("lbf/ft", "LineLoad").to("lbf/ft", "LineLoad"), 1);
};

// within metric
tests["kN/m to N/m"] = function () {
  assert.strictEqual(convert(1).from("kN/m", "LineLoad").to("N/m", "LineLoad"), 1000);
};
tests["N/mm to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/mm", "LineLoad").to("N/m", "LineLoad"), 1000);
};
tests["N/cm to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/cm", "LineLoad").to("N/m", "LineLoad"), 100);
};

// within imperial
tests["lbf/in to lbf/ft"] = function () {
  assert.strictEqual(convert(1).from("lbf/in", "LineLoad").to("lbf/ft", "LineLoad"), 12);
};
tests["kip/ft to lbf/ft"] = function () {
  assert.strictEqual(convert(1).from("kip/ft", "LineLoad").to("lbf/ft", "LineLoad"), 1000);
};

// cross-system (1 lbf/ft = 14.593902937 N/m)
tests["lbf/ft to N/m"] = function () {
  var actual = convert(1).from("lbf/ft", "LineLoad").to("N/m", "LineLoad"),
    expected = 14.593902937;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["N/m to lbf/ft"] = function () {
  var actual = convert(14.593902937).from("N/m", "LineLoad").to("lbf/ft", "LineLoad"),
    expected = 1;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};
tests["lbf/in to N/m"] = function () {
  var actual = convert(1).from("lbf/in", "LineLoad").to("N/m", "LineLoad"),
    expected = 175.12683524;
  assert.ok(percentError(expected, actual) < ACCURACY, "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
