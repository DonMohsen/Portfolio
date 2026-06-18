"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { applyBrowserThemeColor } from "@/lib/browser-theme-color";

export default function BrowserThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    applyBrowserThemeColor(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return null;
}
