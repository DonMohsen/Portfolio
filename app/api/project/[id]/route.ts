import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, ProjectTypes } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params;
  const numberId=parseInt(params.id)
  if (isNaN(numberId)) {
    return NextResponse.json({ error: 'Invalid project ID.' }, { status: 400 });
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

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const projectId = parseInt(params.id);
  
    if (isNaN(projectId)) {
      return NextResponse.json({ error: 'Invalid project ID.' }, { status: 400 });
    }
    const body = await req.json();

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
        return NextResponse.json({ error: 'Request body is missing.' }, { status: 400 });
      }
      const updatedProject = await prisma.projects.update({
        where: { id: projectId },
        data: body, // Directly assign the body to data
        include: { techStack: true }, // Include relations
      });
      return NextResponse.json(updatedProject, { status: 200 });
    } catch (error: any) {
      console.error('Error updating project:', error);
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
  }
  
  export async function DELETE(req:NextRequest,{ params }: { params: { id: string } }) {
    try {
      const projectId = params;
      const numberId=parseInt(params.id)
  
      if (isNaN(numberId)) {
        return NextResponse.json({ error: 'Invalid project ID.' }, { status: 400 });
      }
    
      // Delete the project and its relations
      const deleted=await prisma.projects.delete({
        where: {
          id: numberId,
        },
      });
  
      return NextResponse.json({ message: `Project with ID ${numberId} deleted successfully` }, { status: 200 });
    } catch (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json({ error: 'An error occurred while deleting the project.' }, { status: 500 });
    }
  }