import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ProjectTypes } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const numberId = parseInt(id, 10);

  if (isNaN(numberId)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  try {
    const project = await prisma.projects.findUnique({
      where: { id: numberId },
      include: {
        techStack: {
          include: {
            technology: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;
  const numberId = parseInt(id, 10);

  if (isNaN(numberId)) {
    return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
  }

  const body = await request.json();
  console.log("Request Body:", body); // Debugging

  try {
    const {
      name,
      description,
      liveLink,
      image,
      competency,
      projectType,
      githubLink,
      techStack,
    } = body;

    if (!body) {
      return NextResponse.json(
        { error: "Request body is missing." },
        { status: 400 }
      );
    }

    await prisma.projectsOnTechnologies.deleteMany({
      where: { projectId: numberId },
    });

    const updatedProject = await prisma.projects.update({
      where: { id: numberId },
      data: {
        name,
        description,
        liveLink,
        image,
        competency,
        projectType,
        githubLink,
        techStack: techStack?.create
          ? {
              create: techStack.create.map((entry: any) => ({
                technologyId: entry.technologyId,
                addedBy: entry.addedBy,
              })),
            }
          : undefined, 
      },
      include: { techStack: { include: { technology: true } } }, 
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error: any) {
    console.error("Error updating project:", error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }
    return NextResponse.json(
      { error: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}

  export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {     try {
    const { id } = await params;
    const numberId = parseInt(id, 10);
  
      if (isNaN(numberId)) {
        return NextResponse.json({ error: 'Invalid project ID.' }, { status: 400 });
      }
    
      // Delete the project and its relations
      const deleted=await prisma.projects.delete({
        where: {
          id: numberId,
        },
      });
  
      return NextResponse.json({ message: `Project with ID ${numberId} deleted successfully` ,deleted}, { status: 200 });
    } catch (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json({ error: 'An error occurred while deleting the project.' }, { status: 500 });
    }
  }