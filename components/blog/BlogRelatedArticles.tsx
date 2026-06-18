"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogRelatedItem } from "@/lib/blogs/types";

type BlogRelatedArticlesProps = {
  articles: BlogRelatedItem[];
  locale: string;
  title?: string;
};

export default function BlogRelatedArticles({
  articles,
  locale,
  title,
}: BlogRelatedArticlesProps) {
  const isFa = locale === "fa";
  const displayArticles = useMemo(() => articles.slice(0, 5), [articles]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, displayArticles.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(maxIndex, i + 1));

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[currentIndex] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, [currentIndex]);

  if (!displayArticles.length) return null;

  return (
    <section className="blog-container mt-10 pb-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-page-text md:text-2xl">
          {title ?? (isFa ? "مقالات مرتبط" : "Related articles")}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex <= 0}
            className="rounded-full border border-tech-card-border p-2 text-page-text transition-colors hover:border-accent-cosmic/40 disabled:opacity-40"
            aria-label={isFa ? "قبلی" : "Previous"}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex >= maxIndex}
            className="rounded-full border border-tech-card-border p-2 text-page-text transition-colors hover:border-accent-cosmic/40 disabled:opacity-40"
            aria-label={isFa ? "بعدی" : "Next"}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        dir={isFa ? "rtl" : "ltr"}
      >
        {displayArticles.map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            data-transition-label={article.title}
            className="w-[calc(100%)] shrink-0 snap-start overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card shadow-[var(--tech-card-shadow)] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
          >
            <div className="relative h-40 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="line-clamp-2 text-base font-semibold text-page-text">
                {article.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-page-subtle">
                {article.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-page-subtle">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.dateLabel}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
