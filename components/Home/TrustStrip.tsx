type TrustStripProps = {
  locale: string;
};

const TRUST_ITEMS_EN = [
  "Fixed-scope discovery before big commits",
  "Weekly demos, no black-box development",
  "Architecture docs you own",
  "Reply within 24 hours",
] as const;

const TRUST_ITEMS_FA = [
  "کشف محدود و مشخص قبل از تعهد بزرگ",
  "دمو هفتگی، بدون توسعه جعبه‌سیاه",
  "مستندات معماری متعلق به شما",
  "پاسخ‌گویی در ۲۴ ساعت",
] as const;

export default function TrustStrip({ locale }: TrustStripProps) {
  const isFa = locale === "fa";
  const items = isFa ? TRUST_ITEMS_FA : TRUST_ITEMS_EN;

  return (
    <section
      data-tech-stack-section
      aria-label={isFa ? "سیگنال‌های اعتماد" : "Trust signals"}
      className="relative z-10 border-y border-tech-card-border bg-page/25 backdrop-blur-[2px]"
    >
      <ul
        className={`mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 sm:px-6 sm:py-6 lg:grid-cols-4 lg:px-12 xl:px-16 ${
          isFa ? "text-right" : "text-left"
        }`}
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-[13px] leading-5 text-page-subtle sm:text-[14px] sm:leading-6"
          >
            <span
              className="mt-0.5 shrink-0 text-accent-cosmic"
              aria-hidden="true"
            >
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
