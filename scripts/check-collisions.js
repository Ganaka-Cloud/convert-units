"use strict";

const convert = require("../lib");
const shared = require("./sharedAbbreviations");

const allUnits = convert().list();

// measure -> abbr -> count (a duplicate inside one measure, across its systems, is a bug)
const perMeasure = {};
// abbr -> measures that define it
const abbrToMeasures = {};
for (const unit of allUnits) {
  const m = (perMeasure[unit.measure] = perMeasure[unit.measure] || {});
  m[unit.abbr] = (m[unit.abbr] || 0) + 1;
  const list = (abbrToMeasures[unit.abbr] = abbrToMeasures[unit.abbr] || []);
  if (!list.includes(unit.measure)) list.push(unit.measure);
}

const problems = [];
for (const [measure, abbrs] of Object.entries(perMeasure)) {
  for (const [abbr, n] of Object.entries(abbrs)) {
    if (n > 1) problems.push(`"${abbr}" is defined ${n} times in ${measure}`);
  }
}
for (const [abbr, measures] of Object.entries(abbrToMeasures)) {
  if (measures.length < 2) continue;
  const expected = shared[abbr];
  if (!expected || expected.slice().sort().join() !== measures.slice().sort().join()) {
    problems.push(
      `"${abbr}" is shared by ${measures.join(", ")} but is not listed in scripts/sharedAbbreviations.js`
    );
  }
}
for (const [abbr, measures] of Object.entries(shared)) {
  if ((abbrToMeasures[abbr] || []).length < 2) {
    problems.push(`"${abbr}" is listed as shared (${measures.join(", ")}) but no longer is`);
  }
}

if (problems.length === 0) {
  console.log("No abbreviation collisions found.");
  process.exit(0);
}
console.error("Abbreviation problems detected:");
for (const p of problems) console.error("  " + p);
process.exit(1);
