import { PrismaClient, Projects } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTwoLatestProjects(): Promise<Projects[]> {
  try {
    const projects = await prisma.projects.findMany({
        orderBy: {
          createdAt: 'desc', // Sort by createdAt in descending order (latest first)
        },
        take: 1, // Limit the result to 2 items
      });
      return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}
