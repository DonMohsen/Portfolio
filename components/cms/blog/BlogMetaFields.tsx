"use client";

import Image from "next/image";
import CloudinaryUploadButton from "@/components/CloudinaryUploadButton";

type BlogMetaFieldsProps = {
  slug: string;
  category: "tech" | "personal";
  status: "draft" | "published";
  publishedAt: string;
  heroImage: string;
  views: number;
  likes: number;
  onSlugChange: (value: string) => void;
  onCategoryChange: (value: "tech" | "personal") => void;
  onStatusChange: (value: "draft" | "published") => void;
  onPublishedAtChange: (value: string) => void;
  onHeroImageChange: (value: string) => void;
  onViewsChange: (value: number) => void;
  onLikesChange: (value: number) => void;
};

export default function BlogMetaFields(props: BlogMetaFieldsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Slug">
        <input
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={props.slug}
          onChange={(e) => props.onSlugChange(e.target.value)}
        />
      </Field>

      <Field label="Category">
        <select
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={props.category}
          onChange={(e) =>
            props.onCategoryChange(e.target.value as "tech" | "personal")
          }
        >
          <option value="tech">Tech</option>
          <option value="personal">Personal</option>
        </select>
      </Field>

      <Field label="Status">
        <select
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={props.status}
          onChange={(e) =>
            props.onStatusChange(e.target.value as "draft" | "published")
          }
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </Field>

      <Field label="Published at (optional)">
        <input
          type="datetime-local"
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={props.publishedAt}
          onChange={(e) => props.onPublishedAtChange(e.target.value)}
        />
      </Field>

      <Field label="Views">
        <input
          type="number"
          min={0}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={props.views}
          onChange={(e) => props.onViewsChange(Number(e.target.value))}
        />
      </Field>

      <Field label="Likes">
        <input
          type="number"
          min={0}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          value={props.likes}
          onChange={(e) => props.onLikesChange(Number(e.target.value))}
        />
      </Field>

      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-white/80">Hero image</label>
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center">
          {props.heroImage ? (
            <div className="relative h-24 w-40 overflow-hidden rounded-lg">
              <Image
                src={props.heroImage}
                alt="Hero"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-24 w-40 items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-white/40">
              No image
            </div>
          )}
          <div className="flex-1 space-y-2">
            <input
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
              placeholder="Image URL"
              value={props.heroImage}
              onChange={(e) => props.onHeroImageChange(e.target.value)}
            />
            <CloudinaryUploadButton onUpload={props.onHeroImageChange} />
          </div>
        </div>
      </div>
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
