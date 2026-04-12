"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Identity
tests["dBW to dBW"] = function () {
  assert.strictEqual(convert(0).from("dBW").to("dBW"), 0);
};

tests["dBm to dBm"] = function () {
  assert.strictEqual(convert(30).from("dBm").to("dBm"), 30);
};

// dBm -> dBW: subtract anchor_shift of dBm (30), add anchor_shift of dBW (0)
// 20 dBm -> 20 - 30 = -10 dBW
tests["dBm to dBW (20 dBm = -10 dBW)"] = function () {
  assert.strictEqual(convert(20).from("dBm").to("dBW"), -10);
};

// 30 dBm = 0 dBW
tests["dBm to dBW (30 dBm = 0 dBW)"] = function () {
  assert.strictEqual(convert(30).from("dBm").to("dBW"), 0);
};

// dBW -> dBm: subtract anchor_shift of dBW (0), add anchor_shift of dBm (30)
// 0 dBW -> 0 + 30 = 30 dBm
tests["dBW to dBm (0 dBW = 30 dBm)"] = function () {
  assert.strictEqual(convert(0).from("dBW").to("dBm"), 30);
};

// -10 dBW = 20 dBm
tests["dBW to dBm (-10 dBW = 20 dBm)"] = function () {
  assert.strictEqual(convert(-10).from("dBW").to("dBm"), 20);
};

// Negative dBm value
tests["dBm to dBW (-20 dBm = -50 dBW)"] = function () {
  assert.strictEqual(convert(-20).from("dBm").to("dBW"), -50);
};

// Incompatibility: dBm to dB should throw
tests["dBm to dB throws incompatible"] = function () {
  assert.throws(function () {
    convert(0).from("dBm").to("dB");
  }, /Cannot convert incompatible measures/);
};

module.exports = tests;
