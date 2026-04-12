"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Identity
tests["V/m to V/m"] = function () {
  assert.strictEqual(convert(1).from("V/m").to("V/m"), 1);
};

tests["kV/m to kV/m"] = function () {
  assert.strictEqual(convert(1).from("kV/m").to("kV/m"), 1);
};

// V/m <-> kV/m (1 kV/m = 1000 V/m)
tests["V/m to kV/m"] = function () {
  assert.strictEqual(convert(1000).from("V/m").to("kV/m"), 1);
};

tests["kV/m to V/m"] = function () {
  assert.strictEqual(convert(1).from("kV/m").to("V/m"), 1000);
};

// V/m <-> MV/m (1 MV/m = 1e6 V/m)
tests["V/m to MV/m"] = function () {
  assert.strictEqual(convert(1e6).from("V/m").to("MV/m"), 1);
};

tests["MV/m to V/m"] = function () {
  assert.strictEqual(convert(1).from("MV/m").to("V/m"), 1e6);
};

// V/m <-> mV/m (1 V/m = 1000 mV/m)
tests["V/m to mV/m"] = function () {
  assert.strictEqual(convert(1).from("V/m").to("mV/m"), 1000);
};

tests["mV/m to V/m"] = function () {
  assert.strictEqual(convert(1000).from("mV/m").to("V/m"), 1);
};

module.exports = tests;
