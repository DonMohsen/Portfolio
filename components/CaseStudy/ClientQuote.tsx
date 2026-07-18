type ClientQuoteProps = {
  quote: string;
  clientName?: string | null;
  locale: string;
};

export default function ClientQuote({
  quote,
  clientName,
  locale,
}: ClientQuoteProps) {
  const isFa = locale === "fa";

  return (
    <blockquote className="rounded-xl border border-tech-card-border bg-tech-card/40 px-5 py-4">
      <p
        className="text-base leading-7 text-page-text italic"
        dir={isFa ? "rtl" : "ltr"}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {clientName ? (
        <footer className="mt-3 text-sm font-medium text-page-muted">
          — {clientName}
        </footer>
      ) : null}
    </blockquote>
  );
}
