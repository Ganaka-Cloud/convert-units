"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["kat to kat"] = function () {
  assert.strictEqual(convert(1).from("kat").to("kat"), 1);
};
tests["mkat to mkat"] = function () {
  assert.strictEqual(convert(1).from("mkat").to("mkat"), 1);
};
tests["μkat to μkat"] = function () {
  assert.strictEqual(convert(1).from("μkat").to("μkat"), 1);
};
tests["nkat to nkat"] = function () {
  assert.strictEqual(convert(1).from("nkat").to("nkat"), 1);
};

// kat <-> mkat
tests["kat to mkat"] = function () {
  assert.strictEqual(convert(1).from("kat").to("mkat"), 1000);
};
tests["mkat to kat"] = function () {
  assert.strictEqual(convert(1000).from("mkat").to("kat"), 1);
};

// mkat <-> μkat
tests["mkat to μkat"] = function () {
  var result = convert(1).from("mkat").to("μkat");
  assert.ok(Math.abs(result - 1000) < 1e-9, "mkat to μkat should be ~1000, got " + result);
};
tests["μkat to mkat"] = function () {
  var result = convert(1000).from("μkat").to("mkat");
  assert.ok(Math.abs(result - 1) < 1e-9, "μkat to mkat should be ~1, got " + result);
};

// μkat <-> nkat
tests["μkat to nkat"] = function () {
  var result = convert(1).from("μkat").to("nkat");
  assert.ok(Math.abs(result - 1000) < 1e-9, "μkat to nkat should be ~1000, got " + result);
};
tests["nkat to μkat"] = function () {
  var result = convert(1000).from("nkat").to("μkat");
  assert.ok(Math.abs(result - 1) < 1e-9, "nkat to μkat should be ~1, got " + result);
};

module.exports = tests;
