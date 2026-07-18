import { parseMetricsJson, type ProjectDetail } from "./types";

export function hasBicmContent(project: ProjectDetail): boolean {
  const metrics = parseMetricsJson(project.metricsJson);
  return Boolean(
    project.problemHtml?.trim() ||
      project.insightHtml?.trim() ||
      project.changeHtml?.trim() ||
      project.measurementHtml?.trim() ||
      project.failureHtml?.trim() ||
      (metrics && metrics.length > 0)
  );
}
