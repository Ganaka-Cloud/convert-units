"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Identity
tests["Pa*s to Pa*s"] = function () {
  assert.strictEqual(convert(1).from("Pa*s").to("Pa*s"), 1);
};

tests["cP to cP"] = function () {
  assert.strictEqual(convert(1).from("cP").to("cP"), 1);
};

// Pa*s <-> cP (1 Pa*s = 1000 cP)
tests["Pa*s to cP"] = function () {
  assert.strictEqual(convert(1).from("Pa*s").to("cP"), 1000);
};

tests["cP to Pa*s"] = function () {
  assert.strictEqual(convert(1000).from("cP").to("Pa*s"), 1);
};

// Pa*s <-> P (1 Pa*s = 10 P)
tests["Pa*s to P"] = function () {
  assert.strictEqual(convert(1).from("Pa*s").to("P"), 10);
};

tests["P to Pa*s"] = function () {
  assert.strictEqual(convert(10).from("P").to("Pa*s"), 1);
};

// cP <-> P (1 P = 100 cP)
tests["P to cP"] = function () {
  assert.strictEqual(convert(1).from("P").to("cP"), 100);
};

tests["cP to P"] = function () {
  assert.strictEqual(convert(100).from("cP").to("P"), 1);
};

// New unit: reyn (1 reyn = 6894.757 Pa*s)
tests["reyn to Pa*s"] = function () {
  var expected = 6894.757
    , actual = convert(1).from("reyn").to("Pa*s")
    , ACCURACY = 1/1000
    , percentError = require("../lib/percentError");
  assert.ok( percentError(expected, actual) < ACCURACY
    , "Expected: " + expected + ", Actual: " + actual);
};

module.exports = tests;
