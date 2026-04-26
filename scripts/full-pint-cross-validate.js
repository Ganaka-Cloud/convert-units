#!/usr/bin/env node
"use strict";
/**
 * full-pint-cross-validate.js
 * Cross-validates ~30 conversions across all measures against known Pint reference values.
 * Run with: node scripts/full-pint-cross-validate.js
 */

const convert = require("../lib");

let passed = 0;
let failed = 0;

function check(label, actual, expected, tolerance) {
  tolerance = tolerance || 1e-4; // 0.01% default tolerance
  var relErr = Math.abs(actual - expected) / Math.abs(expected);
  if (relErr <= tolerance) {
    console.log("  PASS  " + label + " => " + actual + " (expected " + expected + ")");
    passed++;
  } else {
    console.log("  FAIL  " + label + " => " + actual + " (expected " + expected + ", relErr=" + (relErr * 100).toFixed(4) + "%)");
    failed++;
  }
}

// ─── Acceleration ──────────────────────────────────────────────────────────────
console.log("\n[Acceleration]");
check("1 m/s2 -> ft/s2",    convert(1).from("m/s2").to("ft/s2"),    3.28084);
check("1 km/s2 -> m/s2",    convert(1).from("km/s2").to("m/s2"),    1000);
check("1 g-force -> m/s2",  convert(1).from("g-force").to("m/s2"),  9.80665);
check("1 ft/s2 -> m/s2",    convert(1).from("ft/s2").to("m/s2"),    0.3048);
check("1 cm/s2 -> m/s2",    convert(1).from("cm/s2").to("m/s2"),    0.01);
check("1 mm/s2 -> m/s2",    convert(1).from("mm/s2").to("m/s2"),    0.001);

// ─── Density ───────────────────────────────────────────────────────────────────
console.log("\n[Density]");
check("1 g/cm3 -> kg/m3",   convert(1).from("gpcc").to("kgpcm"),    1000);
check("1 kg/l -> kg/m3",    convert(1).from("kgpl").to("kgpcm"),    1000);
check("1 g/m3 -> kg/m3",    convert(1).from("gpcm").to("kgpcm"),    0.001);
check("1 lb/ft3 -> kg/m3",  convert(1).from("lbpcft").to("kgpcm"),  16.0185, 1e-3);
check("1 kg/m3 -> lb/ft3",  convert(1).from("kgpcm").to("lbpcft"),  0.062428, 1e-3);
check("1 lb/ft3 -> lb/in3", convert(1).from("lbpcft").to("lbpcin"), 1/1728, 1e-3);

// ─── Energy ────────────────────────────────────────────────────────────────────
console.log("\n[Energy]");
check("1 Btu(IT) -> J",     convert(1).from("Btu(IT)").to("J"),     1055.056, 1e-4);
check("1 J -> Btu(IT)",     convert(1).from("J").to("Btu(IT)"),     9.47817e-4, 1e-3);
check("1 cal -> J",         convert(1).from("cal").to("J"),         4.184);
check("1 kWh -> J",         convert(1).from("kWh").to("J"),         3600000);
check("1 J -> cal",         convert(1).from("J").to("cal"),         0.239006, 1e-3);

// ─── Specific Heat Capacity ────────────────────────────────────────────────────
console.log("\n[Specific Heat Capacity]");
check("1 J/kg/C -> Btu/lbm/F",  convert(1).from("J/kg/C").to("Btu/lbm/F"),  1/4186.8, 1e-3);
check("1 Btu/lbm/F -> J/kg/C",  convert(1).from("Btu/lbm/F").to("J/kg/C"),  4186.8, 1e-3);
check("1 kJ/kg/C -> J/kg/C",    convert(1).from("kJ/kg/C").to("J/kg/C"),     1000);

// ─── Length ────────────────────────────────────────────────────────────────────
console.log("\n[Length]");
check("1 m -> ft",          convert(1).from("m").to("ft"),          3.28084, 1e-4);
check("1 ft -> m",          convert(1).from("ft").to("m"),          0.3048, 1e-4);
check("1 km -> m",          convert(1).from("km").to("m"),          1000);
check("1 in -> cm",         convert(1).from("in").to("cm"),         2.54);

// ─── Mass ──────────────────────────────────────────────────────────────────────
console.log("\n[Mass]");
check("1 kg -> lb",         convert(1).from("kg").to("lb"),         2.20462, 1e-4);
check("1 lb -> kg",         convert(1).from("lb").to("kg"),         0.453592, 1e-3);

// ─── Force ─────────────────────────────────────────────────────────────────────
console.log("\n[Force]");
check("1 N -> lbf",         convert(1).from("N").to("lbf"),         0.224809, 1e-3);
check("1 lbf -> N",         convert(1).from("lbf").to("N"),         4.44822, 1e-3);

// ─── Pressure ──────────────────────────────────────────────────────────────────
console.log("\n[Pressure]");
check("1 Pa -> psi",        convert(1).from("Pa").to("psi"),        1.45038e-4, 1e-3);
check("1 atm -> Pa",        convert(1).from("atm").to("Pa"),        101325, 1e-4);
check("1 bar -> Pa",        convert(1).from("bar").to("Pa"),        100000);

// ─── Power ─────────────────────────────────────────────────────────────────────
console.log("\n[Power]");
check("1 W -> hp-mech",      convert(1).from("W").to("hp-mech"),     0.001341, 1e-2);
check("1 kW -> W",          convert(1).from("kW").to("W"),          1000);

// ─── Frequency ─────────────────────────────────────────────────────────────────
console.log("\n[Frequency]");
check("1 kHz -> Hz",        convert(1).from("kHz").to("Hz"),        1000);
check("1 MHz -> kHz",       convert(1).from("MHz").to("kHz"),       1000);

// ─── Magnetic Field ────────────────────────────────────────────────────────────
console.log("\n[Magnetic Field / Inductance]");
check("1 T -> G",           convert(1).from("T").to("G"),           10000);
check("1 Wb -> Mx",         convert(1).from("Wb").to("Mx"),         1e8, 1e-4);

// ─── Radiation Dose ────────────────────────────────────────────────────────────
console.log("\n[Radiation Absorbed Dose]");
check("1 Gy -> RAD",        convert(1).from("Gy").to("RAD"),        100);

// ─── Temperature (spot check) ──────────────────────────────────────────────────
console.log("\n[Temperature]");
var t100C = convert(100).from("C").to("F");
var tDiff  = Math.abs(t100C - 212);
if (tDiff < 0.001) {
  console.log("  PASS  100 C -> F => " + t100C + " (expected 212)");
  passed++;
} else {
  console.log("  FAIL  100 C -> F => " + t100C + " (expected 212)");
  failed++;
}

var tK = convert(0).from("C").to("K");
var tKDiff = Math.abs(tK - 273.15);
if (tKDiff < 0.001) {
  console.log("  PASS  0 C -> K => " + tK + " (expected 273.15)");
  passed++;
} else {
  console.log("  FAIL  0 C -> K => " + tK + " (expected 273.15)");
  failed++;
}

// ─── Summary ───────────────────────────────────────────────────────────────────
console.log("\n========================================");
console.log("Results: " + passed + " passed, " + failed + " failed");
if (failed > 0) {
  process.exit(1);
} else {
  console.log("All Pint cross-validation checks passed.");
}
