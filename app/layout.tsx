import type { Metadata } from "next";
import localFont from "next/font/local";
// import { Signika_Negative } from "next/font/google";
import "./globals.css";
import { navItems } from "@/public/data";
import { ThemeProvider } from "./providers/theme-provider";
import { Header } from "@/components/header";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";
import Script from "next/script";
import NextLocalizationProvider from "./providers/next-localization-provider";

const iranSans = localFont({
  src: [
    { path: "../public/fonts/IRANSansXLight.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/IRANSansXRegular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/IRANSansXBold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/IRANSansXBlack.ttf", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-iran",
});

export const metadata: Metadata = {
  title: "محسن خجسته نژاد",
  description: "پورتفولیو ی محسن خجسته نژاد برنامه نویس تحت وب",
  robots: "index, follow", 

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="fa">
      {/* <NextLocalizationProvider> */}

      <body className={`${iranSans.variable} dark:bg-black`}>
      <Head>

    <title>محسن خجسته نژاد</title>
    <meta name="google-site-verification" content="8rnd6SZNcUVTXewASPcTSKtabrKxhaHnfN0hpXnO_nY" />
    <meta name="description" content="پرتفولیو محسن خجسته نژاد برنامه نویس تحت وب" />
    <meta name="robots" content="index, follow"/>

    <meta property="og:title" content="Mohsen Khojasteh nezhad Portfolio" />
    <meta property="og:description" content="Portfolio of Mohsen Khojasteh nezhad, Web Developer" />
    <link rel="icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/web-app-manifest-192x192.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/web-app-manifest-512x512.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="#ffffff" />

    <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Mohsen Khojasteh nezhad",
      "url": "https://donmohsen.ir",
      "sameAs": ["https://github.com/DonMohsen", "https://linkedin.com/in/mohsenkhojastehnezhad"]
    }),
  }}
/>;
  </Head>
        <ThemeProvider attribute="class" defaultTheme="dark">

          <Header />
          <div className="overflow-hidden">

            <Navbar/>
          </div>
          <main>
            {children}
          </main>
          <Toaster/>
        </ThemeProvider>
    
      </body>
  {/* </NextLocalizationProvider> */}
    </html>
  );
}
