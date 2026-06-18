"use client";

import { useState } from "react";

type BlogAddCommentProps = {
  locale: string;
};

export default function BlogAddComment({ locale }: BlogAddCommentProps) {
  const isFa = locale === "fa";
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setName("");
    setMessage("");
  };

  return (
    <section className="blog-container mt-6 pb-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-tech-card-border bg-tech-card p-6 shadow-[var(--tech-card-shadow)]"
      >
        <h2 className="text-lg font-semibold text-page-text">
          {isFa ? "ثبت نظر" : "Leave a comment"}
        </h2>

        <div className="mt-4 grid gap-4">
          <label className="grid gap-2 text-sm text-page-text">
            <span>{isFa ? "نام" : "Name"}</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border border-tech-card-border bg-page/40 px-4 py-3 text-page-text outline-none transition-colors focus:border-accent-cosmic/50"
              placeholder={isFa ? "نام شما" : "Your name"}
            />
          </label>

          <label className="grid gap-2 text-sm text-page-text">
            <span>{isFa ? "نظر" : "Comment"}</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="resize-y rounded-xl border border-tech-card-border bg-page/40 px-4 py-3 text-page-text outline-none transition-colors focus:border-accent-cosmic/50"
              placeholder={
                isFa ? "نظر خود را بنویسید..." : "Write your comment..."
              }
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 rounded-xl bg-accent-cosmic px-5 py-3 text-sm font-semibold text-accent-cosmic-fg transition-opacity hover:opacity-90"
        >
          {isFa ? "ارسال نظر" : "Submit comment"}
        </button>

        {submitted ? (
          <p className="mt-3 text-sm text-accent-cosmic" role="status">
            {isFa
              ? "فرم نمونه است — بعداً به بک‌اند وصل می‌شود."
              : "Sample form — backend hookup comes later."}
          </p>
        ) : null}
      </form>
    </section>
  );
}
