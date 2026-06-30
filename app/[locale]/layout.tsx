import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "../providers/theme-provider";
import BrowserThemeColor from "@/components/BrowserThemeColor";
import DeferredHeader from "@/components/DeferredHeader";
import PersistentHeroCosmic from "@/components/Home/PersistentHeroCosmic";
import { getDeferredFontScript } from "@/lib/deferred-font-script";
import DeferredChrome from "@/components/DeferredChrome";
import SiteFooter from "@/components/footer/SiteFooter";
import DeferredPageTransition from "@/components/page-transition/DeferredPageTransition";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { resolveMetadataBase, resolveSiteUrl } from "@/lib/metadata-base";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const siteUrl = resolveSiteUrl();
  const isFa = locale === "fa";
  const title = isFa
    ? "محسن خجسته نژاد | برنامه نویس فرانت اند"
    : "Mohsen Khojasteh Nezhad | Front-End Developer";
  const description = isFa
    ? "پرتفولیوی رسمی محسن خجسته نژاد - توسعه دهنده وب و فرانت اند با تمرکز روی Next.js و React."
    : "Official portfolio of Mohsen Khojasteh Nezhad, web and front-end developer focused on Next.js and React.";

  return {
    metadataBase: resolveMetadataBase(),
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
    alternates: buildLocaleAlternates(locale),
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
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
  const siteUrl = resolveSiteUrl();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohsen Khojasteh Nezhad",
    alternateName: "محسن خجسته نژاد",
    url: siteUrl,
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
      className="min-h-svh bg-page"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        dangerouslySetInnerHTML={{ __html: getDeferredFontScript() }}
      />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <BrowserThemeColor />
          <DeferredHeader />
          <PersistentHeroCosmic />
          <main className="bg-page">{children}</main>
          <SiteFooter locale={locale} />
          <DeferredChrome />
          <DeferredPageTransition />
        </ThemeProvider>
      </NextIntlClientProvider>
    </div>
  );
}
