import type { ProjectDetail } from "./types";

/** unstable_cache JSON-serializes dates to strings — coerce before use. */
export function normalizeProjectDates(project: ProjectDetail): ProjectDetail {
  return {
    ...project,
    createdAt: new Date(project.createdAt),
    lastUpdatedAt: new Date(project.lastUpdatedAt),
    techStack: project.techStack.map((entry) => ({
      ...entry,
      addedAt: new Date(entry.addedAt),
    })),
  };
}

export function toProjectIsoDate(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString();
}
