"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import type { BlogSidebarItem } from "@/lib/blogs/types";

type BlogCategoryToggleProps = {
  locale: string;
  latestPosts: BlogSidebarItem[];
  popularPosts: BlogSidebarItem[];
};

export default function BlogCategoryToggle({
  locale,
  latestPosts,
  popularPosts,
}: BlogCategoryToggleProps) {
  const isFa = locale === "fa";
  const [activeCategory, setActiveCategory] = useState<"latest" | "popular">(
    "latest"
  );

  const categories = [
    { key: "latest" as const, label: isFa ? "جدیدترین‌ها" : "Latest" },
    { key: "popular" as const, label: isFa ? "پربازدیدترین‌ها" : "Popular" },
  ];

  const emptyLabel = isFa
    ? "مقاله‌ای برای نمایش وجود ندارد"
    : "No articles to show";

  const renderList = (posts: BlogSidebarItem[], prefix: string) =>
    posts.length > 0 ? (
      posts.map((blog, idx) => (
        <Link
          key={`${prefix}-${blog.slug || idx}`}
          href={blog.href}
          data-transition-label={blog.title}
          className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-tech-card/80"
        >
          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
            <span className="line-clamp-2 text-sm font-medium leading-snug text-page-text">
              {blog.title}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-page-subtle">
              <Calendar className="h-3.5 w-3.5" />
              <span>{blog.dateLabel}</span>
            </div>
          </div>
        </Link>
      ))
    ) : (
      <div className="px-4 py-8 text-center text-page-subtle">
        <p>{emptyLabel}</p>
      </div>
    );

  return (
    <div className="rounded-2xl border border-tech-card-border bg-tech-card p-4 shadow-[var(--tech-card-shadow)]">
      <div className="flex w-full">
        {categories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            className={`flex-1 cursor-pointer py-2 text-center text-[14px] font-medium transition-all duration-300 ${
              activeCategory === cat.key
                ? "border-b-2 border-accent-cosmic text-accent-cosmic"
                : "border-b-2 border-transparent text-page-subtle hover:text-accent-cosmic"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="relative min-h-[200px]">
        <div
          className={`flex flex-col transition-opacity duration-300 ${
            activeCategory === "latest"
              ? "relative z-10 opacity-100"
              : "pointer-events-none absolute inset-0 z-0 opacity-0"
          }`}
        >
          {renderList(latestPosts, "latest")}
        </div>
        <div
          className={`flex flex-col transition-opacity duration-300 ${
            activeCategory === "popular"
              ? "relative z-10 opacity-100"
              : "pointer-events-none absolute inset-0 z-0 opacity-0"
          }`}
        >
          {renderList(popularPosts, "popular")}
        </div>
      </div>
    </div>
  );
}
