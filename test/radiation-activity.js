"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Identity
tests["Bq to Bq"] = function () {
  assert.strictEqual(convert(1).from("Bq").to("Bq"), 1);
};

tests["Ci to Ci"] = function () {
  assert.strictEqual(convert(1).from("Ci").to("Ci"), 1);
};

// Bq <-> kBq
tests["Bq to kBq"] = function () {
  assert.strictEqual(convert(1000).from("Bq").to("kBq"), 1);
};

tests["kBq to Bq"] = function () {
  assert.strictEqual(convert(1).from("kBq").to("Bq"), 1000);
};

// Bq <-> MBq
tests["Bq to MBq"] = function () {
  assert.strictEqual(convert(1e6).from("Bq").to("MBq"), 1);
};

// Bq <-> GBq
tests["GBq to Bq"] = function () {
  assert.strictEqual(convert(1).from("GBq").to("Bq"), 1e9);
};

// Bq <-> Ci (1 Ci = 3.7e10 Bq)
tests["Ci to Bq"] = function () {
  assert.strictEqual(convert(1).from("Ci").to("Bq"), 3.7e10);
};

tests["Bq to Ci"] = function () {
  assert.strictEqual(convert(3.7e10).from("Bq").to("Ci"), 1);
};

// Ci <-> mCi
tests["Ci to mCi"] = function () {
  assert.strictEqual(convert(1).from("Ci").to("mCi"), 1000);
};

// Bq <-> Rd (1 Rd = 1e6 Bq)
tests["Rd to Bq"] = function () {
  assert.strictEqual(convert(1).from("Rd").to("Bq"), 1e6);
};

module.exports = tests;
