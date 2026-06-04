"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: "fa" | "en") => {
    if (nextLocale === locale) return;
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <div className="flex items-center gap-2 rounded-md border border-black/10 px-2 py-1 dark:border-white/20">
      <button
        type="button"
        onClick={() => switchLocale("fa")}
        className={`text-xs ${locale === "fa" ? "text-teal-500" : "text-black dark:text-white"}`}
      >
        فارسی
      </button>
      <span className="text-xs text-black/40 dark:text-white/40">|</span>
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`text-xs ${locale === "en" ? "text-teal-500" : "text-black dark:text-white"}`}
      >
        EN
      </button>
    </div>
  );
}
