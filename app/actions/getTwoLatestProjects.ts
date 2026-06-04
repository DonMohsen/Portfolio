import { ProjectsWithTechsType } from "../Types/AllTechstackTypes";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";


export const getTwoLatestProjects = unstable_cache(
  async (): Promise<ProjectsWithTechsType[]> => {
    try {
      const projects = await prisma.projects.findMany({
        orderBy: {
          createdAt: "desc"
        },
        take: 2,
        include: {
          techStack: {
            include: {
              technology: true
            }
          },
          _count: true
        }
      });
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return [];
    }
  },
  ["home-two-latest-projects"],
  {
    revalidate: false
  }
);
