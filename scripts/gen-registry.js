"use strict";

/**
 * gen-registry.js
 * Generates dist/units-registry.json, dist/latexUnits.json, and dist/latexUnitTypes.json
 * for use by the Go DimEngine and LaTeX rendering pipelines.
 */

const fs = require("fs");
const path = require("path");
const convert = require("../lib");

// Output directory: pass as CLI argument or defaults to ../dist
const DIST_DIR = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(__dirname, "..", "dist");
const pkg = require("../package.json");
const VERSION = pkg.version;

// Ensure dist/ exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Load all definition files from lib/definitions/
const DEFS_DIR = path.join(__dirname, "..", "lib", "definitions");
const definitionFiles = fs.readdirSync(DEFS_DIR).filter((f) => f.endsWith(".js"));

// Build a map: measure name (from lib/index.js) -> raw definition object
// We do this by requiring lib/index.js indirectly — we already have the measures
// accessible via convert().measures() (names) and convert().list() (unit metadata).
// For raw to_anchor and _anchors, we require each definition file directly.

// Build definitionByFile: basename -> raw def
const definitionByFile = {};
definitionFiles.forEach((f) => {
  const name = path.basename(f, ".js");
  definitionByFile[name] = require(path.join(DEFS_DIR, f));
});

// Map measure name to definition by matching require paths in lib/index.js
// We read lib/index.js to extract the measure->file mapping
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "lib", "index.js"), "utf8");
const measureToFile = {};
const measureRegex = /^\s*["']?([\w\-]+)["']?\s*:\s*require\(["']\.\/definitions\/([\w\-]+)["']\)/gm;
let m;
while ((m = measureRegex.exec(indexSrc)) !== null) {
  measureToFile[m[1]] = m[2];
}

// Helper: generate LaTeX string for a unit abbreviation
function latexFor(abbr) {
  if (abbr === "--") return "$--$";
  if (abbr.startsWith("μ")) {
    const rest = abbr.slice(1); // strip μ
    return "${\\mu}" + rest + "$";
  }
  return "$" + abbr + "$";
}

// ─── Build units-registry.json ──────────────────────────────────────────────

const allUnits = convert().list();
const allMeasures = convert().measures();

const registry = {
  version: VERSION,
  generatedAt: new Date().toISOString(),
  measures: {},
};

allMeasures.forEach((measureName) => {
  const fileName = measureToFile[measureName];
  const rawDef = fileName ? definitionByFile[fileName] : null;

  // Collect systems for this measure
  const systems = new Set();
  const unitsMap = {};

  allUnits
    .filter((u) => u.measure === measureName)
    .forEach((u) => {
      systems.add(u.system);

      let to_anchor = null;
      if (rawDef && rawDef[u.system] && rawDef[u.system][u.abbr]) {
        to_anchor = rawDef[u.system][u.abbr].to_anchor;
      }

      const latex = u._latex || latexFor(u.abbr);

      unitsMap[u.abbr] = {
        system: u.system,
        singular: u.singular,
        plural: u.plural,
        to_anchor: to_anchor,
        latex: latex,
      };
    });

  // Anchors
  const anchors = rawDef ? (rawDef._anchors || {}) : {};

  registry.measures[measureName] = {
    systems: Array.from(systems),
    units: unitsMap,
    anchors: anchors,
  };
});

fs.writeFileSync(
  path.join(DIST_DIR, "units-registry.json"),
  JSON.stringify(registry, null, 2),
  "utf8"
);
console.log("Generated dist/units-registry.json");

// ─── Build latexUnits.json ───────────────────────────────────────────────────

const latexUnitsMap = { "--": "$--$" };
allUnits.forEach((u) => {
  latexUnitsMap[u.abbr] = u._latex || latexFor(u.abbr);
});

fs.writeFileSync(
  path.join(DIST_DIR, "latexUnits.json"),
  JSON.stringify({ latexUnits: latexUnitsMap }, null, 2),
  "utf8"
);
console.log("Generated dist/latexUnits.json");

// ─── Build latexUnitTypes.json ───────────────────────────────────────────────

// id 0: placeholder -Select-
// id 1: placeholder --
// id 2+: each measure
const latexUnitTypes = [
  { id: 0, name: "-Select-", siunit: "--", imperialunit: "--" },
  { id: 1, name: "--", siunit: "--", imperialunit: "--" },
];

allMeasures.forEach((measureName, idx) => {
  const fileName = measureToFile[measureName];
  const rawDef = fileName ? definitionByFile[fileName] : null;
  const anchors = rawDef ? rawDef._anchors || {} : {};

  // Find metric/SI anchor unit
  let siunit = "--";
  for (const sys of ["metric", "SI"]) {
    if (anchors[sys] && anchors[sys].unit) {
      siunit = anchors[sys].unit;
      break;
    }
  }

  // Find imperial/other-system anchor unit
  let imperialunit = "--";
  for (const sys of ["imperial", "us", "US", "legacy", "cgs", "CGS"]) {
    if (anchors[sys] && anchors[sys].unit) {
      imperialunit = anchors[sys].unit;
      break;
    }
  }

  latexUnitTypes.push({
    id: idx + 2,
    name: measureName,
    siunit: siunit,
    imperialunit: imperialunit,
  });
});

fs.writeFileSync(
  path.join(DIST_DIR, "latexUnitTypes.json"),
  JSON.stringify({ latexUnitTypes: latexUnitTypes }, null, 2),
  "utf8"
);
console.log("Generated dist/latexUnitTypes.json");

// Summary
console.log(
  "Registry: " + allMeasures.length + " measures, " + allUnits.length + " units"
);
