import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localePrefix: "always",
  // hreflang is emitted via Next.js metadata; avoid duplicate Link headers (Lighthouse canonical audit).
  alternateLinks: false,
});

export type AppLocale = (typeof routing.locales)[number];
