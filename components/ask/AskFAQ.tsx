"use client";

import Link from "next/link";
import { useState } from "react";
import type { getAskFaqForLocale } from "@/lib/ask/content";

type AskFaqItem = ReturnType<typeof getAskFaqForLocale>[number];

type AskFAQProps = {
  locale: string;
  items: AskFaqItem[];
};

function AskFAQItemRow({
  item,
  locale,
  isLast,
}: {
  item: AskFaqItem;
  locale: string;
  isLast: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFa = locale === "fa";

  return (
    <article
      id={item.id}
      className={`scroll-mt-24 ${!isLast ? "border-b border-tech-card-border" : ""}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-start transition-colors hover:bg-tech-card/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cosmic/40"
      >
        <h3 className="min-w-0 flex-1 text-base font-medium text-page-text sm:text-lg">
          {item.question}
        </h3>
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-page-subtle text-page-subtle"
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen ? (
        <div className={`px-6 pb-6 ${isFa ? "text-right" : "text-left"}`}>
          <p className="text-[15px] leading-7 text-page-subtle">{item.answerPlain}</p>
          {item.links.length > 0 ? (
            <ul
              className={`mt-4 flex flex-wrap gap-3 ${isFa ? "flex-row-reverse justify-end" : ""}`}
            >
              {item.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${locale}${link.href.startsWith("/") ? link.href : `/${link.href}`}`}
                    className="inline-flex rounded-full border border-accent-cosmic/35 bg-accent-cosmic/5 px-3 py-1.5 text-sm font-medium text-accent-cosmic hover:bg-accent-cosmic/10"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default function AskFAQ({ locale, items }: AskFAQProps) {
  const isFa = locale === "fa";

  return (
    <section aria-labelledby="ask-faq-heading">
      <h2 id="ask-faq-heading" className="sr-only">
        {isFa ? "پرسش و پاسخ" : "Questions and answers"}
      </h2>
      <div className="overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card shadow-[var(--tech-card-shadow)]">
        {items.map((item, index) => (
          <AskFAQItemRow
            key={item.id}
            item={item}
            locale={locale}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
