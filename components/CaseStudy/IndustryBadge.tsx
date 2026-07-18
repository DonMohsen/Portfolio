import { ProjectIndustry } from "@prisma/client";
import { PROJECT_INDUSTRY_LABELS } from "@/lib/projects/project-industry-labels";
import { cn } from "@/lib/utils";

type IndustryBadgeProps = {
  industry: ProjectIndustry;
  locale: string;
  className?: string;
};

export default function IndustryBadge({
  industry,
  locale,
  className,
}: IndustryBadgeProps) {
  const isFa = locale === "fa";
  const labels = PROJECT_INDUSTRY_LABELS[industry];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-tech-card-border bg-page/40 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-page-muted",
        className
      )}
    >
      {isFa ? labels.fa : labels.en}
    </span>
  );
}
