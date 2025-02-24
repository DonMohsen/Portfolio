"use client";
import dynamic from "next/dynamic";
import * as React from "react";
import { useTheme } from "next-themes";

// Dynamically import DarkModeToggle without SSR
const DarkModeToggle = dynamic(() => import("react-dark-mode-toggle"), { ssr: false });

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div aria-hidden="false">
    <DarkModeToggle
      onChange={handleClick}
      checked={resolvedTheme === "dark"}
      size={60}
    />
  </div>
  );
}

export default ThemeToggle;
