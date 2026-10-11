"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

tests["S/m to S/m"] = function () {
  assert.strictEqual(convert(1).from("S/m").to("S/m"), 1);
};

tests["S/m is the only unit"] = function () {
  assert.deepStrictEqual(convert().possibilities("Electrical-conductivity"), ["S/m"]);
};

module.exports = tests;
