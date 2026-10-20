"use strict";
// 1 imperial anchor unit equals an exact metric value, from the defining constants:
// 1 ft = 0.3048 m, 1 in = 0.0254 m, 1 yd = 0.9144 m, 1 lb = 0.45359237 kg (1959 international
// yard and pound agreement; NIST SP 811 App. B.8), g_n = 9.80665 m/s2, Btu_IT = 1055.05585262 J,
// a degree Rankine or Fahrenheit interval = 5/9 K, US gallon = 231 in3.
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

var ft = 0.3048,
  inch = 0.0254,
  yd = 0.9144,
  lb = 0.45359237,
  g = 9.80665,
  lbf = lb * g,
  btu = 1055.05585262,
  R = 5 / 9,
  hr = 3600,
  floz = (231 * inch * inch * inch) / 128;

// [measure, imperial unit, metric unit, exact metric value of 1 imperial unit]
var TABLE = [
  ["Length", "ft", "m", ft],
  ["Acceleration", "ft/s2", "m/s2", ft],
  ["Area-moment", "in4", "m4", Math.pow(inch, 4)],
  ["Area", "ft2", "m2", ft * ft],
  ["Section-modulus", "zin3", "zm3", Math.pow(inch, 3)],
  ["Force", "lbf", "N", lbf],
  ["Moment", "lbf-ft", "Nm", lbf * ft],
  ["Torque", "lbf*ft", "N*m", lbf * ft],
  ["Mass-moment", "lb-ft2", "kg*m2", lb * ft * ft],
  ["Thermal-conductivity", "Btu/hr/ft/F", "W/m/K", btu / hr / ft / R],
  ["Specific-heat-capacity", "Btu/lbm/F", "J/kg/K", btu / lb / R],
  ["Stefan-Boltzmann", "Btu/hr/sq.ft/R4", "W/m2/K4", btu / hr / (ft * ft) / Math.pow(R, 4)],
  ["Stress-Intensity-Factor", "ksi-sqr(in)", "MPa-sqrt(m)", ((1000 * lbf) / (inch * inch) / 1e6) * Math.sqrt(inch)],
  ["J-integral", "ft-lbs/sqin", "J/m2", (lbf * ft) / (inch * inch)],
  ["Density", "tlpcy", "kg/m3", (2240 * lb) / Math.pow(yd, 3)],
  ["Volume", "fl-oz", "m3", floz],
  ["VolumeFlowRate", "fl-oz/s", "m3/s", floz],
  ["Speed", "mph", "m/s", (5280 * ft) / hr],
  ["Pace", "s/ft", "s/m", 1 / ft],
  ["Pressure", "psi", "Pa", lbf / (inch * inch)],
  ["Energy", "Btu(IT)", "J", btu],
  ["Illuminance", "ft-cd", "lx", 1 / (ft * ft)],
  ["Mass", "lb", "kg", lb],
  ["MassFlow", "lb/s", "kg/s", lb],
  ["LineLoad", "lbf/ft", "N/m", lbf / ft],
  ["BodyForce", "lbf/ft3", "N/m3", lbf / Math.pow(ft, 3)],
  ["HeatFlux", "Btu/hr/ft2", "W/m2", btu / hr / (ft * ft)],
  ["FilmCoeff", "Btu/hr/ft2/F", "W/m2/K", btu / hr / (ft * ft) / R],
  ["HeatGen", "Btu/hr/ft3", "W/m3", btu / hr / Math.pow(ft, 3)],
  ["Temperature-gradient", "F/ft", "K/m", R / ft],
  ["Compressibility", "1/psi", "1/Pa", (inch * inch) / lbf],
  ["Boltzmann", "ft-lb/R", "J/K", (lbf * ft) / R],
  ["LinearCTE", "/F", "1/K", 1 / R],
];

function rel(expected, actual) {
  return Math.abs(actual - expected) / Math.abs(expected);
}

TABLE.forEach(function (row) {
  tests[row[0] + " 1 " + row[1] + " is exactly " + row[2]] = function () {
    assert.ok(rel(row[3], convert(1).from(row[1], row[0]).to(row[2], row[0])) < 1e-12, row[1] + " to " + row[2]);
  };
  tests[row[0] + " 1 " + row[2] + " is exactly 1/" + row[1]] = function () {
    assert.ok(rel(1 / row[3], convert(1).from(row[2], row[0]).to(row[1], row[0])) < 1e-12, row[2] + " to " + row[1]);
  };
});

// Published decimal forms of the same constants (NIST SP 811 App. B.8).
tests["published decimals agree with the derived ratios"] = function () {
  assert.ok(rel(2101.522, convert(1).from("ft-lbs/sqin").to("J/m2")) < 1e-6);
  assert.ok(rel(33.11563, convert(1).from("Btu/hr/sq.ft/R4").to("W/m2/K4")) < 1e-6);
  assert.ok(rel(2.44047, convert(1).from("ft-lb/R").to("J/K")) < 1e-5);
  assert.ok(rel(2402509.61, convert(1).from("m4").to("in4")) < 1e-8);
  assert.ok(rel(1.0988435, convert(1).from("ksi-sqr(in)").to("MPa-sqrt(m)")) < 1e-7);
  assert.ok(rel(1016.0469088, convert(1).from("long-ton").to("kg")) < 1e-10);
};

module.exports = tests;
