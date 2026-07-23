/**
 * Size-stable stand-in for MobileHeaderBar controls.
 * Keeps the fixed top-right cluster reserved before DeferredHeader mounts
 * so language / theme / hamburger never push CLS when they appear.
 */
export default function MobileHeaderPlaceholder() {
  return (
    <div
      className="fixed inset-x-0 top-0 z-[7000] mx-auto flex h-[52px] w-full items-center justify-end px-3 md:hidden"
      aria-hidden
    >
      <div className="relative z-[7001] flex items-center gap-2.5">
        <div className="h-9 w-9 shrink-0 rounded-lg border border-black/10 bg-zinc-200/20 dark:border-white/15 dark:bg-zinc-800/30" />
        <div className="h-9 w-9 shrink-0 rounded-lg border border-black/10 bg-zinc-200/20 dark:border-white/15 dark:bg-zinc-800/30" />
        <div className="h-12 w-12 shrink-0 rounded-lg border border-black/10 bg-zinc-200/20 dark:border-white/15 dark:bg-zinc-800/30" />
      </div>
    </div>
  );
}
