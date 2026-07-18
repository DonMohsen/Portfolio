// Plain string literals (not Prisma enum values) — this file is imported by
// client-side tools (e.g. the cost estimator) that only need the data, and a
// value import from "@prisma/client" would drag the whole Prisma runtime
// into the browser bundle. ProjectTypes/ProjectIndustry have no @map, so the
// member name IS the runtime string value — this stays behaviorally identical.
import type { ProjectIndustry, ProjectTypes } from "@prisma/client";

export type CaseStudySeed = {
  slug: string;
  name: string;
  description: string;
  liveLink: string | null;
  image: string;
  competency: number;
  projectType: ProjectTypes;
  githubLink: string;
  industry: ProjectIndustry;
  outcomeMetric: string;
  featured: boolean;
  role: string;
  year: number;
  problemHtml: string;
  insightHtml: string;
  changeHtml: string;
  measurementHtml: string;
  failureHtml: string;
  clientQuote: string;
  clientName: string;
  metricsJson: Array<{
    label: string;
    before?: string;
    after?: string;
    delta?: string;
  }>;
  technologies: string[];
};

/** Canonical BICM case studies — used by Prisma seed and mock fallbacks. */
export const CASE_STUDY_SEEDS: CaseStudySeed[] = [
  {
    slug: "lumina-analytics-console",
    name: "Lumina Analytics Console",
    description:
      "A performance-critical analytical workspace built with Next.js, displaying deep server logs, custom charts, and complex serverless integrations in real time.",
    liveLink: "https://example.com/lumina",
    image:
      "/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png,/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.png",
    competency: 92,
    projectType: "Real",
    githubLink: "https://github.com/DonMohsen",
    industry: "SaaS",
    outcomeMetric: "40% faster time-to-insight",
    featured: true,
    role: "Software Product Engineer",
    year: 2025,
    problemHtml:
      "<p>The team needed sub-second visibility into distributed logs, but the legacy dashboard loaded in <strong>4.2s LCP</strong> and operators missed critical alerts during peak traffic.</p>",
    insightHtml:
      "<p>Most incidents were discovered after user reports, not telemetry. The fix required streaming updates without sacrificing first paint on mobile networks.</p>",
    changeHtml:
      "<ul><li><strong>SSR + streaming charts</strong> — prioritized first meaningful paint over client-only SPA hydration.</li><li><strong>Role-based views</strong> — operators and stakeholders see different signal density.</li><li><strong>Webhook ingestion lane</strong> — isolated alert routing from chart rendering.</li></ul>",
    measurementHtml:
      "<p>Primary metric: time-to-insight. Secondary: chart update latency under load.</p>",
    failureHtml:
      "<p>Initial WebSocket-only approach failed on flaky mobile networks — we added SSE fallback and reconciled state server-side.</p>",
    clientQuote:
      "Mohsen shipped a production-ready analytics console faster than our internal estimate, with metrics we could show investors.",
    clientName: "Product Lead, Series A SaaS",
    metricsJson: [
      {
        label: "Time to first insight",
        before: "4.2s",
        after: "1.8s",
        delta: "-57%",
      },
      {
        label: "Missed alert rate",
        before: "18%",
        after: "4%",
        delta: "-78%",
      },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "Framer Motion",
      "Express.js",
    ],
  },
  {
    slug: "orbit-commerce-studio",
    name: "Orbit Commerce Studio",
    description:
      "Headless storefront with localized checkout flows, optimistic cart updates, and a modular design system shared across marketing and product surfaces.",
    liveLink: "https://example.com/orbit",
    image: "/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.png",
    competency: 88,
    projectType: "Real",
    githubLink: "https://github.com/DonMohsen",
    industry: "Ecommerce",
    outcomeMetric: "28% higher checkout completion",
    featured: true,
    role: "Software Product Engineer",
    year: 2024,
    problemHtml:
      "<p>Checkout abandonment hit <strong>78%</strong> while conversion lagged the 3.5% category benchmark. The founder needed an international MVP in one quarter.</p>",
    insightHtml:
      "<p>Drop-off clustered on shipping and payment steps — not catalog browsing. Localization had to be structural, not a translation layer bolted on later.</p>",
    changeHtml:
      "<ul><li><strong>Headless checkout slices</strong> — optimistic cart with background inventory reconciliation.</li><li><strong>Locale-first content model</strong> — currency, RTL, and copy in one pipeline.</li><li><strong>Shared design tokens</strong> — marketing and product surfaces reuse the same primitives.</li></ul>",
    measurementHtml:
      "<p>Primary metric: checkout completion. Secondary: mobile LCP on product heroes.</p>",
    failureHtml:
      "<p>We shipped a single global checkout first — conversion improved only after splitting payment methods per locale. Lesson: localization is a product decision, not a string swap.</p>",
    clientQuote:
      "We launched localized checkout in weeks, not months — with a codebase the team can still own.",
    clientName: "Founder, D2C Commerce Studio",
    metricsJson: [
      {
        label: "Checkout completion",
        before: "22%",
        after: "31%",
        delta: "+41%",
      },
      {
        label: "Mobile LCP",
        before: "3.9s",
        after: "2.1s",
        delta: "-46%",
      },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
    ],
  },
  {
    slug: "nebula-docs-platform",
    name: "Nebula Docs Platform",
    description:
      "Developer documentation experience with full-text search, interactive API examples, and MDX-driven content workflows for fast publishing.",
    liveLink: "https://example.com/nebula",
    image: "/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png",
    competency: 85,
    projectType: "Real",
    githubLink: "https://github.com/DonMohsen",
    industry: "Education",
    outcomeMetric: "52% faster time-to-answer for API questions",
    featured: true,
    role: "Software Product Engineer",
    year: 2024,
    problemHtml:
      "<p>Engineers spent <strong>12+ minutes</strong> per support ticket because docs, OpenAPI specs, and runnable examples lived in three places.</p>",
    insightHtml:
      "<p>Search alone was not enough — developers needed copy-paste-ready requests with the same auth flow as production.</p>",
    changeHtml:
      "<ul><li><strong>MDX publishing pipeline</strong> — preview per branch with typed front matter.</li><li><strong>Unified search index</strong> — headings, code blocks, and OpenAPI paths in one query.</li><li><strong>Try-it panels</strong> — sandboxed examples with auth-aware request builders.</li></ul>",
    measurementHtml:
      "<p>Primary metric: median time-to-answer. Secondary: successful search sessions (click-through on first result).</p>",
    failureHtml:
      "<p>Client-side-only search indexing broke on large OpenAPI bundles (&gt;2MB). We moved indexing to build time with incremental updates per doc PR.</p>",
    clientQuote:
      "Our API adoption curve flattened until Nebula shipped — now onboarding is self-serve.",
    clientName: "Head of Developer Experience, B2B API Platform",
    metricsJson: [
      {
        label: "Median time-to-answer",
        before: "12 min",
        after: "5.8 min",
        delta: "-52%",
      },
      {
        label: "First-result search success",
        before: "61%",
        after: "84%",
        delta: "+23 pp",
      },
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Git",
      "REST API",
    ],
  },
];

export const CASE_STUDY_SLUGS = CASE_STUDY_SEEDS.map((seed) => seed.slug);
