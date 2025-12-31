"use client";
import * as React from "react";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      aria-pressed={isDark}
      onClick={handleClick}
      className={`relative inline-flex h-[28px] w-[60px] items-center rounded-full border border-black/20 bg-white transition-colors dark:border-white/20 dark:bg-neutral-900`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-black/70 transition-transform dark:bg-white/80 ${isDark ? "translate-x-[34px]" : "translate-x-[6px]"}`}
      />
    </button>
  );
}

export default ThemeToggle;
