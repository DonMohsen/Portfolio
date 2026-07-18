import type { Metadata } from "next";
import ContactHub from "@/components/contact/ContactHub";
import EntityGraphScript from "@/components/seo/EntityGraphScript";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

type SearchParams = Promise<{
  tab?: string;
  service?: string;
  source?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
}>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";

  return {
    title: isFa
      ? "تماس | محسن خجسته‌نژاد"
      : "Contact | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "رزرو تماس کشف، brief ساختاریافته، چت و کانال‌های مستقیم."
      : "Book a discovery call, structured brief, chat, and direct channels.",
    alternates: buildLocaleAlternates(locale, "contact"),
  };
}

export default async function ContactPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { locale } = await props.params;
  const search = await props.searchParams;

  const defaultSource =
    search.source?.trim() ||
    (search.service ? `service:${search.service}` : "contact-form");

  const defaultProjectType =
    search.projectType?.trim() || search.service?.trim() || "";

  return (
    <>
      <EntityGraphScript />
      <ContactHub
        locale={locale}
        initialTab={search.tab ?? "schedule"}
        defaultService={defaultProjectType}
        defaultBudget={search.budget?.trim() ?? ""}
        defaultTimeline={search.timeline?.trim() ?? ""}
        defaultMessage={search.message?.trim() ?? ""}
        defaultSource={defaultSource}
      />
    </>
  );
}
