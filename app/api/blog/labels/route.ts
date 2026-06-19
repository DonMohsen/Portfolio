import { NextResponse } from "next/server";
import { getPublishedSlugLabels } from "@/lib/cms/blog/repository";

export const runtime = "nodejs";

export async function GET() {
  try {
    const labels = await getPublishedSlugLabels();
    return NextResponse.json(labels, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error loading blog labels:", error);
    return NextResponse.json(
      {},
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  }
}
