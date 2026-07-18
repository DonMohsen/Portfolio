import ProjectsFiltersDeferred from "@/components/Projects/projects-filters-deferred";
import type { Metadata } from "next";
import { buildLocaleAlternates } from "@/lib/site-alternates";

type Params = Promise<{ locale: string }>;

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const isFa = locale === "fa";
  return {
    title: isFa
      ? "مطالعات موردی | محسن خجسته‌نژاد"
      : "Case Studies | Mohsen Khojasteh Nezhad",
    description: isFa
      ? "مطالعات موردی محصولات نرم‌افزاری با معیارهای قبل و بعد."
      : "Software product case studies with before/after metrics.",
    alternates: buildLocaleAlternates(locale, "work"),
  };
}

export default function WorkLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-row items-start justify-center px-5 mt-[100px] max-md:mt-[100px] gap-6">
      <div className="flex-1 min-w-0">{children}</div>
      <aside className="w-[275px] shrink-0 max-lg:hidden sticky top-[100px]">
        <ProjectsFiltersDeferred />
      </aside>
    </div>
  );
}
