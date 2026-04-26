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

// Density unit abbreviations are opaque (e.g. kgpcm, gpcc, tlpcy) and cannot
// be decoded generically.  This lookup table maps them to proper LaTeX strings.
const DENSITY_LATEX = {
  "gpcc":   "$g/cm^{3}$",
  "gpcm":   "$g/m^{3}$",
  "kgpcm":  "$kg/m^{3}$",
  "tpcmm":  "$t/mm^{3}$",
  "kgpl":   "$kg/l$",
  "gpl":    "$g/l$",
  "ozpcin": "$oz/in^{3}$",
  "ozpcft": "$oz/ft^{3}$",
  "ozspg":  "$oz/gal_{US}$",
  "ozlpg":  "$oz/gal_{UK}$",
  "tspcy":  "$ton_{short}/yd^{3}$",
  "tlpcy":  "$ton_{long}/yd^{3}$",
  "lbpcin": "$lb/in^{3}$",
  "lbpcft": "$lb/ft^{3}$",
  "lbpcy":  "$lb/yd^{3}$",
  "lbspg":  "$lb/gal_{US}$",
  "lblpg":  "$lb/gal_{UK}$",
  "slpcft": "$slug/ft^{3}$",
};

// Helper: generate LaTeX string for a unit abbreviation
// Follows ganaka-ui conventions:
//   - Trailing digits become superscripts: m2 -> m^{2}, m3 -> m^{3}
//   - / becomes dot + negative exponent: l/h -> l.h^{-1}, m3/s -> m^{3}.s^{-1}
//   - μ prefix: μm -> {\\mu}m
//   - Section modulus z prefix: zm3 -> Z-m^{3}
//   - Temperature degrees: /K -> /^{\\circ}K, /C -> /^{\\circ}C, /F -> /^{\\circ}F, /R -> /^{\\circ}R
function latexFor(abbr) {
  // Check density lookup first (opaque abbreviations)
  if (Object.prototype.hasOwnProperty.call(DENSITY_LATEX, abbr)) {
    return DENSITY_LATEX[abbr];
  }
  if (abbr === "--") return "$--$";

  // Handle micro prefix first — strip μ, process the rest, then prepend
  var hasMicro = false;
  var work = abbr;
  if (work.startsWith("μ")) {
    hasMicro = true;
    work = work.slice(1);
  }

  // Handle section modulus z-prefix: zm3 -> Z-m^{3}
  if (/^z(m|cm|mm|in|ft)\d+$/.test(work)) {
    work = "Z-" + work.slice(1);
  }

  // Split on / to handle rate units (numerator/denominator)
  var parts = work.split("/");
  var latexParts = [];

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i];

    // Add degree symbol before temperature letters in denominators
    // e.g., K -> ^{\\circ}K, C -> ^{\\circ}C (only when it's a denominator, i.e., after /)
    if (i > 0 && /^[KCFR]\d*$/.test(part)) {
      part = "^{\\circ}" + part;
    }

    // Convert trailing digits to superscripts ONLY for realistic exponents (2, 3, 4)
    // This avoids treating constant subscripts as powers: a0 (Bohr radius) stays as a0,
    // c0 (speed of light) stays as c0, etc. Single digits 2/3/4 are used for area,
    // volume, and area-moment dimensions.
    part = part.replace(/(\D)([234])$/g, function (_, prefix, digits) {
      return prefix + "^{" + digits + "}";
    });

    // For denominators (i > 0), use negative exponent notation
    if (i > 0) {
      // If the part has a numeric superscript, make it negative: ^{4} -> ^{-4}
      if (/\^{\d+}/.test(part)) {
        part = part.replace(/\^{(\d+)}/g, "^{-$1}");
      } else {
        // No numeric superscript — append ^{-1}
        part = part + "^{-1}";
      }
    }

    latexParts.push(part);
  }

  // Join with dot separator (ganaka-ui convention for compound units)
  var result = latexParts.join(".");

  // Prepend micro if needed
  if (hasMicro) {
    result = "{\\mu}" + result;
  }

  return "$" + result + "$";
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
console.log("Generated " + path.join(DIST_DIR, "units-registry.json"));

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
console.log("Generated " + path.join(DIST_DIR, "latexUnits.json"));

// ─── Build latexUnitTypes.json ───────────────────────────────────────────────

// id 0: placeholder -Select-
// id 1: placeholder --
// id 2+: each measure
const latexUnitTypes = [
  { id: 0, name: "-Select-", siunit: "--", imperialunit: "--" },
  { id: 1, name: "--", siunit: "--", imperialunit: "--" },
];

// Overrides for measures where the library's internal anchor differs from the
// true SI base unit that ganaka-ui's backend expects for storage and calculation.
// The library's anchor (e.g., kPa) is correct for conversion math; this map
// provides the canonical SI base unit (Pa) for display/storage.
const SI_BASE_OVERRIDES = {
  Acceleration: { imperialunit: "ft/s2" }, // explicit override to ensure ft/s2 is used as imperial display unit
  Mass: { siunit: "kg" }, // anchor is g; SI base is kg
  Volume: { siunit: "m3" }, // anchor is l; SI base is m3
  Speed: { siunit: "m/s", imperialunit: "ft/s" }, // anchor is km/h; SI base is m/s
  Pressure: { siunit: "Pa" }, // anchor is kPa; SI base is Pa
  VolumeFlowRate: { siunit: "m3/s" }, // anchor is l/s; SI base is m3/s
};

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

  // Apply SI base unit overrides for ganaka-ui backend compatibility
  const override = SI_BASE_OVERRIDES[measureName];
  if (override) {
    if (override.siunit) siunit = override.siunit;
    if (override.imperialunit) imperialunit = override.imperialunit;
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
console.log("Generated " + path.join(DIST_DIR, "latexUnitTypes.json"));

// Summary
console.log(
  "Registry: " + allMeasures.length + " measures, " + allUnits.length + " units"
);
