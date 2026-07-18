import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";

export type ProjectMetricsRow = {
  label: string;
  before?: string;
  after?: string;
  delta?: string;
};

/** DB project row + presentation fields for detail pages. BICM columns live on Projects. */
export type ProjectDetail = ProjectsWithTechsType & {
  summary: string;
  longDescription: string;
  images: string[];
  seoKeywords: string[];
  /** Teaser bullets — mock fixtures until BICM HTML is authored in admin. */
  highlights: string[];
};

export function parseMetricsJson(value: unknown): ProjectMetricsRow[] | null {
  if (!value || !Array.isArray(value)) return null;
  return value as ProjectMetricsRow[];
}
