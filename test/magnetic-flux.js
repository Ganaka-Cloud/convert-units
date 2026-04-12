"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["Wb to Wb"] = function () {
  assert.strictEqual(convert(1).from("Wb").to("Wb"), 1);
};

tests["Mx to Mx"] = function () {
  assert.strictEqual(convert(1).from("Mx").to("Mx"), 1);
};

// Wb <-> mWb (1 Wb = 1000 mWb)
tests["Wb to mWb"] = function () {
  assert.strictEqual(convert(1).from("Wb").to("mWb"), 1000);
};

tests["mWb to Wb"] = function () {
  assert.strictEqual(convert(1000).from("mWb").to("Wb"), 1);
};

// Wb <-> μWb (1 Wb = 1e6 μWb)
tests["Wb to μWb"] = function () {
  assert.strictEqual(convert(1).from("Wb").to("μWb"), 1e6);
};

// Cross-system: Wb <-> Mx (1 Wb = 1e8 Mx)
tests["Wb to Mx"] = function () {
  assert.strictEqual(convert(1).from("Wb").to("Mx"), 1e8);
};

tests["Mx to Wb"] = function () {
  assert.strictEqual(convert(1e8).from("Mx").to("Wb"), 1);
};

// Cross-system round-trip
tests["Wb round-trip via Mx"] = function () {
  var result = convert(convert(2).from("Wb").to("Mx")).from("Mx").to("Wb");
  assert.ok(
    percentError(2, result) < ACCURACY,
    "round-trip Wb->Mx->Wb should be ~2, got " + result
  );
};

module.exports = tests;
