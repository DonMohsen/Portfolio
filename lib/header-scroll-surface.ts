import { scheduleAfterLoadIdle } from "@/lib/schedule-idle";

const HEADER_FADE_RANGE_PX = 50;

function paintHeaderSurface(el: HTMLElement) {
  const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
  const progress = Math.min(1, scrollY / HEADER_FADE_RANGE_PX);

  el.style.setProperty("--header-surface", progress.toFixed(3));
}

/** Scroll-linked header background without React re-renders. */
export function attachHeaderScrollSurface(el: HTMLElement) {
  let frame = 0;
  let listening = false;

  const paint = () => paintHeaderSurface(el);

  const onScroll = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(paint);
  };

  const startListening = () => {
    if (listening) return;
    listening = true;
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  const onFirstScroll = () => startListening();

  window.addEventListener("scroll", onFirstScroll, { passive: true, once: true });
  scheduleAfterLoadIdle(startListening, { minDelayMs: 1200 });

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onFirstScroll);
    window.removeEventListener("scroll", onScroll);
  };
}
