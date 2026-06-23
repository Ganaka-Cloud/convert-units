"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Surface tension base is mN/m (N/m now belongs to the LineLoad / stiffness measure).
// Identity
tests["mN/m to mN/m"] = function () {
  assert.strictEqual(convert(1).from("mN/m").to("mN/m"), 1);
};

tests["dyn/cm to dyn/cm"] = function () {
  assert.strictEqual(convert(1).from("dyn/cm").to("dyn/cm"), 1);
};

// mN/m <-> dyn/cm (1 mN/m = 1 dyn/cm)
tests["mN/m to dyn/cm"] = function () {
  assert.strictEqual(convert(1).from("mN/m").to("dyn/cm"), 1);
};

tests["dyn/cm to mN/m"] = function () {
  assert.strictEqual(convert(1).from("dyn/cm").to("mN/m"), 1);
};

module.exports = tests;
