/**
 * Neon pooler hostnames (`*-pooler*`) cannot hold Prisma migrate's
 * session advisory locks → P1002 on Vercel builds.
 *
 * Ensures DIRECT_URL exists (explicit env, or derived from DATABASE_URL),
 * then runs the remaining CLI args.
 *
 * Usage: node scripts/with-direct-url.mjs prisma migrate deploy
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

function loadDotEnv() {
  const envPath = resolve(process.cwd(), ".env");
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv();

const databaseUrl = process.env.DATABASE_URL;
if (!process.env.DIRECT_URL && databaseUrl) {
  process.env.DIRECT_URL = databaseUrl.replace("-pooler", "");
}

if (!process.env.DIRECT_URL && !databaseUrl) {
  console.error(
    "DATABASE_URL (or DIRECT_URL) is required for Prisma. On Neon, set DIRECT_URL to the non-pooled connection string."
  );
  process.exit(1);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node scripts/with-direct-url.mjs <command> [...args]");
  process.exit(1);
}

const result = spawnSync(args[0], args.slice(1), {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

process.exit(result.status ?? 1);
