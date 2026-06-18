"use client";

import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("@/components/header").then((mod) => mod.Header),
  {
    ssr: false,
    loading: () => <div className="h-[52px] shrink-0" aria-hidden />,
  }
);

export default function DeferredHeader() {
  return <Header />;
}
