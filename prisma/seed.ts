import { BlogCategory, BlogStatus, PrismaClient } from "@prisma/client";
import { BLOG_POSTS } from "../lib/blogs/posts";
import { CASE_STUDY_SEEDS } from "../lib/projects/case-study-seeds";

const prisma = new PrismaClient();

const TECH_ICON_BY_NAME: Record<string, string> = {
  "Next.js": "/icons/nextjs.svg",
  TypeScript: "/icons/typescript.svg",
  "Tailwind CSS": "/icons/tailwindcss.svg",
  Prisma: "/icons/prisma.svg",
  "Framer Motion": "/icons/framermotion.svg",
  "Express.js": "/icons/expressjs.svg",
  Redux: "/icons/redux.svg",
  Git: "/icons/git.svg",
  "REST API": "/icons/restapi.svg",
};

async function findOrCreateTechnology(name: string) {
  const existing = await prisma.technology.findFirst({ where: { name } });
  if (existing) return existing;

  return prisma.technology.create({
    data: {
      name,
      imageUrl: TECH_ICON_BY_NAME[name] ?? "/icons/git.svg",
    },
  });
}

async function seedCaseStudies() {
  for (const seed of CASE_STUDY_SEEDS) {
    const technologies = await Promise.all(
      seed.technologies.map((name) => findOrCreateTechnology(name))
    );

    const project = await prisma.projects.upsert({
      where: { slug: seed.slug },
      update: {
        name: seed.name,
        description: seed.description,
        liveLink: seed.liveLink,
        image: seed.image,
        competency: seed.competency,
        projectType: seed.projectType,
        githubLink: seed.githubLink,
        industry: seed.industry,
        outcomeMetric: seed.outcomeMetric,
        featured: seed.featured,
        role: seed.role,
        year: seed.year,
        problemHtml: seed.problemHtml,
        insightHtml: seed.insightHtml,
        changeHtml: seed.changeHtml,
        measurementHtml: seed.measurementHtml,
        failureHtml: seed.failureHtml,
        clientQuote: seed.clientQuote,
        clientName: seed.clientName,
        metricsJson: seed.metricsJson,
      },
      create: {
        slug: seed.slug,
        name: seed.name,
        description: seed.description,
        liveLink: seed.liveLink,
        image: seed.image,
        competency: seed.competency,
        projectType: seed.projectType,
        githubLink: seed.githubLink,
        industry: seed.industry,
        outcomeMetric: seed.outcomeMetric,
        featured: seed.featured,
        role: seed.role,
        year: seed.year,
        problemHtml: seed.problemHtml,
        insightHtml: seed.insightHtml,
        changeHtml: seed.changeHtml,
        measurementHtml: seed.measurementHtml,
        failureHtml: seed.failureHtml,
        clientQuote: seed.clientQuote,
        clientName: seed.clientName,
        metricsJson: seed.metricsJson,
      },
    });

    await prisma.projectsOnTechnologies.deleteMany({
      where: { projectId: project.id },
    });

    await prisma.projectsOnTechnologies.createMany({
      data: technologies.map((technology) => ({
        projectId: project.id,
        technologyId: technology.id,
        addedBy: "seed",
      })),
    });
  }

  console.log(`Seeded ${CASE_STUDY_SEEDS.length} BICM case studies.`);
}

async function main() {
  for (const post of BLOG_POSTS) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        status: BlogStatus.published,
        category: post.category as BlogCategory,
        publishedAt: new Date(post.publishedAt),
        titleEn: post.title.en,
        titleFa: post.title.fa,
        excerptEn: post.excerpt.en,
        excerptFa: post.excerpt.fa,
        contentHtmlEn: post.contentHtml?.en ?? `<p>${post.excerpt.en}</p>`,
        contentHtmlFa: post.contentHtml?.fa ?? `<p>${post.excerpt.fa}</p>`,
        conclusionHtmlEn: post.conclusionHtml?.en ?? null,
        conclusionHtmlFa: post.conclusionHtml?.fa ?? null,
        heroImage: post.heroImage ?? null,
        readTimeMinutes: post.readTimeMinutes ?? null,
        views: post.views ?? 0,
        likes: post.likes ?? 0,
        faq: post.faq ?? undefined,
        headings: post.headings ?? undefined,
      },
    });
  }

  console.log(`Seeded ${BLOG_POSTS.length} blog posts.`);

  await seedCaseStudies();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
