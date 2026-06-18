import Image from "next/image";
import { ProjectOverviewTechnology } from "./types";

const VISIBLE_COUNT = 3;

type ProjectTechStackAvatarsProps = {
  technologies: ProjectOverviewTechnology[];
};

export default function ProjectTechStackAvatars({
  technologies,
}: ProjectTechStackAvatarsProps) {
  if (technologies.length === 0) return null;

  const visible = technologies.slice(0, VISIBLE_COUNT);
  const overflow = technologies.length - VISIBLE_COUNT;
  const overflowLabel = String(overflow);

  return (
    <div
      className="flex shrink-0 -space-x-2.5"
      dir="ltr"
      aria-label="Tech stack"
    >
      {visible.map((tech, index) => (
        <div
          key={`${tech.name}-${index}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white dark:border-white/10 dark:bg-neutral-900"
          title={tech.name}
        >
          <Image
            src={tech.imageUrl}
            alt=""
            aria-hidden
            width={20}
            height={20}
            sizes="20px"
            className="tech-stack-icon h-5 w-5 object-contain"
          />
        </div>
      ))}
      {overflow > 0 ? (
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-[11px] font-bold text-black/70 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-400"
          title={`${overflow} more technologies`}
        >
          +{overflowLabel}
        </div>
      ) : null}
    </div>
  );
}
