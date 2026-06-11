"use client";

import Image from "next/image";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";
import ProjectImageLightbox from "./ProjectImageLightbox";

type ProjectImageCarouselProps = {
  images: string[];
  title: string;
};

const SWIPE_THRESHOLD_RATIO = 0.14;
const DRAG_CLICK_THRESHOLD_PX = 8;

export default function ProjectImageCarousel({
  images,
  title,
}: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragMoved = useRef(false);
  const draggingRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  const hasMultiple = images.length > 1;
  const safeImages = images.length > 0 ? images : ["/icons/uiux.svg"];
  const lastIndex = safeImages.length - 1;

  activeIndexRef.current = activeIndex;

  const goTo = useCallback(
    (nextIndex: number) => {
      setActiveIndex(Math.max(0, Math.min(nextIndex, lastIndex)));
    },
    [lastIndex]
  );

  const applyEdgeResistance = useCallback(
    (offset: number, index: number) => {
      if (index <= 0 && offset > 0) return offset * 0.32;
      if (index >= lastIndex && offset < 0) return offset * 0.32;
      return offset;
    },
    [lastIndex]
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartX.current = event.clientX;
    dragMoved.current = false;
    draggingRef.current = true;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const rawOffset = event.clientX - dragStartX.current;
    if (Math.abs(rawOffset) > DRAG_CLICK_THRESHOLD_PX) {
      dragMoved.current = true;
    }

    if (!hasMultiple) {
      setDragOffset(applyEdgeResistance(rawOffset, 0));
      return;
    }

    setDragOffset(applyEdgeResistance(rawOffset, activeIndexRef.current));
  };

  const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const width = viewportRef.current?.clientWidth ?? 0;
    const threshold = Math.max(40, width * SWIPE_THRESHOLD_RATIO);
    const offset = event.clientX - dragStartX.current;
    const index = activeIndexRef.current;

    if (hasMultiple) {
      if (offset <= -threshold && index < lastIndex) {
        goTo(index + 1);
      } else if (offset >= threshold && index > 0) {
        goTo(index - 1);
      }
    }

    setDragOffset(0);
    draggingRef.current = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(event);
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(event);
  };

  const onClick = () => {
    if (dragMoved.current || images.length === 0) return;
    setLightboxOpen(true);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;

    if (event.key === "ArrowRight") goTo(activeIndex + 1);
    if (event.key === "ArrowLeft") goTo(activeIndex - 1);
  };

  const currentSrc = safeImages[activeIndex] ?? safeImages[0]!;

  return (
    <>
      <div
        ref={viewportRef}
        className={clsx(
          "group absolute inset-0 overflow-hidden rounded-t-2xl bg-page/40",
          isDragging ? "cursor-grabbing" : hasMultiple ? "cursor-grab" : "cursor-zoom-in"
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onClick={onClick}
        onKeyDown={onKeyDown}
        role={hasMultiple ? "region" : undefined}
        aria-roledescription={hasMultiple ? "carousel" : undefined}
        aria-label={hasMultiple ? `${title} screenshots` : `${title} preview`}
        tabIndex={hasMultiple ? 0 : -1}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(44%,5.75rem)] rounded-t-2xl bg-gradient-to-b from-black/25 via-black/[0.07] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(44%,5.75rem)] bg-gradient-to-t from-black/25 via-black/[0.07] to-transparent"
        />

        <div
          className={clsx(
            "relative z-0 flex h-full touch-pan-y",
            !isDragging && "transition-transform duration-500 ease-out"
          )}
          style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`,
          }}
        >
          {safeImages.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={src}
                alt={`${title} screenshot ${index + 1}`}
                fill
                draggable={false}
                  loading="lazy"
                  fetchPriority="low"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={clsx(
                  "pointer-events-none object-cover select-none transition-transform duration-500",
                  !isDragging && "group-hover:scale-[1.02]",
                  images.length === 0 && "opacity-25 dark:invert"
                )}
              />
            </div>
          ))}
        </div>

        {hasMultiple ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 z-[3] flex justify-center">
            <div className="flex items-center gap-1.5">
              {safeImages.map((src, index) => (
                <button
                  key={`${src}-dot-${index}`}
                  type="button"
                  className={clsx(
                    "pointer-events-auto h-2 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-all",
                    index === activeIndex
                      ? "w-5 bg-white"
                      : "w-2 bg-white/60 hover:bg-white/85"
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    goTo(index);
                  }}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <ProjectImageLightbox
        src={currentSrc}
        alt={`${title} enlarged screenshot`}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
