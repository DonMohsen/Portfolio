import { BlogCardSkeleton } from "@/components/blog/BlogCard";

export default function BlogListingLoading() {
  return (
    <div className="mt-24 min-h-[100dvh] w-full bg-page py-10">
      <div className="blog-container mb-4 h-5 w-48 animate-pulse rounded bg-tech-card-border/40" />

      <div className="blog-container mt-5 rounded-2xl border border-tech-card-border bg-tech-card p-5 shadow-[var(--tech-card-shadow)]">
        <div className="mb-6 h-8 w-2/3 animate-pulse rounded bg-tech-card-border/40" />
        <div className="h-[300px] animate-pulse rounded-2xl bg-tech-card-border/30 lg:h-[500px]" />
      </div>

      <div className="blog-container mt-6 flex gap-6">
        <div className="flex w-3/4 flex-col gap-6 max-xl:w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
        <div className="hidden w-1/4 xl:block">
          <div className="h-96 animate-pulse rounded-2xl border border-tech-card-border bg-tech-card" />
        </div>
      </div>
    </div>
  );
}
