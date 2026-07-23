import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ClientLocaleChrome from "@/components/ClientLocaleChrome";
import HtmlLangSync from "@/components/HtmlLangSync";
import ChromeGate from "@/components/ChromeGate";
import { getDeferredFontScript } from "@/lib/deferred-font-script";
import SiteFooter from "@/components/footer/SiteFooter";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { resolveMetadataBase, resolveSiteUrl } from "@/lib/metadata-base";
import { buildLocaleAlternates } from "@/lib/site-alternates";
import {
  buildEntityGraphJsonLd,
  PROFILE_IMAGE_PATH,
  SITE_METADATA,
} from "@/lib/seo/person-json-ld";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const siteUrl = resolveSiteUrl();
  const isFa = locale === "fa";
  const meta = isFa ? SITE_METADATA.fa : SITE_METADATA.en;
  const title = meta.title;
  const description = meta.description;
  const profileImageUrl = `${siteUrl.replace(/\/$/, "")}${PROFILE_IMAGE_PATH}`;

  return {
    metadataBase: resolveMetadataBase(),
    title,
    description,
    applicationName: "Mohsen Khojasteh Nezhad — Software Product Engineering",
    keywords: [...meta.keywords],
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
      siteName: "Mohsen Khojasteh Nezhad — Software Product Engineering",
      locale: meta.openGraphLocale,
      type: "website",
      images: [
        {
          url: profileImageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [profileImageUrl],
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
  const entityGraphSchema = buildEntityGraphJsonLd(siteUrl);

  return (
    <div
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="min-h-svh bg-page"
    >
      {locale === "fa" ? (
        <>
          <link
            rel="preload"
            href="/fonts/iranyekan/iranyekanwebregularfanum.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <script
            dangerouslySetInnerHTML={{ __html: getDeferredFontScript() }}
          />
        </>
      ) : null}
      <HtmlLangSync locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <main className="page-main-view">{children}</main>
        <ChromeGate>
          <ClientLocaleChrome />
        </ChromeGate>
        <ChromeGate>
          <div className="relative z-[1]">
            <SiteFooter locale={locale} />
          </div>
        </ChromeGate>
      </NextIntlClientProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraphSchema) }}
      />
    </div>
  );
}
