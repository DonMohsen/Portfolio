import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function LegacyProjectDetailRedirect({ params }: Props) {
  const { locale, slug } = await params;
  permanentRedirect(`/${locale}/work/${slug}`);
}
