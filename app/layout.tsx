import "./globals.css";
import localFont from "next/font/local";

const iranSansX = localFont({
  src: [
    {
      path: "../public/fonts/IRANSansXRegular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSansXBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransansx",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  fallback: ["Arial", "sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${iranSansX.variable} dark`}
    >
      <body className={`${iranSansX.className} antialiased`}>{children}</body>
    </html>
  );
}
