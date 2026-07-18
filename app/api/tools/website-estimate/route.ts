import { NextRequest, NextResponse } from "next/server";
import { computeWebsiteCost } from "@/lib/tools/website-cost-logic";
import { z } from "zod";

export const runtime = "nodejs";

const websiteEstimateSchema = z.object({
  websiteType: z.enum(["marketing", "cms-blog", "ecommerce-lite", "landing"]),
  pageCount: z.enum(["1-5", "6-15", "16-30", "30plus"]),
  features: z
    .array(
      z.enum([
        "cms",
        "blog",
        "forms",
        "i18n",
        "animations",
        "ecommerce",
        "seo",
      ])
    )
    .max(7),
  timeline: z.enum(["rush", "normal", "flexible"]),
  locale: z.enum(["fa", "en"]),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = websiteEstimateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input." }, { status: 400 });
    }

    const result = computeWebsiteCost(parsed.data);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Website estimate error:", error);
    return NextResponse.json(
      { error: "Unable to compute estimate." },
      { status: 500 }
    );
  }
}
