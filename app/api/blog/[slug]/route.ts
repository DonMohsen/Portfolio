import { NextRequest, NextResponse } from "next/server";
import { getBlogPostBySlugFromDb } from "@/lib/cms/blog/repository";

export const runtime = "nodejs";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, props: Params) {
  const { slug } = await props.params;
  const post = await getBlogPostBySlugFromDb(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(post);
}
