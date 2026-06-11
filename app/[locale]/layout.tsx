import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../providers/theme-provider";
import DeferredFont from "@/components/DeferredFont";
import DeferredHeader from "@/components/DeferredHeader";
import DeferredChrome from "@/components/DeferredChrome";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const isFa = locale === "fa";
  const title = isFa
    ? "محسن خجسته نژاد | برنامه نویس فرانت اند"
    : "Mohsen Khojasteh Nezhad | Front-End Developer";
  const description = isFa
    ? "پرتفولیوی رسمی محسن خجسته نژاد - توسعه دهنده وب و فرانت اند با تمرکز روی Next.js و React."
    : "Official portfolio of Mohsen Khojasteh Nezhad, web and front-end developer focused on Next.js and React.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: "Mohsen Khojasteh Nezhad Portfolio",
    keywords: [
      "محسن خجسته نژاد",
      "Mohsen Khojasteh Nezhad",
      "Mohsen Khojasteh nezhad",
      "Mohsen khojasteh",
      "محسن خجسته",
      "mohsen portfolio",
      "front-end developer",
      "nextjs developer",
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: "/",
      languages: {
        fa: "/fa",
        en: "/en",
        "x-default": "/fa",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://donmohsen.ir/${locale}`,
      siteName: "Mohsen Khojasteh Nezhad Portfolio",
      locale: isFa ? "fa_IR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    verification: {
      google: "8rnd6SZNcUVTXewASPcTSKtabrKxhaHnfN0hpXnO_nY",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Params;
}) {
  const { children } = props;
  const { locale } = await props.params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohsen Khojasteh Nezhad",
    alternateName: "محسن خجسته نژاد",
    url: "https://donmohsen.ir",
    jobTitle: "Front-End Developer",
    sameAs: [
      "https://github.com/DonMohsen",
      "https://linkedin.com/in/mohsenkhojastehnezhad",
    ],
  };

  return (
    <div
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="min-h-dvh bg-page"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <DeferredFont />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DeferredHeader />
          <main className="bg-page">{children}</main>
          <DeferredChrome />
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
}
