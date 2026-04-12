var assert = require("assert");
var siPrefixes = require("../lib/siPrefixes");
var expandSI = siPrefixes.expandSI;
var tests = {};

// Base unit generation
tests["base unit is included"] = function () {
  var result = expandSI("N", "newton", 1, ["k"]);
  assert.ok(result["N"] !== undefined, "base unit N should be present");
};

tests["base unit singular is capitalized base name"] = function () {
  var result = expandSI("N", "newton", 1, []);
  assert.strictEqual(result["N"].name.singular, "Newton");
};

tests["base unit plural is singular + s"] = function () {
  var result = expandSI("N", "newton", 1, []);
  assert.strictEqual(result["N"].name.plural, "Newtons");
};

tests["base unit to_anchor equals baseToAnchor"] = function () {
  var result = expandSI("N", "newton", 1, []);
  assert.strictEqual(result["N"].to_anchor, 1);
};

tests["base unit latex uses baseAbbr"] = function () {
  var result = expandSI("N", "newton", 1, []);
  assert.strictEqual(result["N"]._latex, "$N$");
};

// Kilo prefix
tests["kilo prefix generates kN unit"] = function () {
  var result = expandSI("N", "newton", 1, ["k"]);
  assert.ok(result["kN"] !== undefined, "kN should be present");
};

tests["kilo prefix singular is Kilonewton"] = function () {
  var result = expandSI("N", "newton", 1, ["k"]);
  assert.strictEqual(result["kN"].name.singular, "Kilonewton");
};

tests["kilo prefix plural is Kilonewtons"] = function () {
  var result = expandSI("N", "newton", 1, ["k"]);
  assert.strictEqual(result["kN"].name.plural, "Kilonewtons");
};

tests["kilo prefix to_anchor is 1e3"] = function () {
  var result = expandSI("N", "newton", 1, ["k"]);
  assert.strictEqual(result["kN"].to_anchor, 1e3);
};

tests["kilo prefix latex is $kN$"] = function () {
  var result = expandSI("N", "newton", 1, ["k"]);
  assert.strictEqual(result["kN"]._latex, "$kN$");
};

// Milli prefix
tests["milli prefix generates mN unit"] = function () {
  var result = expandSI("N", "newton", 1, ["m"]);
  assert.ok(result["mN"] !== undefined, "mN should be present");
};

tests["milli prefix to_anchor is 1e-3"] = function () {
  var result = expandSI("N", "newton", 1, ["m"]);
  assert.strictEqual(result["mN"].to_anchor, 1e-3);
};

tests["milli prefix singular is Millinewton"] = function () {
  var result = expandSI("N", "newton", 1, ["m"]);
  assert.strictEqual(result["mN"].name.singular, "Millinewton");
};

tests["milli prefix latex is $mN$"] = function () {
  var result = expandSI("N", "newton", 1, ["m"]);
  assert.strictEqual(result["mN"]._latex, "$mN$");
};

// Micro prefix - special latex
tests["micro prefix generates μN unit"] = function () {
  var result = expandSI("N", "newton", 1, ["μ"]);
  assert.ok(result["μN"] !== undefined, "μN should be present");
};

tests["micro prefix latex uses mu notation"] = function () {
  var result = expandSI("N", "newton", 1, ["μ"]);
  assert.strictEqual(result["μN"]._latex, "${\\mu}N$");
};

tests["micro prefix to_anchor is 1e-6"] = function () {
  var result = expandSI("N", "newton", 1, ["μ"]);
  assert.strictEqual(result["μN"].to_anchor, 1e-6);
};

tests["micro prefix singular is Micronewton"] = function () {
  var result = expandSI("N", "newton", 1, ["μ"]);
  assert.strictEqual(result["μN"].name.singular, "Micronewton");
};

// Non-1 baseToAnchor
tests["non-1 baseToAnchor scales prefix to_anchor correctly"] = function () {
  // base to_anchor = 1000, kilo => 1000 * 1e3 = 1e6
  var result = expandSI("g", "gram", 0.001, ["k"]);
  assert.strictEqual(result["kg"].to_anchor, 0.001 * 1e3);
};

tests["non-1 baseToAnchor base unit to_anchor correct"] = function () {
  var result = expandSI("g", "gram", 0.001, []);
  assert.strictEqual(result["g"].to_anchor, 0.001);
};

// Irregular plural via options.pluralName
tests["irregular plural on base unit"] = function () {
  var result = expandSI("m", "metre", 1, [], { pluralName: "metres" });
  assert.strictEqual(result["m"].name.plural, "Metres");
};

tests["irregular plural on prefixed unit"] = function () {
  var result = expandSI("m", "metre", 1, ["k"], { pluralName: "metres" });
  assert.strictEqual(result["km"].name.plural, "Kilometres");
};

// baseLatex option
tests["baseLatex option overrides latex symbol for base"] = function () {
  var result = expandSI("Pa", "pascal", 1, [], { baseLatex: "\\text{Pa}" });
  assert.strictEqual(result["Pa"]._latex, "$\\text{Pa}$");
};

tests["baseLatex option overrides latex symbol for prefixed unit"] = function () {
  var result = expandSI("Pa", "pascal", 1, ["k"], { baseLatex: "\\text{Pa}" });
  assert.strictEqual(result["kPa"]._latex, "$k\\text{Pa}$");
};

// Deca prefix (da — two character symbol)
tests["deca prefix generates daN unit"] = function () {
  var result = expandSI("N", "newton", 1, ["da"]);
  assert.ok(result["daN"] !== undefined, "daN should be present");
};

tests["deca prefix to_anchor is 1e1"] = function () {
  var result = expandSI("N", "newton", 1, ["da"]);
  assert.strictEqual(result["daN"].to_anchor, 10);
};

tests["deca prefix singular is Decanewton"] = function () {
  var result = expandSI("N", "newton", 1, ["da"]);
  assert.strictEqual(result["daN"].name.singular, "Decanewton");
};

tests["deca prefix latex is $daN$"] = function () {
  var result = expandSI("N", "newton", 1, ["da"]);
  assert.strictEqual(result["daN"]._latex, "$daN$");
};

module.exports = tests;
