import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  checkChatRateLimit,
  getClientIp,
} from "@/lib/contact/chat-rate-limit";
import { analyzeI18nHtml } from "@/lib/tools/i18n-checker";

export const runtime = "nodejs";

const schema = z.object({
  url: z.string().trim().min(4).max(500),
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

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = checkChatRateLimit(`i18n:${ip}`, 12, 60 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429 }
    );
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid URL." }, { status: 400 });
  }

  const normalized = normalizeUrl(parsed.data.url);
  if (!normalized) {
    return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
  }

  try {
    const response = await fetch(normalized, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: {
        "User-Agent": "MohsenPortfolioI18nChecker/1.0",
        Accept: "text/html",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Fetch failed (${response.status}).` },
        { status: 502 }
      );
    }

    const html = (await response.text()).slice(0, 400_000);
    const result = analyzeI18nHtml(normalized, html);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("i18n check error:", error);
    return NextResponse.json(
      { error: "Could not fetch or analyze that URL." },
      { status: 500 }
    );
  }
}
