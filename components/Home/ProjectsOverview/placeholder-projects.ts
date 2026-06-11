import { ProjectsWithTechsType } from "@/app/Types/AllTechstackTypes";

const PLACEHOLDER_DATE = new Date("2025-01-15T00:00:00.000Z");

function stack(
  projectId: number,
  technologyId: number,
  name: string,
  imageUrl: string
) {
  return {
    projectId,
    technologyId,
    addedAt: PLACEHOLDER_DATE,
    addedBy: "placeholder",
    technology: {
      id: technologyId,
      name,
      imageUrl,
    },
  };
}

/** Temporary home data — swap for Prisma when DATABASE_URL is available. */
export const PLACEHOLDER_PROJECTS: ProjectsWithTechsType[] = [
  {
    id: 9001,
    createdAt: PLACEHOLDER_DATE,
    lastUpdatedAt: PLACEHOLDER_DATE,
    name: "Lumina Analytics Console",
    description:
      "A performance-critical analytical workspace built with Next.js, displaying deep server logs, custom charts, and complex serverless integrations in real time.",
    liveLink: "https://example.com/lumina",
    image:
      "/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png,/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.png",
    competency: 92,
    projectType: "Real",
    githubLink: "https://github.com/DonMohsen",
    techStack: [
      stack(9001, 1, "Next.js", "/icons/nextjs.svg"),
      stack(9001, 2, "TypeScript", "/icons/typescript.svg"),
      stack(9001, 3, "Tailwind CSS", "/icons/tailwindcss.svg"),
      stack(9001, 4, "Prisma", "/icons/prisma.svg"),
      stack(9001, 5, "Framer Motion", "/icons/framermotion.svg"),
      stack(9001, 6, "Express.js", "/icons/expressjs.svg"),
    ],
    _count: { techStack: 6 },
  },
  {
    id: 9002,
    createdAt: PLACEHOLDER_DATE,
    lastUpdatedAt: PLACEHOLDER_DATE,
    name: "Orbit Commerce Studio",
    description:
      "Headless storefront with localized checkout flows, optimistic cart updates, and a modular design system shared across marketing and product surfaces.",
    liveLink: "https://example.com/orbit",
    image: "/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.png",
    competency: 88,
    projectType: "Real",
    githubLink: "https://github.com/DonMohsen",
    techStack: [
      stack(9002, 1, "Next.js", "/icons/nextjs.svg"),
      stack(9002, 2, "TypeScript", "/icons/typescript.svg"),
      stack(9002, 3, "Tailwind CSS", "/icons/tailwindcss.svg"),
      stack(9002, 7, "Redux", "/icons/redux.svg"),
    ],
    _count: { techStack: 4 },
  },
  {
    id: 9003,
    createdAt: PLACEHOLDER_DATE,
    lastUpdatedAt: PLACEHOLDER_DATE,
    name: "Nebula Docs Platform",
    description:
      "Developer documentation experience with full-text search, interactive API examples, and MDX-driven content workflows for fast publishing.",
    liveLink: null,
    image: "/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png",
    competency: 81,
    projectType: "Practice",
    githubLink: "https://github.com/DonMohsen",
    techStack: [
      stack(9003, 1, "Next.js", "/icons/nextjs.svg"),
      stack(9003, 2, "TypeScript", "/icons/typescript.svg"),
      stack(9003, 8, "Git", "/icons/git.svg"),
      stack(9003, 9, "REST API", "/icons/restapi.svg"),
    ],
    _count: { techStack: 4 },
  },
  {
    id: 9004,
    createdAt: PLACEHOLDER_DATE,
    lastUpdatedAt: PLACEHOLDER_DATE,
    name: "Pulse Task Orchestrator",
    description:
      "A workflow dashboard for distributed teams with live status boards, role-based views, and motion-rich micro-interactions tuned for mobile-first usage.",
    liveLink: "https://example.com/pulse",
    image:
      "/Gemini_Generated_Image_7wp2nr7wp2nr7wp2.png,/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png",
    competency: 76,
    projectType: "Forked",
    githubLink: "https://github.com/DonMohsen",
    techStack: [
      stack(9004, 1, "Next.js", "/icons/nextjs.svg"),
      stack(9004, 5, "Framer Motion", "/icons/framermotion.svg"),
      stack(9004, 3, "Tailwind CSS", "/icons/tailwindcss.svg"),
      stack(9004, 10, "Mongo DB", "/icons/mongodb.svg"),
    ],
    _count: { techStack: 4 },
  },
];

export const PLACEHOLDER_PROJECT_COUNT = 12;

export function resolveHomeProjects(projects: ProjectsWithTechsType[]) {
  return projects.length > 0 ? projects : PLACEHOLDER_PROJECTS;
}

export function resolveHomeProjectCount(projectCount: number) {
  return projectCount > 0 ? projectCount : PLACEHOLDER_PROJECT_COUNT;
}
