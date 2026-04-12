"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Identity
tests["N/m to N/m"] = function () {
  assert.strictEqual(convert(1).from("N/m").to("N/m"), 1);
};

tests["mN/m to mN/m"] = function () {
  assert.strictEqual(convert(1).from("mN/m").to("mN/m"), 1);
};

// N/m <-> mN/m (1 N/m = 1000 mN/m)
tests["N/m to mN/m"] = function () {
  assert.strictEqual(convert(1).from("N/m").to("mN/m"), 1000);
};

tests["mN/m to N/m"] = function () {
  assert.strictEqual(convert(1000).from("mN/m").to("N/m"), 1);
};

// N/m <-> dyn/cm (1 N/m = 1000 dyn/cm)
tests["N/m to dyn/cm"] = function () {
  assert.strictEqual(convert(1).from("N/m").to("dyn/cm"), 1000);
};

tests["dyn/cm to N/m"] = function () {
  assert.strictEqual(convert(1000).from("dyn/cm").to("N/m"), 1);
};

// mN/m <-> dyn/cm (1 mN/m = 1 dyn/cm)
tests["mN/m to dyn/cm"] = function () {
  assert.strictEqual(convert(1).from("mN/m").to("dyn/cm"), 1);
};

module.exports = tests;
