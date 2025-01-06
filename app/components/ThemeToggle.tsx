"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleClick = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={handleClick}
      className="relative hover:rotate-12 transition-all duration-500 flex items-center justify-center rounded-full border-none w-10 h-10 max-sm:w-7 max-sm:h-7 max-sm:border "
      variant="outline"
      size="icon"
    >
      {/* Sun Icon */}
      <SunIcon
        className={` h-[1rem] w-[1rem] transition-all duration-200 transform ${
          resolvedTheme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      {/* Moon Icon */}
      <MoonIcon
        className={`h-[1rem] w-[1rem] absolute transition-all duration-200 transform ${
          resolvedTheme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;