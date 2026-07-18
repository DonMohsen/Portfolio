/**
 * Client-safe slug → title lookup for page-transition labels.
 *
 * Deliberately duplicated from placeholder-projects.ts / case-study-seeds.ts
 * instead of importing them: those modules are server-only (Prisma types +
 * full case-study payloads) and must never enter the client bundle. Keep in
 * sync when placeholder slugs change — real DB-backed projects already fall
 * back to a humanized slug here, so this only needs to cover mock fixtures.
 */
export const MOCK_PROJECT_TITLES: Record<string, string> = {
  "lumina-analytics-console": "Lumina Analytics Console",
  "orbit-commerce-studio": "Orbit Commerce Studio",
  "nebula-docs-platform": "Nebula Docs Platform",
  "pulse-task-orchestrator": "Pulse Task Orchestrator",
};

export function getMockProjectTitleBySlug(slug: string): string | null {
  return MOCK_PROJECT_TITLES[slug] ?? null;
}
