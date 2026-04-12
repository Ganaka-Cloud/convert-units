"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["T to T"] = function () {
  assert.strictEqual(convert(1).from("T").to("T"), 1);
};

tests["G to G"] = function () {
  assert.strictEqual(convert(1).from("G").to("G"), 1);
};

// T <-> mT (1 T = 1000 mT)
tests["T to mT"] = function () {
  assert.strictEqual(convert(1).from("T").to("mT"), 1000);
};

tests["mT to T"] = function () {
  assert.strictEqual(convert(1000).from("mT").to("T"), 1);
};

// T <-> μT (1 T = 1e6 μT)
tests["T to μT"] = function () {
  assert.strictEqual(convert(1).from("T").to("μT"), 1e6);
};

// T <-> nT (1 T = 1e9 nT)
tests["T to nT"] = function () {
  var result = convert(1).from("T").to("nT");
  assert.ok(percentError(1e9, result) < ACCURACY, "T to nT should be ~1e9, got " + result);
};

// Cross-system: T <-> G (1 T = 1e4 G)
tests["T to G"] = function () {
  assert.strictEqual(convert(1).from("T").to("G"), 1e4);
};

tests["G to T"] = function () {
  assert.strictEqual(convert(1e4).from("G").to("T"), 1);
};

// Cross-system round-trip
tests["T round-trip via G"] = function () {
  var result = convert(convert(3).from("T").to("G")).from("G").to("T");
  assert.ok(
    percentError(3, result) < ACCURACY,
    "round-trip T->G->T should be ~3, got " + result
  );
};

module.exports = tests;
