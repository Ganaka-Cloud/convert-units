"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

tests["m/V to m/V"] = function () {
  assert.strictEqual(convert(1).from("m/V").to("m/V"), 1);
};

tests["m/V is the only unit"] = function () {
  assert.deepStrictEqual(convert().possibilities("Piezo-coefficient"), ["m/V"]);
};

module.exports = tests;
