"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["dB to dB"] = function () {
  assert.strictEqual(convert(1).from("dB").to("dB"), 1);
};

tests["Np to Np"] = function () {
  assert.strictEqual(convert(1).from("Np").to("Np"), 1);
};

// dB <-> Np (1 Np = 8.685889638 dB)
tests["Np to dB"] = function () {
  var result = convert(1).from("Np").to("dB");
  assert.ok(
    percentError(8.685889638, result) < ACCURACY,
    "Np to dB should be ~8.685889638, got " + result
  );
};

tests["dB to Np"] = function () {
  var result = convert(8.685889638).from("dB").to("Np");
  assert.ok(
    percentError(1, result) < ACCURACY,
    "dB to Np should be ~1, got " + result
  );
};

// Round-trip
tests["dB round-trip via Np"] = function () {
  var result = convert(convert(10).from("dB").to("Np")).from("Np").to("dB");
  assert.ok(
    percentError(10, result) < ACCURACY,
    "round-trip dB->Np->dB should be ~10, got " + result
  );
};

module.exports = tests;
