"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type BlogFAQSectionProps = {
  items: FaqItem[];
  locale: string;
  title?: string;
};

function FAQItem({
  item,
  isLast,
}: {
  item: FaqItem;
  isLast: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full ${!isLast ? "border-b border-tech-card-border" : ""}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between p-6 text-start transition-colors hover:bg-tech-card/80 focus:outline-none"
      >
        <h3 className="min-w-0 flex-1 text-sm font-medium text-page-text">
          {item.question}
        </h3>
        <div className="ms-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-page-subtle">
          {isOpen ? (
            <div className="h-0.5 w-2 bg-page-text" />
          ) : (
            <div className="relative h-2 w-2">
              <div className="absolute left-1/2 top-1/2 h-0.5 w-2 -translate-x-1/2 -translate-y-1/2 bg-page-text" />
              <div className="absolute left-1/2 top-1/2 h-2 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-page-text" />
            </div>
          )}
        </div>
      </button>

      {isOpen ? (
        <div className="px-6 pb-4">
          <p className="whitespace-pre-line break-words text-sm font-light leading-relaxed text-page-muted">
            {item.answer}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default function BlogFAQSection({
  items,
  locale,
  title,
}: BlogFAQSectionProps) {
  const isFa = locale === "fa";

  if (!items.length) return null;

  return (
    <section id="faq-section" className="w-full">
      <div className="w-full overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card shadow-[var(--tech-card-shadow)]">
        <div className="px-4 pb-4 pt-6 text-center sm:px-6 md:px-8 lg:px-10">
          <h2 className="px-2 text-[18px] font-bold text-page-text max-md:text-[16px]">
            {title ??
              (isFa ? "سوالات متداول" : "Frequently asked questions")}
          </h2>
        </div>

        {items.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
