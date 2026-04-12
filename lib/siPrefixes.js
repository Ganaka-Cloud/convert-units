"use strict";

const SI_PREFIXES = [
  { symbol: "y", name: "yocto", factor: 1e-24 },
  { symbol: "z", name: "zepto", factor: 1e-21 },
  { symbol: "a", name: "atto", factor: 1e-18 },
  { symbol: "f", name: "femto", factor: 1e-15 },
  { symbol: "p", name: "pico", factor: 1e-12 },
  { symbol: "n", name: "nano", factor: 1e-9 },
  { symbol: "μ", name: "micro", factor: 1e-6 },
  { symbol: "m", name: "milli", factor: 1e-3 },
  { symbol: "c", name: "centi", factor: 1e-2 },
  { symbol: "d", name: "deci", factor: 1e-1 },
  { symbol: "da", name: "deca", factor: 1e1 },
  { symbol: "h", name: "hecto", factor: 1e2 },
  { symbol: "k", name: "kilo", factor: 1e3 },
  { symbol: "M", name: "mega", factor: 1e6 },
  { symbol: "G", name: "giga", factor: 1e9 },
  { symbol: "T", name: "tera", factor: 1e12 },
  { symbol: "P", name: "peta", factor: 1e15 },
  { symbol: "E", name: "exa", factor: 1e18 },
];

function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Expands a base unit into a flat object of unit definitions with SI prefixes.
 *
 * @param {string} baseAbbr - Abbreviation of the base unit (e.g. "N")
 * @param {string} baseName - Name of the base unit (e.g. "newton")
 * @param {number} baseToAnchor - The to_anchor value of the base unit (e.g. 1)
 * @param {string[]} prefixes - Array of prefix symbols to include (e.g. ["k", "m", "μ"])
 * @param {object} [options] - Optional overrides
 * @param {string} [options.pluralName] - Irregular plural base name (e.g. "feet")
 * @param {string} [options.baseLatex] - LaTeX symbol override for base unit (defaults to baseAbbr)
 * @returns {object} Flat object of unit definitions keyed by abbreviation
 */
function expandSI(baseAbbr, baseName, baseToAnchor, prefixes, options) {
  options = options || {};
  const baseLatex = options.baseLatex || baseAbbr;

  const result = {};

  // Include the base unit itself
  result[baseAbbr] = {
    name: {
      singular: capitalize(baseName.toLowerCase()),
      plural: options.pluralName
        ? capitalize(options.pluralName.toLowerCase())
        : capitalize(baseName.toLowerCase()) + "s",
    },
    to_anchor: baseToAnchor,
    _latex: "$" + baseLatex + "$",
  };

  // Build a lookup map from symbol to prefix object
  const prefixMap = {};
  for (const p of SI_PREFIXES) {
    prefixMap[p.symbol] = p;
  }

  for (const symbol of prefixes) {
    const prefix = prefixMap[symbol];
    if (!prefix) {
      throw new Error("Unknown SI prefix symbol: " + symbol);
    }

    const abbr = symbol + baseAbbr;
    const singularBase = capitalize(prefix.name.toLowerCase() + baseName.toLowerCase());
    const singular = singularBase;
    const plural = options.pluralName
      ? capitalize(prefix.name.toLowerCase() + options.pluralName.toLowerCase())
      : singular + "s";

    let latex;
    if (symbol === "μ") {
      latex = "${\\mu}" + baseLatex + "$";
    } else {
      latex = "$" + symbol + baseLatex + "$";
    }

    result[abbr] = {
      name: { singular, plural },
      to_anchor: baseToAnchor * prefix.factor,
      _latex: latex,
    };
  }

  return result;
}

module.exports = { expandSI, SI_PREFIXES };
