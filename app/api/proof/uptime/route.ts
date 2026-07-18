import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const uptimeSchema = z.object({
  urls: z.array(z.string().url()).min(1).max(8),
});

export async function POST(request: NextRequest) {
  const parsed = uptimeSchema.safeParse(
    await request.json().catch(() => null)
  );

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  const results = await Promise.all(
    parsed.data.urls.map(async (url) => {
      const start = Date.now();
      try {
        const response = await fetch(url, {
          method: "HEAD",
          redirect: "follow",
          signal: AbortSignal.timeout(8000),
          headers: { "User-Agent": "MohsenPortfolioUptimeProbe/1.0" },
        });
        return {
          url,
          ok: response.ok,
          status: response.status,
          latencyMs: Date.now() - start,
        };
      } catch {
        return {
          url,
          ok: false,
          status: 0,
          latencyMs: Date.now() - start,
        };
      }
    })
  );

  return NextResponse.json({ results });
}
