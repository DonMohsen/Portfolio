import { NextRequest, NextResponse } from "next/server";
import { getCachedPublishedBlogPosts } from "@/lib/cms/blog/repository";
import type { BlogCategory } from "@/lib/blogs/types";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as BlogCategory | "all" | null;
  const sort = searchParams.get("sort") === "popular" ? "popular" : "latest";

  let posts = await getCachedPublishedBlogPosts();

  if (category && category !== "all") {
    posts = posts.filter((post) => post.category === category);
  }

  if (sort === "popular") {
    posts = [...posts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  }

  return NextResponse.json(posts);
}
