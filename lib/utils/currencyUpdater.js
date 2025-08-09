"use strict";

const https = require("https");
const fs = require("fs");
const path = require("path");

const GBP_RATES_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/gbp.json";
const OUTPUT_FILE = path.resolve(__dirname, "../definitions/currency.js");

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`HTTP ${res.statusCode} when fetching ${url}`));
          res.resume();
          return;
        }
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (err) {
            reject(err);
          }
        });
      })
      .on("error", reject)
      .end();
  });
}

function buildCurrencyModuleContent(rates) {
  const entries = Object.entries(rates)
    .filter(([code]) => /^[a-z]{3}$/.test(code))
    .map(([code, value]) => [code.toUpperCase(), Number(value)])
    .sort((a, b) => a[0].localeCompare(b[0]));

  const lines = [];
  lines.push('"use strict";');
  lines.push("var currency = {");
  for (const [code, value] of entries) {
    const toAnchor = code === "GBP" ? 1 : 1 / value;
    lines.push(
      `  ${code}: { name: { singular: "${code}", plural: "${code}" }, to_anchor: ${toAnchor} },`
    );
  }
  if (lines[lines.length - 1].endsWith(",")) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  }
  lines.push("};");
  lines.push("");
  lines.push("module.exports = {");
  lines.push("  currency: currency,");
  lines.push("  _anchors: {");
  lines.push("    currency: {");
  lines.push('      unit: "GBP",');
  lines.push("      ratio: 1");
  lines.push("    }");
  lines.push("  }");
  lines.push("};");

  return lines.join("\n");
}

async function updateCurrencyDefinitions() {
  const json = await fetchJson(GBP_RATES_URL);
  if (!json || !json.gbp) {
    throw new Error("Malformed response: missing gbp property");
  }
  const content = buildCurrencyModuleContent(json.gbp);

  await fs.promises.writeFile(OUTPUT_FILE, content, "utf8");
  return { outputFile: OUTPUT_FILE, count: Object.keys(json.gbp).length };
}

function computeNextRunDelayMs(now = new Date()) {
  // Next 4:00 AM local time
  const next = new Date(now.getTime());
  next.setHours(4, 0, 0, 0);
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  return next.getTime() - now.getTime();
}

function startCurrencyUpdateScheduler({ onSuccess, onError } = {}) {
  let timer = null;

  const scheduleNext = () => {
    const delay = computeNextRunDelayMs(new Date());
    timer = setTimeout(async () => {
      try {
        const result = await updateCurrencyDefinitions();
        if (typeof onSuccess === "function") onSuccess(result);
      } catch (err) {
        if (typeof onError === "function") onError(err);
        // Swallow to keep scheduler alive
      } finally {
        scheduleNext(); // re-schedule for the next 4 AM (handles DST properly)
      }
    }, delay);
  };

  // Run immediately on initialization
  updateCurrencyDefinitions()
    .then((result) => {
      if (typeof onSuccess === "function") onSuccess(result);
    })
    .catch((err) => {
      if (typeof onError === "function") onError(err);
    })
    .finally(() => {
      scheduleNext();
    });

  return () => {
    if (timer) clearTimeout(timer);
  };
}

module.exports = {
  updateCurrencyDefinitions,
  startCurrencyUpdateScheduler,
  _computeNextRunDelayMs: computeNextRunDelayMs,
};
