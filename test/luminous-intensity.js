"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// identity
tests["cd to cd"] = function () {
  assert.strictEqual(convert(1).from("cd").to("cd"), 1);
};
tests["mcd to mcd"] = function () {
  assert.strictEqual(convert(1).from("mcd").to("mcd"), 1);
};
tests["kcd to kcd"] = function () {
  assert.strictEqual(convert(1).from("kcd").to("kcd"), 1);
};

// cd <-> mcd
tests["cd to mcd"] = function () {
  assert.strictEqual(convert(1).from("cd").to("mcd"), 1000);
};
tests["mcd to cd"] = function () {
  assert.strictEqual(convert(1000).from("mcd").to("cd"), 1);
};

// cd <-> kcd
tests["cd to kcd"] = function () {
  assert.strictEqual(convert(1).from("cd").to("kcd"), 0.001);
};
tests["kcd to cd"] = function () {
  assert.strictEqual(convert(1).from("kcd").to("cd"), 1000);
};

module.exports = tests;
