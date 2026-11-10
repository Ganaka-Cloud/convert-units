"use strict";
// Resistance-per-length, Linear-density and Root-pressure (2.14.0): every unit against its exact
// definition, both ways, and through the metric/imperial anchor.
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Exact definitions: 1 ft = 0.3048 m, 1 lb = 0.45359237 kg, 1 lbf = 4.4482216152605 N, 1 in = 0.0254 m.
var FT = 0.3048,
  LB = 0.45359237,
  LBF = 4.4482216152605,
  IN = 0.0254,
  PSI = LBF / (IN * IN);

function close(expected, actual, msg) {
  assert.ok(Math.abs(actual - expected) / Math.abs(expected) < 1e-12, msg + ": expected " + expected + ", got " + actual);
}

// Each unit's size in the measure's SI base.
var MEASURES = {
  "Resistance-per-length": {
    base: "Ω/m",
    units: {
      "Ω/m": 1,
      "mΩ/m": 1e-3,
      "μΩ/m": 1e-6,
      "Ω/km": 1e-3,
      "Ω/ft": 1 / FT,
      "Ω/kft": 1 / (1000 * FT),
      "Ω/mi": 1 / (5280 * FT),
    },
  },
  "Linear-density": {
    base: "kg/m",
    units: {
      "kg/m": 1,
      "g/m": 1e-3,
      "kg/km": 1e-3,
      "lb/ft": LB / FT,
      "lb/in": LB / IN,
      "lb/yd": LB / (3 * FT),
    },
  },
  "Root-pressure": {
    base: "sqrt(Pa)",
    units: {
      "sqrt(Pa)": 1,
      "sqrt(kPa)": Math.sqrt(1e3),
      "sqrt(MPa)": 1e3,
      "sqrt(GPa)": Math.sqrt(1e9),
      "sqrt(psi)": Math.sqrt(PSI),
      "sqrt(ksi)": Math.sqrt(1e3 * PSI),
    },
  },
};

Object.keys(MEASURES).forEach(function (measure) {
  var m = MEASURES[measure];
  Object.keys(m.units).forEach(function (u) {
    tests[measure + " - 1 " + u + " in " + m.base] = function () {
      close(m.units[u], convert(1).from(u).to(m.base), u + " -> " + m.base);
    };
    tests[measure + " - 1 " + m.base + " in " + u] = function () {
      close(1 / m.units[u], convert(1).from(m.base).to(u), m.base + " -> " + u);
    };
    tests[measure + " - " + u + " describes as " + measure] = function () {
      assert.strictEqual(convert().describe(u).measure, measure);
    };
  });
  tests[measure + " - lists its units"] = function () {
    assert.deepStrictEqual(convert().possibilities(measure).sort(), Object.keys(m.units).sort());
  };
});

// Values engineers quote, checked across systems.
tests["IEC 60909 line data - 0.32 Ω/km is 0.32 mΩ/m"] = function () {
  close(0.32, convert(0.32).from("Ω/km").to("mΩ/m"), "Ω/km -> mΩ/m");
};
tests["AGMA steel elastic coefficient - 2300 √psi is 191.0 √MPa"] = function () {
  close(Math.sqrt(PSI) * 2300 / 1e3, convert(2300).from("sqrt(psi)").to("sqrt(MPa)"), "√psi -> √MPa");
};
tests["a 1 lb/ft belt is 1.488 kg/m"] = function () {
  close(LB / FT, convert(1).from("lb/ft").to("kg/m"), "lb/ft -> kg/m");
};
tests["the new measures do not convert into Resistance, Density or Pressure"] = function () {
  assert.throws(function () {
    convert(1).from("Ω/m").to("Ω");
  });
  assert.throws(function () {
    convert(1).from("kg/m").to("kg/m3");
  });
  assert.throws(function () {
    convert(1).from("sqrt(Pa)").to("Pa");
  });
};

module.exports = tests;
