import { BlogPost } from "./types";

/** Static SSG blog catalog — swap for Prisma/CMS when the blog model ships. */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "nextjs-static-performance",
    publishedAt: "2026-03-12",
    category: "tech",
    title: {
      en: "Shipping Next.js pages with static performance budgets",
      fa: "تحویل صفحات Next.js با بودجه عملکرد استاتیک",
    },
    excerpt: {
      en: "How I keep mobile LCP under two seconds while deferring heavy client islands.",
      fa: "چطور LCP موبایل را زیر دو ثانیه نگه می‌دارم و جزایر سنگین کلاینت را به تعویق می‌اندازم.",
    },
  },
  {
    slug: "frontend-architecture-notes",
    publishedAt: "2026-02-28",
    category: "tech",
    title: {
      en: "Frontend architecture notes from real product work",
      fa: "یادداشت‌های معماری فرانت‌اند از کار روی محصول واقعی",
    },
    excerpt: {
      en: "Patterns that survived production: boundaries, caching, and predictable data flow.",
      fa: "الگوهایی که در پروداکشن ماندگار شدند: مرزبندی، کش و جریان داده قابل پیش‌بینی.",
    },
  },
  {
    slug: "building-with-ai-agents",
    publishedAt: "2026-01-18",
    category: "personal",
    title: {
      en: "Building with AI agents without losing engineering discipline",
      fa: "ساختن با AI Agent بدون از دست دادن انضباط مهندسی",
    },
    excerpt: {
      en: "Practical ways I use AI in delivery while keeping reviews, tests, and ownership clear.",
      fa: "روش‌های عملی استفاده از AI در تحویل، با حفظ بازبینی، تست و مالکیت شفاف.",
    },
  },
  {
    slug: "portfolio-seo-checklist",
    publishedAt: "2025-12-05",
    category: "tech",
    title: {
      en: "A technical SEO checklist for developer portfolios",
      fa: "چک‌لیست سئوی فنی برای پرتفولیوی توسعه‌دهندگان",
    },
    excerpt: {
      en: "Structured data, canonical URLs, and server-rendered content that search engines can trust.",
      fa: "داده ساختاریافته، URL کانونیکال و محتوای رندر سرور که موتورهای جستجو به آن اعتماد کنند.",
    },
  },
];
