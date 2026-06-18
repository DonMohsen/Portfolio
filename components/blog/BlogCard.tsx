import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Eye, Heart } from "lucide-react";
import { formatCompactCount } from "@/lib/blogs/format-compact-count";
import { BLOG_FALLBACK_IMAGE } from "@/lib/blogs/constants";

type BlogCardProps = {
  title: string;
  description: string;
  image?: string;
  href: string;
  readTimeLabel: string;
  dateLabel: string;
  views: number;
  likes: number;
  priority?: boolean;
  locale: string;
};

function MetaItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-1"
      title={label}
    >
      <span className="size-4 shrink-0 opacity-70 sm:size-5">{icon}</span>
      <span className="truncate text-[10px] leading-tight tracking-tight sm:text-xs">
        {label}
      </span>
    </div>
  );
}

const CARD_IMAGE_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px";

export default function BlogCard({
  title,
  description,
  image,
  href,
  readTimeLabel,
  dateLabel,
  views,
  likes,
  priority = false,
  locale,
}: BlogCardProps) {
  const postImage = image?.trim() || BLOG_FALLBACK_IMAGE;

  return (
    <Link href={href} title={title} data-transition-label={title}>
      <div className="w-full cursor-pointer overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card p-5 shadow-[var(--tech-card-shadow)] transition-colors hover:border-accent-cosmic/30 hover:bg-tech-card/80">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-56 w-full md:h-auto md:w-1/3">
            <Image
              src={postImage}
              alt={title}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              sizes={CARD_IMAGE_SIZES}
              className="rounded-[8px] object-cover"
              quality={75}
            />
          </div>
          <div className="flex flex-col justify-between px-0 py-0 max-md:px-0 md:w-2/3 md:px-6">
            <div>
              <h2 className="mb-2 text-xl font-semibold text-page-text max-md:mt-2 max-md:text-lg">
                {title}
              </h2>
              <p className="mb-4 text-sm text-page-subtle">{description}</p>
            </div>

            <hr className="mb-3 border-tech-card-border" />

            <div className="grid grid-cols-4 gap-x-0.5 gap-y-2 text-page-subtle max-sm:grid-cols-2">
              <MetaItem
                icon={<Clock className="h-full w-full" />}
                label={readTimeLabel}
              />
              <MetaItem
                icon={<Calendar className="h-full w-full" />}
                label={dateLabel}
              />
              <MetaItem
                icon={<Eye className="h-full w-full" />}
                label={formatCompactCount(views, locale)}
              />
              <MetaItem
                icon={<Heart className="h-full w-full" />}
                label={formatCompactCount(likes, locale)}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="w-full animate-pulse overflow-hidden rounded-2xl border border-tech-card-border bg-tech-card p-5">
      <div className="flex w-full flex-col md:flex-row">
        <div className="relative h-56 w-full md:h-auto md:w-1/3">
          <div className="h-full w-full rounded-[8px] bg-tech-card-border/40" />
        </div>
        <div className="flex flex-col justify-between px-0 py-0 md:w-2/3 md:px-6">
          <div>
            <div className="mb-2 h-6 w-3/4 rounded bg-tech-card-border/40" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-tech-card-border/40" />
              <div className="h-4 w-5/6 rounded bg-tech-card-border/40" />
              <div className="h-4 w-2/3 rounded bg-tech-card-border/40" />
            </div>
          </div>
          <hr className="my-4 border-tech-card-border" />
          <div className="grid grid-cols-4 gap-1 max-sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-4 rounded bg-tech-card-border/40"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
