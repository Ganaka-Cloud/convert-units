"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["Gy to Gy"] = function () {
  assert.strictEqual(convert(1).from("Gy").to("Gy"), 1);
};

tests["RAD to RAD"] = function () {
  assert.strictEqual(convert(1).from("RAD").to("RAD"), 1);
};

// Gy <-> mGy (1 Gy = 1000 mGy)
tests["Gy to mGy"] = function () {
  assert.strictEqual(convert(1).from("Gy").to("mGy"), 1000);
};

tests["mGy to Gy"] = function () {
  assert.strictEqual(convert(1000).from("mGy").to("Gy"), 1);
};

// Gy <-> μGy (1 Gy = 1e6 μGy)
tests["Gy to μGy"] = function () {
  assert.strictEqual(convert(1).from("Gy").to("μGy"), 1e6);
};

// Sv <-> mSv (1 Sv = 1000 mSv)
tests["Sv to mSv"] = function () {
  assert.strictEqual(convert(1).from("Sv").to("mSv"), 1000);
};

// RAD <-> rem (1:1)
tests["RAD to rem"] = function () {
  assert.strictEqual(convert(1).from("RAD").to("rem"), 1);
};

tests["rem to RAD"] = function () {
  assert.strictEqual(convert(1).from("rem").to("RAD"), 1);
};

// Cross-system: Gy <-> RAD (1 Gy = 100 RAD)
tests["Gy to RAD"] = function () {
  assert.strictEqual(convert(1).from("Gy").to("RAD"), 100);
};

tests["RAD to Gy"] = function () {
  assert.strictEqual(convert(100).from("RAD").to("Gy"), 1);
};

// Cross-system round-trip
tests["Gy round-trip via RAD"] = function () {
  var result = convert(convert(5).from("Gy").to("RAD")).from("RAD").to("Gy");
  assert.ok(
    percentError(5, result) < ACCURACY,
    "round-trip Gy->RAD->Gy should be ~5, got " + result
  );
};

module.exports = tests;
