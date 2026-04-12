"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["A/m to A/m"] = function () {
  assert.strictEqual(convert(1).from("A/m").to("A/m"), 1);
};

tests["Oe to Oe"] = function () {
  assert.strictEqual(convert(1).from("Oe").to("Oe"), 1);
};

// A/m <-> kA/m (1 kA/m = 1000 A/m)
tests["A/m to kA/m"] = function () {
  assert.strictEqual(convert(1000).from("A/m").to("kA/m"), 1);
};

tests["kA/m to A/m"] = function () {
  assert.strictEqual(convert(1).from("kA/m").to("A/m"), 1000);
};

// Cross-system: A/m <-> Oe (1 A/m = 4π/1000 Oe ≈ 0.012566370614 Oe)
tests["A/m to Oe"] = function () {
  var result = convert(1).from("A/m").to("Oe");
  assert.ok(
    percentError(0.012566370614, result) < ACCURACY,
    "A/m to Oe should be ~0.012566, got " + result
  );
};

tests["Oe to A/m"] = function () {
  var result = convert(1).from("Oe").to("A/m");
  assert.ok(
    percentError(1 / 0.012566370614, result) < ACCURACY,
    "Oe to A/m should be ~79.577, got " + result
  );
};

// Cross-system round-trip
tests["A/m round-trip via Oe"] = function () {
  var result = convert(convert(100).from("A/m").to("Oe")).from("Oe").to("A/m");
  assert.ok(
    percentError(100, result) < ACCURACY,
    "round-trip A/m->Oe->A/m should be ~100, got " + result
  );
};

module.exports = tests;
