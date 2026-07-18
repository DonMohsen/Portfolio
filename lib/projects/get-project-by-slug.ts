import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getMockProjectById, getMockProjectBySlug } from "./mock-projects";
import { mapDbProjectToDetail } from "./map-project-detail";
import { normalizeProjectDates } from "./project-dates";
import { ProjectDetail } from "./types";

async function fetchProjectBySlugFromDb(
  slug: string
): Promise<ProjectDetail | null> {
  try {
    const project = await prisma.projects.findUnique({
      where: { slug },
      include: {
        techStack: {
          include: {
            technology: true,
          },
        },
        _count: true,
      },
    });

    if (!project) return null;

    return mapDbProjectToDetail(project);
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const mock = getMockProjectBySlug(slug);
  if (mock) return mock;

  const project = await unstable_cache(
    () => fetchProjectBySlugFromDb(slug),
    ["project-by-slug", slug],
    {
      revalidate: 600,
      tags: ["project"],
    }
  )();

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
      select: { slug: true },
    });
    return project?.slug ?? null;
  } catch (error) {
    console.error("Error resolving project slug by id:", error);
    return null;
  }
}
