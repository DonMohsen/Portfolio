import type { Metadata } from "next";
// import { Signika_Negative } from "next/font/google";
import "./globals.css";
import { navItems } from "@/public/data";
import { ThemeProvider } from "./providers/theme-provider";
import { Header } from "@/components/header";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export const metadata: Metadata = {
  title: "محسن خجسته نژاد",
  description: "پورتفولیو ی محسن خجسته نژاد برنامه نویس تحت وب",
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
    <meta property="og:title" content="Mohsen Khojasteh nezhad Portfolio" />
    <meta property="og:description" content="Portfolio of Mohsen Khojasteh nezhad, Web Developer" />
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