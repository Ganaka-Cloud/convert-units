"use strict";
var convert = require("../lib"),
  assert = require("assert"),
  fs = require("fs"),
  path = require("path"),
  tests = {};

function measureOf(abbr) {
  return convert()
    .list()
    .filter(function (u) {
      return u.abbr === abbr;
    })
    .map(function (u) {
      return u.measure;
    });
}

// Tag-grammar tokens, with `^` stripped, each resolve to exactly one measure.
var GRAMMAR = {
  "kg/m3": "Density",
  "g/cm3": "Density",
  "g/m3": "Density",
  "t/mm3": "Density",
  "kg/l": "Density",
  "g/l": "Density",
  "kg*m2": "Mass-moment",
  "kg*cm2": "Mass-moment",
  "kg*mm2": "Mass-moment",
  "J/m2": "J-integral",
  "kJ/m2": "J-integral",
  "1/K": "LinearCTE",
  "1/C": "LinearCTE",
  Pa: "Pressure",
  "K/m": "Temperature-gradient",
  "S/m": "Electrical-conductivity",
  "1/Pa": "Compressibility",
  "m/V": "Piezo-coefficient",
};
Object.keys(GRAMMAR).forEach(function (abbr) {
  tests[abbr + " resolves to " + GRAMMAR[abbr]] = function () {
    assert.deepStrictEqual(measureOf(abbr), [GRAMMAR[abbr]]);
  };
});

// Keys are the grammar spelling only; the spellings they replaced are gone.
var REMOVED = {
  kgpcm: "kg/m3",
  gpcc: "g/cm3",
  gpcm: "g/m3",
  tpcmm: "t/mm3",
  kgpl: "kg/l",
  gpl: "g/l",
  kgm2: "kg*m2",
  kgcm2: "kg*cm2",
  kgmm2: "kg*mm2",
  "J/sqm": "J/m2",
  "kJ/sqm": "kJ/m2",
  "/C": "1/C",
  "/K": "1/K",
  "N/m2": "Pa",
};
Object.keys(REMOVED).forEach(function (old) {
  tests[old + " is no longer a key (use " + REMOVED[old] + ")"] = function () {
    assert.deepStrictEqual(measureOf(old), []);
    assert.throws(function () {
      convert(1).from(old).to(REMOVED[old]);
    });
  };
});

tests["Density grammar keys keep their factors"] = function () {
  assert.strictEqual(convert(1).from("g/cm3").to("kg/m3"), 1000);
  assert.strictEqual(convert(1).from("kg/l").to("kg/m3"), 1000);
  assert.strictEqual(convert(1).from("g/m3").to("kg/m3"), 0.001);
  assert.strictEqual(convert(1).from("t/mm3").to("kg/m3"), 1e12);
};
tests["Mass-moment grammar keys keep their factors"] = function () {
  assert.strictEqual(convert(1).from("kg*cm2").to("kg*m2"), 1e-4);
  assert.strictEqual(convert(1).from("kg*mm2").to("kg*m2"), 1e-6);
};
tests["J-integral grammar keys keep their factors"] = function () {
  assert.strictEqual(convert(1).from("kJ/m2").to("J/m2"), 1000);
};
tests["LinearCTE grammar keys convert across systems"] = function () {
  assert.strictEqual(convert(1).from("1/C").to("1/K"), 1);
  assert.ok(Math.abs(convert(1).from("1/K").to("/F") - 5 / 9) < 1e-12);
};

// Clean LaTeX for the grammar keys.
var LATEX = {
  "kg/m3": "$kg/m^{3}$",
  "g/cm3": "$g/cm^{3}$",
  "kg*m2": "$kg\\cdot m^{2}$",
  "kg*cm2": "$kg\\cdot cm^{2}$",
  "kg*mm2": "$kg\\cdot mm^{2}$",
  "J/m2": "$J/m^{2}$",
  "kJ/m2": "$kJ/m^{2}$",
  "1/C": "$^{\\circ}C^{-1}$",
  "1/K": "$K^{-1}$",
};
tests["grammar keys render clean LaTeX in the registry"] = function () {
  var dist = path.join(__dirname, "..", "dist");
  var latexUnits = JSON.parse(fs.readFileSync(path.join(dist, "latexUnits.json"), "utf8")).latexUnits;
  var registry = JSON.parse(fs.readFileSync(path.join(dist, "units-registry.json"), "utf8"));
  Object.keys(LATEX).forEach(function (abbr) {
    assert.strictEqual(latexUnits[abbr], LATEX[abbr], abbr);
    assert.strictEqual(registry.measures[GRAMMAR[abbr]].units[abbr].latex, LATEX[abbr], abbr);
  });
};

module.exports = tests;
