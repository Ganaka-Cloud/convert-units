"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

var LBF = 4.4482216152605,
  IN = 0.0254,
  FT = 0.3048;

function close(expected, actual, msg) {
  assert.ok(Math.abs(actual - expected) / Math.abs(expected) < 1e-12, msg + ": expected " + expected + ", got " + actual);
}
function r(v, from, to) {
  return convert(v).from(from, "Rotational-stiffness").to(to, "Rotational-stiffness");
}

// Each unit in newton-metres per radian.
var NMPR = {
  "N*m/rad": 1,
  "kN*m/rad": 1e3,
  "MN*m/rad": 1e6,
  "lbf*in/rad": LBF * IN,
  "lbf*ft/rad": LBF * FT,
  "kip*in/rad": 1000 * LBF * IN,
  "kip*ft/rad": 1000 * LBF * FT,
};

Object.keys(NMPR).forEach(function (u) {
  tests["1 " + u + " is " + NMPR[u] + " N*m/rad"] = function () {
    close(NMPR[u], r(1, u, "N*m/rad"), u + " -> N*m/rad");
  };
  tests["1 N*m/rad is 1/" + NMPR[u] + " " + u] = function () {
    close(1 / NMPR[u], r(1, "N*m/rad", u), "N*m/rad -> " + u);
  };
  Object.keys(NMPR).forEach(function (v) {
    tests[u + " -> " + v + " round trip"] = function () {
      close(7.3, r(r(7.3, u, v), v, u), u + " <-> " + v);
    };
    tests["1 " + u + " in " + v] = function () {
      close(NMPR[u] / NMPR[v], r(1, u, v), u + " -> " + v);
    };
  });
});

tests["1 kip*ft/rad is 12 kip*in/rad"] = function () {
  close(12, r(1, "kip*ft/rad", "kip*in/rad"), "kip*ft/rad -> kip*in/rad");
};
tests["1 kip*in/rad is 112.984829 N*m/rad"] = function () {
  assert.ok(Math.abs(r(1, "kip*in/rad", "N*m/rad") - 112.98482902) < 1e-6);
};
tests["Rotational stiffness units do not collide with Torque or Moment"] = function () {
  var units = convert().list();
  var rot = units.filter(function (u) {
    return u.measure === "Rotational-stiffness";
  });
  rot.forEach(function (u) {
    var others = units.filter(function (o) {
      return o.abbr === u.abbr && o.measure !== u.measure;
    });
    assert.strictEqual(others.length, 0, u.abbr + " is also in another measure");
  });
};
tests["N*m is Torque, not rotational stiffness"] = function () {
  assert.strictEqual(convert().describe("N*m").measure, "Torque");
};

module.exports = tests;
