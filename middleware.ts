import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 301 Redirect Mapping (Source Path -> Destination URL)
const REDIRECT_MAP: Record<string, string> = {
  "/": "https://mohsen.info",
  "/fa": "https://mohsen.info",
  "/en": "https://mohsen.info",
  "/projects": "https://mohsen.info/fa/projects",
  "/projects/41": "https://mohsen.info/fa/projects/quaiz",
  "/projects/40": "https://mohsen.info/fa/projects/thelegroum",
  "/projects/38": "https://mohsen.info/fa/projects/create-mohsen-app",
  "/blogs": "https://mohsen.info/fa/blog",
  "/blog": "https://mohsen.info/fa/blog",
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Robots.txt: Allow search engine crawlers so they can discover 301s and 410s
  if (pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nAllow: /\n", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 2. Next.js Image optimization URL redirection
  if (pathname === "/_next/image") {
    const imageUrl = searchParams.get("url");
    if (imageUrl && (imageUrl.includes("tqv5om0qqlfzhndd6qh8") || imageUrl.includes("quaiz"))) {
      return NextResponse.redirect(
        "https://mohsen.info/_next/image?url=%2Fcms-api%2Fmedia%2Ffile%2Fquaiz-screen.png&w=1920&q=75",
        301
      );
    }
  }

  // 3. Normalize pathname (remove trailing slash)
  let cleanPath = pathname;
  if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // 4. Handle locale prefixes (/fa/..., /en/...)
  let routePath = cleanPath;
  if (routePath.startsWith("/fa/")) {
    routePath = routePath.replace("/fa", "");
  } else if (routePath.startsWith("/en/")) {
    routePath = routePath.replace("/en", "");
  } else if (routePath === "/fa" || routePath === "/en") {
    routePath = "/";
  }

  // 5. Check if route has a 301 redirect rule
  const destination = REDIRECT_MAP[routePath] || REDIRECT_MAP[cleanPath];
  if (destination) {
    return NextResponse.redirect(destination, 301);
  }

  // 6. Return 410 Gone for all other unmapped routes, SVGs, pages, and assets
  return new NextResponse("410 Gone - This resource has been permanently removed.", {
    status: 410,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

export const config = {
  matcher: "/:path*",
};
