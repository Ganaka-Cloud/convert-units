"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["lm to lm"] = function () {
  assert.strictEqual(convert(1).from("lm").to("lm"), 1);
};
tests["mlm to mlm"] = function () {
  assert.strictEqual(convert(1).from("mlm").to("mlm"), 1);
};
tests["klm to klm"] = function () {
  assert.strictEqual(convert(1).from("klm").to("klm"), 1);
};

// lm <-> mlm
tests["lm to mlm"] = function () {
  assert.strictEqual(convert(1).from("lm").to("mlm"), 1000);
};
tests["mlm to lm"] = function () {
  assert.strictEqual(convert(1000).from("mlm").to("lm"), 1);
};

// lm <-> klm
tests["lm to klm"] = function () {
  assert.strictEqual(convert(1).from("lm").to("klm"), 0.001);
};
tests["klm to lm"] = function () {
  assert.strictEqual(convert(1).from("klm").to("lm"), 1000);
};

module.exports = tests;
