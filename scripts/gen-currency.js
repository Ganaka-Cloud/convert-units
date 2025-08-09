// Generates lib/definitions/currency.js from gbp.json
// Usage: node scripts/gen-currency.js

const fs = require('fs');
const path = require('path');

const INPUT = path.join(process.cwd(), 'gbp.json');
const OUTPUT = path.join(process.cwd(), 'lib', 'definitions', 'currency.js');

function main() {
  const raw = fs.readFileSync(INPUT, 'utf8');
  const json = JSON.parse(raw);
  const rates = json.gbp || {};

  const entries = Object.entries(rates)
    .filter(([code]) => /^[a-z]{3}$/.test(code))
    .map(([code, value]) => [code.toUpperCase(), Number(value)])
    .sort((a, b) => a[0].localeCompare(b[0]));

  const lines = [];
  lines.push('"use strict";');
  lines.push('var currency = {');
  for (const [code, value] of entries) {
    const toAnchor = code === 'GBP' ? 1 : 1 / value;
    lines.push(
      `  ${code}: { name: { singular: "${code}", plural: "${code}" }, to_anchor: ${toAnchor} },`
    );
  }
  if (lines[lines.length - 1].endsWith(',')) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  }
  lines.push('};');
  lines.push('');
  lines.push('module.exports = {');
  lines.push('  currency: currency,');
  lines.push('  _anchors: {');
  lines.push('    currency: {');
  lines.push('      unit: "GBP",');
  lines.push('      ratio: 1');
  lines.push('    }');
  lines.push('  }');
  lines.push('};');

  fs.writeFileSync(OUTPUT, lines.join('\n'));
  console.log(`Wrote ${OUTPUT} with ${entries.length} currencies.`);
}

main();
