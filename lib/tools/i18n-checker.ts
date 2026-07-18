import type { LocalizedText } from "@/lib/services/types";

export type I18nCheckIssue = {
  id: string;
  severity: "error" | "warn" | "ok";
  title: LocalizedText;
  detail: LocalizedText;
};

export type I18nCheckResult = {
  url: string;
  htmlLang: string | null;
  dir: string | null;
  hreflangCount: number;
  hasXDefault: boolean;
  hasRtlHint: boolean;
  issues: I18nCheckIssue[];
  score: number;
  summary: LocalizedText;
};

export const I18N_CHECKER_FAQ: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "What does this checker look at?",
      fa: "این ابزار چه چیزی را بررسی می‌کند؟",
    },
    answer: {
      en: "html lang, dir, hreflang link tags, and x-default — a quick multilingual SEO sanity pass.",
      fa: "html lang، dir، تگ‌های hreflang و x-default — بررسی سریع SEO چندزبانه.",
    },
  },
];

function extractAttr(html: string, tag: string, attr: string): string | null {
  const re = new RegExp(`<${tag}\\b[^>]*\\b${attr}\\s*=\\s*["']([^"']+)["']`, "i");
  const match = html.match(re);
  return match?.[1]?.trim() ?? null;
}

function extractHreflangs(html: string): { lang: string; href: string }[] {
  const results: { lang: string; href: string }[] = [];
  const re =
    /<link\b[^>]*rel\s*=\s*["']alternate["'][^>]*>/gi;
  const tags = html.match(re) ?? [];

  for (const tag of tags) {
    const langMatch = tag.match(/hreflang\s*=\s*["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href\s*=\s*["']([^"']+)["']/i);
    if (langMatch && hrefMatch) {
      results.push({ lang: langMatch[1].toLowerCase(), href: hrefMatch[1] });
    }
  }

  return results;
}

export function analyzeI18nHtml(url: string, html: string): I18nCheckResult {
  const htmlLang = extractAttr(html, "html", "lang");
  const dir = extractAttr(html, "html", "dir");
  const hreflangs = extractHreflangs(html);
  const hasXDefault = hreflangs.some((h) => h.lang === "x-default");
  const hasRtlHint =
    dir?.toLowerCase() === "rtl" ||
    (htmlLang?.toLowerCase().startsWith("fa") ?? false) ||
    (htmlLang?.toLowerCase().startsWith("ar") ?? false) ||
    /dir\s*=\s*["']rtl["']/i.test(html);

  const issues: I18nCheckIssue[] = [];
  let score = 100;

  if (!htmlLang) {
    score -= 25;
    issues.push({
      id: "missing-lang",
      severity: "error",
      title: {
        en: "Missing html lang",
        fa: "html lang وجود ندارد",
      },
      detail: {
        en: "Set <html lang=\"…\"> so browsers and crawlers know the primary language.",
        fa: "<html lang=\"…\"> را تنظیم کنید تا مرورگر و crawler زبان اصلی را بفهمند.",
      },
    });
  } else {
    issues.push({
      id: "has-lang",
      severity: "ok",
      title: { en: `html lang = ${htmlLang}`, fa: `html lang = ${htmlLang}` },
      detail: {
        en: "Primary language attribute is present.",
        fa: "ویژگی زبان اصلی موجود است.",
      },
    });
  }

  if (!dir) {
    score -= 10;
    issues.push({
      id: "missing-dir",
      severity: "warn",
      title: {
        en: "No html dir attribute",
        fa: "ویژگی dir روی html نیست",
      },
      detail: {
        en: "For bilingual FA/EN sites, set dir per locale (rtl for FA).",
        fa: "برای سایت دوزبانه FA/EN، dir را per locale بگذارید (rtl برای FA).",
      },
    });
  } else {
    issues.push({
      id: "has-dir",
      severity: "ok",
      title: { en: `html dir = ${dir}`, fa: `html dir = ${dir}` },
      detail: {
        en: "Document direction is declared.",
        fa: "جهت سند اعلام شده است.",
      },
    });
  }

  if (hreflangs.length === 0) {
    score -= 30;
    issues.push({
      id: "no-hreflang",
      severity: "error",
      title: {
        en: "No hreflang alternates found",
        fa: "hreflang پیدا نشد",
      },
      detail: {
        en: "Add <link rel=\"alternate\" hreflang=\"…\"> for each locale (and x-default).",
        fa: "برای هر locale (و x-default) تگ <link rel=\"alternate\" hreflang=\"…\"> اضافه کنید.",
      },
    });
  } else {
    issues.push({
      id: "has-hreflang",
      severity: "ok",
      title: {
        en: `${hreflangs.length} hreflang link(s)`,
        fa: `${hreflangs.length} لینک hreflang`,
      },
      detail: {
        en: hreflangs.map((h) => `${h.lang} → ${h.href}`).join(" · "),
        fa: hreflangs.map((h) => `${h.lang} → ${h.href}`).join(" · "),
      },
    });
  }

  if (hreflangs.length > 0 && !hasXDefault) {
    score -= 15;
    issues.push({
      id: "no-x-default",
      severity: "warn",
      title: {
        en: "Missing x-default hreflang",
        fa: "x-default وجود ندارد",
      },
      detail: {
        en: "Google recommends an x-default for users without a matching language.",
        fa: "گوگل x-default را برای کاربرانی بدون زبان منطبق توصیه می‌کند.",
      },
    });
  }

  if (!hasRtlHint && (htmlLang?.toLowerCase().startsWith("fa") || url.includes("/fa"))) {
    score -= 10;
    issues.push({
      id: "rtl-hint",
      severity: "warn",
      title: {
        en: "FA URL without clear RTL signal",
        fa: "URL فارسی بدون سیگنال RTL واضح",
      },
      detail: {
        en: "Ensure dir=\"rtl\" on FA pages and mirrored layout tokens.",
        fa: "روی صفحات FA حتماً dir=\"rtl\" و توکن‌های layout آینه‌ای داشته باشید.",
      },
    });
  }

  score = Math.max(0, Math.min(100, score));

  return {
    url,
    htmlLang,
    dir,
    hreflangCount: hreflangs.length,
    hasXDefault,
    hasRtlHint,
    issues,
    score,
    summary: {
      en:
        score >= 80
          ? "Solid multilingual basics — review edge locales next."
          : score >= 55
            ? "Partial i18n setup — fix errors before scaling locales."
            : "Weak i18n signals — prioritize lang + hreflang before SEO spend.",
      fa:
        score >= 80
          ? "پایه چندزبانه خوب — localeهای لبه‌ای را بعدی بررسی کنید."
          : score >= 55
            ? "راه‌اندازی ناقص — قبل از scale کردن localeها خطاها را درست کنید."
            : "سیگنال i18n ضعیف — قبل از هزینه SEO، lang و hreflang را اولویت دهید.",
    },
  };
}
