import Link from "next/link";
import type { ReactNode } from "react";

type LocalizedCopy = {
  en: string;
  fa: string;
};

type PhasePlaceholderProps = {
  locale: string;
  title: LocalizedCopy;
  description: LocalizedCopy;
  phaseLabel?: LocalizedCopy;
  children?: ReactNode;
};

export default function PhasePlaceholder({
  locale,
  title,
  description,
  phaseLabel,
  children,
}: PhasePlaceholderProps) {
  const isFa = locale === "fa";

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-2xl flex-col items-center justify-center px-5 py-16 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
        {isFa ? "به‌زودی" : "Coming soon"}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl">
        {isFa ? title.fa : title.en}
      </h1>
      <p className="mt-4 text-[15px] leading-7 text-page-subtle sm:text-base">
        {isFa ? description.fa : description.en}
      </p>
      {phaseLabel ? (
        <p className="mt-2 text-sm text-page-muted">
          {isFa ? phaseLabel.fa : phaseLabel.en}
        </p>
      ) : null}
      {children}
      <Link
        href={`/${locale}`}
        className="mt-8 inline-flex items-center justify-center rounded-lg border border-tech-card-border bg-page/30 px-6 py-3 text-sm font-semibold text-page-text transition-colors hover:border-accent-cosmic/40 hover:text-accent-cosmic"
      >
        {isFa ? "بازگشت به خانه" : "Back to home"}
      </Link>
    </div>
  );
}
