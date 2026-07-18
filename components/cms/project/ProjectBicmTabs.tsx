"use client";

import clsx from "clsx";
import { useState } from "react";
import EditorField from "@/components/cms/editor/EditorField";

export type BicmTab =
  | "problem"
  | "insight"
  | "change"
  | "measurement"
  | "failure";

const TABS: { id: BicmTab; label: string }[] = [
  { id: "problem", label: "Problem / Context" },
  { id: "insight", label: "Insight" },
  { id: "change", label: "Change / ADR" },
  { id: "measurement", label: "Measurement" },
  { id: "failure", label: "Failure story" },
];

type ProjectBicmTabsProps = {
  values: Record<BicmTab, string>;
  onChange: (tab: BicmTab, html: string) => void;
};

export default function ProjectBicmTabs({
  values,
  onChange,
}: ProjectBicmTabsProps) {
  const [tab, setTab] = useState<BicmTab>("problem");
  const active = TABS.find((item) => item.id === tab)!;

  return (
    <div className="w-full space-y-4 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Case study (BICM)
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Business context, insight, architecture decisions, metrics, and honest
          failures.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={clsx(
              "rounded-lg px-3 py-2 text-xs font-medium transition sm:text-sm",
              tab === item.id
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <EditorField
        key={tab}
        label={active.label}
        value={values[tab]}
        onChange={(html) => onChange(tab, html)}
        direction="ltr"
        theme="light"
      />
    </div>
  );
}
