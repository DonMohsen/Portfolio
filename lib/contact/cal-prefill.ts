import {
  BUDGET_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/contact/inquiry-schema";

export type CalPrefillInput = {
  source?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  name?: string;
  email?: string;
};

function labelForValue(
  value: string,
  options: ReadonlyArray<{ readonly value: string; readonly label: string }>
) {
  return options.find((item) => item.value === value)?.label ?? value;
}

export function buildCalPrefillNotes(
  locale: string,
  input: CalPrefillInput
): string {
  const isFa = locale === "fa";
  const projectOptions = isFa
    ? PROJECT_TYPE_OPTIONS.fa
    : PROJECT_TYPE_OPTIONS.en;
  const budgetOptions = isFa ? BUDGET_OPTIONS.fa : BUDGET_OPTIONS.en;
  const timelineOptions = isFa ? TIMELINE_OPTIONS.fa : TIMELINE_OPTIONS.en;

  const lines: string[] = [];

  if (input.source?.trim()) {
    lines.push(`Source: ${input.source.trim()}`);
  }
  if (input.projectType?.trim()) {
    lines.push(
      `${isFa ? "نوع پروژه" : "Project type"}: ${labelForValue(
        input.projectType.trim(),
        projectOptions
      )}`
    );
  }
  if (input.budget?.trim()) {
    lines.push(
      `${isFa ? "بودجه" : "Budget"}: ${labelForValue(
        input.budget.trim(),
        budgetOptions
      )}`
    );
  }
  if (input.timeline?.trim()) {
    lines.push(
      `${isFa ? "تایم‌لاین" : "Timeline"}: ${labelForValue(
        input.timeline.trim(),
        timelineOptions
      )}`
    );
  }
  if (input.message?.trim()) {
    lines.push(`${isFa ? "پیام" : "Message"}: ${input.message.trim()}`);
  }

  return lines.join("\n");
}

/** Append Cal.com embed prefill query params when supported. */
export function buildCalEmbedUrl(
  baseUrl: string,
  prefill: CalPrefillInput,
  locale: string
): string {
  if (!baseUrl.trim()) return "";

  const url = new URL(
    baseUrl.includes("embed=true")
      ? baseUrl
      : `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}embed=true`
  );

  const notes = buildCalPrefillNotes(locale, prefill);
  if (notes) {
    url.searchParams.set("notes", notes);
  }
  if (prefill.name?.trim()) {
    url.searchParams.set("name", prefill.name.trim());
  }
  if (prefill.email?.trim()) {
    url.searchParams.set("email", prefill.email.trim());
  }

  return url.toString();
}
