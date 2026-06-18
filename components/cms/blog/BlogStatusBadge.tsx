import clsx from "clsx";

type BlogStatusBadgeProps = {
  status: "draft" | "published";
};

export default function BlogStatusBadge({ status }: BlogStatusBadgeProps) {
  return (
    <span
      className={clsx(
        "rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide",
        status === "published"
          ? "bg-emerald-500/20 text-emerald-300"
          : "bg-amber-500/20 text-amber-300"
      )}
    >
      {status}
    </span>
  );
}
