"use client";

import clsx from "clsx";
import { useState } from "react";
import EditorField from "@/components/cms/editor/EditorField";

type LocalizedTab = "en" | "fa";

type BlogLocalizedTabsProps = {
  titleEn: string;
  titleFa: string;
  excerptEn: string;
  excerptFa: string;
  contentHtmlEn: string;
  contentHtmlFa: string;
  conclusionHtmlEn: string;
  conclusionHtmlFa: string;
  onTitleEnChange: (value: string) => void;
  onTitleFaChange: (value: string) => void;
  onExcerptEnChange: (value: string) => void;
  onExcerptFaChange: (value: string) => void;
  onContentEnChange: (value: string) => void;
  onContentFaChange: (value: string) => void;
  onConclusionEnChange: (value: string) => void;
  onConclusionFaChange: (value: string) => void;
};

export default function BlogLocalizedTabs(props: BlogLocalizedTabsProps) {
  const [tab, setTab] = useState<LocalizedTab>("en");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["en", "fa"] as const).map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => setTab(locale)}
            className={clsx(
              "rounded-lg px-4 py-2 text-sm font-medium transition",
              tab === locale
                ? "bg-white text-black"
                : "bg-white/10 text-white/70 hover:bg-white/15"
            )}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "en" ? (
        <div className="space-y-4">
          <Field label="Title (EN)">
            <input
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              value={props.titleEn}
              onChange={(e) => props.onTitleEnChange(e.target.value)}
            />
          </Field>
          <Field label="Excerpt (EN)">
            <textarea
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              value={props.excerptEn}
              onChange={(e) => props.onExcerptEnChange(e.target.value)}
            />
          </Field>
          <EditorField
            label="Content (EN)"
            value={props.contentHtmlEn}
            onChange={props.onContentEnChange}
            direction="ltr"
          />
          <EditorField
            label="Conclusion (EN, optional)"
            value={props.conclusionHtmlEn}
            onChange={props.onConclusionEnChange}
            direction="ltr"
          />
        </div>
      ) : (
        <div className="space-y-4" dir="rtl">
          <Field label="عنوان (FA)">
            <input
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              value={props.titleFa}
              onChange={(e) => props.onTitleFaChange(e.target.value)}
            />
          </Field>
          <Field label="خلاصه (FA)">
            <textarea
              className="min-h-[80px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              value={props.excerptFa}
              onChange={(e) => props.onExcerptFaChange(e.target.value)}
            />
          </Field>
          <EditorField
            label="محتوا (FA)"
            value={props.contentHtmlFa}
            onChange={props.onContentFaChange}
            direction="rtl"
          />
          <EditorField
            label="نتیجه‌گیری (FA، اختیاری)"
            value={props.conclusionHtmlFa}
            onChange={props.onConclusionFaChange}
            direction="rtl"
          />
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>
      {children}
    </div>
  );
}
