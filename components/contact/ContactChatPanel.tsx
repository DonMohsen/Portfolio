"use client";

import clsx from "clsx";
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  CHAT_QUICK_ACTIONS,
  SUGGESTED_CHAT_PROMPTS,
} from "@/lib/contact/portfolio-context";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RelatedLink = {
  slug: string;
  title?: string;
  name?: string;
  outcome?: string;
  url: string;
};

type ContactChatPanelProps = {
  locale: string;
  className?: string;
  showQuickActions?: boolean;
};

const SESSION_KEY = "portfolio-advisor-session";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `adv-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export default function ContactChatPanel({
  locale,
  className = "",
  showQuickActions = true,
}: ContactChatPanelProps) {
  const isFa = locale === "fa";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scheduleUrl, setScheduleUrl] = useState<string | null>(null);
  const [briefUrl, setBriefUrl] = useState<string | null>(null);
  const [relatedService, setRelatedService] = useState<RelatedLink | null>(
    null
  );
  const [relatedCaseStudy, setRelatedCaseStudy] = useState<RelatedLink | null>(
    null
  );
  const [showSessionCta, setShowSessionCta] = useState(false);
  const [leadLogged, setLeadLogged] = useState(false);

  const suggestions = isFa
    ? SUGGESTED_CHAT_PROMPTS.fa
    : SUGGESTED_CHAT_PROMPTS.en;
  const quickActions = isFa ? CHAT_QUICK_ACTIONS.fa : CHAT_QUICK_ACTIONS.en;

  const basePath = `/${locale}/contact`;

  const canSend = input.trim().length > 0 && !loading;

  const logAdvisorLead = useCallback(
    async (
      currentMessages: ChatMessage[],
      service: RelatedLink | null,
      caseStudy: RelatedLink | null
    ) => {
      if (leadLogged) return;
      const sessionId = getOrCreateSessionId();
      if (!sessionId) return;

      try {
        await fetch("/api/contact/advisor-lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            locale: isFa ? "fa" : "en",
            messages: currentMessages,
            suggestedServiceSlug: service?.slug,
            suggestedCaseStudySlug: caseStudy?.slug,
          }),
        });
        setLeadLogged(true);
      } catch {
        // non-blocking
      }
    },
    [isFa, leadLogged]
  );

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);
    setScheduleUrl(null);
    setBriefUrl(null);

    try {
      const response = await fetch("/api/contact/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          locale: isFa ? "fa" : "en",
          sessionId: getOrCreateSessionId(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error ?? "Chat failed");
      }

      const assistantMessage = data.message as string;
      const fullMessages: ChatMessage[] = [
        ...nextMessages,
        { role: "assistant", content: assistantMessage },
      ];

      setMessages(fullMessages);

      const service = (data.relatedService as RelatedLink | null) ?? null;
      const caseStudy = (data.relatedCaseStudy as RelatedLink | null) ?? null;

      if (service) setRelatedService(service);
      if (caseStudy) setRelatedCaseStudy(caseStudy);

      if (data.suggestSchedule && data.scheduleUrl) {
        setScheduleUrl(data.scheduleUrl as string);
        setShowSessionCta(true);
        void logAdvisorLead(fullMessages, service, caseStudy);
      }

      if (data.suggestBrief && data.briefUrl) {
        setBriefUrl(data.briefUrl as string);
        setShowSessionCta(true);
      }

      if (data.discoverySprint && !data.suggestSchedule) {
        setShowSessionCta(true);
      }
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : isFa
            ? "خطا در چت."
            : "Chat error."
      );
    } finally {
      setLoading(false);
    }
  };

  const emptyState = messages.length === 0;

  useEffect(() => {
    if (messages.length >= 4) {
      setShowSessionCta(true);
    }
  }, [messages.length]);

  return (
    <div
      className={clsx(
        "flex flex-col rounded-2xl border border-tech-card-border bg-page/40",
        className
      )}
    >
      <div className="max-h-[min(52vh,420px)] flex-1 overflow-y-auto p-4 sm:p-5">
        {emptyState ? (
          <div className={isFa ? "text-right" : "text-left"}>
            <p className="text-sm text-page-subtle">
              {isFa
                ? "مشاور AI — پاسخ فقط از خدمات، FAQ و case studyهای این سایت."
                : "AI advisor — answers grounded in this site's services, FAQ, and case studies."}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {suggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-lg border border-tech-card-border bg-page/50 px-3 py-2.5 text-left text-sm text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic rtl:text-right"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <li
                key={`${message.role}-${index}`}
                className={clsx(
                  "flex",
                  message.role === "user"
                    ? isFa
                      ? "justify-start"
                      : "justify-end"
                    : isFa
                      ? "justify-end"
                      : "justify-start"
                )}
              >
                <div
                  className={clsx(
                    "max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-6",
                    message.role === "user"
                      ? "bg-accent-cosmic text-accent-cosmic-fg"
                      : "border border-tech-card-border bg-page/70 text-page-text"
                  )}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </li>
            ))}
            {loading ? (
              <li className={isFa ? "text-right" : "text-left"}>
                <span className="inline-flex items-center gap-2 text-sm text-page-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isFa ? "در حال نوشتن..." : "Thinking..."}
                </span>
              </li>
            ) : null}
          </ul>
        )}

        {(relatedService || relatedCaseStudy) && !emptyState ? (
          <div className="mt-4 space-y-2 rounded-lg border border-tech-card-border bg-page/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-page-muted">
              {isFa ? "مرتبط" : "Related"}
            </p>
            {relatedService ? (
              <Link
                href={relatedService.url}
                className="block text-sm font-medium text-accent-cosmic hover:underline"
              >
                {relatedService.title ?? relatedService.slug}
              </Link>
            ) : null}
            {relatedCaseStudy ? (
              <Link
                href={relatedCaseStudy.url}
                className="block text-sm text-page-subtle hover:text-accent-cosmic"
              >
                {relatedCaseStudy.name}
                {relatedCaseStudy.outcome
                  ? ` — ${relatedCaseStudy.outcome}`
                  : ""}
              </Link>
            ) : null}
          </div>
        ) : null}

        {scheduleUrl ? (
          <div className="mt-4 rounded-lg border border-accent-cosmic/30 bg-accent-cosmic/5 p-3">
            <p className="text-sm text-page-subtle">
              {isFa
                ? "Discovery Sprint رایگان — fit را در ۳۰ دقیقه بررسی می‌کنیم:"
                : "Free discovery sprint — assess fit in 30 minutes:"}
            </p>
            <Link
              href={scheduleUrl}
              className="mt-2 inline-block text-sm font-semibold text-accent-cosmic hover:underline"
            >
              {isFa ? "رزرو تماس کشف" : "Book discovery call"}
            </Link>
          </div>
        ) : null}

        {briefUrl ? (
          <div className="mt-3 rounded-lg border border-tech-card-border bg-page/30 p-3">
            <Link
              href={briefUrl}
              className="text-sm font-semibold text-accent-cosmic hover:underline"
            >
              {isFa ? "ارسال project brief ←" : "Send project brief →"}
            </Link>
          </div>
        ) : null}

        {showSessionCta && !emptyState && !loading ? (
          <div
            className={`mt-4 flex flex-wrap gap-2 ${isFa ? "justify-end" : "justify-start"}`}
          >
            <Link
              href={`${basePath}?tab=schedule&source=ai-advisor`}
              className="rounded-full border border-accent-cosmic/40 bg-accent-cosmic/10 px-3 py-1.5 text-xs font-semibold text-accent-cosmic"
            >
              {isFa ? "رزرو تماس" : "Schedule"}
            </Link>
            <Link
              href={`${basePath}?tab=brief&source=ai-advisor`}
              className="rounded-full border border-tech-card-border px-3 py-1.5 text-xs font-medium text-page-subtle hover:text-accent-cosmic"
            >
              {isFa ? "ارسال brief" : "Brief"}
            </Link>
          </div>
        ) : null}

        {error ? (
          <p className="mt-3 text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      {showQuickActions ? (
        <div className="flex flex-wrap gap-2 border-t border-tech-card-border px-4 py-3">
          {quickActions.map((action) => {
            const href =
              action.id === "work" || action.id === "estimator"
                ? `/${locale}${action.hrefSuffix}`
                : `${basePath}${action.hrefSuffix}`;
            return (
              <Link
                key={action.id}
                href={href}
                className="rounded-full border border-tech-card-border px-3 py-1.5 text-xs font-medium text-page-subtle transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
              >
                {action.label}
              </Link>
            );
          })}
        </div>
      ) : null}

      <form
        className="flex gap-2 border-t border-tech-card-border p-3"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={isFa ? "پیام شما..." : "Your message..."}
          className="min-w-0 flex-1 rounded-lg border border-tech-card-border bg-page/50 px-3 py-2.5 text-sm text-page-text outline-none focus:border-accent-cosmic/50"
          disabled={loading}
          maxLength={2000}
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label={isFa ? "ارسال" : "Send"}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-cosmic text-accent-cosmic-fg transition-opacity disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
