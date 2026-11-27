"use strict";
// Linear-power (2.15.0): every unit against its exact definition, both ways, and through the
// metric/imperial anchor.
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

// Exact definitions: 1 ft = 0.3048 m; Btu_IT = 0.45359237 kg x 5/9 K x 4186.8 J/(kg K) = 1055.05585262 J
// (NIST SP 811 App. B.8 rounds Btu_IT/h to 0.2930711 W).
var FT = 0.3048,
  BTU_IT = 1055.05585262,
  HR = 3600;

function close(expected, actual, msg) {
  assert.ok(Math.abs(actual - expected) / Math.abs(expected) < 1e-12, msg + ": expected " + expected + ", got " + actual);
}

// Each unit's size in W/m.
var UNITS = {
  "W/m": 1,
  "W/cm": 100,
  "kW/m": 1e3,
  "MW/m": 1e6,
  "Btu/hr/ft": BTU_IT / HR / FT,
  "kW/ft": 1e3 / FT,
};

Object.keys(UNITS).forEach(function (u) {
  tests["Linear-power - 1 " + u + " in W/m"] = function () {
    close(UNITS[u], convert(1).from(u).to("W/m"), u + " -> W/m");
  };
  tests["Linear-power - 1 W/m in " + u] = function () {
    close(1 / UNITS[u], convert(1).from("W/m").to(u), "W/m -> " + u);
  };
  tests["Linear-power - " + u + " describes as Linear-power"] = function () {
    assert.strictEqual(convert().describe(u).measure, "Linear-power");
  };
});
tests["Linear-power - lists its units"] = function () {
  assert.deepStrictEqual(convert().possibilities("Linear-power").sort(), Object.keys(UNITS).sort());
};

// Values engineers quote, checked across systems.
tests["a fuel rod at 20 kW/m is 200 W/cm and 6.096 kW/ft"] = function () {
  close(200, convert(20).from("kW/m").to("W/cm"), "kW/m -> W/cm");
  close(20 * FT, convert(20).from("kW/m").to("kW/ft"), "kW/m -> kW/ft");
};
tests["1 Btu/hr/ft is 0.96152 W/m (NIST SP 811 B.8)"] = function () {
  assert.ok(Math.abs(convert(1).from("Btu/hr/ft").to("W/m") - 0.2930711 / 0.3048) < 1e-7);
};
tests["13.4 kW/ft is 45 721 Btu/hr/ft"] = function () {
  close((13.4 * 1e3 * HR) / BTU_IT, convert(13.4).from("kW/ft").to("Btu/hr/ft"), "kW/ft -> Btu/hr/ft");
};
tests["Linear-power does not convert into Power, HeatFlux or LineLoad"] = function () {
  assert.throws(function () {
    convert(1).from("W/m").to("W");
  });
  assert.throws(function () {
    convert(1).from("W/m").to("W/m2");
  });
  assert.throws(function () {
    convert(1).from("W/m").to("N/m");
  });
};

module.exports = tests;
