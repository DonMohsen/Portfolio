import { notFound, permanentRedirect } from "next/navigation";
import { getProjectSlugById } from "@/lib/projects/get-project-by-slug";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LegacyProjectPage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) return notFound();

  const slug = await getProjectSlugById(numericId);
  if (!slug) return notFound();

  permanentRedirect(`/fa/projects/${slug}`);
}
