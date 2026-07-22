import { getProjectsListingData } from "@/lib/projects/get-projects-listing";
import { resolveListingCoverSrc } from "@/lib/projects/listing-card-image";
import ProjectsGrid from "@/components/Projects/projects-grid";
import ProjectsToolbarDeferred from "@/components/Projects/projects-toolbar-deferred";
import ProjectLcpPreloadLink from "@/components/Projects/project-lcp-preload-link";
import SiteBreadcrumbs from "@/components/seo/SiteBreadcrumbs";
import { twoLevelTrail } from "@/lib/seo/breadcrumb";

export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search?: string;
    order?: string;
    type?: string;
    industry?: string;
    featured?: string;
  }>;
};

export default async function WorkListingPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const search = sp.search ?? "";
  const order = sp.order ?? "desc";
  const type = sp.type ?? "";
  const industry = sp.industry ?? "";
  const featured = sp.featured ?? "";

  const projects = await getProjectsListingData(
    search,
    order,
    type,
    industry,
    featured
  );
  const lcpCover = resolveListingCoverSrc(projects[0]?.image);

  return (
    <>
      {lcpCover ? <ProjectLcpPreloadLink src={lcpCover} /> : null}
      <div className="flex min-h-[50vh] w-full flex-col bg-page">
        <ProjectsGrid projects={projects} locale={locale} />
        <div className="order-first flex flex-col">
          <div className="mx-auto w-full max-w-7xl px-4 pt-[72px] sm:px-6 md:px-10 lg:px-12">
            <SiteBreadcrumbs
              locale={locale}
              items={twoLevelTrail(locale, "work")}
              className="mb-2"
            />
          </div>
          <ProjectsToolbarDeferred
            locale={locale}
            resultCount={projects.length}
          />
        </div>
      </div>
    </>
  );
}
