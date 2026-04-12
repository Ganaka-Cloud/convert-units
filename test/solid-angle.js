"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["sr to sr"] = function () {
  assert.strictEqual(convert(1).from("sr").to("sr"), 1);
};

tests["deg2 to deg2"] = function () {
  assert.strictEqual(convert(1).from("deg2").to("deg2"), 1);
};

// sr <-> deg2 (1 sr = (180/π)^2 deg2 ≈ 3282.8064 deg2)
tests["sr to deg2"] = function () {
  var result = convert(1).from("sr").to("deg2");
  var expected = (180 / Math.PI) * (180 / Math.PI);
  assert.ok(
    percentError(expected, result) < ACCURACY,
    "sr to deg2 should be ~3282.8, got " + result
  );
};

tests["deg2 to sr"] = function () {
  var expected = (180 / Math.PI) * (180 / Math.PI);
  var result = convert(expected).from("deg2").to("sr");
  assert.ok(
    percentError(1, result) < ACCURACY,
    "deg2 to sr should be ~1, got " + result
  );
};

module.exports = tests;
