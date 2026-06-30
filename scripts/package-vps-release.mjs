#!/usr/bin/env node
/**
 * Builds a lightweight portfolio-vps-*.tar.gz for self-hosted VPS deployment.
 *
 * Usage:
 *   npm run package:vps
 *   npm run package:vps -- --skip-dump   (skip live DB dump)
 */

import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const skipDump = process.argv.includes("--skip-dump");

const EXCLUDE_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "scraped",
  ".tmp-curved-menu",
  "release",
  "dist",
  "out",
  "build",
  "coverage",
]);

const EXCLUDE_FILES = new Set([
  ".DS_Store",
  "portfolio-vps-release.tar.gz",
]);

const EXCLUDE_GLOBS = [
  /^\.env(\.|$)/, // .env, .env.local, .env.prod — never ship secrets
  /^lighthouse.*\.json$/,
  /\.tsbuildinfo$/,
];

function shouldExclude(relPath) {
  const parts = relPath.split(/[\\/]/);

  for (const part of parts) {
    if (EXCLUDE_DIRS.has(part)) return true;
  }

  const base = parts[parts.length - 1];
  if (EXCLUDE_FILES.has(base)) return true;

  for (const pattern of EXCLUDE_GLOBS) {
    if (pattern.test(base) || pattern.test(relPath)) return true;
  }

  return false;
}

function collectFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    const rel = relative(root, abs);

    if (shouldExclude(rel)) continue;

    if (entry.isDirectory()) {
      collectFiles(abs, files);
    } else if (entry.isFile()) {
      files.push(abs);
    }
  }

  return files;
}

function ensureSchemaFallback() {
  const schemaPath = join(root, "release", "database", "schema.sql");
  if (existsSync(schemaPath) && statSync(schemaPath).size > 0) {
    return;
  }

  console.log("Generating schema.sql from Prisma schema...");
  mkdirSync(join(root, "release", "database"), { recursive: true });

  const result = spawnSync(
    "npx",
    [
      "prisma",
      "migrate",
      "diff",
      "--from-empty",
      "--to-schema-datamodel",
      "prisma/schema.prisma",
      "--script",
    ],
    { cwd: root, encoding: "utf8", shell: true }
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || "Failed to generate schema.sql");
  }

  writeFileSync(schemaPath, result.stdout, "utf8");
}

function tryDumpDatabase() {
  if (skipDump) {
    console.log("Skipping database dump (--skip-dump).");
    return;
  }

  console.log("Attempting live database dump...");
  const result = spawnSync("node", ["scripts/dump-database.mjs"], {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    console.warn(
      "\nWarning: live dump failed. Package will include schema.sql only."
    );
    console.warn("Run `npm run db:dump` on a machine with DB access, then `npm run package:vps -- --skip-dump`.");
  }
}

function createTarball(stagingDir, archivePath) {
  const parent = dirname(stagingDir);
  const folderName = "portfolio-vps-release";

  const tarArgs = process.platform === "win32"
    ? ["-czf", archivePath, "-C", parent, folderName]
    : ["-czf", archivePath, "-C", parent, folderName];

  const result = spawnSync("tar", tarArgs, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error("tar command failed. Ensure tar is available on your system.");
  }
}

function main() {
  tryDumpDatabase();
  ensureSchemaFallback();

  const stagingRoot = join(root, "release", "portfolio-vps-release");
  const archivePath = join(root, "release", "portfolio-vps-release.tar.gz");

  rmSync(stagingRoot, { recursive: true, force: true });
  mkdirSync(stagingRoot, { recursive: true });

  const files = collectFiles(root);
  for (const abs of files) {
    const rel = relative(root, abs);
    const dest = join(stagingRoot, rel);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(abs, dest);
  }

  copyFileSync(
    join(root, "docs", "VPS-DEPLOYMENT.md"),
    join(stagingRoot, "VPS-DEPLOYMENT.md")
  );

  if (existsSync(join(root, ".env.example"))) {
    copyFileSync(join(root, ".env.example"), join(stagingRoot, ".env.example"));
  }

  const dbSource = join(root, "release", "database");
  const dbDest = join(stagingRoot, "database");
  mkdirSync(dbDest, { recursive: true });
  if (existsSync(dbSource)) {
    for (const name of readdirSync(dbSource)) {
      const src = join(dbSource, name);
      if (statSync(src).isFile()) {
        copyFileSync(src, join(dbDest, name));
      }
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    nodeRecommended: ">=20",
    database: {
      schema: "database/schema.sql",
      fullDump: existsSync(join(stagingRoot, "database", "full-dump.sql"))
        ? "database/full-dump.sql"
        : null,
      dataOnly: existsSync(join(stagingRoot, "database", "data.sql"))
        ? "database/data.sql"
        : null,
      prismaMigrations: "prisma/migrations",
    },
    docs: "VPS-DEPLOYMENT.md",
  };

  writeFileSync(
    join(stagingRoot, "RELEASE-MANIFEST.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );

  rmSync(archivePath, { force: true });
  createTarball(stagingRoot, archivePath);

  const sizeMb = (statSync(archivePath).size / (1024 * 1024)).toFixed(2);
  console.log(`\nCreated: ${archivePath}`);
  console.log(`Size: ${sizeMb} MB`);
  console.log(`Files in archive: ${files.length}`);
}

main();
