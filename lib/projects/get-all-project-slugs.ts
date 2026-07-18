import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getAllMockProjectSlugs } from "./mock-projects";

async function fetchDbProjectSlugs(): Promise<string[]> {
  try {
    const projects = await prisma.projects.findMany({
      select: { slug: true },
    });
    return projects.map((project) => project.slug);
  } catch {
    return [];
  }
}

const getCachedDbSlugs = unstable_cache(fetchDbProjectSlugs, ["project-slugs"], {
  revalidate: 600,
  tags: ["project"],
});

export async function getAllProjectSlugs(): Promise<string[]> {
  const mockSlugs = getAllMockProjectSlugs();
  const dbSlugs = await getCachedDbSlugs();
  return [...new Set([...mockSlugs, ...dbSlugs])];
}
