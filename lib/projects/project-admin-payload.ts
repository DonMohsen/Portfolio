import "server-only";
import { ProjectIndustry } from "@prisma/client";
import { sanitizeBlogHtml } from "@/lib/cms/core/sanitize-html";
import type { ProjectMetricsRow } from "./types";

function strOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function numOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(value);
  return Number.isFinite(num) ? Math.trunc(num) : null;
}

function htmlOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const sanitized = sanitizeBlogHtml(value);
  return sanitized.trim().length > 0 ? sanitized : null;
}

function isValidIndustry(value: unknown): value is ProjectIndustry {
  return (
    typeof value === "string" &&
    Object.values(ProjectIndustry).includes(value as ProjectIndustry)
  );
}

export function parseMetricsInput(value: unknown): ProjectMetricsRow[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const rows: ProjectMetricsRow[] = value
    .map((row) => {
      if (!row || typeof row !== "object") return null;
      const label = strOrNull((row as ProjectMetricsRow).label);
      if (!label) return null;
      const parsed: ProjectMetricsRow = { label };
      const before = strOrNull((row as ProjectMetricsRow).before);
      const after = strOrNull((row as ProjectMetricsRow).after);
      const delta = strOrNull((row as ProjectMetricsRow).delta);
      if (before) parsed.before = before;
      if (after) parsed.after = after;
      if (delta) parsed.delta = delta;
      return parsed;
    })
    .filter((row): row is ProjectMetricsRow => row !== null);

  return rows.length > 0 ? rows : null;
}

export function buildProjectBicmData(body: Record<string, unknown>) {
  return {
    industry: isValidIndustry(body.industry) ? body.industry : null,
    outcomeMetric: strOrNull(body.outcomeMetric),
    featured: Boolean(body.featured),
    role: strOrNull(body.role),
    year: numOrNull(body.year),
    problemHtml: htmlOrNull(body.problemHtml),
    insightHtml: htmlOrNull(body.insightHtml),
    changeHtml: htmlOrNull(body.changeHtml),
    measurementHtml: htmlOrNull(body.measurementHtml),
    failureHtml: htmlOrNull(body.failureHtml),
    clientQuote: strOrNull(body.clientQuote),
    clientName: strOrNull(body.clientName),
    metricsJson: parseMetricsInput(body.metricsJson),
  };
}
