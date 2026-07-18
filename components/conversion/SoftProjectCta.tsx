import Link from "next/link";
import {
  SITE_AVAILABILITY_EN,
  SITE_AVAILABILITY_FA,
} from "@/lib/site";

type SoftProjectCtaProps = {
  locale: string;
  source: string;
  /** Optional context line — e.g. case study name */
  headline?: string;
};

export default function SoftProjectCta({
  locale,
  source,
  headline,
}: SoftProjectCtaProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  const title =
    headline ??
    (isFa ? "پروژه مشابه دارید؟" : "Building something similar?");

  const contactParams = new URLSearchParams({
    tab: "brief",
    source,
  });
  const estimatorParams = new URLSearchParams({ source });

  return (
    <aside
      className={`rounded-2xl border border-accent-cosmic/25 bg-accent-cosmic/5 p-6 sm:p-8 ${textAlign}`}
      aria-label={isFa ? "دعوت به همکاری" : "Project invitation"}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-cosmic">
        {isFa ? SITE_AVAILABILITY_FA : SITE_AVAILABILITY_EN}
      </p>
      <h2 className="mt-3 text-xl font-semibold text-page-text sm:text-2xl">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-7 text-page-subtle">
        {isFa
          ? "کشف محدود و مشخص قبل از تعهد — یا با Estimator رایگان بازه و timeline بگیرید."
          : "Fixed-scope discovery before big commits — or use the free estimator for range and timeline."}
      </p>
      <div
        className={`mt-6 flex flex-col gap-3 sm:flex-row ${
          isFa ? "sm:flex-row-reverse sm:justify-end" : ""
        }`}
      >
        <Link
          href={`/${locale}/contact?${contactParams.toString()}`}
          className="inline-flex items-center justify-center rounded-lg bg-accent-cosmic px-5 py-3 text-sm font-semibold text-accent-cosmic-fg transition-opacity hover:opacity-90"
        >
          {isFa ? "ارسال brief" : "Send a brief"}
        </Link>
        <Link
          href={`/${locale}/tools/project-estimator?${estimatorParams.toString()}`}
          className="inline-flex items-center justify-center rounded-lg border border-tech-card-border px-5 py-3 text-sm font-semibold text-page-text transition-colors hover:border-accent-cosmic/40"
        >
          {isFa ? "تخمین هزینه" : "Estimate cost"}
        </Link>
      </div>
    </aside>
  );
}
