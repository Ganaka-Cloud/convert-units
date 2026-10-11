"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

tests["S/m to S/m"] = function () {
  assert.strictEqual(convert(1).from("S/m").to("S/m"), 1);
};
tests["mS/m to S/m"] = function () {
  assert.strictEqual(convert(1000).from("mS/m").to("S/m"), 1);
};
tests["S/cm to S/m"] = function () {
  assert.strictEqual(convert(1).from("S/cm").to("S/m"), 100);
};
tests["mS/cm to S/m"] = function () {
  assert.strictEqual(convert(1).from("mS/cm").to("S/m"), 0.1);
};
tests["S/m to mS/cm"] = function () {
  assert.strictEqual(convert(1).from("S/m").to("mS/cm"), 10);
};
tests["μS/cm to S/m"] = function () {
  assert.ok(Math.abs(convert(1000).from("μS/cm").to("S/m") - 0.1) < 1e-12);
};
tests["μS/cm to mS/cm"] = function () {
  assert.ok(Math.abs(convert(1000).from("μS/cm").to("mS/cm") - 1) < 1e-12);
};

module.exports = tests;
