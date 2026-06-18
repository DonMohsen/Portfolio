import { PrismaClient } from "@prisma/client";
import {
  createBlogPost,
  deleteBlogPost,
  getBlogPostBySlugFromDb,
  listPublishedBlogPosts,
  updateBlogPost,
} from "../lib/cms/blog/repository";

const prisma = new PrismaClient();
const TEST_SLUG = "cms-e2e-draft-test";

async function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
  console.log(`✓ ${message}`);
}

async function cleanup() {
  await prisma.blogPost.deleteMany({ where: { slug: TEST_SLUG } });
}

async function main() {
  await cleanup();

  await createBlogPost({
    slug: TEST_SLUG,
    status: "draft",
    category: "tech",
    titleEn: "E2E Draft Post",
    titleFa: "پست تست پیش‌نویس",
    excerptEn: "Draft excerpt EN",
    excerptFa: "خلاصه پیش‌نویس FA",
    contentHtmlEn: "<h2>Section</h2><p>Draft body EN</p>",
    contentHtmlFa: "<h2>بخش</h2><p>متن پیش‌نویس FA</p>",
    views: 0,
    likes: 0,
  });

  const draftPublic = await getBlogPostBySlugFromDb(TEST_SLUG);
  await assert(draftPublic === null, "Draft post hidden from public slug lookup");

  const publishedList = await listPublishedBlogPosts();
  await assert(
    !publishedList.some((post) => post.slug === TEST_SLUG),
    "Draft post excluded from published listing"
  );

  const row = await prisma.blogPost.findUniqueOrThrow({
    where: { slug: TEST_SLUG },
  });

  await updateBlogPost(row.id, {
    slug: TEST_SLUG,
    status: "published",
    category: "tech",
    titleEn: "E2E Published Post",
    titleFa: "پست تست منتشرشده",
    excerptEn: "Published excerpt EN",
    excerptFa: "خلاصه منتشرشده FA",
    contentHtmlEn: "<h2>Published</h2><p>Published body EN</p>",
    contentHtmlFa: "<h2>منتشرشده</h2><p>متن منتشرشده FA</p>",
    views: 10,
    likes: 2,
  });

  const publishedPublic = await getBlogPostBySlugFromDb(TEST_SLUG);
  await assert(
    publishedPublic?.title.en === "E2E Published Post",
    "Published post visible via public slug lookup"
  );
  await assert(
    (publishedPublic?.headings?.length ?? 0) > 0,
    "Headings auto-extracted on save"
  );
  await assert(
    (publishedPublic?.readTimeMinutes ?? 0) > 0,
    "Read time auto-calculated on save"
  );

  const publishedListAfter = await listPublishedBlogPosts();
  await assert(
    publishedListAfter.some((post) => post.slug === TEST_SLUG),
    "Published post included in listing"
  );

  await deleteBlogPost(row.id);

  const afterDelete = await getBlogPostBySlugFromDb(TEST_SLUG);
  await assert(afterDelete === null, "Deleted post no longer accessible");

  console.log("\nAll blog CMS E2E checks passed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await cleanup();
    await prisma.$disconnect();
  });
