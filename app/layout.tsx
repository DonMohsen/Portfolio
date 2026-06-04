import "./globals.css";
import localFont from "next/font/local";

const iranSansX = localFont({
  src: [{path: "../public/fonts/IRANSansXRegular.ttf", weight: "400", style: "normal"}],
  variable: "--font-iransansx",
  display: "swap",
  fallback: ["Arial", "sans-serif"]
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={iranSansX.variable}>{children}</body>
    </html>
  );
}
