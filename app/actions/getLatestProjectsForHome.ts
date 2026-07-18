import { ProjectsWithTechsType } from "../Types/AllTechstackTypes";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getLatestProjectsForHome = unstable_cache(
  async (): Promise<ProjectsWithTechsType[]> => {
    try {
      const projects = await prisma.projects.findMany({
        where: { projectType: "Real" },
        orderBy: [{ competency: "desc" }, { createdAt: "desc" }],
        take: 4,
        include: {
          techStack: {
            include: {
              technology: true,
            },
          },
          _count: true,
        },
      });
      return projects;
    } catch (error) {
      console.error("Error fetching home projects:", error);
      return [];
    }
  },
  ["home-latest-projects"],
  {
    revalidate: 600,
    tags: ["project"],
  }
);
