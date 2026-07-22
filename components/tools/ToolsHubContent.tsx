import Link from "next/link";
import TrustStrip from "@/components/Home/TrustStrip";
import { TOOL_CATALOG } from "@/lib/tools/catalog";
import { pick } from "@/lib/services/pick";

type ToolsHubContentProps = {
  locale: string;
};

export default function ToolsHubContent({ locale }: ToolsHubContentProps) {
  const isFa = locale === "fa";
  const textAlign = isFa ? "text-right" : "text-left";

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section
        className={`mx-auto max-w-7xl px-5 pb-6 pt-[72px] sm:px-6 md:px-10 lg:px-12 ${textAlign}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-page-subtle">
          {isFa ? "ابزارهای رایگان" : "Free tools"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-page-text sm:text-4xl lg:text-[2.5rem]">
          {isFa ? "ابزارها" : "Tools"}
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-7 text-page-subtle sm:text-base sm:leading-8">
          {isFa
            ? "ماشین‌حساب‌ها و چک‌لیست‌هایی که قبل از تماس، scope و بودجه را شفاف می‌کنند — و lead با source قابل ردیابی ثبت می‌شود."
            : "Calculators and checklists that clarify scope and budget before you book a call — with trackable lead sources."}
        </p>
        <p className="mt-4">
          <Link
            href={`/${locale}/tools/project-estimator`}
            className="text-sm font-semibold text-accent-cosmic hover:underline"
          >
            {isFa
              ? "شروع با برآورد هزینه اپلیکیشن ←"
              : "Start with MVP cost calculator →"}
          </Link>
        </p>
      </section>

      <TrustStrip locale={locale} />

      <section
        className={`mx-auto max-w-7xl px-5 py-12 sm:px-6 md:px-10 lg:px-12 lg:py-16 ${textAlign}`}
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_CATALOG.map((tool) => {
            const cardInner = (
              <>
                <div
                  className={`flex items-start justify-between gap-2 ${isFa ? "flex-row-reverse" : ""}`}
                >
                  <h2 className="text-lg font-semibold text-page-text group-hover:text-accent-cosmic">
                    {pick(locale, tool.title)}
                  </h2>
                  {!tool.live ? (
                    <span className="shrink-0 rounded-full border border-tech-card-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-page-muted">
                      {isFa ? "به‌زودی" : "Soon"}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 flex-1 text-[14px] leading-6 text-page-subtle">
                  {pick(locale, tool.description)}
                </p>
                <p className="mt-3 text-xs text-page-muted">
                  {pick(locale, tool.keyword)}
                </p>
                <p className="mt-1 text-xs font-medium text-accent-cosmic/80">
                  {pick(locale, tool.leadMechanic)}
                </p>
              </>
            );

            return (
              <li key={tool.slug}>
                {tool.live ? (
                  <Link
                    href={`/${locale}/tools/${tool.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-tech-card-border bg-page/40 p-5 transition-colors hover:border-accent-cosmic/35"
                  >
                    {cardInner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-2xl border border-tech-card-border bg-page/20 p-5 opacity-80">
                    {cardInner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
