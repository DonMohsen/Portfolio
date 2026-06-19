import Link from "next/link";
import { getFooterData } from "@/lib/footer-data";
import { resolveSiteUrl } from "@/lib/metadata-base";
import {
  SITE_EMAIL,
  SITE_LOCATION_EN,
  SITE_LOCATION_FA,
  SITE_NAME,
  SITE_NAME_FA,
  SOCIAL_LINKS,
} from "@/lib/site";
import FooterCosmicDefer from "./FooterCosmicDefer";
import FooterSocialIcon from "./FooterSocialIcon";
import styles from "./footer.module.css";

type SiteFooterProps = {
  locale: string;
};

const CTA_COPY = {
  en: {
    heading: "Ready to build something reliable together?",
    sub: "I help teams ship polished web products with React, Next.js, and performance-first engineering.",
    button: "Start a conversation",
  },
  fa: {
    heading: "آماده‌اید یک محصول قابل اعتماد بسازیم؟",
    sub: "به تیم‌ها کمک می‌کنم محصولات وب دقیق و سریع با React، Next.js و مهندسی مبتنی بر عملکرد بسازند.",
    button: "شروع گفتگو",
  },
} as const;

const BRAND_COPY = {
  en: "Front-end engineer focused on fast, accessible interfaces and production-grade Next.js architecture.",
  fa: "مهندس فرانت‌اند با تمرکز روی رابط‌های سریع، در دسترس و معماری Next.js در سطح پروداکشن.",
} as const;

export default async function SiteFooter({ locale }: SiteFooterProps) {
  const isFa = locale === "fa";
  const copy = isFa ? CTA_COPY.fa : CTA_COPY.en;
  const brandCopy = isFa ? BRAND_COPY.fa : BRAND_COPY.en;
  const { blogs, projects } = await getFooterData(locale);
  const siteUrl = resolveSiteUrl();

  const footerSchema = {
    "@context": "https://schema.org",
    "@type": "WPFooter",
    copyrightYear: new Date().getFullYear(),
    creator: {
      "@type": "Person",
      name: SITE_NAME,
      alternateName: SITE_NAME_FA,
      email: SITE_EMAIL,
      url: siteUrl,
      sameAs: SOCIAL_LINKS.filter((link) => link.id !== "email").map(
        (link) => link.href
      ),
    },
  };

  return (
    <footer
      role="contentinfo"
      className={styles.footerRoot}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(footerSchema) }}
      />

      <section
        aria-labelledby="footer-cta-heading"
        className={styles.footerCosmicStage}
      >
        <svg
          aria-hidden
          className={styles.footerTopArc}
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            style={{ fill: "var(--footer-cta-bg)" }}
            d="M0,80 L0,44 C480,10 960,10 1440,44 L1440,80 Z"
          />
        </svg>

        <div className={styles.footerCosmicBody}>
          <div className={styles.footerCosmicDome}>
            <div aria-hidden className={styles.footerCtaCosmic}>
              <FooterCosmicDefer />
            </div>
            <div className={styles.footerCosmicContent}>
            <h2
              id="footer-cta-heading"
              className={`${styles.footerCosmicHeading} text-[1.65rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-[1.12]`}
            >
              {copy.heading}
            </h2>
            <p
              className={`${styles.footerCosmicSub} mx-auto mt-3 max-w-xl text-sm leading-7 sm:text-[15px] sm:leading-8`}
            >
              {copy.sub}
            </p>
            <div className="mt-6">
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent-cosmic px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-cosmic-fg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {copy.button}
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>

      <div className={styles.footerBody}>
        <div className={styles.footerBodyInner}>
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1.15fr)_repeat(3,minmax(0,1fr))] lg:gap-6 xl:gap-8">
            <div className="max-w-sm">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2.5"
              >
                <span
                  className={`${styles.footerBrandMark} inline-flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold`}
                  aria-hidden
                >
                  M
                </span>
                <span className={`${styles.footerBrandName} text-lg font-bold tracking-tight`}>
                  Mohsen
                </span>
              </Link>
              <p className={`${styles.footerBrandBio} mt-4 text-sm leading-7`}>
                {brandCopy}
              </p>
              <nav
                aria-label={isFa ? "شبکه‌های اجتماعی" : "Social links"}
                className="mt-5"
              >
                <ul className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.href}
                        target={link.id === "email" ? undefined : "_blank"}
                        rel={
                          link.id === "email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        aria-label={link.label}
                        className={`${styles.footerSocialBtn} inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300`}
                      >
                        <FooterSocialIcon id={link.id} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <section aria-labelledby="footer-blogs-heading">
              <h2
                id="footer-blogs-heading"
                className={`${styles.footerColumnTitle} text-sm font-semibold`}
              >
                {isFa ? "آخرین نوشته‌ها" : "Articles"}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {blogs.map((blog) => (
                  <li key={blog.slug}>
                    <Link
                      href={blog.href}
                      className={`${styles.footerLink} block text-sm leading-6 transition-colors duration-300`}
                    >
                      {blog.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${locale}/blogs`}
                    className={`${styles.footerLink} text-sm font-medium transition-colors duration-300`}
                  >
                    {isFa ? "همه نوشته‌ها" : "All articles"}
                  </Link>
                </li>
              </ul>
            </section>

            <section aria-labelledby="footer-projects-heading">
              <h2
                id="footer-projects-heading"
                className={`${styles.footerColumnTitle} text-sm font-semibold`}
              >
                {isFa ? "پروژه‌های برتر" : "Projects"}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={project.href}
                      className={`${styles.footerLink} block text-sm leading-6 transition-colors duration-300`}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={`/${locale}/projects`}
                    className={`${styles.footerLink} text-sm font-medium transition-colors duration-300`}
                  >
                    {isFa ? "همه پروژه‌ها" : "All projects"}
                  </Link>
                </li>
              </ul>
            </section>

            <section aria-labelledby="footer-contact-heading">
              <h2
                id="footer-contact-heading"
                className={`${styles.footerColumnTitle} text-sm font-semibold`}
              >
                {isFa ? "ارتباط" : "Contact"}
              </h2>
              <address className="mt-4 space-y-2.5 not-italic">
                <p className={`${styles.footerLink} text-sm leading-6`}>
                  {isFa ? SITE_NAME_FA : SITE_NAME}
                </p>
                <p className={`${styles.footerLink} text-sm leading-6`}>
                  {isFa ? SITE_LOCATION_FA : SITE_LOCATION_EN}
                </p>
                <p>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className={`${styles.footerLink} text-sm leading-6 transition-colors duration-300`}
                  >
                    {SITE_EMAIL}
                  </a>
                </p>
              </address>
            </section>
          </div>

          <div className={`${styles.footerDivider} mt-6 pt-4`}>
            <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className={styles.footerMeta}>
                © {new Date().getFullYear()}{" "}
                {isFa ? SITE_NAME_FA : "Mohsen"}.{" "}
                {isFa ? "تمامی حقوق محفوظ است." : "All rights reserved."}
              </p>
              <nav
                aria-label={isFa ? "لینک‌های قانونی" : "Legal links"}
                className="flex flex-wrap gap-x-5 gap-y-2"
              >
                <Link
                  href={`/${locale}/projects`}
                  className={`${styles.footerMeta} ${styles.footerMetaLink} transition-colors duration-300`}
                >
                  {isFa ? "پروژه‌ها" : "Projects"}
                </Link>
                <Link
                  href={`/${locale}/blogs`}
                  className={`${styles.footerMeta} ${styles.footerMetaLink} transition-colors duration-300`}
                >
                  {isFa ? "بلاگ" : "Blog"}
                </Link>
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className={`${styles.footerMeta} ${styles.footerMetaLink} transition-colors duration-300`}
                >
                  {isFa ? "تماس" : "Contact"}
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div aria-hidden className={styles.footerWatermarkWrap}>
          <p className={styles.footerWatermark}>Mohsen</p>
        </div>
      </div>
    </footer>
  );
}
