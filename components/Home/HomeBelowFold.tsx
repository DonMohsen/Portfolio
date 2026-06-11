import { Suspense } from "react";
import AboutMe from "@/components/Home/AboutMe";

async function HomeBelowFoldContent() {
  return <AboutMe />;
}

export default function HomeBelowFold() {
  return (
    <div
      data-below-fold
      className="px-3 py-10 md:px-10 [content-visibility:auto] [contain-intrinsic-size:auto_900px]"
    >
      <Suspense fallback={null}>
        <HomeBelowFoldContent />
      </Suspense>
    </div>
  );
}
