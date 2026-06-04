#!/usr/bin/env node
/**
 * Same-origin static mirror: HTML + linked CSS/JS/assets (recursive from CSS url() / @import).
 *
 * Usage:
 *   node scripts/scrape-site.mjs <url> [outputDir]
 *   npm run scrape:site -- https://example.com
 *
 * Limits:
 * - Only the origin of the start URL (no third-party CDN unless same host).
 * - First response is often SSR HTML; JS may fetch more URLs at runtime — use --playwright note below.
 * - Respect robots.txt / ToS of the target site; personal/archival use only.
 */

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

const DEFAULT_MAX_FILES = 800;
const DELAY_MS = 35;

/** @param {string} s */
function sleep(s) {
  return new Promise((r) => setTimeout(r, s));
}

/** @param {string} urlString */
function safeLocalRelPath(urlString) {
  const u = new URL(urlString);
  let rel = u.pathname.replace(/^\/+/, "");
  if (!rel || rel.endsWith("/")) {
    rel = rel ? `${rel}index.html` : "index.html";
  }
  if (u.search) {
    const q = crypto.createHash("sha256").update(u.search).digest("hex").slice(0, 10);
    const ext = path.posix.extname(rel);
    const base = ext ? rel.slice(0, -ext.length) : rel;
    rel = `${base}__q_${q}${ext || ".html"}`;
  }
  return rel
    .split("/")
    .map((seg) => seg.replace(/[<>:"|?*\\]/g, "_"))
    .join("/");
}

/**
 * @param {string} html
 * @param {URL} pageUrl
 * @returns {string[]}
 */
function extractFromHtml(html, pageUrl) {
  const out = new Set();
  const push = (raw) => {
    if (!raw || raw.startsWith("data:") || raw.startsWith("javascript:")) return;
    try {
      out.add(new URL(raw, pageUrl).href);
    } catch {
      /* ignore */
    }
  };

  const attrRe =
    /<(script|link|img|source|video|audio|iframe)\b[^>]*?\b(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = attrRe.exec(html)) !== null) push(m[2]);

  const linkHref = /<link\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/gi;
  while ((m = linkHref.exec(html)) !== null) push(m[1]);

  const srcsetRe = /\bsrcset\s*=\s*["']([^"']+)["']/gi;
  while ((m = srcsetRe.exec(html)) !== null) {
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) push(u);
    }
  }

  return [...out];
}

/**
 * @param {string} css
 * @param {URL} cssUrl
 * @returns {string[]}
 */
function extractFromCss(css, cssUrl) {
  const out = new Set();
  const push = (raw) => {
    const t = raw.replace(/^["']|["']$/g, "").trim();
    if (!t || t.startsWith("data:")) return;
    try {
      out.add(new URL(t, cssUrl).href);
    } catch {
      /* ignore */
    }
  };

  const urlFn = /url\s*\(\s*["']?([^)"']+)["']?\s*\)/gi;
  let m;
  while ((m = urlFn.exec(css)) !== null) push(m[1]);

  const imp = /@import\s+(?:url\s*\(\s*)?["']?([^"');]+)["']?\s*\)?/gi;
  while ((m = imp.exec(css)) !== null) push(m[1]);

  return [...out];
}

/** @param {string} ct */
function isCss(ct) {
  return (ct || "").includes("text/css");
}
/** @param {string} ct */
function isHtml(ct) {
  const c = (ct || "").toLowerCase();
  return c.includes("text/html") || c.includes("application/xhtml");
}

/**
 * @param {string} startUrl
 * @param {string} outRoot
 * @param {{ maxFiles: number, delayMs: number }} opts
 */
async function run(startUrl, outRoot, opts) {
  const origin = new URL(startUrl).origin;
  const visited = new Set();
  /** @type {string[]} */
  const queue = [startUrl];
  let saved = 0;

  await fs.mkdir(outRoot, { recursive: true });

  while (queue.length && saved < opts.maxFiles) {
    const next = queue.shift();
    if (!next || visited.has(next)) continue;
    visited.add(next);

    let u;
    try {
      u = new URL(next);
    } catch {
      continue;
    }
    if (u.origin !== origin) continue;

    await sleep(opts.delayMs);

    let res;
    try {
      res = await fetch(u.href, {
        headers: { "User-Agent": UA, Accept: "*/*" },
        redirect: "follow",
      });
    } catch (e) {
      console.warn("fetch fail:", u.href, e.message);
      continue;
    }

    if (!res.ok) {
      console.warn(res.status, u.href);
      continue;
    }

    const finalUrl = new URL(res.url).href;
    visited.add(finalUrl);

    const ct = res.headers.get("content-type") || "";
    const buf = Buffer.from(await res.arrayBuffer());
    const rel = safeLocalRelPath(finalUrl);
    const diskPath = path.join(outRoot, ...rel.split("/"));
    await fs.mkdir(path.dirname(diskPath), { recursive: true });
    await fs.writeFile(diskPath, buf);
    saved++;
    console.log(saved, diskPath);

    const text = buf.toString("utf8");

    if (isHtml(ct) || (!ct && rel.endsWith(".html"))) {
      for (const href of extractFromHtml(text, new URL(finalUrl))) {
        try {
          const nu = new URL(href);
          if (nu.origin === origin && !visited.has(nu.href)) queue.push(nu.href);
        } catch {
          /* */
        }
      }
    } else if (isCss(ct) || /\.css($|\?)/i.test(finalUrl)) {
      for (const href of extractFromCss(text, new URL(finalUrl))) {
        try {
          const nu = new URL(href);
          if (nu.origin === origin && !visited.has(nu.href)) queue.push(nu.href);
        } catch {
          /* */
        }
      }
    }
  }

  const manifest = {
    startUrl,
    origin,
    downloadedFiles: saved,
    maxFiles: opts.maxFiles,
    note:
      "Runtime-loaded chunks (dynamic import/fetch) are not discovered without a browser. See script header.",
  };
  await fs.writeFile(
    path.join(outRoot, "_scrape-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );

  console.log("\nDone.", saved, "files →", outRoot);
}

function printHelp() {
  console.log(`
Usage:
  node scripts/scrape-site.mjs <url> [outputDir]

Options (env):
  SCRAPE_MAX_FILES   default ${DEFAULT_MAX_FILES}
  SCRAPE_DELAY_MS    default ${DELAY_MS}

Example:
  npm run scrape:site -- https://amanrwt.com/

For JS that only loads after hydration, consider recording HAR in DevTools Network,
or a Playwright pass that intercepts all response URLs and feeds them to a second download queue.
`);
}

const argv = process.argv.slice(2);
if (!argv[0] || argv[0] === "-h" || argv[0] === "--help") {
  printHelp();
  process.exit(argv[0] ? 0 : 1);
}

const startUrl = argv[0].startsWith("http") ? argv[0] : `https://${argv[0]}`;
const host = new URL(startUrl).hostname.replace(/[^a-z0-9.-]/gi, "_");
const outRoot =
  argv[1] ||
  path.join(__dirname, "..", "scraped", `${host}-${Date.now().toString(36)}`);

const maxFiles = Number(process.env.SCRAPE_MAX_FILES) || DEFAULT_MAX_FILES;
const delayMs = Number(process.env.SCRAPE_DELAY_MS) || DELAY_MS;

run(startUrl, outRoot, { maxFiles, delayMs }).catch((e) => {
  console.error(e);
  process.exit(1);
});
