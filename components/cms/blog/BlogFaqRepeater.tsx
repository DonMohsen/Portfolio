"use client";

import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { BlogFaqItem } from "@/lib/blogs/types";

type BlogFaqRepeaterProps = {
  value: BlogFaqItem[];
  onChange: (items: BlogFaqItem[]) => void;
};

const emptyItem = (): BlogFaqItem => ({
  question: { en: "", fa: "" },
  answer: { en: "", fa: "" },
});

export default function BlogFaqRepeater({
  value,
  onChange,
}: BlogFaqRepeaterProps) {
  const items = value.length ? value : [];

  const updateItem = (index: number, patch: Partial<BlogFaqItem>) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, ...patch } : item
    );
    onChange(next);
  };

  const updateField = (
    index: number,
    field: "question" | "answer",
    locale: "en" | "fa",
    text: string
  ) => {
    const item = items[index];
    updateItem(index, {
      [field]: { ...item[field], [locale]: text },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/90">FAQ</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onChange([...items, emptyItem()])}
        >
          <Plus className="mr-1 h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-white/40">No FAQ items yet.</p>
      ) : null}

      {items.map((item, index) => (
        <div
          key={index}
          className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/50">
              Item {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-400 hover:text-red-300"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <input
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              placeholder="Question (EN)"
              value={item.question.en}
              onChange={(e) =>
                updateField(index, "question", "en", e.target.value)
              }
            />
            <input
              className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              placeholder="Question (FA)"
              dir="rtl"
              value={item.question.fa}
              onChange={(e) =>
                updateField(index, "question", "fa", e.target.value)
              }
            />
            <textarea
              className="min-h-[80px] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm md:col-span-1"
              placeholder="Answer (EN)"
              value={item.answer.en}
              onChange={(e) =>
                updateField(index, "answer", "en", e.target.value)
              }
            />
            <textarea
              className="min-h-[80px] rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm md:col-span-1"
              placeholder="Answer (FA)"
              dir="rtl"
              value={item.answer.fa}
              onChange={(e) =>
                updateField(index, "answer", "fa", e.target.value)
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}
