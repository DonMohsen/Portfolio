import { prisma } from "@/lib/prisma";
import { ProjectIndustry, ProjectTypes } from "@prisma/client";

export const getAllProjects = async (
  search: string,
  order: string,
  type: string,
  industry = "",
  featured = ""
) => {
  const validType = Object.values(ProjectTypes).includes(type as ProjectTypes)
    ? (type as ProjectTypes)
    : undefined;

  const validIndustry = Object.values(ProjectIndustry).includes(
    industry as ProjectIndustry
  )
    ? (industry as ProjectIndustry)
    : undefined;

  const featuredOnly = featured === "true" || featured === "1";

  const allProjects = await prisma.projects.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              outcomeMetric: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
        validType ? { projectType: validType } : {},
        validIndustry ? { industry: validIndustry } : {},
        featuredOnly ? { featured: true } : {},
      ],
    },
    include: {
      techStack: {
        include: {
          technology: true,
        },
      },
      _count: true,
    },
    orderBy: {
      createdAt: order === "asc" ? "asc" : "desc",
    },
  });

  return allProjects;
};
