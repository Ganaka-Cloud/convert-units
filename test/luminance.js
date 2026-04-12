"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {},
  ACCURACY = 1 / 1000,
  percentError = require("../lib/percentError");

// Identity
tests["cd/m2 to cd/m2"] = function () {
  assert.strictEqual(convert(1).from("cd/m2").to("cd/m2"), 1);
};

tests["sb to sb"] = function () {
  assert.strictEqual(convert(1).from("sb").to("sb"), 1);
};

// cd/m2 <-> sb (1 sb = 1e4 cd/m2)
tests["sb to cd/m2"] = function () {
  assert.strictEqual(convert(1).from("sb").to("cd/m2"), 1e4);
};

tests["cd/m2 to sb"] = function () {
  assert.strictEqual(convert(1e4).from("cd/m2").to("sb"), 1);
};

// cd/m2 <-> La (1 La = 10000/π cd/m2)
tests["La to cd/m2"] = function () {
  var result = convert(1).from("La").to("cd/m2");
  assert.ok(
    percentError(10000 / Math.PI, result) < ACCURACY,
    "La to cd/m2 should be ~3183.1, got " + result
  );
};

tests["cd/m2 to La"] = function () {
  var result = convert(10000 / Math.PI).from("cd/m2").to("La");
  assert.ok(
    percentError(1, result) < ACCURACY,
    "cd/m2 to La should be ~1, got " + result
  );
};

// cd/m2 <-> fL (1 fL = 3.4262591 cd/m2)
tests["fL to cd/m2"] = function () {
  var result = convert(1).from("fL").to("cd/m2");
  assert.ok(
    percentError(3.4262591, result) < ACCURACY,
    "fL to cd/m2 should be ~3.4262591, got " + result
  );
};

module.exports = tests;
