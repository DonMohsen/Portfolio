const fs = require("fs");
const lighthouse = require("lighthouse").default;
const chromeLauncher = require("chrome-launcher");

const URL = process.argv[2] || "http://localhost:3000/en";
const OUT = process.argv[3] || "";

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });

  const options = {
    logLevel: "error",
    output: "json",
    onlyCategories: ["performance"],
    port: chrome.port,
    formFactor: "mobile",
    screenEmulation: {
      mobile: true,
      width: 412,
      height: 823,
      deviceScaleFactor: 2.625,
      disabled: false,
    },
    throttling: {
      rrtMs: 150,
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 150 * 3.75,
      downloadThroughputKbps: 1638.4 * 0.9,
      uploadThroughputKbps: 675 * 0.9,
    },
  };

  const runnerResult = await lighthouse(URL, options);
  const { lhr } = runnerResult;

  if (OUT) {
    fs.writeFileSync(OUT, JSON.stringify(lhr, null, 2));
  }

  const perf = lhr.categories.performance;
  console.log(`\nURL: ${URL}`);
  console.log(`Performance score: ${Math.round(perf.score * 100)}`);
  console.log("---");
  for (const key of [
    "first-contentful-paint",
    "largest-contentful-paint",
    "speed-index",
    "total-blocking-time",
    "cumulative-layout-shift",
    "interactive",
  ]) {
    const audit = lhr.audits[key];
    if (audit) console.log(`${audit.title}: ${audit.displayValue}`);
  }

  const lcpAudit = lhr.audits["largest-contentful-paint-element"];
  if (lcpAudit?.details?.items?.[0]) {
    console.log("--- LCP element ---");
    console.log(lcpAudit.details.items[0].node?.snippet?.trim());
  }

  console.log("--- Opportunities ---");
  for (const [id, audit] of Object.entries(lhr.audits)) {
    if (
      audit.details?.type === "opportunity" &&
      typeof audit.score === "number" &&
      audit.score < 0.9 &&
      audit.displayValue
    ) {
      console.log(`${audit.title}: ${audit.displayValue}`);
    }
  }

  const bootup = lhr.audits["bootup-time"]?.details?.items?.slice(0, 8);
  if (bootup?.length) {
    console.log("--- Top JS bootup ---");
    for (const item of bootup) {
      console.log(`${item.url.split("/").pop()}: ${Math.round(item.total)}ms`);
    }
  }

  try {
    await chrome.kill();
  } catch {
    /* Windows temp cleanup can fail EPERM */
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
