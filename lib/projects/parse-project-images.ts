/** Supports comma-separated URLs in `image` until a gallery field exists in admin. */
export function parseProjectImages(image: string | null | undefined): string[] {
  if (!image?.trim()) return [];

  return image
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}
