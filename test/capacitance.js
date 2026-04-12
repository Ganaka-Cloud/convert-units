"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["μF to μF"] = function () {
  assert.strictEqual(convert(1).from("μF").to("μF"), 1);
};
tests["nF to nF"] = function () {
  assert.strictEqual(convert(1).from("nF").to("nF"), 1);
};
tests["pF to pF"] = function () {
  assert.strictEqual(convert(1).from("pF").to("pF"), 1);
};
tests["mF to mF"] = function () {
  assert.strictEqual(convert(1).from("mF").to("mF"), 1);
};

// μF <-> nF
tests["μF to nF"] = function () {
  assert.strictEqual(convert(1).from("μF").to("nF"), 1000);
};
tests["nF to μF"] = function () {
  assert.strictEqual(convert(1000).from("nF").to("μF"), 1);
};

// μF <-> pF
tests["μF to pF"] = function () {
  assert.strictEqual(convert(1).from("μF").to("pF"), 1e6);
};
tests["pF to μF"] = function () {
  assert.strictEqual(convert(1e6).from("pF").to("μF"), 1);
};

// μF <-> mF
tests["μF to mF"] = function () {
  assert.strictEqual(convert(1).from("μF").to("mF"), 0.001);
};
tests["mF to μF"] = function () {
  assert.strictEqual(convert(0.001).from("mF").to("μF"), 1);
};

module.exports = tests;
