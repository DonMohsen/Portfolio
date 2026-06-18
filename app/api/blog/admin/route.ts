import { NextRequest, NextResponse } from "next/server";
import { requireBearerAdmin, unauthorizedResponse } from "@/lib/auth/admin-auth";
import { listAllBlogPostsAdmin } from "@/lib/cms/blog/repository";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const admin = await requireBearerAdmin(request);
  if (!admin) return unauthorizedResponse();

  const posts = await listAllBlogPostsAdmin();
  return NextResponse.json(posts);
}
