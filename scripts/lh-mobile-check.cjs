const lighthouse = require("lighthouse").default;
const chromeLauncher = require("chrome-launcher");

const URL = process.argv[2] || "http://localhost:3000/en";

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

  const perf = lhr.categories.performance;
  console.log(`\nURL: ${URL}`);
  console.log(`Performance score: ${Math.round(perf.score * 100)}`);
  console.log("---");
  for (const key of ["first-contentful-paint", "largest-contentful-paint", "speed-index", "total-blocking-time", "cumulative-layout-shift", "interactive"]) {
    const audit = lhr.audits[key];
    if (audit) console.log(`${audit.title}: ${audit.displayValue}`);
  }

  await chrome.kill();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
