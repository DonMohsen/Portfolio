import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const filters: any = {};

  // Competency Filters (Handle Both `gte` and `lte`)
  if (searchParams.has("mincompetency") || searchParams.has("maxcompetency")) {
    filters.competency = {};
    if (searchParams.has("mincompetency")) {
      filters.competency.gte = Number(searchParams.get("mincompetency"));
    }
    if (searchParams.has("maxcompetency")) {
      filters.competency.lte = Number(searchParams.get("maxcompetency"));
    }
  }

  // Type Filter
  if (searchParams.has("type")) {
    filters.type = searchParams.get("type");
  }

  // CreatedAt Filters (Handle Both `gte` and `lte`)
  if (searchParams.has("createdatmin") || searchParams.has("createdatmax")) {
    filters.createdAt = {};
    if (searchParams.has("createdatmin")) {
      filters.createdAt.gte = new Date(searchParams.get("createdatmin")!);
    }
    if (searchParams.has("createdatmax")) {
      filters.createdAt.lte = new Date(searchParams.get("createdatmax")!);
    }
  }

  // Fetch projects from Prisma
  const projects = await prisma.projects.findMany({ where: filters });

  return NextResponse.json(projects);
}
