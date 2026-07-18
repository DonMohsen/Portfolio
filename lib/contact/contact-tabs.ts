export type ContactTab = "schedule" | "brief" | "chat" | "direct";

export const CONTACT_TABS: Array<{
  id: ContactTab;
  label: { en: string; fa: string };
}> = [
  { id: "schedule", label: { en: "Schedule", fa: "رزرو وقت" } },
  { id: "brief", label: { en: "Project brief", fa: "brief پروژه" } },
  { id: "chat", label: { en: "Chat", fa: "چت" } },
  { id: "direct", label: { en: "Direct", fa: "مستقیم" } },
];

export function parseContactTab(value: string | undefined): ContactTab {
  if (value === "brief" || value === "chat" || value === "direct") {
    return value;
  }
  return "schedule";
}
