"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { navigateWithViewTransition } from "@/lib/navigate-with-view-transition";

type CommandItem = {
  id: string;
  labelEn: string;
  labelFa: string;
  href: string;
  keywords?: string[];
};

const COMMAND_ITEMS: CommandItem[] = [
  { id: "home", labelEn: "Home", labelFa: "خانه", href: "/" },
  { id: "work", labelEn: "Work / Case studies", labelFa: "کارها / Case study", href: "/work" },
  { id: "services", labelEn: "Services", labelFa: "خدمات", href: "/services" },
  { id: "tools", labelEn: "Tools", labelFa: "ابزارها", href: "/tools" },
  { id: "process", labelEn: "Process", labelFa: "فرآیند", href: "/process" },
  { id: "contact", labelEn: "Contact", labelFa: "تماس", href: "/contact" },
  { id: "ask", labelEn: "Ask (FAQ)", labelFa: "پرسش و پاسخ", href: "/ask" },
  { id: "stats", labelEn: "Citeable stats", labelFa: "آمار قابل استناد", href: "/stats" },
  { id: "about", labelEn: "About", labelFa: "درباره", href: "/about" },
  {
    id: "estimator",
    labelEn: "MVP cost estimator",
    labelFa: "برآورد هزینه MVP",
    href: "/tools/project-estimator",
    keywords: ["calculator", "price", "cost"],
  },
  {
    id: "hire",
    labelEn: "Hire Next.js developer",
    labelFa: "استخدام Next.js developer",
    href: "/hire/nextjs-developer",
  },
  {
    id: "audit",
    labelEn: "Free architecture audit",
    labelFa: "ممیزی معماری رایگان",
    href: "/hire/architecture-audit",
  },
];

export default function CommandPalette() {
  const locale = useLocale();
  const isFa = locale === "fa";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMAND_ITEMS;
    return COMMAND_ITEMS.filter((item) => {
      const label = (isFa ? item.labelFa : item.labelEn).toLowerCase();
      const extra = item.keywords?.join(" ").toLowerCase() ?? "";
      return label.includes(q) || extra.includes(q) || item.id.includes(q);
    });
  }, [isFa, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const goTo = useCallback(
    (href: string) => {
      const path = `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
      close();
      navigateWithViewTransition(path, router);
    },
    [close, locale, router]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isK = event.key.toLowerCase() === "k";
      const withMod = event.metaKey || event.ctrlKey;

      if (withMod && isK) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        return;
      }

      if (event.key === "Enter" && filtered[activeIndex]) {
        event.preventDefault();
        goTo(filtered[activeIndex].href);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, filtered, goTo, open]);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label={isFa ? "بستن" : "Close"}
        className="fixed inset-0 z-[25000] bg-black/50 backdrop-blur-[2px]"
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={isFa ? "پرش سریع" : "Quick jump"}
        className={`fixed left-1/2 top-[min(18vh,140px)] z-[25001] w-[min(calc(100vw-2rem),480px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-tech-card-border bg-page shadow-2xl ${
          isFa ? "text-right" : "text-left"
        }`}
      >
        <div className="border-b border-tech-card-border px-4 py-3">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={isFa ? "جستجو یا پرش…" : "Search or jump…"}
            className="w-full bg-transparent text-sm text-page-text outline-none placeholder:text-page-muted"
            autoComplete="off"
          />
        </div>
        <ul className="max-h-[min(50vh,320px)] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center text-sm text-page-muted">
              {isFa ? "نتیجه‌ای نیست." : "No matches."}
            </li>
          ) : (
            filtered.map((item, index) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => goTo(item.href)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                    index === activeIndex
                      ? "bg-accent-cosmic/10 text-page-text"
                      : "text-page-subtle hover:bg-page/60"
                  } ${isFa ? "flex-row-reverse" : ""}`}
                >
                  <span>{isFa ? item.labelFa : item.labelEn}</span>
                  <kbd className="hidden rounded border border-tech-card-border px-1.5 py-0.5 text-[10px] text-page-muted sm:inline">
                    ↵
                  </kbd>
                </button>
              </li>
            ))
          )}
        </ul>
        <div
          className={`flex items-center gap-3 border-t border-tech-card-border px-4 py-2 text-[11px] text-page-muted ${
            isFa ? "flex-row-reverse justify-end" : ""
          }`}
        >
          <span>
            <kbd className="rounded border border-tech-card-border px-1">↑↓</kbd>{" "}
            {isFa ? "حرکت" : "navigate"}
          </span>
          <span>
            <kbd className="rounded border border-tech-card-border px-1">↵</kbd>{" "}
            {isFa ? "باز کردن" : "open"}
          </span>
          <span>
            <kbd className="rounded border border-tech-card-border px-1">esc</kbd>{" "}
            {isFa ? "بستن" : "close"}
          </span>
        </div>
      </div>
    </>
  );
}
