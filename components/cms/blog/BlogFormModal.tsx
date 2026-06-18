"use client";

import axios from "axios";
import { CircleX } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useBlogForm from "@/store/useBlogForm";
import type { BlogPostRecord } from "@/lib/cms/blog/mappers";
import type { BlogFaqItem } from "@/lib/blogs/types";
import { slugifyText } from "@/lib/cms/core/slug";
import BlogMetaFields from "./BlogMetaFields";
import BlogLocalizedTabs from "./BlogLocalizedTabs";
import BlogFaqRepeater from "./BlogFaqRepeater";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ButtonLoading from "@/components/Loadings/button-loading";

type BlogFormModalProps = {
  type: "post" | "put";
  post?: BlogPostRecord;
  accessToken: string;
  onUnauthorized: () => void;
};

type FormState = {
  slug: string;
  status: "draft" | "published";
  category: "tech" | "personal";
  publishedAt: string;
  titleEn: string;
  titleFa: string;
  excerptEn: string;
  excerptFa: string;
  contentHtmlEn: string;
  contentHtmlFa: string;
  conclusionHtmlEn: string;
  conclusionHtmlFa: string;
  heroImage: string;
  views: number;
  likes: number;
  faq: BlogFaqItem[];
};

const emptyForm = (): FormState => ({
  slug: "",
  status: "draft",
  category: "tech",
  publishedAt: "",
  titleEn: "",
  titleFa: "",
  excerptEn: "",
  excerptFa: "",
  contentHtmlEn: "<p></p>",
  contentHtmlFa: "<p></p>",
  conclusionHtmlEn: "",
  conclusionHtmlFa: "",
  heroImage: "",
  views: 0,
  likes: 0,
  faq: [],
});

function toDatetimeLocal(value: Date | string | null | undefined): string {
  if (!value) return "";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function parseFaq(value: unknown): BlogFaqItem[] {
  if (!Array.isArray(value)) return [];
  return value as BlogFaqItem[];
}

function recordToForm(post: BlogPostRecord): FormState {
  return {
    slug: post.slug,
    status: post.status,
    category: post.category,
    publishedAt: toDatetimeLocal(post.publishedAt),
    titleEn: post.titleEn,
    titleFa: post.titleFa,
    excerptEn: post.excerptEn,
    excerptFa: post.excerptFa,
    contentHtmlEn: post.contentHtmlEn,
    contentHtmlFa: post.contentHtmlFa,
    conclusionHtmlEn: post.conclusionHtmlEn ?? "",
    conclusionHtmlFa: post.conclusionHtmlFa ?? "",
    heroImage: post.heroImage ?? "",
    views: post.views,
    likes: post.likes,
    faq: parseFaq(post.faq),
  };
}

export default function BlogFormModal({
  type,
  post,
  accessToken,
  onUnauthorized,
}: BlogFormModalProps) {
  const { setFormState } = useBlogForm();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    if (type === "put" && post) {
      setForm(recordToForm(post));
      setSlugTouched(true);
    } else {
      setForm(emptyForm());
      setSlugTouched(false);
    }
  }, [type, post]);

  useEffect(() => {
    if (type === "post" && !slugTouched && form.titleEn.trim()) {
      setForm((prev) => ({ ...prev, slug: slugifyText(prev.titleEn) }));
    }
  }, [form.titleEn, slugTouched, type]);

  const patch = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const buildPayload = () => {
    const publishedAtIso = form.publishedAt
      ? new Date(form.publishedAt).toISOString()
      : null;

    const validFaq = form.faq.filter(
      (item) =>
        item.question.en.trim() &&
        item.question.fa.trim() &&
        item.answer.en.trim() &&
        item.answer.fa.trim()
    );

    return {
      slug: form.slug.trim(),
      status: form.status,
      category: form.category,
      publishedAt: publishedAtIso,
      titleEn: form.titleEn.trim(),
      titleFa: form.titleFa.trim(),
      excerptEn: form.excerptEn.trim(),
      excerptFa: form.excerptFa.trim(),
      contentHtmlEn: form.contentHtmlEn,
      contentHtmlFa: form.contentHtmlFa,
      conclusionHtmlEn: form.conclusionHtmlEn.trim() || null,
      conclusionHtmlFa: form.conclusionHtmlFa.trim() || null,
      heroImage: form.heroImage.trim() || null,
      views: form.views,
      likes: form.likes,
      faq: validFaq.length ? validFaq : undefined,
    };
  };

  const handleSubmit = async () => {
    if (
      !form.slug.trim() ||
      !form.titleEn.trim() ||
      !form.titleFa.trim() ||
      !form.excerptEn.trim() ||
      !form.excerptFa.trim()
    ) {
      toast({
        title: "Validation error",
        description: "Please fill required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const payload = buildPayload();
    const headers = { Authorization: `Bearer ${accessToken}` };

    try {
      if (type === "post") {
        await axios.post("/api/blog/create", payload, { headers });
        toast({ title: "Success", description: "Blog post created." });
      } else if (post) {
        await axios.put(`/api/blog/admin/${post.id}`, payload, { headers });
        toast({ title: "Success", description: "Blog post updated." });
      }

      await queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      setFormState(false);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        onUnauthorized();
        return;
      }
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        toast({
          title: "Slug taken",
          description: "Choose a different slug.",
          variant: "destructive",
        });
        return;
      }
      toast({
        title: "Error",
        description: "Failed to save blog post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 p-4 pt-24 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl"
      >
        <button
          type="button"
          className="absolute right-4 top-4 text-white/60 hover:text-white"
          onClick={() => setFormState(false)}
        >
          <CircleX />
        </button>

        <h2 className="mb-6 text-xl font-semibold">
          {type === "post" ? "New blog post" : "Edit blog post"}
        </h2>

        <div className="space-y-8">
          <BlogMetaFields
            slug={form.slug}
            category={form.category}
            status={form.status}
            publishedAt={form.publishedAt}
            heroImage={form.heroImage}
            views={form.views}
            likes={form.likes}
            onSlugChange={(value) => {
              setSlugTouched(true);
              patch("slug", value);
            }}
            onCategoryChange={(value) => patch("category", value)}
            onStatusChange={(value) => patch("status", value)}
            onPublishedAtChange={(value) => patch("publishedAt", value)}
            onHeroImageChange={(value) => patch("heroImage", value)}
            onViewsChange={(value) => patch("views", value)}
            onLikesChange={(value) => patch("likes", value)}
          />

          <BlogLocalizedTabs
            titleEn={form.titleEn}
            titleFa={form.titleFa}
            excerptEn={form.excerptEn}
            excerptFa={form.excerptFa}
            contentHtmlEn={form.contentHtmlEn}
            contentHtmlFa={form.contentHtmlFa}
            conclusionHtmlEn={form.conclusionHtmlEn}
            conclusionHtmlFa={form.conclusionHtmlFa}
            onTitleEnChange={(v) => patch("titleEn", v)}
            onTitleFaChange={(v) => patch("titleFa", v)}
            onExcerptEnChange={(v) => patch("excerptEn", v)}
            onExcerptFaChange={(v) => patch("excerptFa", v)}
            onContentEnChange={(v) => patch("contentHtmlEn", v)}
            onContentFaChange={(v) => patch("contentHtmlFa", v)}
            onConclusionEnChange={(v) => patch("conclusionHtmlEn", v)}
            onConclusionFaChange={(v) => patch("conclusionHtmlFa", v)}
          />

          <BlogFaqRepeater value={form.faq} onChange={(v) => patch("faq", v)} />

          <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormState(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-green-500 hover:bg-green-400"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <ButtonLoading /> : type === "post" ? "Create" : "Save"}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
