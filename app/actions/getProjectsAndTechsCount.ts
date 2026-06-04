import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getAllProjectsCount = unstable_cache(
  async () => {
    try {
      const projectCount = await prisma.projects.count();
      const technologyCount = await prisma.technology.count();

      return {
        projectCount,
        technologyCount
      };
    } catch (error) {
      console.error("Error counting projects and technologies:", error);
      return {projectCount: 0, technologyCount: 0};
    }
  },
  ["home-projects-tech-counts"],
  {
    revalidate: false
  }
);

export default getAllProjectsCount;