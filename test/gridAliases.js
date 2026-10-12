"use strict";
var convert = require("../lib"),
  assert = require("assert"),
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
  "1/K": "LinearCTE",
  "1/C": "LinearCTE",
  "N/m2": "Pressure",
  "K/m": "Temperature-gradient",
  "S/m": "Electrical-conductivity",
  "1/Pa": "Compressibility",
  "m/V": "Piezo-coefficient",
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
};
Object.keys(GRAMMAR).forEach(function (abbr) {
  tests[abbr + " resolves to " + GRAMMAR[abbr]] = function () {
    assert.deepStrictEqual(measureOf(abbr), [GRAMMAR[abbr]]);
  };
});

// Aliases convert exactly like the key they mirror.
tests["kg/m3 equals kgpcm"] = function () {
  assert.strictEqual(convert(1).from("kg/m3").to("kgpcm"), 1);
  assert.strictEqual(convert(1).from("kg/m3").to("gpcc"), 0.001);
  assert.strictEqual(convert(2).from("gpcc").to("kg/m3"), 2000);
};
tests["N/m2 equals Pa"] = function () {
  assert.strictEqual(convert(1).from("N/m2").to("Pa"), 1);
  assert.strictEqual(convert(5).from("kPa").to("N/m2"), 5000);
  assert.strictEqual(convert(1).from("MPa").to("N/m2"), 1e6);
};
tests["1/K equals /K"] = function () {
  assert.strictEqual(convert(3).from("1/K").to("/K"), 3);
  assert.strictEqual(convert(1).from("/K").to("1/K"), 1);
  assert.strictEqual(convert(1).from("1/K").to("1/C"), convert(1).from("/K").to("/C"));
};
tests["1/C equals /C"] = function () {
  assert.strictEqual(convert(3).from("1/C").to("/C"), 3);
  assert.strictEqual(convert(1).from("1/C").to("1/K"), convert(1).from("/C").to("/K"));
  assert.strictEqual(convert(1).from("1/C").to("/F"), convert(1).from("/C").to("/F"));
};

// Every alias must convert exactly like the key it mirrors, to and from every other unit of its measure.
var ALIASES = require("../scripts/unit-aliases.json");
Object.keys(ALIASES).forEach(function (alias) {
  var key = ALIASES[alias];
  var measure = measureOf(key)[0];
  var others = convert().possibilities(measure);
  tests[alias + " converts like " + key] = function () {
    others.forEach(function (other) {
      assert.strictEqual(convert(7.5).from(alias).to(other), convert(7.5).from(key).to(other));
      assert.strictEqual(convert(7.5).from(other).to(alias), convert(7.5).from(other).to(key));
    });
  };
});

// The generated registry must render an alias exactly as its key.
var fs = require("fs"), path = require("path");
tests["aliases render like their keys in the registry"] = function () {
  var dist = path.join(__dirname, "..", "dist");
  var registry = JSON.parse(fs.readFileSync(path.join(dist, "units-registry.json"), "utf8"));
  var latexUnits = JSON.parse(fs.readFileSync(path.join(dist, "latexUnits.json"), "utf8")).latexUnits;
  var latexByAbbr = {};
  Object.keys(registry.measures).forEach(function (m) {
    Object.keys(registry.measures[m].units).forEach(function (u) {
      latexByAbbr[u] = registry.measures[m].units[u].latex;
    });
  });
  Object.keys(ALIASES).forEach(function (alias) {
    assert.strictEqual(latexByAbbr[alias], latexByAbbr[ALIASES[alias]], alias);
    assert.strictEqual(latexUnits[alias], latexUnits[ALIASES[alias]], alias);
  });
};

module.exports = tests;
