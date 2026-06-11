"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ProjectImageLightboxProps = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

export default function ProjectImageLightbox({
  src,
  alt,
  open,
  onClose,
}: ProjectImageLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      return;
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="project-lightbox fixed inset-0 z-[12000] m-0 h-dvh max-h-dvh w-full max-w-none border-0 bg-black/85 p-4 backdrop:bg-black/70"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute end-4 top-4 z-[1] rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-sm text-white transition-colors hover:bg-black/70"
        aria-label="Close image"
      >
        ✕
      </button>

      <div
        className="flex h-full w-full items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1080}
          sizes="100vw"
          quality={90}
          className="max-h-[88dvh] w-auto max-w-[min(96vw,1200px)] object-contain"
        />
      </div>
    </dialog>
  );
}
