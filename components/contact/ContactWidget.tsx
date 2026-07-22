"use client";

import clsx from "clsx";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import ContactChatPanel from "@/components/contact/ContactChatPanel";

export default function ContactWidget() {
  const locale = useLocale();
  const isFa = locale === "fa";
  const [open, setOpen] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label={isFa ? "بستن" : "Close overlay"}
          className="fixed inset-0 z-[19000] bg-black/40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {/*
        Shell stays dir=ltr so flex `items-end` + `right-4` stay physically
        bottom-right in FA RTL pages (otherwise items-end flips to the left).
      */}
      <div
        dir="ltr"
        className="fixed bottom-4 right-4 z-[20000] flex flex-col items-end gap-3"
      >
        {open ? (
          <div
            dir={isFa ? "rtl" : "ltr"}
            className={clsx(
              "w-[min(calc(100vw-2rem),380px)] overflow-hidden rounded-2xl border border-tech-card-border bg-page shadow-2xl",
              !reduceMotion && "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-300"
            )}
          >
            <div className="flex items-center justify-between border-b border-tech-card-border px-4 py-3">
              <div className={isFa ? "text-right" : "text-left"}>
                <p className="text-sm font-semibold text-page-text">
                  {isFa ? "مشاور پروژه AI" : "AI Project Advisor"}
                </p>
                <p className="text-xs text-page-muted">
                  {isFa
                    ? "پاسخ grounded از خدمات و case study"
                    : "Grounded in services & case studies"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-page-muted hover:bg-page/60 hover:text-page-text"
                aria-label={isFa ? "بستن چت" : "Close chat"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ContactChatPanel
              locale={locale}
              className="rounded-none border-0 bg-transparent"
            />
            <div className="border-t border-tech-card-border px-4 py-2 text-center">
              <Link
                href={`/${locale}/contact?tab=schedule&source=ai-advisor`}
                className="text-xs font-medium text-accent-cosmic hover:underline"
              >
                {isFa ? "رزرو تماس کشف" : "Book a discovery call"}
              </Link>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={isFa ? "باز کردن مشاور پروژه" : "Open project advisor"}
          className={clsx(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-cosmic text-accent-cosmic-fg shadow-lg transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cosmic focus-visible:ring-offset-2 focus-visible:ring-offset-page",
            !reduceMotion && !open && "motion-safe:animate-pulse"
          )}
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </button>
      </div>
    </>
  );
}
