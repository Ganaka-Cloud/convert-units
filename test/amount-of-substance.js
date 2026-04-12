"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["mol to mol"] = function () {
  assert.strictEqual(convert(1).from("mol").to("mol"), 1);
};
tests["mmol to mmol"] = function () {
  assert.strictEqual(convert(1).from("mmol").to("mmol"), 1);
};
tests["μmol to μmol"] = function () {
  assert.strictEqual(convert(1).from("μmol").to("μmol"), 1);
};
tests["nmol to nmol"] = function () {
  assert.strictEqual(convert(1).from("nmol").to("nmol"), 1);
};
tests["pmol to pmol"] = function () {
  assert.strictEqual(convert(1).from("pmol").to("pmol"), 1);
};

// mol <-> mmol
tests["mol to mmol"] = function () {
  assert.strictEqual(convert(1).from("mol").to("mmol"), 1000);
};
tests["mmol to mol"] = function () {
  assert.strictEqual(convert(1000).from("mmol").to("mol"), 1);
};

// mmol <-> μmol
tests["mmol to μmol"] = function () {
  var result = convert(1).from("mmol").to("μmol");
  assert.ok(Math.abs(result - 1000) < 1e-9, "mmol to μmol should be ~1000, got " + result);
};
tests["μmol to mmol"] = function () {
  var result = convert(1000).from("μmol").to("mmol");
  assert.ok(Math.abs(result - 1) < 1e-9, "μmol to mmol should be ~1, got " + result);
};

// μmol <-> nmol
tests["μmol to nmol"] = function () {
  var result = convert(1).from("μmol").to("nmol");
  assert.ok(Math.abs(result - 1000) < 1e-9, "μmol to nmol should be ~1000, got " + result);
};
tests["nmol to μmol"] = function () {
  var result = convert(1000).from("nmol").to("μmol");
  assert.ok(Math.abs(result - 1) < 1e-9, "nmol to μmol should be ~1, got " + result);
};

// nmol <-> pmol
tests["nmol to pmol"] = function () {
  var result = convert(1).from("nmol").to("pmol");
  assert.ok(Math.abs(result - 1000) < 1e-9, "nmol to pmol should be ~1000, got " + result);
};
tests["pmol to nmol"] = function () {
  var result = convert(1000).from("pmol").to("nmol");
  assert.ok(Math.abs(result - 1) < 1e-9, "pmol to nmol should be ~1, got " + result);
};

module.exports = tests;
