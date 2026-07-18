"use client";

import clsx from "clsx";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getLiveProductLabel,
  getLiveProductTagline,
  LIVE_PRODUCTS,
  resolveLiveProductHref,
} from "@/lib/proof/live-products";

type LiveProofBarProps = {
  locale: string;
  className?: string;
};

type UptimeMap = Record<string, boolean>;

export default function LiveProofBar({ locale, className }: LiveProofBarProps) {
  const isFa = locale === "fa";
  const [uptime, setUptime] = useState<UptimeMap>({});

  useEffect(() => {
    let cancelled = false;

    async function probe() {
      const origin = window.location.origin;
      const absoluteUrls = LIVE_PRODUCTS.map((product) => {
        if (product.url.startsWith("http")) return product.url;
        return `${origin}/${locale}${product.url}`;
      });

      try {
        const response = await fetch("/api/proof/uptime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: absoluteUrls }),
        });
        if (!response.ok || cancelled) return;

        const payload = (await response.json()) as {
          results?: { url: string; ok: boolean }[];
        };

        const next: UptimeMap = {};
        LIVE_PRODUCTS.forEach((product, index) => {
          const probed = payload.results?.[index];
          if (probed) next[product.id] = probed.ok;
        });
        if (!cancelled) setUptime(next);
      } catch {
        // optional — bar still works without ping
      }
    }

    void probe();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <section
      aria-label={isFa ? "اثبات live" : "Live proof"}
      className={clsx(
        "border-y border-tech-card-border bg-page/50 backdrop-blur-sm",
        className
      )}
    >
      <div
        className={clsx(
          "mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-6 lg:px-12 xl:px-16",
          isFa ? "text-right" : "text-left"
        )}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-page-subtle">
          {isFa ? "اثبات live" : "Live proof"}
        </p>
        <ul
          className={clsx(
            "flex flex-wrap gap-2 sm:gap-3",
            isFa && "justify-end"
          )}
        >
          {LIVE_PRODUCTS.map((product) => {
            const isUp = uptime[product.id];
            const href = resolveLiveProductHref(locale, product);
            const isExternal = Boolean(product.external);

            return (
              <li key={product.id}>
                <Link
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-tech-card-border bg-page/60 px-3 py-1.5 text-sm transition-colors hover:border-accent-cosmic/40 hover:bg-page/80"
                >
                  <span
                    className={clsx(
                      "h-2 w-2 shrink-0 rounded-full",
                      isUp === true && "bg-emerald-500",
                      isUp === false && "bg-amber-500",
                      isUp === undefined && "bg-page-muted/50"
                    )}
                    aria-hidden
                  />
                  <span className="font-medium text-page-text">
                    {getLiveProductLabel(locale, product)}
                  </span>
                  <span className="hidden text-xs text-page-muted sm:inline">
                    {getLiveProductTagline(locale, product)}
                  </span>
                  {isExternal ? (
                    <ExternalLink
                      className="h-3.5 w-3.5 text-page-muted opacity-60 group-hover:opacity-100"
                      aria-hidden
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
