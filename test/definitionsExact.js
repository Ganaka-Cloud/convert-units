"use strict";
// 1 <unit> equals an exact (or exactly derived) value in the measure's metric anchor, to 1e-12.
// Sources: NIST SP 811 App. B.8 and its footnotes (SP 811, 1991 ed.: yard = 0.9144 m, lb = 0.45359237 kg,
// lbf = 4.4482216152605 N, Btu_IT = 1055.05585262 J, "1 nautical mile = 1 852 m"), SI 2019 (eV, e),
// IAU 2012 (au = 149597870700 m), conventional mercury density 13595.1 kg/m3, g_n = 9.80665 m/s2.
var convert = require("../lib"),
  assert = require("assert"),
  tests = {};

var ft = 0.3048,
  inch = 0.0254,
  lb = 0.45359237,
  g = 9.80665,
  lbf = lb * g,
  btu = 1055.05585262,
  au = 149597870700,
  floz = (231 * inch * inch * inch) / 128;

var TABLE = [
  ["pc", "m", (648000 / Math.PI) * au],
  ["ly", "m", 299792458 * 365.25 * 86400],
  ["AU", "m", au],
  ["mi", "m", 1609.344],
  ["nMi", "m", 1852],
  ["ft-us", "m", 1200 / 3937],
  ["fathom", "m", 6 * ft],
  ["furlong", "m", 660 * ft],
  ["chain", "m", 66 * ft],
  ["league", "m", 15840 * ft],
  ["hand", "m", 4 * inch],
  ["rod", "m", 16.5 * ft],
  ["ac", "m2", 43560 * ft * ft],
  ["mi2", "m2", 1609.344 * 1609.344],
  ["circ-mil", "m2", (Math.PI / 4) * Math.pow(inch / 1000, 2)],
  ["g-force", "m/s2", g],
  ["g-force:US", "m/s2", g],
  ["kgf", "N", g],
  ["tfM", "N", 1000 * g],
  ["pond", "N", g / 1000],
  ["kp", "N", g],
  ["kipf", "N", 1000 * lbf],
  ["tfs", "N", 2000 * lbf],
  ["tfl", "N", 2240 * lbf],
  ["pdl", "N", lb * ft],
  ["stone", "kg", 14 * lb],
  ["grain", "kg", lb / 7000],
  ["slug", "kg", lbf / ft],
  ["oz", "kg", lb / 16],
  ["ozt", "kg", 31.1034768e-3],
  ["lbt", "kg", 12 * 31.1034768e-3],
  ["dwt", "kg", 31.1034768e-3 / 20],
  ["dr", "kg", lb / 256],
  ["cwt", "kg", 100 * lb],
  ["long-ton", "kg", 2240 * lb],
  ["short-ton", "kg", 2000 * lb],
  ["lbf-in", "Nm", (lbf * ft) / 12],
  ["kgfm", "Nm", g],
  ["tfMm", "Nm", 1000 * g],
  ["tfsm", "Nm", 2000 * lbf],
  ["tflm", "Nm", 2240 * lbf],
  ["pdl-ft", "Nm", lb * ft * ft],
  ["pdl-in", "Nm", (lb * ft * ft) / 12],
  ["ozf*in", "N*m", (lbf * inch) / 16],
  ["kgfms2", "kg*m2", g],
  ["lb-in2", "kg*m2", lb * inch * inch],
  ["lbf-ins2", "kg*m2", lbf * inch],
  ["lbf-fts2", "kg*m2", lbf * ft],
  ["torr", "Pa", 101325 / 760],
  ["atm", "Pa", 101325],
  ["bar", "Pa", 1e5],
  ["at", "Pa", 98066.5],
  ["cmH2O", "Pa", g * 10],
  ["mmHg", "Pa", (13595.1 * g) / 1000],
  ["cmHg", "Pa", (13595.1 * g) / 100],
  ["inHg", "Pa", 13595.1 * g * inch],
  ["inH2O", "Pa", 1000 * g * inch],
  ["ksi", "Pa", (1000 * lbf) / (inch * inch)],
  ["cal", "J", 4.184],
  ["toe", "J", 41.868e9],
  ["therm", "J", 1e5 * btu],
  ["quad", "J", 1e15 * btu],
  ["ft-lb", "J", lbf * ft],
  ["hp-mech", "W", 550 * ft * lbf],
  ["hp-met", "W", 75 * g],
  ["tonRef", "W", (12000 * btu) / 3600],
  ["knot", "m/s", 1852 / 3600],
  ["mph", "m/s", 1609.344 / 3600],
  ["ft/s", "m/s", ft],
  ["min/mi", "s/m", 60 / 1609.344],
  ["reyn", "Pa*s", lbf / (inch * inch)],
  ["La", "cd/m2", 1e4 / Math.PI],
  ["fL", "cd/m2", 1 / (Math.PI * ft * ft)],
  ["Ci", "Bq", 3.7e10],
  ["Oe", "A/m", 1000 / (4 * Math.PI)],
  ["kip/ft", "N/m", (1000 * lbf) / ft],
  ["lbf/in", "N/m", lbf / inch],
  ["lbf/in3", "N/m3", lbf / Math.pow(inch, 3)],
  ["Btu.in/hr/sq.ft/F", "W/m/K", btu / 3600 / ft / (5 / 9) / 12],
  ["Btu.in/s/sq.ft/F", "W/m/K", btu / ft / (5 / 9) / 12],
  ["kgf-m/kg/C", "J/kg/K", g],
  ["in3", "m3", Math.pow(inch, 3)],
  ["tsp", "m3", floz / 6],
  ["cup", "m3", 8 * floz],
  ["gal", "m3", 128 * floz],
  ["ft3", "m3", Math.pow(ft, 3)],
  ["bbl-oil", "m3", 42 * 128 * floz],
  ["bu", "m3", 2150.42 * Math.pow(inch, 3)],
  ["fl-oz-UK", "m3", 4.54609e-3 / 160],
  ["UK-gal", "m3", 4.54609e-3],
  ["US-dry-gal", "m3", 268.8025 * Math.pow(inch, 3)],
  ["bdft", "m3", 144 * Math.pow(inch, 3)],
  ["acre-ft", "m3", 43560 * Math.pow(ft, 3)],
  ["year", "s", 365.25 * 86400],
  ["common-yr", "s", 365 * 86400],
  ["leap-yr", "s", 366 * 86400],
  ["eV", "J", 1.602176634e-19],
  ["statC", "c", 1 / 2997924580],
  ["Fr", "c", 1 / 2997924580],
  ["statA", "A", 1 / 2997924580],
  ["statV", "V", 299.792458],
  ["statΩ", "Ω", 1e-5 * 299792458 * 299792458],
  ["statH", "H", 1e-5 * 299792458 * 299792458],
  ["a_u_force", "N", 8.2387234983e-8],
];

TABLE.forEach(function (row) {
  tests["1 " + row[0].replace(":", "-") + " is exactly " + row[2] + " " + row[1]] = function () {
    var actual = convert(1).from(row[0]).to(row[1]);
    assert.ok(Math.abs(actual - row[2]) / Math.abs(row[2]) < 1e-12, row[0] + " gave " + actual);
  };
});

// Published NIST rows (SP 811 App. B.8), rounded as printed.
tests["NIST printed values"] = function () {
  var near = function (e, a, tol) { assert.ok(Math.abs(a - e) / e < tol, e + " vs " + a); };
  near(1.442279e-1, convert(1).from("Btu.in/hr/sq.ft/F").to("W/m/K"), 1e-6);
  near(5.192204e2, convert(1).from("Btu.in/s/sq.ft/F").to("W/m/K"), 1e-6);
  near(3.386389e3, convert(1).from("inHg").to("Pa"), 2e-7);
  near(2.490889e2, convert(1).from("inH2O").to("Pa"), 2e-7);
  near(1.852e3, convert(1).from("nMi").to("m"), 1e-12);
  near(1.382550e-1, convert(1).from("pdl").to("N"), 1e-6);
  near(4.214011e-2, convert(1).from("pdl-ft").to("Nm"), 1e-6);
};

module.exports = tests;
