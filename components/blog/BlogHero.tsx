import Image from "next/image";
import Link from "next/link";
import { BLOG_FALLBACK_IMAGE } from "@/lib/blogs/constants";

type BlogHeroProps = {
  title: string;
  image?: string;
  date: string;
  author: string;
  href: string;
  readLabel: string;
};

export default function BlogHero({
  title,
  image,
  date,
  author,
  href,
  readLabel,
}: BlogHeroProps) {
  const heroImage = image?.trim() || BLOG_FALLBACK_IMAGE;

  const HeroOverlay = ({ titleSize }: { titleSize: "mobile" | "desktop" }) => (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0.2)_20%,rgba(0,0,0,0.1)_38%,rgba(0,0,0,0.04)_52%,rgba(0,0,0,0)_68%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.16)_22%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0.03)_54%,rgba(255,255,255,0)_70%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute bottom-5 right-4 flex max-w-[82%] flex-col gap-3 text-white dark:text-page-text md:bottom-8 md:right-6 md:max-w-md md:gap-4">
        <div
          className={`mt-2 w-fit rounded-lg bg-accent-cosmic/90 px-3 py-2 text-accent-cosmic-fg transition-all ${
            titleSize === "mobile" ? "text-sm" : "text-base"
          }`}
        >
          {readLabel}
        </div>
        <h2
          className={`font-medium ${
            titleSize === "mobile" ? "text-xl" : "text-4xl"
          }`}
        >
          {title}
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/80 dark:border-tech-card-border">
            <Image
              src="/Gemini_Generated_Image_q0eg6yq0eg6yq0eg.png"
              alt={author}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-sm">
            <span className="font-medium">{author}</span>
            {date ? (
              <span className="mr-2 text-xs text-white/80 dark:text-page-subtle">
                {date}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="mt-6 w-full">
      <div className="block lg:hidden">
        <Link
          href={href}
          title={title}
          data-transition-label={title}
          className="group relative block h-[300px] w-full cursor-pointer overflow-hidden rounded-2xl"
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="scale-110 object-cover transition-transform"
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            quality={80}
          />
          <HeroOverlay titleSize="mobile" />
        </Link>
      </div>
      <div className="hidden lg:block">
        <Link
          href={href}
          title={title}
          data-transition-label={title}
          className="group relative block h-[500px] w-full cursor-pointer overflow-hidden rounded-2xl"
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="scale-105 object-cover transition-transform"
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            quality={80}
          />
          <HeroOverlay titleSize="desktop" />
        </Link>
      </div>
    </div>
  );
}
