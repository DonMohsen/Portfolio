import { ProjectsWithTechsType } from "../Types/AllTechstackTypes";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getTopProjectsForFooter = unstable_cache(
  async (): Promise<ProjectsWithTechsType[]> => {
    try {
      const projects = await prisma.projects.findMany({
        orderBy: [{ competency: "desc" }, { createdAt: "desc" }],
        take: 3,
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
      console.error("Error fetching footer top projects:", error);
      return [];
    }
  },
  ["footer-top-projects"],
  {
    revalidate: 600,
    tags: ["project"],
  }
);
