import nextDynamic from "next/dynamic";
import HeroGalaxyCards, {
  type HeroInfoCard,
} from "@/components/Home/HeroGalaxyCards";
import { getHomeProjectsOverviewData } from "@/lib/home-projects";
import Link from "next/link";

const TechStackScroller = nextDynamic(
  () => import("@/components/Home/TechStackScroller")
);

const ProjectsOverview = nextDynamic(
  () => import("@/components/Home/ProjectsOverview")
);

const HomeBelowFold = nextDynamic(
  () => import("@/components/Home/HomeBelowFold")
);

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
    id: "stack",
    label: "Stack",
    value: "Next.js + Typescript",
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
    value: "Full-time",
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
    value: "هلدینگ وینا",
    top: "6%",
    left: "36%",
    delay: 0,
    floatDuration: 5.2,
  },
  {
    id: "stack",
    label: "استک",
    value: "Next.js + Typescript",
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
    label: "وضعیت همکاری",
    value: "تمام وقت",
    bottom: "8%",
    left: "24%",
    delay: 0.6,
    floatDuration: 6.9,
  },
];

type Params = Promise<{ locale: string }>;

export const dynamic = "force-static";
export const revalidate = false;

export default async function HomePage(props: { params: Params }) {
  const { locale } = await props.params;
  const isFa = locale === "fa";
  const heroCards = isFa ? HERO_GALAXY_FA : HERO_GALAXY_EN;
  const { projects, projectCount } = await getHomeProjectsOverviewData();

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <section className="relative z-10 flex min-h-svh flex-col overflow-hidden lg:grid lg:grid-cols-2">
        <div className="relative flex w-full min-w-0 flex-col items-center px-5 pb-4 pt-[52px] text-center transition-colors duration-500 sm:px-6 lg:items-start lg:justify-center lg:px-12 lg:py-12 lg:pt-12 lg:text-start xl:px-16">
          <h1 className="hero-lcp flex w-full min-w-0 max-w-full flex-col items-center gap-1.5 sm:gap-2 lg:items-start">
            <span className="hero-lcp-given block text-page-text">
              {isFa ? "محسن" : "Mohsen"}
            </span>
            <span className="hero-lcp-surname block max-w-full font-normal italic text-accent-cosmic">
              {isFa ? "خجسته نژاد" : "Khojasteh Nezhad"}
            </span>
          </h1>
          <p className="mt-5 text-xl italic text-page-muted sm:text-2xl">
            {isFa
              ? "مهندس فرانت‌اند و سازنده محصول"
              : "Frontend Engineer & Builder"}
          </p>
          <p className="mt-5 max-w-[560px] line-clamp-2 text-[15px] leading-6 text-page-subtle sm:line-clamp-3 sm:text-[16px] sm:leading-8 lg:line-clamp-none">
            {isFa
              ? "اپلیکیشن‌های قابل‌اعتماد با React و Next.js می‌سازم و ابزارهای AI را در جریان واقعی توسعه استفاده می‌کنم، با تمرکز روی معماری، کیفیت و تحویل دقیق."
              : "I build reliable web apps with React and Next.js, and I use AI tools in real workflows while keeping architecture, quality, and shipping discipline."}
          </p>
          <div className="mt-7 w-full max-w-md lg:mt-8 lg:max-w-none">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex w-full items-center justify-center rounded-lg bg-accent-cosmic px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.22em] text-accent-cosmic-fg transition-colors duration-500 lg:w-auto"
            >
              {isFa ? "مشاهده پروژه‌ها" : "View my work"}
            </Link>
          </div>
        </div>

        <div className="relative mt-2 flex flex-1 items-end px-4 pb-7 sm:px-5 lg:mt-0 lg:h-full lg:min-h-0 lg:items-center lg:px-0 lg:pb-0">
          <HeroGalaxyCards cards={heroCards} />
        </div>
      </section>

      <div className="relative z-10">
        <TechStackScroller />
        <div className="relative z-10 px-3 md:px-10 [content-visibility:auto] [contain-intrinsic-size:auto_1200px]">
          <ProjectsOverview
            projects={projects}
            locale={locale}
            projectCount={projectCount}
          />
        </div>
        <HomeBelowFold />
      </div>
    </div>
  );
}
