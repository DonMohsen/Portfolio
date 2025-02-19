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
    <html suppressHydrationWarning lang="en">
      <body className="dark:bg-black">
      <Head>

    <title>محسن خجسته نژاد</title>
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
          <div className="overflow-hidden">

            <Navbar/>
          </div>
          {children}
          <Toaster/>
        </ThemeProvider>
    
      </body>
    </html>
  );
}