"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["m2/s to m2/s"] = function () {
  assert.strictEqual(convert(1).from("m2/s").to("m2/s"), 1);
};

tests["cSt to cSt"] = function () {
  assert.strictEqual(convert(1).from("cSt").to("cSt"), 1);
};

// m2/s <-> St (1 m2/s = 1e4 St)
tests["m2/s to St"] = function () {
  assert.strictEqual(convert(1).from("m2/s").to("St"), 1e4);
};

tests["St to m2/s"] = function () {
  assert.strictEqual(convert(1e4).from("St").to("m2/s"), 1);
};

// m2/s <-> cSt (1 m2/s = 1e6 cSt)
tests["m2/s to cSt"] = function () {
  assert.strictEqual(convert(1).from("m2/s").to("cSt"), 1e6);
};

tests["cSt to m2/s"] = function () {
  assert.strictEqual(convert(1e6).from("cSt").to("m2/s"), 1);
};

// St <-> cSt (1 St = 100 cSt)
tests["St to cSt"] = function () {
  var result = convert(1).from("St").to("cSt");
  assert.ok(percentError(100, result) < ACCURACY, "St to cSt should be ~100, got " + result);
};

tests["cSt to St"] = function () {
  var result = convert(100).from("cSt").to("St");
  assert.ok(percentError(1, result) < ACCURACY, "cSt to St should be ~1, got " + result);
};

module.exports = tests;
