import nextDynamic from "next/dynamic";
import HeroGalaxyCards, {
  type HeroInfoCard,
} from "@/components/Home/HeroGalaxyCards";
import HeroCosmicDynamic from "@/components/Home/HeroCosmicDynamic";
import Link from "next/link";

const TechStackScroller = nextDynamic(
  () => import("@/components/Home/TechStackScroller")
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

  return (
    <div className="w-full bg-page transition-colors duration-500">
      <HeroCosmicDynamic align={isFa ? "left" : "right"} />
      <section className="relative z-10 flex min-h-[100dvh] flex-col lg:grid lg:grid-cols-2 lg:overflow-hidden">
        <div className="flex flex-col items-center px-5 pb-4 pt-[4.5rem] text-center transition-colors duration-500 sm:px-6 lg:items-start lg:justify-center lg:px-12 lg:py-12 lg:pt-12 lg:text-start xl:px-16">
          <h1 className="text-[2.65rem] font-bold leading-[0.95] text-page-text sm:text-6xl lg:text-7xl">
            {isFa ? "محسن" : "Mohsen"}
            <br />
            <span className="whitespace-nowrap font-normal italic text-accent-cosmic">
              {isFa ? "خجسته نژاد" : "Khojasteh Nezhad"}
            </span>
          </h1>
          <p className="mt-5 text-xl italic text-page-muted sm:text-2xl">
            {isFa
              ? "مهندس فرانت‌اند و سازنده محصول"
              : "Frontend Engineer & Builder"}
          </p>
          <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-page-subtle sm:text-[16px] sm:leading-8">
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

      <div className="relative z-10 [content-visibility:auto]">
        <TechStackScroller />
        <HomeBelowFold locale={locale} />
      </div>
    </div>
  );
}
