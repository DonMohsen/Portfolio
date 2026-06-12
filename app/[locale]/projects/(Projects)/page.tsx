import { getProjectsListingData } from "@/lib/projects/get-projects-listing";
import { resolveListingCoverSrc } from "@/lib/projects/listing-card-image";
import ProjectsGrid from "@/components/Projects/projects-grid";
import ProjectsToolbarDeferred from "@/components/Projects/projects-toolbar-deferred";
import ProjectLcpPreloadLink from "@/components/Projects/project-lcp-preload-link";

export const revalidate = 600;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    search?: string;
    order?: string;
    type?: string;
  }>;
};

export default async function ProjectsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const search = sp.search ?? "";
  const order = sp.order ?? "desc";
  const type = sp.type ?? "";

  const projects = await getProjectsListingData(search, order, type);
  const lcpCover = resolveListingCoverSrc(projects[0]?.image);

  return (
    <>
      {lcpCover ? <ProjectLcpPreloadLink src={lcpCover} /> : null}
      <div className="flex flex-col bg-page w-full min-h-[50vh]">
        {/* Grid first in DOM so LCP images are discoverable before deferred client JS. */}
        <ProjectsGrid projects={projects} locale={locale} />

        <div className="order-first flex flex-col">
          <ProjectsToolbarDeferred
            locale={locale}
            resultCount={projects.length}
          />
        </div>
      </div>
    </>
  );
}
