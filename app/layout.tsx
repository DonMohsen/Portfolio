import "./globals.css";
import localFont from "next/font/local";

const iranYekan = localFont({
  src: "../public/fonts/iranyekan/iranyekanwebregularfanum.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-iranyekan",
  display: "swap",
  preload: true,
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
      lang="en"
      suppressHydrationWarning
      className={`${iranYekan.variable} dark`}
    >
      <body className={`${iranYekan.className} antialiased`}>{children}</body>
    </html>
  );
}
