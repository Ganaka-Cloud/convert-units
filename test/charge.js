var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// c <-> mC
tests["c to mC"] = function () {
  assert.strictEqual(convert(1).from("c").to("mC"), 1000);
};

tests["mC to c"] = function () {
  assert.strictEqual(convert(1000).from("mC").to("c"), 1);
};

// c <-> μC
tests["c to μC"] = function () {
  assert.strictEqual(convert(1).from("c").to("μC"), 1e6);
};

tests["μC to c"] = function () {
  assert.strictEqual(convert(1e6).from("μC").to("c"), 1);
};

// c <-> nC
tests["c to nC"] = function () {
  var result = convert(1).from("c").to("nC");
  assert.ok(Math.abs(result - 1e9) < 1, "c to nC should be ~1e9, got " + result);
};

tests["nC to c"] = function () {
  var result = convert(1e9).from("nC").to("c");
  assert.ok(Math.abs(result - 1) < 1e-6, "nC to c should be ~1, got " + result);
};

// c <-> pC
tests["c to pC"] = function () {
  var result = convert(1).from("c").to("pC");
  assert.ok(Math.abs(result - 1e12) < 1e3, "c to pC should be ~1e12, got " + result);
};

tests["pC to c"] = function () {
  var result = convert(1e12).from("pC").to("c");
  assert.ok(Math.abs(result - 1) < 1e-3, "pC to c should be ~1, got " + result);
};

// Ah <-> c (1 Ah = 3600 C)
tests["Ah to c"] = function () {
  assert.strictEqual(convert(1).from("Ah").to("c"), 3600);
};

tests["c to Ah"] = function () {
  assert.strictEqual(convert(3600).from("c").to("Ah"), 1);
};

// mAh <-> c (1 mAh = 3.6 C)
tests["mAh to c"] = function () {
  assert.strictEqual(convert(1).from("mAh").to("c"), 3.6);
};

tests["c to mAh"] = function () {
  assert.strictEqual(convert(3.6).from("c").to("mAh"), 1);
};

// Ah <-> mAh (1 Ah = 1000 mAh)
tests["Ah to mAh"] = function () {
  assert.strictEqual(convert(1).from("Ah").to("mAh"), 1000);
};

tests["mAh to Ah"] = function () {
  assert.strictEqual(convert(1000).from("mAh").to("Ah"), 1);
};

module.exports = tests;
