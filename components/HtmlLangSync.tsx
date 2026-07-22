"use client";

import { useEffect } from "react";

/**
 * Root layout only stamps <html lang> on first paint. Client navigations
 * between /en and /fa must keep documentElement in sync so FA font CSS
 * (and EN Arial digit rules) stay correct.
 */
export default function HtmlLangSync({ locale }: { locale: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const nextLang = locale === "en" ? "en" : "fa";
    const nextDir = nextLang === "fa" ? "rtl" : "ltr";
    if (root.lang !== nextLang) root.lang = nextLang;
    if (root.dir !== nextDir) root.dir = nextDir;
  }, [locale]);

  return null;
}
