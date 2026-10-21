"use strict";
// A temperature difference converts by scale only, with no offset.
// NIST SP 811 (2008) 4.2.1.1: a Celsius temperature interval equals the kelvin interval.
// NIST SP 811 App. B.8: a degree Fahrenheit or degree Rankine interval = 5/9 K.
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

var M = "Temperature-difference";

function close(expected, actual, msg) {
  assert.ok(Math.abs(actual - expected) < 1e-12 * Math.max(1, Math.abs(expected)), msg + ": expected " + expected + ", got " + actual);
}
function d(v, from, to) {
  return convert(v).from(from, M).to(to, M);
}

tests["10 C of change is 10 K"] = function () {
  close(10, d(10, "C", "K"), "C -> K");
};
tests["18 F of change is 10 K"] = function () {
  close(10, d(18, "F", "K"), "F -> K");
};
tests["9 R of change is 5 K"] = function () {
  close(5, d(9, "R", "K"), "R -> K");
};
tests["1 K of change is 1.8 F"] = function () {
  close(1.8, d(1, "K", "F"), "K -> F");
};
tests["0 C of change is 0 K (no offset, unlike Temperature)"] = function () {
  assert.strictEqual(d(0, "C", "K"), 0);
  assert.strictEqual(d(0, "F", "K"), 0);
  assert.strictEqual(d(0, "R", "K"), 0);
  assert.strictEqual(convert(0).from("C", "Temperature").to("K", "Temperature"), 273.15);
};
tests["F and R intervals are equal"] = function () {
  close(1, d(1, "F", "R"), "F -> R");
  close(1, d(1, "C", "K"), "C -> K");
};
tests["C -> F across systems is 9/5"] = function () {
  close(18, d(10, "C", "F"), "C -> F");
  close(10, d(18, "F", "C"), "F -> C");
};
["K", "C", "F", "R"].forEach(function (u) {
  ["K", "C", "F", "R"].forEach(function (v) {
    tests[u + " -> " + v + " round trip"] = function () {
      close(7.3, d(d(7.3, u, v), v, u), u + " <-> " + v);
    };
  });
});
tests["describe reports the measure and system"] = function () {
  assert.strictEqual(convert().describe("K", M).measure, M);
  assert.strictEqual(convert().describe("C", M).system, "metric");
  assert.strictEqual(convert().describe("F", M).system, "imperial");
  assert.strictEqual(convert().describe("R", M).system, "imperial");
};
tests["the measure is listed with four units"] = function () {
  assert.ok(convert().measures().indexOf(M) >= 0);
  assert.strictEqual(convert().list(M).length, 4);
};
tests["Temperature is unchanged by the new measure"] = function () {
  close(273.15, convert(0).from("C", "Temperature").to("K", "Temperature"), "C -> K");
  close(0, convert(32).from("F", "Temperature").to("C", "Temperature"), "F -> C");
  assert.strictEqual(convert().describe("Re", "Temperature").measure, "Temperature");
};
tests["the two measures do not mix"] = function () {
  assert.throws(function () {
    convert(1).from("K", M).to("K", "Temperature");
  }, /Cannot convert incompatible measures/);
};

module.exports = tests;
