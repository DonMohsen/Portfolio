"use client";

import { usePathname } from "next/navigation";

type ChromeGateProps = {
  children: React.ReactNode;
  /** Hide chrome on print/PDF case-study routes */
  hideOnPdf?: boolean;
};

export default function ChromeGate({
  children,
  hideOnPdf = true,
}: ChromeGateProps) {
  const pathname = usePathname() ?? "";
  if (hideOnPdf && /\/work\/[^/]+\/pdf\/?$/.test(pathname)) {
    return null;
  }
  return <>{children}</>;
}
