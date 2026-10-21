"use strict";
// Abbreviations that are intentionally defined in more than one measure, with the measures
// that share them. Units are identified by (measure, abbr); a call that gives only the abbr
// throws for these (see README, "Shared abbreviations"). Adding an entry here is a review
// decision: the check script and test/sharedAbbreviations.js fail on any other cross-measure share.
module.exports = {
  // LineLoad and Stiffness have the same dimension (force per length).
  "N/m": ["LineLoad", "Stiffness"],
  "N/mm": ["LineLoad", "Stiffness"],
  "kN/m": ["LineLoad", "Stiffness"],
  "lbf/in": ["LineLoad", "Stiffness"],
  "lbf/ft": ["LineLoad", "Stiffness"],
  // Temperature-difference reuses the symbols of Temperature: a change of 10 C is 10 K, but
  // 10 C as a point on the scale is 283.15 K.
  K: ["Temperature", "Temperature-difference"],
  C: ["Temperature", "Temperature-difference"],
  F: ["Temperature", "Temperature-difference"],
  R: ["Temperature", "Temperature-difference"],
};
