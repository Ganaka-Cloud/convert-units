"use strict";

const convert = require("../lib");

const allUnits = convert().list();

// Build map: abbreviation -> array of measure names
const abbrToMeasures = {};
for (const unit of allUnits) {
  if (!abbrToMeasures[unit.abbr]) {
    abbrToMeasures[unit.abbr] = [];
  }
  if (!abbrToMeasures[unit.abbr].includes(unit.measure)) {
    abbrToMeasures[unit.abbr].push(unit.measure);
  }
}

// Find collisions: abbreviations appearing in more than one measure
const collisions = Object.entries(abbrToMeasures).filter(
  ([, measures]) => measures.length > 1
);

if (collisions.length === 0) {
  console.log("No abbreviation collisions found.");
  process.exit(0);
} else {
  console.error("Abbreviation collisions detected:");
  for (const [abbr, measures] of collisions) {
    console.error(`  "${abbr}" appears in: ${measures.join(", ")}`);
  }
  process.exit(1);
}
