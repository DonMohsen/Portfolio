"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";
import { attachHeaderScrollSurface } from "@/lib/header-scroll-surface";

type SiteHeaderShellProps = {
  className?: string;
  children: React.ReactNode;
};

export default function SiteHeaderShell({
  className,
  children,
}: SiteHeaderShellProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    return attachHeaderScrollSurface(node);
  }, []);

  return (
    <div ref={ref} className={clsx("site-header-bar", className)}>
      {children}
    </div>
  );
}
