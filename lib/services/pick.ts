import type { LocalizedFaq, LocalizedText } from "./types";

export function pick(locale: string, copy: LocalizedText): string {
  return locale === "fa" ? copy.fa : copy.en;
}

export function pickFaq(locale: string, faq: LocalizedFaq) {
  return locale === "fa" ? faq.fa : faq.en;
}
