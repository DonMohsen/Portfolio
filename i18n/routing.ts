import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localePrefix: "always"
});

export type AppLocale = (typeof routing.locales)[number];
