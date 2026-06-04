import {getTwoLatestProjects} from "../actions/getTwoLatestProjects";
import getAllProjectsCount from "../actions/getProjectsAndTechsCount";
import ProjectsDemo from "@/components/Home/ProjectsDemoSection/ProjectsDemo";
import AboutMe from "@/components/Home/AboutMe";
import Galaxy, {type GalaxyInfoCard} from "@/components/Galaxy";
import TechStackScroller from "@/components/Home/TechStackScroller";
import Link from "next/link";

const HERO_GALAXY_EN: GalaxyInfoCard[] = [
  {label: "Currently", value: "Building SaaS", top: "6%", right: "36%", delay: 0},
  {label: "Stack", value: "Next.js + Typescript", top: "30%", right: "18%", delay: 1.2},
  {label: "Location", value: "Tehran, Iran", bottom: "32%", left: "6%", delay: 2.1},
  {label: "Available", value: "Full-time", bottom: "8%", right: "24%", delay: 0.6},
];

/** RTL: mirror horizontal positions (same as previous SpaceSection) */
const HERO_GALAXY_FA: GalaxyInfoCard[] = [
  {label: "اکنون", value: "هلدینگ وینا", top: "6%", left: "36%", delay: 0},
  {label: "استک", value: "Next.js + Typescript", top: "30%", left: "18%", delay: 1.2},
  {label: "موقعیت", value: "تهران، ایران", bottom: "32%", right: "6%", delay: 2.1},
  {label: "وضعیت همکاری", value: "تمام وقت", bottom: "8%", left: "24%", delay: 0.6},
];

type Params = Promise<{locale: string}>;

export const dynamic = "force-static";
export const revalidate = false;

export default async function HomePage(props: {params: Params}) {
  const {locale} = await props.params;
  const [allProjects, {projectCount}] = await Promise.all([
    getTwoLatestProjects(),
    getAllProjectsCount()
  ]);
  const isFa = locale === "fa";

  return (
    <div className="w-full">
      <section className="grid grid-cols-1 lg:grid-cols-2 h-[100dvh] overflow-hidden bg-[#171a36]">
        <div className="flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16 text-[#dce3ff]">
          {/* <span className="text-[11px] tracking-[0.18em] uppercase text-[#f8b78c]/90">
            {isFa ? "آماده همکاری برای فرصت‌های جدید" : "Available for opportunities, 2026"}
          </span> */}
          <h1 className="mt-4 leading-[0.9] font-semibold text-6xl md:text-7xl">
             {isFa? 'محسن' : 'Mohsen'}
            <br />
            <span className="italic text-[#f8b78c] font-medium">{isFa? 'خجسته نژاد' : 'Khojasteh Nezhad'}</span>
          </h1>
          <p className="mt-6 text-2xl text-[#dce3ff]/80 italic">
            {isFa ? "مهندس فرانت‌اند و سازنده محصول" : "Frontend Engineer & Builder"}
          </p>
          <p className="mt-6 max-w-[560px] text-[16px] leading-8 text-[#dce3ff]/70">
            {isFa
              ? "اپلیکیشن‌های قابل‌اعتماد با React و Next.js می‌سازم و ابزارهای AI را در جریان واقعی توسعه استفاده می‌کنم، با تمرکز روی معماری، کیفیت و تحویل دقیق."
              : "I build reliable web apps with React and Next.js, and I use AI tools in real workflows while keeping architecture, quality, and shipping discipline."}
          </p>
          <div className="mt-8">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 bg-[#f8b78c] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#171a36]"
            >
              {isFa ? "مشاهده پروژه‌ها" : "View my work"}
            </Link>
          </div>
        </div>
        <div className="relative h-full min-h-[280px] lg:min-h-0">
          <Galaxy
            cards={isFa ? HERO_GALAXY_FA : HERO_GALAXY_EN}
            className="h-full"
          />
        </div>
      </section>
      <TechStackScroller />

      <div className="px-3 py-10 md:px-10">
        <AboutMe />
        <ProjectsDemo projects={allProjects} locale={locale} projectCount={projectCount} />
      </div>
    </div>
  );
}
