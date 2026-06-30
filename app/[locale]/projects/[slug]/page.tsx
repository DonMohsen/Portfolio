import { notFound, permanentRedirect } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { routing } from "@/i18n/routing";
import {
  getProjectBySlug,
  getProjectSlugById,
} from "@/lib/projects/get-project-by-slug";
import { getAllProjectSlugs } from "@/lib/projects/get-all-project-slugs";
import ProjectBreadcrumbs from "@/components/Projects/ProjectBreadcrumbs";
import ProjectHero from "@/components/Projects/ProjectHero";
import ProjectDetailsInteractive from "@/components/Projects/ProjectDetailsInteractive";
import {
  buildBreadcrumbJsonLd,
  buildSoftwareApplicationJsonLd,
} from "@/lib/projects/project-json-ld";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

import { buildLocaleAlternates } from "@/lib/site-alternates";
import { resolveSiteUrl } from "@/lib/metadata-base";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlugParam(slug);
  if (!project) return { title: "Project Not Found" };

  const isFa = locale === "fa";
  const title = `${project.name} | ${isFa ? "پروژه‌ها" : "Projects"}`;
  const siteUrl = resolveSiteUrl();
  const heroImage = project.images[0] ?? "/image-placeholder.webp";
  const absoluteImage = heroImage.startsWith("http")
    ? heroImage
    : `${siteUrl}${heroImage}`;
  const projectPath = `projects/${project.slug}`;
  const alternates = buildLocaleAlternates(locale, projectPath);
  const keywords = [
    ...project.seoKeywords,
    ...project.techStack.map((entry) => entry.technology.name),
  ];

  return {
    title,
    description: project.summary,
    keywords,
    alternates,
    openGraph: {
      title,
      description: project.summary,
      url: alternates.canonical,
      type: "article",
      locale: isFa ? "fa_IR" : "en_US",
      images: [
        {
          url: absoluteImage,
          width: 1920,
          height: 1080,
          alt: project.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

async function getProjectBySlugParam(slugParam: string) {
  const numericId = Number(slugParam);
  if (!Number.isNaN(numericId) && slugParam === String(numericId)) {
    const resolvedSlug = await getProjectSlugById(numericId);
    if (!resolvedSlug) return null;
    return getProjectBySlug(resolvedSlug);
  }

  return getProjectBySlug(slugParam);
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug, locale } = await params;

  const numericId = Number(slug);
  if (!Number.isNaN(numericId) && slug === String(numericId)) {
    const resolvedSlug = await getProjectSlugById(numericId);
    if (!resolvedSlug) return notFound();
    permanentRedirect(`/${locale}/projects/${resolvedSlug}`);
  }

  const project = await getProjectBySlug(slug);
  if (!project) return notFound();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, project);
  const softwareJsonLd = buildSoftwareApplicationJsonLd(locale, project);

  return (
    <div className="w-full flex flex-col items-center mt-[70px] pb-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareJsonLd),
        }}
      />

      <ProjectBreadcrumbs locale={locale} projectName={project.name} />
      <ProjectHero project={project} locale={locale} />
      <ProjectDetailsInteractive project={project} />
    </div>
  );
}
