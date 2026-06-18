"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { prefetchThemeToggleTree } from "@/lib/theme-toggle-session";

const Header = dynamic(
  () => import("@/components/header").then((mod) => mod.Header),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function DeferredHeader() {
  useEffect(() => {
    prefetchThemeToggleTree();
  }, []);

  return <Header />;
}
