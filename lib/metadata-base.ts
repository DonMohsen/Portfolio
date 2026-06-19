import { headers } from "next/headers";

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

/** Request-aware origin for metadata so localhost audits match canonical/hreflang. */
export async function resolveSiteUrlForMetadata(): Promise<string> {
  try {
    const requestHeaders = await headers();
    const host =
      requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

    if (host) {
      const hostname = host.split(",")[0]?.trim();
      if (hostname) {
        const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
        if (configured && process.env.NODE_ENV === "production") {
          try {
            if (new URL(configured).host === hostname) {
              return configured;
            }
          } catch {
            // ignore invalid NEXT_PUBLIC_SITE_URL
          }
        }

        const proto =
          requestHeaders.get("x-forwarded-proto") ??
          (hostname.includes("localhost") || hostname.startsWith("127.")
            ? "http"
            : "https");

        return `${proto}://${hostname}`.replace(/\/$/, "");
      }
    }
  } catch {
    // Outside a request (e.g. some build-time paths).
  }

  return resolveSiteUrl();
}

export async function resolveMetadataBase(): Promise<URL> {
  return new URL(`${await resolveSiteUrlForMetadata()}/`);
}
