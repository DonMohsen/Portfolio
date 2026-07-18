import "server-only";
import { PLACEHOLDER_PROJECTS } from "@/components/Home/ProjectsOverview/placeholder-projects";
import { CASE_STUDY_SEEDS } from "./case-study-seeds";
import { parseProjectImages } from "./parse-project-images";
import type { ProjectDetail } from "./types";

function pickBicmFromSeed(slug: string) {
  const seed = CASE_STUDY_SEEDS.find((item) => item.slug === slug);
  if (!seed) return {};

  return {
    role: seed.role,
    year: seed.year,
    problemHtml: seed.problemHtml,
    insightHtml: seed.insightHtml,
    changeHtml: seed.changeHtml,
    measurementHtml: seed.measurementHtml,
    failureHtml: seed.failureHtml,
    clientQuote: seed.clientQuote,
    clientName: seed.clientName,
    metricsJson: seed.metricsJson,
  };
}

const MOCK_ENRICHMENTS: Record<
  number,
  Omit<
    ProjectDetail,
    keyof (typeof PLACEHOLDER_PROJECTS)[number] | "images"
  >
> = {
  9001: {
    ...pickBicmFromSeed("lumina-analytics-console"),
    summary:
      "Real-time analytics console with Next.js, custom charts, and serverless integrations for deep server log monitoring.",
    longDescription:
      "Lumina Analytics Console is a performance-critical analytical workspace designed for teams that need instant visibility into distributed systems. The interface surfaces deep server logs, custom charting, and complex serverless pipeline metrics in a single cohesive view.\n\nBuilt with a server-first rendering strategy, the dashboard prioritizes sub-second initial paint while streaming live telemetry through WebSocket and SSE channels. Role-based views let operators, developers, and stakeholders each focus on the signals that matter to them.\n\nThe project demonstrates production-grade patterns: optimistic UI for filter changes, resilient error boundaries around chart widgets, and incremental static regeneration for marketing surfaces that share the same design system.",
    highlights: [
      "Real-time log streaming with sub-second chart updates",
      "Custom visualization layer built on reusable chart primitives",
      "Serverless integrations for webhook ingestion and alert routing",
      "Role-based dashboards with persisted filter state",
      "ISR-optimized public status pages sharing the same UI kit",
    ],
    seoKeywords: [
      "analytics dashboard",
      "Next.js",
      "real-time monitoring",
      "serverless",
      "data visualization",
    ],
  },
  9002: {
    ...pickBicmFromSeed("orbit-commerce-studio"),
    summary:
      "Headless storefront with localized checkout, optimistic cart updates, and a shared modular design system.",
    longDescription:
      "Orbit Commerce Studio is a headless e-commerce experience engineered for international audiences. Checkout flows adapt per locale with currency formatting, RTL-aware layouts, and translated microcopy managed through a structured content layer.\n\nThe cart uses optimistic updates so add-to-cart actions feel instantaneous, with background reconciliation against inventory APIs. A modular design system unifies marketing landing pages and product surfaces, reducing duplication across teams.\n\nPerformance was a first-class requirement: image pipelines use responsive srcsets, critical CSS is inlined for product heroes, and below-fold sections defer with content-visibility to keep LCP under budget on mobile networks.",
    highlights: [
      "Localized checkout with RTL and multi-currency support",
      "Optimistic cart with background inventory reconciliation",
      "Shared design tokens across marketing and product surfaces",
      "Responsive image pipeline with priority LCP heroes",
      "Composable product modules for rapid merchandising experiments",
    ],
    seoKeywords: [
      "headless commerce",
      "e-commerce",
      "Next.js storefront",
      "localized checkout",
      "design system",
    ],
  },
  9003: {
    ...pickBicmFromSeed("nebula-docs-platform"),
    summary:
      "Developer documentation platform with full-text search, interactive API examples, and MDX publishing workflows.",
    longDescription:
      "Nebula Docs Platform streamlines how engineering teams publish and discover technical documentation. MDX-driven content workflows let authors mix prose, code samples, and interactive API playgrounds without leaving the repository.\n\nFull-text search indexes headings, code blocks, and OpenAPI references so developers find answers quickly. Interactive examples run in isolated sandboxes with typed request builders that mirror production authentication flows.\n\nThe reading experience is tuned for long sessions: sticky table-of-contents navigation, syntax highlighting with copy buttons, and print-friendly styles for offline reference.",
    highlights: [
      "MDX content pipeline with preview deployments per branch",
      "Full-text search across docs and OpenAPI specs",
      "Interactive API try-it panels with auth-aware examples",
      "Sticky TOC and deep-linkable heading anchors",
      "Dark mode with accessible contrast ratios",
    ],
    seoKeywords: [
      "developer documentation",
      "MDX",
      "API docs",
      "technical writing platform",
      "full-text search",
    ],
  },
  9004: {
    summary:
      "Workflow dashboard for distributed teams with live status boards, role-based views, and mobile-first motion.",
    longDescription:
      "Pulse Task Orchestrator gives distributed teams a single source of truth for work in flight. Live status boards reflect task movement across columns with motion-rich micro-interactions that communicate state changes without overwhelming users on smaller screens.\n\nRole-based views surface manager summaries, individual contributor queues, and stakeholder read-only snapshots from the same underlying data model. Mobile-first layouts prioritize thumb reach and reduced chrome while preserving drag-and-drop on larger breakpoints.\n\nThe interface layers Framer Motion transitions on top of a predictable state container, keeping animations purposeful and performance-conscious through reduced-motion media queries.",
    highlights: [
      "Live kanban boards with optimistic column moves",
      "Role-based views for managers, ICs, and stakeholders",
      "Mobile-first layouts with gesture-friendly interactions",
      "Motion design respecting prefers-reduced-motion",
      "Webhook integrations for Slack and email digests",
    ],
    seoKeywords: [
      "task management",
      "kanban dashboard",
      "team workflow",
      "Framer Motion",
      "mobile-first UI",
    ],
  },
};

function enrichProject(
  base: (typeof PLACEHOLDER_PROJECTS)[number]
): ProjectDetail {
  const extra = MOCK_ENRICHMENTS[base.id];
  if (!extra) {
    throw new Error(`Missing mock enrichment for project id ${base.id}`);
  }

  return {
    ...base,
    ...extra,
    images: parseProjectImages(base.image),
  };
}

export const MOCK_PROJECT_DETAILS: ProjectDetail[] =
  PLACEHOLDER_PROJECTS.map(enrichProject);

const mockBySlug = new Map(
  MOCK_PROJECT_DETAILS.map((project) => [project.slug, project])
);

const mockById = new Map(
  MOCK_PROJECT_DETAILS.map((project) => [project.id, project])
);

export function getMockProjectBySlug(slug: string): ProjectDetail | null {
  return mockBySlug.get(slug) ?? null;
}

export function getMockProjectById(id: number): ProjectDetail | null {
  return mockById.get(id) ?? null;
}

export function getAllMockProjectSlugs(): string[] {
  return MOCK_PROJECT_DETAILS.map((project) => project.slug);
}
