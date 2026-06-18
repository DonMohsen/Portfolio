import { NextRequest, NextResponse } from "next/server";
import {
  Prisma,
  Technology,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { requireBearerAdmin, unauthorizedResponse } from "@/lib/auth/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const admin = await requireBearerAdmin(request);

  if (!admin) {
    return unauthorizedResponse();
  }

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
    revalidateTag("project", {});
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


