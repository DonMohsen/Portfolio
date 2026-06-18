type BlogCommentsSectionProps = {
  locale: string;
};

const MOCK_COMMENTS = {
  fa: [
    {
      name: "سارا محمدی",
      date: "۲ روز پیش",
      body: "توضیحات خیلی روشن بود. بخش بودجه عملکرد را دقیقاً به کارم بردم.",
    },
    {
      name: "Ali R.",
      date: "۵ روز پیش",
      body: "Clear structure and practical notes on deferring client islands.",
    },
  ],
  en: [
    {
      name: "Sara M.",
      date: "2 days ago",
      body: "Very clear explanation. I applied the performance budget section directly.",
    },
    {
      name: "Ali R.",
      date: "5 days ago",
      body: "Clear structure and practical notes on deferring client islands.",
    },
  ],
} as const;

export default function BlogCommentsSection({
  locale,
}: BlogCommentsSectionProps) {
  const isFa = locale === "fa";
  const comments = isFa ? MOCK_COMMENTS.fa : MOCK_COMMENTS.en;

  return (
    <section
      id="blog-comments-section"
      className="blog-container mt-10"
      aria-label={isFa ? "نظرات" : "Comments"}
    >
      <div className="rounded-2xl border border-tech-card-border bg-tech-card p-6 shadow-[var(--tech-card-shadow)]">
        <h2 className="text-lg font-semibold text-page-text">
          {isFa ? "نظرات" : "Comments"}
        </h2>
        <p className="mt-1 text-sm text-page-subtle">
          {isFa
            ? "نمایش نمونه — اتصال به بک‌اند در فاز بعدی فعال می‌شود."
            : "Sample display — backend integration comes in the next phase."}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {comments.map((comment, index) => (
            <article
              key={index}
              className="rounded-xl border border-tech-card-border bg-page/30 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-page-text">{comment.name}</p>
                <time className="text-xs text-page-subtle">{comment.date}</time>
              </div>
              <p className="mt-2 text-sm leading-7 text-page-muted">
                {comment.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
