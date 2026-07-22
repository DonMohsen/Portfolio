"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import BriefInquiryForm from "@/components/contact/BriefInquiryForm";
import ContactChatPanel from "@/components/contact/ContactChatPanel";
import TrustStrip from "@/components/Home/TrustStrip";
import {
  CONTACT_TABS,
  parseContactTab,
  type ContactTab,
} from "@/lib/contact/contact-tabs";
import { buildCalEmbedUrl } from "@/lib/contact/cal-prefill";
import {
  SITE_AVAILABILITY_EN,
  SITE_AVAILABILITY_FA,
  SITE_CALCOM_URL,
  SITE_EMAIL,
  SITE_RESPONSE_TIME_EN,
  SITE_RESPONSE_TIME_FA,
  getDirectContactChannels,
} from "@/lib/site";

type ContactHubProps = {
  locale: string;
  initialTab: string;
  defaultService?: string;
  defaultBudget?: string;
  defaultTimeline?: string;
  defaultMessage?: string;
  defaultSource?: string;
};

function pickTabLabel(locale: string, tab: (typeof CONTACT_TABS)[number]) {
  return locale === "fa" ? tab.label.fa : tab.label.en;
}

export default function ContactHub({
  locale,
  initialTab,
  defaultService = "",
  defaultBudget = "",
  defaultTimeline = "",
  defaultMessage = "",
  defaultSource = "contact-form",
}: ContactHubProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";
  const [tab, setTabState] = useState<ContactTab>(parseContactTab(initialTab));
  const router = useRouter();
  const pathname = usePathname();
  const channels = getDirectContactChannels(locale);

  const setTab = useCallback(
    (next: ContactTab) => {
      setTabState(next);
      const params = new URLSearchParams(window.location.search);
      params.set("tab", next);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router]
  );

  const calEmbedUrl = buildCalEmbedUrl(
    SITE_CALCOM_URL,
    {
      source: defaultSource,
      projectType: defaultService,
      budget: defaultBudget,
      timeline: defaultTimeline,
      message: defaultMessage,
    },
    locale
  );

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-3xl px-5 pb-4 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {isFa ? "هاب تماس" : "Contact hub"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
          {isFa ? "تماس" : "Contact"}
        </h1>
        <p className="mt-4 text-[15px] leading-7 text-page-subtle">
          {isFa ? SITE_AVAILABILITY_FA : SITE_AVAILABILITY_EN}
          {" · "}
          {isFa ? SITE_RESPONSE_TIME_FA : SITE_RESPONSE_TIME_EN}
        </p>
      </section>

      <TrustStrip locale={locale} />

      <section className="mx-auto max-w-3xl px-5 py-8 sm:px-6 md:px-10 lg:px-12">
        <div
          className="flex flex-wrap gap-2 border-b border-tech-card-border pb-4"
          role="tablist"
          aria-label={isFa ? "تب‌های تماس" : "Contact tabs"}
        >
          {CONTACT_TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={clsx(
                "rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                tab === item.id
                  ? "bg-accent-cosmic text-accent-cosmic-fg"
                  : "bg-page/40 text-page-subtle hover:bg-page/60 hover:text-page-text"
              )}
            >
              {pickTabLabel(locale, item)}
            </button>
          ))}
        </div>

        <div className="mt-8" role="tabpanel">
          {tab === "schedule" ? (
            <div className={`space-y-6 ${textAlign}`}>
              <p className="text-[15px] leading-7 text-page-subtle">
                {isFa
                  ? "تماس کشف ۳۰ دقیقه‌ای — fit، تایم‌لاین و مدل همکاری را بررسی می‌کنیم."
                  : "30-minute discovery call — we'll review fit, timeline, and engagement model."}
              </p>

              {calEmbedUrl ? (
                <div className="overflow-hidden rounded-2xl border border-tech-card-border bg-page/30">
                  <iframe
                    title={isFa ? "رزرو وقت" : "Book a time"}
                    src={calEmbedUrl}
                    className="h-[600px] w-full border-0"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-tech-card-border bg-page/40 p-6">
                  <h2 className="text-lg font-semibold text-page-text">
                    {isFa ? "زمان‌های ترجیحی" : "Preferred times"}
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-page-subtle">
                    {isFa
                      ? "شنبه تا چهارشنبه، ۱۰:۰۰–۱۸:۰۰ به وقت تهران (UTC+3:30). لطفاً brief بفرستید یا ایمیل بزنید — برای embed تقویم، NEXT_PUBLIC_CALCOM_URL را در env تنظیم کنید."
                      : "Sat–Wed, 10:00–18:00 Tehran time (UTC+3:30). Send a brief or email for now — set NEXT_PUBLIC_CALCOM_URL to enable the calendar embed."}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-page-muted">
                    <li>
                      {isFa
                        ? "• تماس ویدیویی: Google Meet یا Zoom"
                        : "• Video: Google Meet or Zoom"}
                    </li>
                    <li>
                      {isFa ? "• زبان: فارسی یا انگلیسی" : "• Language: FA or EN"}
                    </li>
                  </ul>
                  <div
                    className={`mt-6 flex flex-col gap-3 sm:flex-row ${
                      isFa ? "sm:flex-row-reverse sm:justify-end" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setTab("brief")}
                      className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-5 py-2.5 text-sm font-semibold text-accent-cosmic-fg"
                    >
                      {isFa ? "ارسال brief" : "Send a brief"}
                    </button>
                    <a
                      href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
                        isFa ? "درخواست تماس کشف" : "Discovery call request"
                      )}`}
                      className="inline-flex items-center justify-center rounded-lg border border-tech-card-border px-5 py-2.5 text-sm font-semibold text-page-text hover:border-accent-cosmic/40"
                    >
                      {isFa ? "ایمیل" : "Email"}
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {tab === "brief" ? (
            <BriefInquiryForm
              locale={locale}
              defaultProjectType={defaultService}
              defaultBudgetRange={defaultBudget}
              defaultTimeline={defaultTimeline}
              defaultMessage={defaultMessage}
              defaultSource={defaultSource}
            />
          ) : null}

          {tab === "chat" ? (
            <div className={textAlign}>
              <p className="mb-4 text-[15px] leading-7 text-page-subtle">
                {isFa
                  ? "مشاور AI با RAG روی خدمات، FAQ و case study — برای پروژه جدی Discovery Sprint رایگان پیشنهاد می‌شود."
                  : "AI advisor with RAG over services, FAQ, and case studies — serious projects get a free discovery sprint nudge."}
              </p>
              <ContactChatPanel locale={locale} />
            </div>
          ) : null}

          {tab === "direct" ? (
            <div className={textAlign}>
              <p className="mb-6 text-[15px] leading-7 text-page-subtle">
                {isFa
                  ? "تلگرام برای پاسخ سریع‌تر در FA — LinkedIn و ایمیل برای EN."
                  : "Telegram for faster FA replies — LinkedIn and email for EN."}
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {channels.map((channel) => (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      target={
                        channel.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        channel.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className={clsx(
                        "flex h-full flex-col rounded-xl border p-5 transition-colors hover:border-accent-cosmic/40",
                        channel.highlight
                          ? "border-accent-cosmic/40 bg-accent-cosmic/5"
                          : "border-tech-card-border bg-page/40"
                      )}
                    >
                      <span className="font-semibold text-page-text">
                        {channel.label}
                        {channel.highlight ? (
                          <span className="ms-2 text-xs font-normal text-accent-cosmic">
                            {isFa ? "پیشنهادی" : "Recommended"}
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-2 text-sm text-page-muted break-all">
                        {channel.id === "email"
                          ? SITE_EMAIL
                          : channel.href.replace(/^mailto:/, "")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-page-muted">
                <Link href={`/${locale}/process`} className="hover:text-accent-cosmic">
                  {isFa ? "فرآیند همکاری" : "How I work"}
                </Link>
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
