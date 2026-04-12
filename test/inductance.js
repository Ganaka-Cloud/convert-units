"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["H to H"] = function () {
  assert.strictEqual(convert(1).from("H").to("H"), 1);
};
tests["mH to mH"] = function () {
  assert.strictEqual(convert(1).from("mH").to("mH"), 1);
};
tests["μH to μH"] = function () {
  assert.strictEqual(convert(1).from("μH").to("μH"), 1);
};

// H <-> mH
tests["H to mH"] = function () {
  assert.strictEqual(convert(1).from("H").to("mH"), 1000);
};
tests["mH to H"] = function () {
  assert.strictEqual(convert(1000).from("mH").to("H"), 1);
};

// H <-> μH
tests["H to μH"] = function () {
  assert.strictEqual(convert(1).from("H").to("μH"), 1e6);
};
tests["μH to H"] = function () {
  assert.strictEqual(convert(1e6).from("μH").to("H"), 1);
};

// mH <-> μH
tests["mH to μH"] = function () {
  var result = convert(1).from("mH").to("μH");
  assert.ok(Math.abs(result - 1000) < 1e-9, "mH to μH should be ~1000, got " + result);
};
tests["μH to mH"] = function () {
  var result = convert(1000).from("μH").to("mH");
  assert.ok(Math.abs(result - 1) < 1e-9, "μH to mH should be ~1, got " + result);
};

// New CGS inductance units: abH, statH
var ACCURACY = 1/1000;
var percentError = require("../lib/percentError");

tests["abH to H"] = function () {
  var expected = 1e-9
    , actual = convert(1).from("abH").to("H");
  assert.ok( percentError(expected, actual) < ACCURACY
    , "Expected: " + expected + ", Actual: " + actual);
};

tests["statH to H"] = function () {
  var expected = 8.9876e11
    , actual = convert(1).from("statH").to("H");
  assert.ok( percentError(expected, actual) < ACCURACY
    , "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
