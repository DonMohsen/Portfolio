import { prisma } from "@/lib/prisma";
import { ProjectTypes } from "@prisma/client";

export const getAllProjects = async (search: string, order: string, type: string) => {
  // Validate if the type is a valid ProjectTypes enum value
  const validType = Object.values(ProjectTypes).includes(type as ProjectTypes) ? (type as ProjectTypes) : undefined;

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
          ],
        },
        validType ? { projectType: validType } : {}, // Apply type filter only if valid
      ],
    },
    include: {
      techStack: {
        include: {
          technology: true,
        },
      },
    },
    orderBy: {
      createdAt: order === "asc" ? "asc" : "desc",
    },
  });

  return allProjects;
};