import type { Viewport } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ViewportLock from "@/components/ViewportLock";
import { BROWSER_THEME_COLOR, getBrowserThemeColorScript } from "@/lib/browser-theme-color";

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

const iranYekan = localFont({
  src: "../public/fonts/iranyekan/iranyekanwebregular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-iranyekan",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${iranYekan.variable} dark`}
    >
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
