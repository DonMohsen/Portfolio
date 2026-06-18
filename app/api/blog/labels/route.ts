import { NextResponse } from "next/server";
import { getPublishedSlugLabels } from "@/lib/cms/blog/repository";

export const runtime = "nodejs";

export async function GET() {
  const labels = await getPublishedSlugLabels();
  return NextResponse.json(labels, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
