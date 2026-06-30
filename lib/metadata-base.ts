export const DEFAULT_SITE_URL = "https://new-portfo-mohsen.vercel.app";

export function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, "");
  }

  return DEFAULT_SITE_URL;
}

export function resolveMetadataBase(): URL {
  return new URL(`${resolveSiteUrl()}/`);
}
