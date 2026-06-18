export default function BlogPostLoading() {
  return (
    <div className="mt-24 min-h-[100dvh] w-full bg-page py-10">
      <div className="blog-container mb-4 h-5 w-64 animate-pulse rounded bg-tech-card-border/40" />

      <div className="blog-container mt-5 flex gap-6">
        <div className="w-[60px] max-xl:hidden">
          <div className="h-48 animate-pulse rounded bg-tech-card-border/30" />
        </div>

        <div className="w-3/4 max-xl:w-full">
          <div className="mb-5 h-[400px] animate-pulse rounded-2xl bg-tech-card-border/30 max-md:h-[200px]" />
          <div className="mb-6 h-10 w-3/4 animate-pulse rounded bg-tech-card-border/40" />
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-tech-card-border/30" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-tech-card-border/30" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-tech-card-border/30" />
            <div className="h-48 animate-pulse rounded-2xl bg-tech-card-border/20" />
          </div>
        </div>

        <div className="hidden w-1/4 xl:block">
          <div className="h-96 animate-pulse rounded-2xl border border-tech-card-border bg-tech-card" />
        </div>
      </div>
    </div>
  );
}
