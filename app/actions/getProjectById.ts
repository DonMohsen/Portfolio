import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Define the return type for the function
export type ProjectWithTechsType = Prisma.ProjectsGetPayload<{
  include: {
    techStack: {
      include: {
        technology: true;
      };
    };
    _count: true;
  };
}>;
export const getProjectById = async (id: number): Promise<ProjectWithTechsType | null> => {
    try {
      const project = await prisma.projects.findUnique({
        where: { id },
        include: {
          techStack: {
            include: {
              technology: true,
            },
          },
          _count: true,
        },
      });
  
      return project;
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      return null;
    }
  };
  