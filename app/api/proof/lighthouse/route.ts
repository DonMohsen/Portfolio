import { NextResponse } from "next/server";
import { resolveSiteUrl } from "@/lib/metadata-base";

export const runtime = "nodejs";
export const revalidate = 86400;

type LighthousePayload = {
  performanceScore: number | null;
  strategy: "mobile" | "desktop";
  checkedAt: string;
  url: string;
  source: "pagespeed" | "unavailable";
};

function extractScore(payload: unknown): number | null {
  const root = payload as {
    lighthouseResult?: {
      categories?: { performance?: { score?: number } };
    };
  };
  const score = root.lighthouseResult?.categories?.performance?.score;
  return score != null ? Math.round(score * 100) : null;
}

async function fetchPageSpeedScore(
  url: string,
  strategy: "mobile" | "desktop"
): Promise<number | null> {
  const apiKey =
    process.env.PAGESPEED_API_KEY?.trim() ||
    process.env.GOOGLE_PAGESPEED_API_KEY?.trim();
  if (!apiKey) return null;

  const endpoint = new URL(
    "https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed"
  );
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", strategy);
  endpoint.searchParams.set("category", "performance");
  endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint.toString(), {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    console.error("Lighthouse API error:", response.status);
    return null;
  }

  const data = await response.json();
  return extractScore(data);
}

export async function GET() {
  const siteUrl = resolveSiteUrl();
  const targetUrl = `${siteUrl}/en`;
  const strategy: "mobile" | "desktop" = "mobile";

  try {
    const score = await fetchPageSpeedScore(targetUrl, strategy);

    const body: LighthousePayload = {
      performanceScore: score,
      strategy,
      checkedAt: new Date().toISOString(),
      url: targetUrl,
      source: score != null ? "pagespeed" : "unavailable",
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    });
  } catch (error) {
    console.error("Lighthouse route error:", error);
    return NextResponse.json(
      {
        performanceScore: null,
        strategy,
        checkedAt: new Date().toISOString(),
        url: targetUrl,
        source: "unavailable",
      } satisfies LighthousePayload,
      { status: 200 }
    );
  }
}
