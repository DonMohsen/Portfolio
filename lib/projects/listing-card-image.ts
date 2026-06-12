import { getImageProps } from "next/image";
import { parseProjectImages } from "./parse-project-images";

const LISTING_CARD_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

/** Prefer pre-generated WebP listing thumbnails over multi-MB PNG sources. */
export function resolveListingCoverSrc(
  image: string | null | undefined
): string | undefined {
  const raw = parseProjectImages(image)[0];
  if (!raw) return undefined;

  const fileName = raw.split("/").pop();
  if (fileName?.startsWith("Gemini_Generated_Image") && fileName.endsWith(".png")) {
    return `/projects/listing/${fileName.replace(/\.png$/, ".webp")}`;
  }

  return raw;
}

export function getListingCardImageProps(
  src: string,
  alt: string,
  options: { priority?: boolean; eager?: boolean } = {}
) {
  const { priority = false, eager = false } = options;
  const isListingThumb = src.startsWith("/projects/listing/");

  return getImageProps({
    src,
    alt,
    width: 480,
    height: 270,
    quality: priority ? 70 : 75,
    sizes: LISTING_CARD_SIZES,
    priority,
    loading: priority || eager ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
    ...(isListingThumb ? { unoptimized: true } : {}),
  });
}

export function getListingCardPreloadSrc(src: string): string | null {
  if (!src) return null;
  return getListingCardImageProps(src, "", { priority: true }).props.src;
}
