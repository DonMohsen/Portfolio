"use client";

import { useEffect, useRef, useState } from "react";
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";
import BlogShareModal from "./BlogShareModal";
import { formatCompactCount } from "@/lib/blogs/format-compact-count";

type BlogStatsSidebarProps = {
  locale: string;
  initialViews?: number;
  initialCommentsCount?: number;
  initialLikesCount?: number;
  horizontal?: boolean;
};

export default function BlogStatsSidebar({
  locale,
  initialViews = 0,
  initialCommentsCount = 2,
  initialLikesCount = 0,
  horizontal = false,
}: BlogStatsSidebarProps) {
  const [commentsCount] = useState(initialCommentsCount);
  const [views] = useState(initialViews);
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const knobPercentage = Math.min(98, Math.max(2, scrollPercentage));

  useEffect(() => {
    let rafId: number | null = null;
    let latestPercentage = 0;

    const readPercentage = () => {
      const blogContentEl = document.getElementById("blog-content-with-conclusion");

      if (blogContentEl) {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const contentRect = blogContentEl.getBoundingClientRect();
        const contentTop = scrollTop + contentRect.top;
        const contentHeight = blogContentEl.scrollHeight || contentRect.height;
        const contentBottom = contentTop + contentHeight;
        const scrollableRange = Math.max(1, contentBottom - viewportHeight);
        const raw = (scrollTop / scrollableRange) * 100;
        const clamped = Math.min(100, Math.max(0, raw));
        if (scrollTop > 0 && clamped === 0) return 1.5;
        return clamped;
      }

      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      return scrollableHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
        : 0;
    };

    const scheduleUpdate = () => {
      latestPercentage = readPercentage();
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setScrollPercentage(latestPercentage);
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const handleCommentClick = () => {
    const commentsSection = document.getElementById("blog-comments-section");
    commentsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => {
      const next = !prev;
      setLikesCount((count) => Math.max(0, count + (next ? 1 : -1)));
      return next;
    });
  };

  const buttonClass = `flex flex-col items-center gap-1.5 transition-all cursor-pointer border-0 bg-transparent ${
    horizontal ? "py-1 px-2" : "w-full py-2 px-1"
  } group`;
  const divClass = `flex flex-col items-center gap-1.5 ${
    horizontal ? "py-1 px-2" : "w-full py-2 px-1"
  }`;
  const spanClass = `text-xs font-medium text-page-subtle text-center min-h-[14px] leading-none ${
    horizontal ? "min-w-[25px]" : "flex w-[45px] items-center justify-center"
  }`;

  const shareButton = (
    <div className="relative">
      <button
        ref={shareButtonRef}
        type="button"
        onClick={() => setIsShareModalOpen(true)}
        className={buttonClass}
        aria-label={locale === "fa" ? "اشتراک‌گذاری" : "Share"}
      >
        <Share2
          className={`h-5 w-5 transition-colors ${
            isShareModalOpen
              ? "text-accent-cosmic"
              : "text-page-text group-hover:text-accent-cosmic"
          }`}
        />
      </button>
      <BlogShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
        title={typeof document !== "undefined" ? document.title : ""}
        shareButtonRef={shareButtonRef}
        locale={locale}
      />
    </div>
  );

  const likesButton = (
    <button
      type="button"
      onClick={handleLikeClick}
      className={buttonClass}
      aria-label={locale === "fa" ? "لایک‌ها" : "Likes"}
    >
      <Heart
        className={`h-5 w-5 transition-colors ${
          isLiked
            ? "fill-accent-cosmic text-accent-cosmic"
            : "text-page-text group-hover:text-accent-cosmic"
        }`}
      />
      <span className={spanClass}>
        {formatCompactCount(likesCount, locale)}
      </span>
    </button>
  );

  const viewsDiv = (
    <div className={divClass}>
      <Eye className="h-5 w-5 text-page-text" />
      <span className={spanClass}>
        {formatCompactCount(views, locale)}
      </span>
    </div>
  );

  const commentsButton = (
    <button
      type="button"
      onClick={handleCommentClick}
      className={buttonClass}
      aria-label={locale === "fa" ? "نظرات" : "Comments"}
    >
      <MessageCircle className="h-5 w-5 text-page-text transition-colors group-hover:text-accent-cosmic" />
      <span className={spanClass}>
        {formatCompactCount(commentsCount, locale)}
      </span>
    </button>
  );

  const progressBar = (
    <div
      className="relative mt-2 shrink-0"
      style={{ width: 2, height: 100 }}
      aria-hidden="true"
    >
      <div
        className="absolute bottom-0 left-1/2 top-0 w-[2px] -translate-x-1/2 overflow-hidden rounded-full bg-tech-card-border"
      >
        <div
          className="absolute bottom-0 left-0 right-0 top-0 rounded-full bg-accent-cosmic will-change-transform"
          style={{
            transformOrigin: "top",
            transform: `scaleY(${scrollPercentage / 100})`,
          }}
        />
      </div>
      <div
        className="absolute left-1/2 rounded-full bg-accent-cosmic"
        style={{
          width: 5,
          height: 5,
          top: `${knobPercentage}%`,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 1px 6px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );

  return (
    <div
      className={`flex w-full ${horizontal ? "flex-row justify-center" : "flex-col items-center"}`}
    >
      <aside
        className={`flex w-full bg-transparent ${
          horizontal
            ? "flex-row items-center justify-between"
            : "relative flex-col items-center gap-0"
        }`}
      >
        {horizontal ? (
          <>
            {shareButton}
            {likesButton}
            {viewsDiv}
            {commentsButton}
          </>
        ) : (
          <div className="relative z-10 flex w-full flex-col items-center gap-0">
            {commentsButton}
            {viewsDiv}
            {likesButton}
            {shareButton}
            {progressBar}
          </div>
        )}
      </aside>
    </div>
  );
}
