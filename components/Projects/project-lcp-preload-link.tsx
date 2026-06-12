import { getListingCardPreloadSrc } from "@/lib/projects/listing-card-image";

export default function ProjectLcpPreloadLink({ src }: { src: string }) {
  const href = getListingCardPreloadSrc(src);
  if (!href) return null;

  return (
    <link rel="preload" as="image" href={href} fetchPriority="high" />
  );
}
