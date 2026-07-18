import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  checkChatRateLimit,
  getClientIp,
} from "@/lib/contact/chat-rate-limit";
import {
  buildSpeedCheckResult,
  type SpeedMetrics,
} from "@/lib/tools/speed-scorecard";

export const runtime = "nodejs";

const speedCheckSchema = z.object({
  url: z.string().trim().min(4).max(500),
  strategy: z.enum(["mobile", "desktop"]).default("mobile"),
  locale: z.enum(["fa", "en"]).optional(),
});

function normalizeUrl(raw: string): string | null {
  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const parsed = new URL(withProtocol);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function extractPsiMetrics(payload: unknown): SpeedMetrics | null {
  const root = payload as {
    lighthouseResult?: {
      categories?: { performance?: { score?: number } };
      audits?: Record<
        string,
        { numericValue?: number; displayValue?: string }
      >;
    };
  };

  const audits = root.lighthouseResult?.audits;
  if (!audits) return null;

  const perfScore = root.lighthouseResult?.categories?.performance?.score;
  return {
    lcpMs: audits["largest-contentful-paint"]?.numericValue ?? null,
    cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
    inpMs:
      audits["interaction-to-next-paint"]?.numericValue ??
      audits["experimental-interaction-to-next-paint"]?.numericValue ??
      audits["max-potential-fid"]?.numericValue ??
      null,
    fcpMs: audits["first-contentful-paint"]?.numericValue ?? null,
    ttfbMs: audits["server-response-time"]?.numericValue ?? null,
    performanceScore:
      perfScore != null ? Math.round(perfScore * 100) : null,
  };
}

async function fetchPageSpeedMetrics(
  url: string,
  strategy: "mobile" | "desktop"
): Promise<SpeedMetrics | null> {
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
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    console.error("PageSpeed API error:", response.status, await response.text());
    return null;
  }

  const data = await response.json();
  return extractPsiMetrics(data);
}

async function probeFallbackMetrics(url: string): Promise<SpeedMetrics> {
  const start = Date.now();
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: { "User-Agent": "MohsenPortfolioSpeedProbe/1.0" },
    });
    const ttfbMs = Date.now() - start;
    const html = await response.text();
    const hasLargeImages = (html.match(/<img/gi) ?? []).length > 8;
    const scriptCount = (html.match(/<script/gi) ?? []).length;

    const estimatedScore = Math.max(
      35,
      Math.min(
        85,
        90 -
          Math.floor(ttfbMs / 120) -
          (hasLargeImages ? 12 : 0) -
          Math.min(scriptCount * 2, 20)
      )
    );

    return {
      lcpMs: null,
      cls: null,
      inpMs: null,
      fcpMs: null,
      ttfbMs,
      performanceScore: estimatedScore,
    };
  } catch {
    return {
      lcpMs: null,
      cls: null,
      inpMs: null,
      fcpMs: null,
      ttfbMs: null,
      performanceScore: null,
    };
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkChatRateLimit(`speed:${ip}`, 10, 60 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  const parsed = speedCheckSchema.safeParse(
    await request.json().catch(() => null)
  );

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
  }

  const normalized = normalizeUrl(parsed.data.url);
  if (!normalized) {
    return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
  }

  try {
    let metrics = await fetchPageSpeedMetrics(
      normalized,
      parsed.data.strategy
    );
    const usedPageSpeedApi = metrics != null;

    if (!metrics) {
      metrics = await probeFallbackMetrics(normalized);
    }

    const result = buildSpeedCheckResult(
      normalized,
      parsed.data.strategy,
      metrics,
      usedPageSpeedApi
    );

    return NextResponse.json({ ok: true, result, usedPageSpeedApi });
  } catch (error) {
    console.error("Speed check error:", error);
    return NextResponse.json(
      { error: "Speed check failed." },
      { status: 500 }
    );
  }
}
