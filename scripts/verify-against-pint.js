"use strict";

/**
 * verify-against-pint.js
 * Compares convert-units to_anchor values against a Pint-generated reference.
 *
 * Prerequisites:
 *   1. python scripts/gen-pint-reference.py   (requires: pip install pint)
 *   2. node scripts/verify-against-pint.js
 *
 * Exit codes:
 *   0 — all units EXACT or ACCEPTABLE
 *   1 — any unit classified REVIEW or WRONG
 */

const fs = require("fs");
const path = require("path");
const convert = require("../lib");

const REFERENCE_PATH = path.join(__dirname, "pint-reference.json");

if (!fs.existsSync(REFERENCE_PATH)) {
  console.error(
    "ERROR: scripts/pint-reference.json not found.\n" +
      "Run: python scripts/gen-pint-reference.py"
  );
  process.exit(1);
}

const reference = JSON.parse(fs.readFileSync(REFERENCE_PATH, "utf8"));

// Build a lookup: abbr -> to_anchor from convert-units
const allUnits = convert().list();
const unitMap = {};
allUnits.forEach((u) => {
  unitMap[u.abbr] = u;
});

// Load raw definitions to get to_anchor values
const DEFS_DIR = path.join(__dirname, "..", "lib", "definitions");
const indexSrc = fs.readFileSync(path.join(__dirname, "..", "lib", "index.js"), "utf8");

// Build measure->file map
const measureToFile = {};
const measureRegex =
  /^\s*["']?([\w\-]+)["']?\s*:\s*require\(["']\.\/definitions\/([\w\-]+)["']\)/gm;
let m;
while ((m = measureRegex.exec(indexSrc)) !== null) {
  measureToFile[m[1]] = m[2];
}

const defCache = {};
function getDef(measureName) {
  if (!defCache[measureName]) {
    const fileName = measureToFile[measureName];
    if (!fileName) return null;
    defCache[measureName] = require(path.join(DEFS_DIR, fileName));
  }
  return defCache[measureName];
}

const EXACT_THRESHOLD = 1e-12;
const ACCEPTABLE_THRESHOLD = 1e-6;
const REVIEW_THRESHOLD = 1e-3;

const results = [];
let exitCode = 0;

Object.entries(reference).forEach(([abbr, ref]) => {
  if (ref.error || ref.to_anchor === null) {
    results.push({ abbr, status: "SKIP", note: ref.error || "no pint value" });
    return;
  }

  const unitInfo = unitMap[abbr];
  if (!unitInfo) {
    results.push({ abbr, status: "SKIP", note: "unit not found in convert-units" });
    return;
  }

  const rawDef = getDef(unitInfo.measure);
  if (!rawDef || !rawDef[unitInfo.system] || !rawDef[unitInfo.system][abbr]) {
    results.push({ abbr, status: "SKIP", note: "raw definition not accessible" });
    return;
  }

  const cvToAnchor = rawDef[unitInfo.system][abbr].to_anchor;
  const pintToAnchor = ref.to_anchor;

  const relErr = Math.abs(cvToAnchor - pintToAnchor) / Math.abs(pintToAnchor);

  let status;
  if (relErr <= EXACT_THRESHOLD) {
    status = "EXACT";
  } else if (relErr <= ACCEPTABLE_THRESHOLD) {
    status = "ACCEPTABLE";
  } else if (relErr <= REVIEW_THRESHOLD) {
    status = "REVIEW";
    exitCode = 1;
  } else {
    status = "WRONG";
    exitCode = 1;
  }

  results.push({
    abbr,
    status,
    cvToAnchor,
    pintToAnchor,
    relErr,
  });
});

// Print table
const pad = (s, n) => String(s).padEnd(n);
console.log(
  pad("Abbr", 10) +
    pad("Status", 12) +
    pad("CV to_anchor", 20) +
    pad("Pint to_anchor", 20) +
    "RelErr"
);
console.log("-".repeat(75));

results.forEach((r) => {
  if (r.status === "SKIP") {
    console.log(pad(r.abbr, 10) + pad("SKIP", 12) + "  " + r.note);
  } else {
    console.log(
      pad(r.abbr, 10) +
        pad(r.status, 12) +
        pad(r.cvToAnchor, 20) +
        pad(r.pintToAnchor, 20) +
        r.relErr.toExponential(3)
    );
  }
});

console.log("\n--- Summary ---");
const counts = { EXACT: 0, ACCEPTABLE: 0, REVIEW: 0, WRONG: 0, SKIP: 0 };
results.forEach((r) => {
  counts[r.status] = (counts[r.status] || 0) + 1;
});
Object.entries(counts).forEach(([k, v]) => console.log(k + ": " + v));

if (exitCode !== 0) {
  console.error("\nFAIL: Some units require review (REVIEW or WRONG classification)");
}

process.exit(exitCode);
