import type { Metadata } from "next";
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
import PersonalCard from "@/components/personal-card";

export const metadata: Metadata = {
  title: "محسن خجسته نژاد",
  description: "پورتفولیوی محسن خجسته نژاد برنامه نویس تحت وب",
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

      <body className="dark:bg-black ">
      <Head>

    <title>محسن خجسته نژاد</title>
    <meta name="google-site-verification" content="8rnd6SZNcUVTXewASPcTSKtabrKxhaHnfN0hpXnO_nY" />
    <meta name="description" content="پرتفولیو محسن خجسته نژاد برنامه نویس تحت وب" />
    <meta name="robots" content="index, follow"/>

    <meta property="og:title" content="Mohsen Khojasteh nezhad Portfolio" />
    <meta property="og:description" content="Portfolio of Mohsen Khojasteh nezhad, Web Developer" />
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
          <div className="flex w-full h-full max-md:flex-col">
  {/* Left Section - Sticky on large screens, normal on small screens */}
  <div className="md:w-[40%] h-[100vh] max-md:hidden lg:w-[40%] xl:w-[30%] md:h-screen max-md:h-[100vh] md:sticky max-md:relative top-0 shadow-lg">
    <PersonalCard />
  </div>

  {/* Right Section - Takes Remaining Space */}
  <div className="flex-1 p-4">
    {children}
  </div>
</div>
          <Toaster/>
        </ThemeProvider>
    
      </body>
  {/* </NextLocalizationProvider> */}
    </html>
  );
}