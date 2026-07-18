import { architectureAuditHire } from "./landings/architecture-audit";
import { nextjsDeveloperHire } from "./landings/nextjs-developer";
import type { HireCapturePage } from "./types";

export const HIRE_CAPTURE_PAGES: HireCapturePage[] = [
  nextjsDeveloperHire,
  architectureAuditHire,
];

export const HIRE_SLUGS = HIRE_CAPTURE_PAGES.map((page) => page.slug);

const pageBySlug = new Map(
  HIRE_CAPTURE_PAGES.map((page) => [page.slug, page])
);

export function getHireCapturePage(slug: string): HireCapturePage | null {
  return pageBySlug.get(slug) ?? null;
}
