import { headers } from "next/headers";

type ChromeGateProps = {
  children: React.ReactNode;
  /** Hide chrome on print/PDF case-study routes */
  hideOnPdf?: boolean;
};

export default async function ChromeGate({
  children,
  hideOnPdf = true,
}: ChromeGateProps) {
  if (hideOnPdf) {
    const pathname = (await headers()).get("x-pathname") ?? "";
    if (/\/work\/[^/]+\/pdf\/?$/.test(pathname)) {
      return null;
    }
  }

  return <>{children}</>;
}
