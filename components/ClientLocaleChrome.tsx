"use client";

import DeferredHeader from "@/components/DeferredHeader";
import DeferredChrome from "@/components/DeferredChrome";
import DeferredPageTransitionAfterLcp from "@/components/page-transition/DeferredPageTransitionAfterLcp";

export default function ClientLocaleChrome() {
  return (
    <>
      <DeferredHeader />
      <DeferredChrome />
      <DeferredPageTransitionAfterLcp />
    </>
  );
}
