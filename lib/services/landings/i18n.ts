import type { ServiceLanding } from "../types";

export const i18nLanding: ServiceLanding = {
  slug: "i18n",
  tier: 2,
  outcome: {
    en: "Launch FA/EN (and more) without bolt-on translations — locale-first routing, RTL, and SEO that ranks in both markets.",
    fa: "لانچ FA/EN (و بیشتر) بدون ترجمه الصاقی — routing locale-first، RTL و SEO که در هر دو بازار رتبه بگیرد.",
  },
  title: {
    en: "Multilingual & i18n Development",
    fa: "توسعه چندزبانه و i18n",
  },
  metaDescription: {
    en: "next-intl, RTL, hreflang, and locale-aware product builds. Bilingual SaaS for Iranian and international markets from one codebase.",
    fa: "next-intl، RTL، hreflang و ساخت محصول آگاه به locale. SaaS دوزبانه برای بازار ایران و بین‌الملل از یک codebase.",
  },
  icp: {
    en: "Products targeting Iran + diaspora, MENA expansion, or any team that needs Persian RTL and English LTR done correctly — not Google Translate in production.",
    fa: "محصولاتی برای ایران + diaspora، گسترش MENA یا تیمی که RTL فارسی و LTR انگلیسی درست می‌خواهد — نه Google Translate در production.",
  },
  timeline: {
    en: "3–8 weeks for greenfield i18n architecture; 2–4 weeks add-on for existing Next.js apps after audit.",
    fa: "۳–۸ هفته برای معماری i18n greenfield؛ ۲–۴ هفته افزودنی برای اپ Next.js موجود پس از ممیزی.",
  },
  startingFrom: {
    en: "$8K",
    fa: "از ۸٬۰۰۰ دلار",
  },
  deliverables: {
    en: [
      "Locale routing strategy (next-intl)",
      "RTL/LTR layout system",
      "hreflang + sitemap alternates",
      "Translation workflow (keys, CMS hooks)",
      "Locale-aware metadata & JSON-LD",
      "QA checklist for both locales",
    ],
    fa: [
      "استراتژی routing locale (next-intl)",
      "سیستم layout RTL/LTR",
      "hreflang + alternateهای sitemap",
      "گردش کار ترجمه (کلید، قلاب CMS)",
      "metadata و JSON-LD آگاه به locale",
      "چک‌لیست QA برای هر دو locale",
    ],
  },
  sections: [
    {
      heading: {
        en: "Why i18n is a product decision",
        fa: "چرا i18n تصمیم محصول است",
      },
      body: {
        en: "Adding Persian after launch doubles UI debt: mirrored layouts break, dates and numbers format wrong, and SEO cannibalizes itself. Locale-first structure from day one — or a disciplined retrofit — keeps one codebase serving Tehran and London without duplicate repos.",
        fa: "افزودن فارسی بعد از لانچ بدهی UI را دو برابر می‌کند: layout آینه‌شده می‌شکند، تاریخ و عدد اشتباه format می‌شوند و SEO خودش را cannibalize می‌کند. ساختار locale-first از روز اول — یا retrofit منضبط — یک codebase برای تهران و لندن بدون repo تکراری نگه می‌دارد.",
      },
    },
    {
      heading: {
        en: "Technical approach (next-intl)",
        fa: "رویکرد فنی (next-intl)",
      },
      body: {
        en: "This portfolio runs on next-intl with FA default and EN alternate — the same patterns I ship for clients. Server components load the right message catalog; RTL uses logical CSS properties; canonical and hreflang are generated from one source of truth. No hard-coded /fa paths scattered in components.",
        fa: "این portfolio روی next-intl با FA پیش‌فرض و EN جایگزین اجرا می‌شود — همان الگوهایی که برای مشتری تحویل می‌دهم. server component کاتالوگ پیام درست را لود می‌کند؛ RTL از logical CSS استفاده می‌کند؛ canonical و hreflang از یک منبع حقیقت تولید می‌شوند.",
      },
    },
    {
      heading: {
        en: "SEO across locales",
        fa: "SEO در localeها",
      },
      body: {
        en: "Each locale gets proper title, description, Open Graph, and sitemap entries with reciprocating hreflang. x-default points to your primary international locale — usually EN for global SEO, FA when Iran is the core market. Structured data respects inLanguage per page.",
        fa: "هر locale عنوان، description، Open Graph و ورودی sitemap با hreflang متقابل می‌گیرد. x-default به locale بین‌المللی اصلی اشاره می‌کند — معمولاً EN برای SEO جهانی، FA وقتی ایران بازار هسته است. داده ساختاریافته inLanguage per page را رعایت می‌کند.",
      },
    },
    {
      heading: {
        en: "Content and CMS workflow",
        fa: "گردش کار محتوا و CMS",
      },
      body: {
        en: "Translations live in typed message files or CMS fields — not inline strings. Editors get a clear FA/EN parity checklist; developers get compile-time key checks where possible. RTL screenshots are part of acceptance, not an afterthought before launch.",
        fa: "ترجمه‌ها در فایل پیام typed یا فیلد CMS — نه رشته inline. ویراستاران چک‌لیست parity FA/EN روشن می‌گیرند؛ devها در صورت امکان چک کلید compile-time. اسکرین‌شات RTL بخش پذیرش است، نه فکر آخر قبل از لانچ.",
      },
    },
  ],
  faq: {
    en: [
      {
        question: "Can you translate our content?",
        answer:
          "I implement structure and can coordinate with your translators. Native FA/EN copywriting is a separate scoped engagement if you need it.",
      },
      {
        question: "More than two locales?",
        answer:
          "Yes. Architecture scales to ar, tr, de, etc. Each added locale is scoped in discovery based on RTL complexity and CMS volume.",
      },
    ],
    fa: [
      {
        question: "محتوای ما را ترجمه می‌کنید؟",
        answer:
          "ساختار را پیاده می‌کنم و با مترجم شما هماهنگ می‌شوم. کپی‌رایتینگ بومی FA/EN engagement جدا با دامنه مشخص است اگر نیاز دارید.",
      },
      {
        question: "بیش از دو locale؟",
        answer:
          "بله. معماری به ar، tr، de و غیره scale می‌شود. هر locale اضافه در discovery بر اساس پیچیدگی RTL و حجم CMS scope می‌شود.",
      },
    ],
  },
};
