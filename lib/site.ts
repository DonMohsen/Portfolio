export const SITE_NAME = "Mohsen Khojasteh Nezhad";
export const SITE_NAME_FA = "محسن خجسته نژاد";
export const SITE_EMAIL = "mohsenkhojastehnezhad@gmail.com";
export const SITE_LOCATION_EN = "Tehran, Iran";
export const SITE_LOCATION_FA = "تهران، ایران";

export const SITE_AVAILABILITY_EN = "Accepting 1 new build — Q3 2026";
export const SITE_AVAILABILITY_FA = "پذیرش ۱ پروژه جدید — Q3 2026";
export const SITE_RESPONSE_TIME_EN = "Reply within 24 hours";
export const SITE_RESPONSE_TIME_FA = "پاسخ‌گویی در ۲۴ ساعت";

/** Cal.com booking page — set NEXT_PUBLIC_CALCOM_URL in production. */
export const SITE_CALCOM_URL =
  process.env.NEXT_PUBLIC_CALCOM_URL?.trim() ?? "";

/** WhatsApp number with country code, digits only — e.g. 98912xxxxxxx */
export const SITE_WHATSAPP =
  process.env.NEXT_PUBLIC_SITE_WHATSAPP?.trim() ?? "";

export type SiteChannel = {
  id: string;
  href: string;
  label: string;
  highlight?: boolean;
};

export const SOCIAL_LINKS = [
  {
    id: "github",
    href: "https://github.com/donmohsen",
    label: "GitHub",
  },
  {
    id: "telegram",
    href: "https://t.me/donmohsen",
    label: "Telegram",
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/mohsen-khojasteh-nezhad",
    label: "LinkedIn",
  },
  {
    id: "email",
    href: `mailto:${SITE_EMAIL}`,
    label: "Email",
  },
] as const;

export function getDirectContactChannels(locale: string): SiteChannel[] {
  const isFa = locale === "fa";
  const channels: SiteChannel[] = SOCIAL_LINKS.map((link) => ({
    ...link,
    highlight: isFa && link.id === "telegram",
  }));

  if (SITE_WHATSAPP) {
    channels.push({
      id: "whatsapp",
      href: `https://wa.me/${SITE_WHATSAPP}`,
      label: "WhatsApp",
      highlight: !isFa,
    });
  }

  if (isFa) {
    return [...channels].sort((a, b) => {
      if (a.highlight && !b.highlight) return -1;
      if (!a.highlight && b.highlight) return 1;
      return 0;
    });
  }

  return channels;
}
