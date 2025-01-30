import { NextRequest, NextResponse } from "next/server";
import {
  Prisma,
  Projects,
  ProjectTypes,
  Technology,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
export async function POST(request: Request) {
  try {
    const body: Prisma.TechnologyCreateInput = await request.json();
    if (!body.name || !body.imageUrl) {
      return NextResponse.json(
        { error: "Technology name and image is required" },
        { status: 400 }
      );
    }
    const newTechnology: Technology = await prisma.technology.create({
      data: body,
    });
    return NextResponse.json(newTechnology, { status: 201 });
  } catch (error) {
    console.error("Error creating technology:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the technology." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const AllTechs: Technology[] = await prisma.technology.findMany();
    if (AllTechs) {
      
      return NextResponse.json(AllTechs, { status: 200 });
    }
    }
    catch (error) {
      console.error("Error Finding technology:", error);
      return NextResponse.json(
        { error: "An error occurred while Finding all the technologies." },
        { status: 500 }
      );
    }
  } 


