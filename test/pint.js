"use strict";
// Every physical unit converts like pint does, to 1e-12, for every unit pair in its measure.
// pint-check/unit-map.json says what each unit is in pint terms; pint-check/reference.json is
// generated from it by pint-check/gen_reference.py and kept fresh by CI. A unit missing from
// the map fails here, so a new unit has to arrive with a pint spelling or a reason it has none.
var convert = require("../lib"),
  assert = require("assert"),
  unitMap = require("../pint-check/unit-map.json"),
  reference = require("../pint-check/reference.json"),
  tests = {};

var REL = 1e-12;

function spec(measure, abbr) {
  var s = unitMap.measures[measure][abbr];
  return typeof s === "string" ? { pint: s } : s;
}

function tolerance(measure, a, b) {
  return Math.max(REL, spec(measure, a).rel || 0, spec(measure, b).rel || 0);
}

// Relative error, with a floor of 1 so values that land on zero (0 C -> K is not one, but
// -40 F -> C and 0 dB -> Np are) don't divide by nothing.
function err(actual, expected, floor) {
  return Math.abs(actual - expected) / Math.max(Math.abs(expected), floor);
}

function report(measure, failures) {
  assert.ok(
    failures.length === 0,
    measure + ": " + failures.length + " conversion(s) disagree with pint\n  " + failures.join("\n  ")
  );
}

tests["every unit is mapped to pint or excluded"] = function () {
  var missing = convert()
    .list()
    .filter(function (u) {
      if (unitMap.excludeMeasures[u.measure]) return false;
      var m = unitMap.measures[u.measure];
      return !m || !Object.prototype.hasOwnProperty.call(m, u.abbr);
    })
    .map(function (u) {
      return u.measure + "/" + u.abbr;
    });
  assert.deepStrictEqual(missing, [], "units with no pint mapping: " + missing.join(", "));
};

tests["every mapped unit exists in its measure"] = function () {
  var stale = [];
  Object.keys(unitMap.measures).forEach(function (measure) {
    var abbrs = convert().possibilities(measure);
    Object.keys(unitMap.measures[measure]).forEach(function (abbr) {
      if (abbrs.indexOf(abbr) === -1) stale.push(measure + "/" + abbr);
    });
  });
  assert.deepStrictEqual(stale, [], "mapped units that convert-units does not have: " + stale.join(", "));
};

Object.keys(reference.measures).forEach(function (measure) {
  var ref = reference.measures[measure];
  tests[measure + " matches pint"] = function () {
    var failures = [];
    if (ref.factors) {
      var abbrs = Object.keys(ref.factors);
      abbrs.forEach(function (a) {
        abbrs.forEach(function (b) {
          var expected = ref.factors[a] / ref.factors[b],
            actual = convert(1).from(a, measure).to(b, measure),
            e = err(actual, expected, 0);
          if (!(e <= tolerance(measure, a, b))) {
            failures.push("1 " + a + " -> " + b + ": " + actual + ", pint " + expected + " (rel " + e.toExponential(2) + ")");
          }
        });
      });
    } else {
      ref.cases.forEach(function (c) {
        var actual = convert(c[2]).from(c[0], measure).to(c[1], measure),
          e = err(actual, c[3], 1);
        if (!(e <= tolerance(measure, c[0], c[1]))) {
          failures.push(c[2] + " " + c[0] + " -> " + c[1] + ": " + actual + ", pint " + c[3] + " (rel " + e.toExponential(2) + ")");
        }
      });
    }
    report(measure, failures);
  };
});

module.exports = tests;
