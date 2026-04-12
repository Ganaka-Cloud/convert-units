"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["Ω to Ω"] = function () {
  assert.strictEqual(convert(1).from("Ω").to("Ω"), 1);
};
tests["mΩ to mΩ"] = function () {
  assert.strictEqual(convert(1).from("mΩ").to("mΩ"), 1);
};
tests["kΩ to kΩ"] = function () {
  assert.strictEqual(convert(1).from("kΩ").to("kΩ"), 1);
};
tests["MΩ to MΩ"] = function () {
  assert.strictEqual(convert(1).from("MΩ").to("MΩ"), 1);
};
tests["GΩ to GΩ"] = function () {
  assert.strictEqual(convert(1).from("GΩ").to("GΩ"), 1);
};

// Ω <-> mΩ
tests["Ω to mΩ"] = function () {
  assert.strictEqual(convert(1).from("Ω").to("mΩ"), 1000);
};
tests["mΩ to Ω"] = function () {
  assert.strictEqual(convert(1000).from("mΩ").to("Ω"), 1);
};

// Ω <-> kΩ
tests["Ω to kΩ"] = function () {
  assert.strictEqual(convert(1).from("Ω").to("kΩ"), 0.001);
};
tests["kΩ to Ω"] = function () {
  assert.strictEqual(convert(1).from("kΩ").to("Ω"), 1000);
};

// kΩ <-> MΩ
tests["kΩ to MΩ"] = function () {
  assert.strictEqual(convert(1).from("kΩ").to("MΩ"), 0.001);
};
tests["MΩ to kΩ"] = function () {
  assert.strictEqual(convert(1).from("MΩ").to("kΩ"), 1000);
};

// New CGS resistance units: abΩ, statΩ
var ACCURACY = 1/1000;
var percentError = require("../lib/percentError");

tests["abΩ to Ω"] = function () {
  var expected = 1e-9
    , actual = convert(1).from("abΩ").to("Ω");
  assert.ok( percentError(expected, actual) < ACCURACY
    , "Expected: " + expected + ", Actual: " + actual);
};

tests["statΩ to Ω"] = function () {
  var expected = 8.9876e11
    , actual = convert(1).from("statΩ").to("Ω");
  assert.ok( percentError(expected, actual) < ACCURACY
    , "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
