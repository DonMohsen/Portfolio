import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  analyzeAdvisorIntent,
  buildAdvisorSystemPrompt,
  retrieveRagContext,
} from "@/lib/contact/rag-context";
import {
  checkChatRateLimit,
  getClientIp,
} from "@/lib/contact/chat-rate-limit";
import { getServiceLanding } from "@/lib/services/catalog";
import { CASE_STUDY_SEEDS } from "@/lib/projects/case-study-seeds";
import { resolveSiteUrl } from "@/lib/metadata-base";

export const runtime = "nodejs";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(2000),
});

const chatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(24),
  locale: z.enum(["fa", "en"]).optional(),
  sessionId: z.string().trim().max(64).optional(),
});

const CHAT_MODEL =
  process.env.OPENROUTER_CHAT_MODEL?.trim() ||
  "google/gemini-2.0-flash-001";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is temporarily unavailable." },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  const rate = checkChatRateLimit(`chat:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "Too many messages. Please try again later or use the contact form.",
        retryAfterSec: rate.retryAfterSec,
      },
      {
        status: 429,
        headers: rate.retryAfterSec
          ? { "Retry-After": String(rate.retryAfterSec) }
          : undefined,
      }
    );
  }

  const parsed = chatRequestSchema.safeParse(
    await request.json().catch(() => null)
  );

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid chat payload." }, { status: 400 });
  }

  const locale = parsed.data.locale ?? "en";
  const siteUrl = resolveSiteUrl();
  const userMessages = parsed.data.messages.filter((m) => m.role === "user");
  const intent = analyzeAdvisorIntent(parsed.data.messages);

  const scheduleParams = new URLSearchParams({
    tab: "schedule",
    source: "ai-advisor",
  });
  const briefParams = new URLSearchParams({
    tab: "brief",
    source: "ai-advisor",
  });

  if (intent.suggestedServiceSlug) {
    scheduleParams.set("projectType", intent.suggestedServiceSlug);
    briefParams.set("projectType", intent.suggestedServiceSlug);
  }

  const lastUserMessage = userMessages.at(-1)?.content;
  if (lastUserMessage && lastUserMessage.length >= 20) {
    scheduleParams.set("message", lastUserMessage.slice(0, 500));
    briefParams.set("message", lastUserMessage.slice(0, 500));
  }

  const scheduleUrl = `${siteUrl}/${locale}/contact?${scheduleParams.toString()}`;
  const briefUrl = `${siteUrl}/${locale}/contact?${briefParams.toString()}`;
  const retrievalQuery = userMessages
    .slice(-2)
    .map((m) => m.content)
    .join(" ");
  const ragChunks = retrieveRagContext(retrievalQuery, { topK: 6 });
  const systemPrompt = buildAdvisorSystemPrompt(locale, ragChunks);

  try {
    const apiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": "Mohsen Portfolio AI Advisor",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: CHAT_MODEL,
          temperature: 0.35,
          max_tokens: 650,
          messages: [
            { role: "system", content: systemPrompt },
            ...parsed.data.messages,
          ],
        }),
      }
    );

    if (!apiResponse.ok) {
      const detail = await apiResponse.text();
      console.error("OpenRouter chat error:", apiResponse.status, detail);
      return NextResponse.json(
        { error: "AI service error. Try the brief form or email." },
        { status: 502 }
      );
    }

    const data = await apiResponse.json();
    const content = data?.choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Empty AI response." },
        { status: 502 }
      );
    }

    const relatedService = intent.suggestedServiceSlug
      ? (() => {
          const landing = getServiceLanding(intent.suggestedServiceSlug!);
          if (!landing) return null;
          return {
            slug: landing.slug,
            title: locale === "fa" ? landing.title.fa : landing.title.en,
            url: `${siteUrl}/${locale}/services/${landing.slug}`,
          };
        })()
      : null;

    const relatedCaseStudy = intent.suggestedCaseStudySlug
      ? (() => {
          const seed = CASE_STUDY_SEEDS.find(
            (s) => s.slug === intent.suggestedCaseStudySlug
          );
          if (!seed) return null;
          return {
            slug: seed.slug,
            name: seed.name,
            outcome: seed.outcomeMetric,
            url: `${siteUrl}/${locale}/work/${seed.slug}`,
          };
        })()
      : null;

    return NextResponse.json({
      message: content.trim(),
      suggestSchedule: intent.isSerious || intent.suggestDiscovery,
      suggestBrief: intent.isSerious,
      scheduleUrl,
      briefUrl,
      relatedService,
      relatedCaseStudy,
      discoverySprint: intent.suggestDiscovery,
      source: "ai-advisor",
    });
  } catch (error) {
    console.error("Contact chat error:", error);
    return NextResponse.json(
      { error: "Chat failed. Please use the contact form." },
      { status: 500 }
    );
  }
}
