#!/usr/bin/env node
/**
 * Dumps PostgreSQL schema + data for VPS deployment.
 * Requires DATABASE_URL in .env (or environment).
 *
 * Usage: node scripts/dump-database.mjs
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "release", "database");

function normalizeDatabaseUrl(url) {
  return url.replace(/^["']|["']$/g, "");
}

function unpooledDatabaseUrl(url) {
  return url
    .replace("-pooler.", ".")
    .replace(/&?channel_binding=[^&]*/g, "")
    .replace(/\?&/, "?")
    .replace(/[?&]$/, "");
}

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return normalizeDatabaseUrl(process.env.DATABASE_URL);
  }

  const envPath = join(root, ".env");
  if (!existsSync(envPath)) {
    throw new Error("DATABASE_URL not set and .env file not found.");
  }

  const line = readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .find((l) => l.startsWith("DATABASE_URL="));

  if (!line) {
    throw new Error("DATABASE_URL not found in .env");
  }

  return normalizeDatabaseUrl(
    line.slice("DATABASE_URL=".length).trim()
  );
}

function findPgDump() {
  if (process.env.PG_DUMP) {
    return process.env.PG_DUMP;
  }

  const candidates = [
    "pg_dump",
    "C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe",
    "C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe",
    "C:\\Program Files\\PostgreSQL\\15\\bin\\pg_dump.exe",
    "/usr/bin/pg_dump",
    "/usr/local/bin/pg_dump",
  ];

  for (const candidate of candidates) {
    if (candidate === "pg_dump") {
      const check = spawnSync(candidate, ["--version"], { stdio: "pipe" });
      if (check.status === 0) return candidate;
      continue;
    }
    if (existsSync(candidate)) return candidate;
  }

  throw new Error(
    "pg_dump not found. Install PostgreSQL client tools or set PG_DUMP path."
  );
}

function runDump(pgDump, databaseUrl, args, outputFile) {
  const result = spawnSync(pgDump, [...args, "-f", outputFile, databaseUrl], {
    stdio: "pipe",
    env: process.env,
  });

  if (result.status !== 0) {
    const message = result.stderr?.toString() || `pg_dump failed for ${outputFile}`;
    const error = new Error(message);
    error.outputFile = outputFile;
    throw error;
  }
}

function dumpWithFallback(pgDump, databaseUrl, args, outputFile) {
  try {
    runDump(pgDump, databaseUrl, args, outputFile);
  } catch (firstError) {
    const fallbackUrl = unpooledDatabaseUrl(databaseUrl);
    if (fallbackUrl === databaseUrl) {
      throw firstError;
    }

    console.warn(`Retrying ${outputFile} with direct (non-pooler) connection...`);
    runDump(pgDump, fallbackUrl, args, outputFile);
  }
}

function main() {
  mkdirSync(outDir, { recursive: true });

  const databaseUrl = loadDatabaseUrl();
  const pgDump = findPgDump();
  const commonArgs = ["--no-owner", "--no-acl"];

  console.log("Using pg_dump:", pgDump);
  console.log("Output directory:", outDir);

  dumpWithFallback(pgDump, databaseUrl, ["--schema-only", ...commonArgs], join(outDir, "schema.sql"));
  dumpWithFallback(pgDump, databaseUrl, ["--data-only", ...commonArgs], join(outDir, "data.sql"));
  dumpWithFallback(pgDump, databaseUrl, commonArgs, join(outDir, "full-dump.sql"));

  console.log("\nDatabase dump completed:");
  console.log("  - release/database/schema.sql");
  console.log("  - release/database/data.sql");
  console.log("  - release/database/full-dump.sql");
}

try {
  main();
} catch (error) {
  console.error("\nDatabase dump failed:", error.message);
  console.error(
    "\nTip: ensure DATABASE_URL points to a reachable PostgreSQL server, then retry."
  );
  process.exit(1);
}
