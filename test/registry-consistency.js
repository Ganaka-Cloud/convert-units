"use strict";

var assert = require("assert");
var fs = require("fs");
var path = require("path");
var convert = require("../lib");

var tests = {};

tests["dist/units-registry.json exists"] = function () {
  var registryPath = path.join(__dirname, "..", "dist", "units-registry.json");
  assert.ok(fs.existsSync(registryPath), "dist/units-registry.json should exist");
};

tests["registry measure count matches convert().measures().length"] = function () {
  var registryPath = path.join(__dirname, "..", "dist", "units-registry.json");
  var registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  var expectedMeasures = convert().measures().length;
  var actualMeasures = Object.keys(registry.measures).length;
  assert.strictEqual(
    actualMeasures,
    expectedMeasures,
    "Registry measure count should match convert().measures().length"
  );
};

tests["registry unit count matches convert().list().length"] = function () {
  var registryPath = path.join(__dirname, "..", "dist", "units-registry.json");
  var registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  var expectedUnits = convert().list().length;
  var actualUnits = 0;
  Object.values(registry.measures).forEach(function (m) {
    actualUnits += Object.keys(m.units).length;
  });
  assert.strictEqual(
    actualUnits,
    expectedUnits,
    "Registry unit count should match convert().list().length"
  );
};

tests["registry has version field"] = function () {
  var registryPath = path.join(__dirname, "..", "dist", "units-registry.json");
  var registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  assert.ok(registry.version, "Registry should have a version field");
};

tests["registry has generatedAt field"] = function () {
  var registryPath = path.join(__dirname, "..", "dist", "units-registry.json");
  var registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
  assert.ok(registry.generatedAt, "Registry should have a generatedAt field");
};

tests["dist/latexUnits.json exists and has latexUnits key"] = function () {
  var latexPath = path.join(__dirname, "..", "dist", "latexUnits.json");
  assert.ok(fs.existsSync(latexPath), "dist/latexUnits.json should exist");
  var data = JSON.parse(fs.readFileSync(latexPath, "utf8"));
  assert.ok(data.latexUnits, "latexUnits.json should have latexUnits key");
};

tests["dist/latexUnitTypes.json exists and has latexUnitTypes key"] = function () {
  var typesPath = path.join(__dirname, "..", "dist", "latexUnitTypes.json");
  assert.ok(fs.existsSync(typesPath), "dist/latexUnitTypes.json should exist");
  var data = JSON.parse(fs.readFileSync(typesPath, "utf8"));
  assert.ok(Array.isArray(data.latexUnitTypes), "latexUnitTypes should be an array");
};

tests["latexUnitTypes has placeholder entries at id 0 and 1"] = function () {
  var typesPath = path.join(__dirname, "..", "dist", "latexUnitTypes.json");
  var data = JSON.parse(fs.readFileSync(typesPath, "utf8"));
  var types = data.latexUnitTypes;
  assert.strictEqual(types[0].id, 0);
  assert.strictEqual(types[0].name, "-Select-");
  assert.strictEqual(types[1].id, 1);
  assert.strictEqual(types[1].name, "--");
};

tests["latexUnits mu-prefixed units use mu notation"] = function () {
  var latexPath = path.join(__dirname, "..", "dist", "latexUnits.json");
  var data = JSON.parse(fs.readFileSync(latexPath, "utf8"));
  var latexUnits = data.latexUnits;
  // μm (micrometer) should use mu notation
  if (latexUnits["μm"]) {
    assert.ok(
      latexUnits["μm"].indexOf("{\\mu}") !== -1,
      "μm latex should contain {\\mu}"
    );
  }
};

module.exports = tests;
