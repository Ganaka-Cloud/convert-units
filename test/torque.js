"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["N*m to N*m"] = function () {
  assert.strictEqual(convert(1).from("N*m").to("N*m"), 1);
};

tests["lbf*ft to lbf*ft"] = function () {
  assert.strictEqual(convert(1).from("lbf*ft").to("lbf*ft"), 1);
};

// N*m <-> kN*m
tests["N*m to kN*m"] = function () {
  assert.strictEqual(convert(1000).from("N*m").to("kN*m"), 1);
};

tests["kN*m to N*m"] = function () {
  assert.strictEqual(convert(1).from("kN*m").to("N*m"), 1000);
};

// N*m <-> MN*m
tests["N*m to MN*m"] = function () {
  assert.strictEqual(convert(1e6).from("N*m").to("MN*m"), 1);
};

// lbf*ft <-> ozf*in (1 lbf*ft = 192 ozf*in)
tests["lbf*ft to ozf*in"] = function () {
  assert.strictEqual(convert(1).from("lbf*ft").to("ozf*in"), 192);
};

tests["ozf*in to lbf*ft"] = function () {
  assert.strictEqual(convert(192).from("ozf*in").to("lbf*ft"), 1);
};

// Cross-system: N*m <-> lbf*ft (1 N*m ≈ 0.7375621 lbf*ft)
tests["N*m to lbf*ft"] = function () {
  var result = convert(1).from("N*m").to("lbf*ft");
  assert.ok(
    percentError(0.7375621, result) < ACCURACY,
    "N*m to lbf*ft should be ~0.7375621, got " + result
  );
};

tests["lbf*ft to N*m"] = function () {
  var result = convert(1).from("lbf*ft").to("N*m");
  assert.ok(
    percentError(1 / 0.7375621, result) < ACCURACY,
    "lbf*ft to N*m should be ~1.35582, got " + result
  );
};

// Cross-system round-trip
tests["N*m round-trip via lbf*ft"] = function () {
  var result = convert(convert(10).from("N*m").to("lbf*ft")).from("lbf*ft").to("N*m");
  assert.ok(
    percentError(10, result) < ACCURACY,
    "round-trip N*m->lbf*ft->N*m should be ~10, got " + result
  );
};

module.exports = tests;
