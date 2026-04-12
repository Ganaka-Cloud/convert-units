"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["S to S"] = function () {
  assert.strictEqual(convert(1).from("S").to("S"), 1);
};
tests["mS to mS"] = function () {
  assert.strictEqual(convert(1).from("mS").to("mS"), 1);
};
tests["μS to μS"] = function () {
  assert.strictEqual(convert(1).from("μS").to("μS"), 1);
};
tests["nS to nS"] = function () {
  assert.strictEqual(convert(1).from("nS").to("nS"), 1);
};

// S <-> mS
tests["S to mS"] = function () {
  assert.strictEqual(convert(1).from("S").to("mS"), 1000);
};
tests["mS to S"] = function () {
  assert.strictEqual(convert(1000).from("mS").to("S"), 1);
};

// mS <-> μS
tests["mS to μS"] = function () {
  var result = convert(1).from("mS").to("μS");
  assert.ok(Math.abs(result - 1000) < 1e-9, "mS to μS should be ~1000, got " + result);
};
tests["μS to mS"] = function () {
  var result = convert(1000).from("μS").to("mS");
  assert.ok(Math.abs(result - 1) < 1e-9, "μS to mS should be ~1, got " + result);
};

// μS <-> nS
tests["μS to nS"] = function () {
  var result = convert(1).from("μS").to("nS");
  assert.ok(Math.abs(result - 1000) < 1e-9, "μS to nS should be ~1000, got " + result);
};
tests["nS to μS"] = function () {
  var result = convert(1000).from("nS").to("μS");
  assert.ok(Math.abs(result - 1) < 1e-9, "nS to μS should be ~1, got " + result);
};

// New conductance units: mho (alias for S), abS
tests["mho to S"] = function () {
  assert.strictEqual(convert(1).from("mho").to("S"), 1);
};

tests["S to mho"] = function () {
  assert.strictEqual(convert(1).from("S").to("mho"), 1);
};

tests["abS to S"] = function () {
  var ACCURACY = 1/1000;
  var percentError = require("../lib/percentError");
  var expected = 1e9
    , actual = convert(1).from("abS").to("S");
  assert.ok( percentError(expected, actual) < ACCURACY
    , "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
