import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const projectData: Prisma.ProjectsCreateInput = await req.json();

    // Validate required fields
    if (!projectData.name || !projectData.description || !projectData.competency || !projectData.projectType || !projectData.githubLink || !projectData.techStack) {
      return NextResponse.json({ error: 'Missing required fields or invalid data.' }, { status: 400 });
    }

    // Create the project
    const newProject = await prisma.projects.create({
      data: projectData,
    });

    // Return the created project with status 201
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}