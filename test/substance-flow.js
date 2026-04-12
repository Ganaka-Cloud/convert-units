"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["mol/s to mol/s"] = function () {
  assert.strictEqual(convert(1).from("mol/s").to("mol/s"), 1);
};

tests["mmol/s to mmol/s"] = function () {
  assert.strictEqual(convert(1).from("mmol/s").to("mmol/s"), 1);
};

// mol/s <-> mol/min (1 mol/s = 60 mol/min)
tests["mol/s to mol/min"] = function () {
  assert.strictEqual(convert(1).from("mol/s").to("mol/min"), 60);
};

tests["mol/min to mol/s"] = function () {
  assert.strictEqual(convert(60).from("mol/min").to("mol/s"), 1);
};

// mol/s <-> mmol/s (1 mol/s = 1000 mmol/s)
tests["mol/s to mmol/s"] = function () {
  assert.strictEqual(convert(1).from("mol/s").to("mmol/s"), 1000);
};

tests["mmol/s to mol/s"] = function () {
  assert.strictEqual(convert(1000).from("mmol/s").to("mol/s"), 1);
};

// mol/s <-> μmol/s (1 mol/s = 1e6 μmol/s)
tests["mol/s to μmol/s"] = function () {
  assert.strictEqual(convert(1).from("mol/s").to("μmol/s"), 1e6);
};

tests["μmol/s to mol/s"] = function () {
  assert.strictEqual(convert(1e6).from("μmol/s").to("mol/s"), 1);
};

module.exports = tests;
