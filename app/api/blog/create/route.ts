import { NextRequest, NextResponse } from "next/server";
import { requireBearerAdmin, unauthorizedResponse } from "@/lib/auth/admin-auth";
import { revalidateBlogCache } from "@/lib/cms/core/revalidate";
import { createBlogPost } from "@/lib/cms/blog/repository";
import { blogPostInputSchema } from "@/lib/cms/blog/schema";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const admin = await requireBearerAdmin(request);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await request.json();
    const parsed = blogPostInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const post = await createBlogPost(parsed.data);
    revalidateBlogCache();
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "SLUG_TAKEN") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error("Error creating blog post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
