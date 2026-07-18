/**
 * Re-sync project slugs from names using the same logic as lib/projects/slugify.ts.
 * Safe to re-run after imports or manual DB edits.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  const projects = await prisma.projects.findMany({
    select: { id: true, name: true },
    orderBy: { id: "asc" },
  });

  const used = new Set();

  for (const project of projects) {
    const base = slugify(project.name) || `project-${project.id}`;
    let slug = base;
    let suffix = 2;

    while (used.has(slug)) {
      slug = `${base}-${suffix}`;
      suffix += 1;
    }

    used.add(slug);

    await prisma.projects.update({
      where: { id: project.id },
      data: { slug },
    });

    console.log(`#${project.id} → ${slug}`);
  }

  console.log(`Backfilled ${projects.length} project slug(s).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
