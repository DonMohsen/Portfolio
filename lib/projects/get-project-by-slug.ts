import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getMockProjectById, getMockProjectBySlug } from "./mock-projects";
import { parseProjectImages } from "./parse-project-images";
import { normalizeProjectDates } from "./project-dates";
import { slugify } from "./slugify";
import { ProjectDetail } from "./types";

async function fetchProjectBySlugFromDb(
  slug: string
): Promise<ProjectDetail | null> {
  try {
    const projects = await prisma.projects.findMany({
      include: {
        techStack: {
          include: {
            technology: true,
          },
        },
        _count: true,
      },
    });

    const match = projects.find((project) => slugify(project.name) === slug);
    if (!match) return null;

    const images = parseProjectImages(match.image);

    return {
      ...match,
      slug,
      summary: match.description.slice(0, 160),
      longDescription: match.description,
      highlights: [],
      role: "Developer",
      year: new Date(match.createdAt).getFullYear(),
      images,
      seoKeywords: match.techStack.map((entry) => entry.technology.name),
    };
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

const getCachedDbProjectBySlug = unstable_cache(
  fetchProjectBySlugFromDb,
  ["project-by-slug"],
  {
    revalidate: 600,
    tags: ["project"],
  }
);

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const mock = getMockProjectBySlug(slug);
  if (mock) return mock;

  const project = await getCachedDbProjectBySlug(slug);
  return project ? normalizeProjectDates(project) : null;
}

export async function getProjectSlugById(
  id: number
): Promise<string | null> {
  const mock = getMockProjectById(id);
  if (mock) return mock.slug;

  try {
    const project = await prisma.projects.findUnique({
      where: { id },
      select: { name: true },
    });
    if (!project) return null;
    return slugify(project.name);
  } catch (error) {
    console.error("Error resolving project slug by id:", error);
    return null;
  }
}
