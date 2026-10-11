"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

tests["m/V to m/V"] = function () {
  assert.strictEqual(convert(1).from("m/V").to("m/V"), 1);
};
tests["nm/V to m/V"] = function () {
  assert.ok(Math.abs(convert(1e9).from("nm/V").to("m/V") - 1) < 1e-12);
};
tests["pm/V to nm/V"] = function () {
  assert.ok(Math.abs(convert(1000).from("pm/V").to("nm/V") - 1) < 1e-12);
};
tests["m/V to pm/V"] = function () {
  assert.ok(Math.abs(convert(1e-12).from("m/V").to("pm/V") - 1) < 1e-9);
};

module.exports = tests;
