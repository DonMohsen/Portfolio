import { prisma } from "@/lib/prisma";

const getAllProjectsCount =async () => {

    
      try {
        // Count all projects
        const projectCount = await prisma.projects.count();
    
        // Count all technologies
        const technologyCount = await prisma.technology.count();
    
        return {
          projectCount,
          technologyCount,
        };
      } catch (error) {
        console.error("Error counting projects and technologies:", error);
        throw new Error("Failed to fetch counts");
      }
    }
    
  


export default getAllProjectsCount