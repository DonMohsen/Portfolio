"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((mod) => mod.Toaster),
  { ssr: false }
);

export default function DeferredChrome() {
  return (
    <>
      <Navbar />
      <Toaster />
    </>
  );
}
