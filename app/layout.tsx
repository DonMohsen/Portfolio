import type { Viewport } from "next";
import "./globals.css";
import DeferredViewportLock from "@/components/DeferredViewportLock";
import { BROWSER_THEME_COLOR } from "@/lib/browser-theme-color";
import { getSiteThemeInitScript } from "@/lib/site-theme";

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
          dangerouslySetInnerHTML={{ __html: getSiteThemeInitScript() }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              '@font-face{font-family:"IRANYekanFn Fallback";src:local("Tahoma");size-adjust:93%;ascent-override:92%;descent-override:25%;line-gap-override:0%}html.dark{--page-text:#dce3ff;--accent:#f8b78c;--page-bg:#171a36}[lang="en"] .hero-lcp{font-family:Arial,Helvetica,sans-serif}[lang="fa"] .hero-lcp{font-family:"IRANYekanFn Fallback",Tahoma,Arial,Helvetica,sans-serif}.hero-lcp{width:100%;min-height:7.25rem}.hero-lcp-given{font-size:clamp(2.75rem,12vw,3.25rem);line-height:1.05;color:#dce3ff}.hero-lcp-surname{font-size:clamp(2.25rem,8.5vw,4.5rem);line-height:1.05;white-space:nowrap;color:#f8b78c}',
          }}
        />
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
      </head>
      <body className="antialiased">
        <DeferredViewportLock />
        {children}
      </body>
    </html>
  );
}
