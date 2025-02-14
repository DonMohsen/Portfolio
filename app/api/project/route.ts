import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const order = searchParams.get("order") === "asc" ? "asc" : "desc"; // Default to 'desc'

    const projects = await prisma.projects.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive", // Case-insensitive search
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
      include: {
        techStack: {
          include: {
            technology: true,
          },
        },
      },
      orderBy: {
        createdAt: order, // Assuming `createdAt` is a valid field for ordering
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
