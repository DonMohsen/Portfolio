"use client";

import dynamic from "next/dynamic";

const TinyMceEditor = dynamic(() => import("./TinyMceEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[360px] items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-white/50">
      Loading editor...
    </div>
  ),
});

type EditorFieldProps = {
  value: string;
  onChange: (value: string) => void;
  direction?: "ltr" | "rtl";
  label?: string;
  theme?: "light" | "dark";
};

export default function EditorField({
  value,
  onChange,
  direction = "ltr",
  label,
  theme = "dark",
}: EditorFieldProps) {
  const isLight = theme === "light";

  return (
    <div className="space-y-2">
      {label ? (
        <label
          className={
            isLight
              ? "text-sm font-medium text-gray-700 dark:text-gray-300"
              : "text-sm font-medium text-white/80"
          }
        >
          {label}
        </label>
      ) : null}
      <div
        className={
          isLight
            ? "overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600"
            : "overflow-hidden rounded-lg border border-white/10"
        }
      >
        <TinyMceEditor value={value} onChange={onChange} direction={direction} />
      </div>
    </div>
  );
}
