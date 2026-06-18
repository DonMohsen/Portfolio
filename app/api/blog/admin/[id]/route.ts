import { NextRequest, NextResponse } from "next/server";
import { requireBearerAdmin, unauthorizedResponse } from "@/lib/auth/admin-auth";
import { revalidateBlogCache } from "@/lib/cms/core/revalidate";
import {
  deleteBlogPost,
  getBlogPostByIdAdmin,
  updateBlogPost,
} from "@/lib/cms/blog/repository";
import { blogPostInputSchema } from "@/lib/cms/blog/schema";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, props: Params) {
  const admin = await requireBearerAdmin(request);
  if (!admin) return unauthorizedResponse();

  const { id } = await props.params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const post = await getBlogPostByIdAdmin(postId);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(request: NextRequest, props: Params) {
  const admin = await requireBearerAdmin(request);
  if (!admin) return unauthorizedResponse();

  const { id } = await props.params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = blogPostInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const post = await updateBlogPost(postId, parsed.data);
    revalidateBlogCache();
    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof Error && error.message === "SLUG_TAKEN") {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
    }
    console.error("Error updating blog post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, props: Params) {
  const admin = await requireBearerAdmin(request);
  if (!admin) return unauthorizedResponse();

  const { id } = await props.params;
  const postId = Number(id);
  if (!Number.isFinite(postId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const deleted = await deleteBlogPost(postId);
    revalidateBlogCache();
    return NextResponse.json({ message: "Deleted", deleted });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
