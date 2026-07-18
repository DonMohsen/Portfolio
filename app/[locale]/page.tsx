import { Suspense } from "react";
import HeroGalaxyCards, {
  type HeroInfoCard,
} from "@/components/Home/HeroGalaxyCards";
import TrustStrip from "@/components/Home/TrustStrip";
import First90DaysSection from "@/components/Home/First90DaysSection";
import ServiceTeaser from "@/components/Home/ServiceTeaser";
import HomeComparisonSnippet from "@/components/Home/HomeComparisonSnippet";
import HomeBelowFold from "@/components/Home/HomeBelowFold";
import ProjectsOverview from "@/components/Home/ProjectsOverview";
import { getHomeProjectsOverviewData } from "@/lib/home-projects";
import Link from "next/link";

const HERO_GALAXY_EN: HeroInfoCard[] = [
  {
    id: "currently",
    label: "Currently",
    value: "Building SaaS",
    top: "6%",
    right: "36%",
    delay: 0,
    floatDuration: 5.2,
  },
  {
    id: "focus",
    label: "Focus",
    value: "Automation",
    top: "30%",
    right: "18%",
    delay: 1.2,
    floatDuration: 6.4,
  },
  {
    id: "location",
    label: "Location",
    value: "Tehran, Iran",
    bottom: "32%",
    left: "6%",
    delay: 2.1,
    floatDuration: 5.8,
  },
  {
    id: "available",
    label: "Available",
    value: "Q3 2026",
    bottom: "8%",
    right: "24%",
    delay: 0.6,
    floatDuration: 6.9,
  },
];

const HERO_GALAXY_FA: HeroInfoCard[] = [
  {
    id: "currently",
    label: "اکنون",
    value: "ساخت SaaS",
    top: "6%",
    left: "36%",
    delay: 0,
    floatDuration: 5.2,
  },
  {
    id: "focus",
    label: "تمرکز",
    value: "اتوماسیون",
    top: "30%",
    left: "18%",
    delay: 1.2,
    floatDuration: 6.4,
  },
  {
    id: "location",
    label: "موقعیت",
    value: "تهران، ایران",
    bottom: "32%",
    right: "6%",
    delay: 2.1,
    floatDuration: 5.8,
  },
  {
    id: "available",
    label: "پذیرش پروژه",
    value: "Q3 2026",
    bottom: "8%",
    left: "24%",
    delay: 0.6,
    floatDuration: 6.9,
  },
];

type Params = Promise<{ locale: string }>;

export const dynamic = "force-static";
export const revalidate = false;

async function HomeProjectsBlock({ locale }: { locale: string }) {
  const { projects } = await getHomeProjectsOverviewData();
  return <ProjectsOverview projects={projects} locale={locale} />;
}

export default async function HomePage(props: { params: Params }) {
  const { locale } = await props.params;
  const isFa = locale === "fa";
  const heroCards = isFa ? HERO_GALAXY_FA : HERO_GALAXY_EN;

  return (
    <div className="w-full">
      <section className="relative z-10 flex min-h-svh flex-col overflow-hidden lg:grid lg:grid-cols-2">
        <div className="relative flex w-full min-w-0 flex-col items-center px-5 pb-4 pt-[52px] text-center sm:px-6 lg:items-start lg:justify-center lg:px-12 lg:py-12 lg:pt-12 lg:text-start xl:px-16">
          <h1 className="hero-lcp flex w-full min-w-0 max-w-full flex-col items-center gap-1.5 sm:gap-2 lg:items-start">
            <span className="hero-lcp-given block text-page-text">
              {isFa ? "محسن" : "Mohsen"}
            </span>
            {/*
              Keep surname as the intentional LCP text node. Avoid ancestor
              color transitions — they delayed paint in mobile lab audits.
            */}
            <span className="hero-lcp-surname block max-w-full font-normal italic text-accent-cosmic">
              {isFa ? "خجسته نژاد" : "Khojasteh Nezhad"}
            </span>
          </h1>
          <p className="mt-5 text-xl italic text-page-muted sm:text-2xl">
            {isFa ? "مهندس محصول نرم‌افزار" : "Software Product Engineer"}
          </p>
          {/* Temporarily hidden — marketing lines */}
          <p className="mt-4 max-w-[280px] text-[12px] leading-5 text-page-muted sm:max-w-[560px] sm:text-[14px] sm:leading-6 lg:max-w-[560px]">
            {isFa
              ? "وب‌اپلیکیشن · اپ موبایل · یکپارچه‌سازی AI · سیستم‌های سازمانی"
              : "Web applications · Mobile apps · AI integrations · Enterprise systems"}
          </p>
          <div className="mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center lg:mt-8 lg:max-w-none">
            <Link
              href={`/${locale}/contact?tab=schedule`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors duration-500 sm:w-auto"
            >
              {isFa ? "رزرو تماس" : "Book a discovery call"}
            </Link>
            <Link
              href={`/${locale}/work`}
              className="hero-cta-glass inline-flex w-full items-center justify-center rounded-lg border border-tech-card-border px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-page-text transition-colors duration-500 hover:border-accent-cosmic/40 hover:text-accent-cosmic sm:w-auto"
            >
              {isFa ? "مطالعات موردی" : "View case studies"}
            </Link>
          </div>
        </div>

        <div className="relative mt-2 flex flex-1 items-end px-4 pb-7 [content-visibility:auto] [contain-intrinsic-size:auto_280px] sm:px-5 lg:mt-0 lg:h-full lg:min-h-0 lg:items-center lg:px-0 lg:pb-0 lg:[content-visibility:visible]">
          <HeroGalaxyCards cards={heroCards} />
        </div>
      </section>

      <TrustStrip locale={locale} />

      <div
        className="relative z-10 [content-visibility:auto] [contain-intrinsic-size:auto_800px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--page-bg) 42%, transparent) 18%, color-mix(in srgb, var(--page-bg) 88%, transparent) 42%, var(--page-bg) 68%, var(--page-bg) 100%)",
        }}
      >
        <First90DaysSection locale={locale} />
        <ServiceTeaser locale={locale} />
      </div>

      <div className="relative z-10 bg-page">
        <div className="relative z-10 px-3 md:px-10 [content-visibility:auto] [contain-intrinsic-size:auto_1200px]">
          <Suspense
            fallback={
              <div className="min-h-[480px] w-full py-8" aria-hidden />
            }
          >
            <HomeProjectsBlock locale={locale} />
          </Suspense>
        </div>
        <div className="[content-visibility:auto] [contain-intrinsic-size:auto_600px]">
          <HomeComparisonSnippet locale={locale} />
        </div>
        <HomeBelowFold />
      </div>
    </div>
  );
}
