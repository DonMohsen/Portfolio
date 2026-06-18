"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BlogCategoryToggle from "./BlogCategoryToggle";
import { SOCIAL_LINKS } from "@/lib/site";
import { buildBlogListHref } from "@/lib/blogs/build-blog-list-href";
import type { BlogCategory, BlogSidebarItem } from "@/lib/blogs/types";
import { Github, Linkedin, Mail, Send } from "lucide-react";

type BlogSidebarProps = {
  locale: string;
  latestPosts: BlogSidebarItem[];
  popularPosts: BlogSidebarItem[];
  activeCategory?: BlogCategory | "all";
};

const CATEGORY_OPTIONS = [
  { key: "all" as const, fa: "همه", en: "All" },
  { key: "tech" as const, fa: "فنی", en: "Tech" },
  { key: "personal" as const, fa: "شخصی", en: "Personal" },
];

const SOCIAL_ICONS = {
  github: Github,
  telegram: Send,
  linkedin: Linkedin,
  email: Mail,
} as const;

export default function BlogSidebar({
  locale,
  latestPosts,
  popularPosts,
  activeCategory = "all",
}: BlogSidebarProps) {
  const isFa = locale === "fa";
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "latest";

  const categoryHref = (category: BlogCategory | "all") =>
    buildBlogListHref(locale, { category, sort });

  return (
    <div
      className="flex w-full flex-col gap-6 max-xl:min-h-[80dvh]"
      dir={isFa ? "rtl" : "ltr"}
    >
      <div className="relative w-full overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card p-5 shadow-[var(--tech-card-shadow)]">
        <p className="px-4 py-1 text-center text-[14px] font-medium text-page-text">
          {isFa ? (
            <>
              دسته‌بندی{" "}
              <span className="text-accent-cosmic">بلاگ</span>
            </>
          ) : (
            <>
              Blog <span className="text-accent-cosmic">categories</span>
            </>
          )}
        </p>

        <div className="mt-3 flex flex-col divide-y divide-tech-card-border">
          {CATEGORY_OPTIONS.map((cat) => {
            const isActive = activeCategory === cat.key;
            const label = isFa ? cat.fa : cat.en;

            return (
              <Link
                key={cat.key}
                href={categoryHref(cat.key)}
                className={`block px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-accent-cosmic/10 font-medium text-accent-cosmic"
                    : "text-page-text hover:bg-tech-card/80"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <BlogCategoryToggle
        locale={locale}
        latestPosts={latestPosts}
        popularPosts={popularPosts}
      />

      <div className="flex w-full flex-row gap-3 rounded-2xl border border-tech-card-border bg-tech-card p-3 shadow-[var(--tech-card-shadow)]">
        {SOCIAL_LINKS.filter((link) => link.id !== "email").map((link) => {
          const Icon = SOCIAL_ICONS[link.id as keyof typeof SOCIAL_ICONS];
          if (!Icon) return null;

          return (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-tech-card-border bg-page/40 px-2 py-3 text-center text-xs text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
