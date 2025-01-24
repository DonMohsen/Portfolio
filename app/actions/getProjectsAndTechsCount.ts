import { PrismaClient } from "@prisma/client";
const getAllProjectsCount =async () => {

    const prisma = new PrismaClient();
    
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