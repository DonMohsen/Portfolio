import type { Viewport } from "next";
import "./globals.css";
import ViewportLock from "@/components/ViewportLock";
import {
  BROWSER_THEME_COLOR,
  getBrowserThemeColorScript,
} from "@/lib/browser-theme-color";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-visual",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BROWSER_THEME_COLOR.light },
    { media: "(prefers-color-scheme: dark)", color: BROWSER_THEME_COLOR.dark },
  ],
};

/**
 * Fonts: IRANYekan is declared in globals.css from /public (woff2).
 * next/font was preloading on every locale — EN paid ~26KB for a font it
 * never paints. FA preloads explicitly in [locale]/layout.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;var l=p.indexOf('/en')===0?'en':'fa';document.documentElement.lang=l;document.documentElement.dir=l==='fa'?'rtl':'ltr'}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var u=window.innerHeight*0.01;document.documentElement.style.setProperty("--dvh",u+"px")}catch(e){}})();`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: getBrowserThemeColorScript(),
          }}
        />
      </head>
      <body className="antialiased">
        <ViewportLock />
        {children}
      </body>
    </html>
  );
}
