"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Check, Globe } from "lucide-react";
import clsx from "clsx";

const LOCALES = [
  { code: "fa" as const, label: "Persian" },
  { code: "en" as const, label: "English" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const switchLocale = (nextLocale: "fa" | "en") => {
    setOpen(false);
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-page-text transition-colors hover:border-black/20 dark:border-white/20 dark:hover:border-white/30"
      >
        <Globe className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Language"
          className="absolute end-0 top-[calc(100%+0.5rem)] z-[8000] min-w-[152px] overflow-hidden rounded-lg border border-tech-card-border bg-tech-card py-1 shadow-[var(--tech-card-shadow)]"
        >
          {LOCALES.map(({ code, label }) => {
            const active = locale === code;

            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => switchLocale(code)}
                className={clsx(
                  "flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors",
                  active
                    ? "text-page-text"
                    : "text-page-muted hover:bg-page/40 hover:text-page-text"
                )}
              >
                <span>{label}</span>
                {active ? (
                  <Check
                    className="h-4 w-4 shrink-0 text-accent-cosmic"
                    aria-hidden
                  />
                ) : (
                  <span className="h-4 w-4 shrink-0" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
