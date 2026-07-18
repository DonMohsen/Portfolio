import { pick } from "@/lib/services/pick";

export type LiveProduct = {
  id: string;
  url: string;
  label: { fa: string; en: string };
  tagline: { fa: string; en: string };
  /** When true, open in new tab */
  external?: boolean;
};

/**
 * Live proof bar — only URLs you control or public profiles.
 * Prefer portfolio surfaces over third-party placeholders.
 */
export const LIVE_PRODUCTS: LiveProduct[] = [
  {
    id: "portfolio",
    url: "https://mohsen.info",
    label: { en: "This site", fa: "همین سایت" },
    tagline: {
      en: "Bilingual portfolio + tools",
      fa: "پورتفولیو دوزبانه + ابزارها",
    },
    external: true,
  },
  {
    id: "tools",
    url: "/tools",
    label: { en: "Free tools", fa: "ابزارهای رایگان" },
    tagline: {
      en: "Estimator, speed, i18n…",
      fa: "برآورد، سرعت، i18n…",
    },
  },
  {
    id: "work",
    url: "/work",
    label: { en: "Case studies", fa: "مطالعات موردی" },
    tagline: {
      en: "BICM with before/after",
      fa: "BICM با قبل/بعد",
    },
  },
  {
    id: "github",
    url: "https://github.com/donmohsen",
    label: { en: "GitHub", fa: "GitHub" },
    tagline: {
      en: "Public repos & experiments",
      fa: "ریپوهای عمومی و آزمایش‌ها",
    },
    external: true,
  },
];

export function getLiveProductLabel(locale: string, product: LiveProduct) {
  return pick(locale, product.label);
}

export function getLiveProductTagline(locale: string, product: LiveProduct) {
  return pick(locale, product.tagline);
}

export function resolveLiveProductHref(locale: string, product: LiveProduct) {
  if (product.url.startsWith("http")) return product.url;
  return `/${locale}${product.url.startsWith("/") ? product.url : `/${product.url}`}`;
}
