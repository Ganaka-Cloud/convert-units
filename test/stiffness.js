"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Exact definitions: 1 lbf = 4.4482216152605 N, 1 in = 0.0254 m, 1 ft = 0.3048 m, 1 kip = 1000 lbf.
var LBF = 4.4482216152605,
  IN = 0.0254,
  FT = 0.3048;

function close(expected, actual, msg) {
  assert.ok(Math.abs(actual - expected) / Math.abs(expected) < 1e-12, msg + ": expected " + expected + ", got " + actual);
}
function s(v, from, to) {
  return convert(v).from(from, "Stiffness").to(to, "Stiffness");
}

// Each unit in newtons per metre.
var NPM = {
  "N/m": 1,
  "kN/m": 1e3,
  "MN/m": 1e6,
  "N/mm": 1e3,
  "kN/mm": 1e6,
  "lbf/in": LBF / IN,
  "lbf/ft": LBF / FT,
  "kip/in": (1000 * LBF) / IN,
};

Object.keys(NPM).forEach(function (u) {
  tests["1 " + u + " is " + NPM[u] + " N/m"] = function () {
    close(NPM[u], s(1, u, "N/m"), u + " -> N/m");
  };
  tests["1 N/m is 1/" + NPM[u] + " " + u] = function () {
    close(1 / NPM[u], s(1, "N/m", u), "N/m -> " + u);
  };
  Object.keys(NPM).forEach(function (v) {
    tests[u + " -> " + v + " round trip"] = function () {
      close(7.3, s(s(7.3, u, v), v, u), u + " <-> " + v);
    };
    tests["1 " + u + " in " + v] = function () {
      close(NPM[u] / NPM[v], s(1, u, v), u + " -> " + v);
    };
  });
});

tests["1 kip/in is 175126.8352 N/m"] = function () {
  assert.ok(Math.abs(s(1, "kip/in", "N/m") - 175126.8352) < 1e-3);
};
tests["1 lbf/in is 12 lbf/ft"] = function () {
  close(12, s(1, "lbf/in", "lbf/ft"), "lbf/in -> lbf/ft");
};
tests["Stiffness metric anchor is N/m, imperial anchor is lbf/in"] = function () {
  var d = require("../lib/definitions/stiffness");
  assert.strictEqual(d._anchors.metric.unit, "N/m");
  assert.strictEqual(d._anchors.imperial.unit, "lbf/in");
  assert.strictEqual(d.metric["N/m"].to_anchor, 1);
  assert.strictEqual(d.imperial["lbf/in"].to_anchor, 1);
};

module.exports = tests;
