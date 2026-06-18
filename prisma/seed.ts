import { BlogCategory, BlogStatus, PrismaClient } from "@prisma/client";
import { BLOG_POSTS } from "../lib/blogs/posts";

const prisma = new PrismaClient();

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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
