import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { requireBearerAdmin, unauthorizedResponse } from "@/lib/auth/admin-auth";
import { slugify } from "@/lib/projects/slugify";
import { buildProjectBicmData } from "@/lib/projects/project-admin-payload";

export const runtime = "nodejs";

async function resolveUniqueProjectSlug(name: string): Promise<string> {
  const base = slugify(name) || "project";
  let slug = base;
  let suffix = 2;

  while (await prisma.projects.findUnique({ where: { slug } })) {
    slug = `${base}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function POST(req: NextRequest) {
  const admin = await requireBearerAdmin(req);

  if (!admin) {
    return unauthorizedResponse();
  }

  try {
    const body = await req.json();
    const bicm = buildProjectBicmData(body);

    if (
      !body.name ||
      !body.description ||
      !body.competency ||
      !body.projectType ||
      !body.githubLink ||
      !body.techStack
    ) {
      return NextResponse.json(
        { error: "Missing required fields or invalid data." },
        { status: 400 }
      );
    }

    const slug =
      typeof body.slug === "string" && body.slug.trim()
        ? slugify(body.slug)
        : await resolveUniqueProjectSlug(body.name);

    const newProject = await prisma.projects.create({
      data: {
        name: body.name,
        description: body.description,
        liveLink: body.liveLink ?? null,
        image: body.image ?? null,
        competency: body.competency,
        projectType: body.projectType,
        githubLink: body.githubLink,
        slug,
        industry: bicm.industry,
        outcomeMetric: bicm.outcomeMetric,
        featured: bicm.featured,
        role: bicm.role,
        year: bicm.year,
        problemHtml: bicm.problemHtml,
        insightHtml: bicm.insightHtml,
        changeHtml: bicm.changeHtml,
        measurementHtml: bicm.measurementHtml,
        failureHtml: bicm.failureHtml,
        clientQuote: bicm.clientQuote,
        clientName: bicm.clientName,
        metricsJson: bicm.metricsJson ?? Prisma.JsonNull,
        techStack: body.techStack?.create
          ? {
              create: body.techStack.create.map(
                (entry: { technologyId: number; addedBy: string }) => ({
                  technologyId: entry.technologyId,
                  addedBy: entry.addedBy,
                })
              ),
            }
          : undefined,
      },
      include: {
        techStack: {
          include: {
            technology: true,
          },
        },
      },
    });

    revalidateTag("project", {});

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
