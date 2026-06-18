"use client";

import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("@/components/header").then((mod) => mod.Header),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function DeferredHeader() {
  return <Header />;
}
