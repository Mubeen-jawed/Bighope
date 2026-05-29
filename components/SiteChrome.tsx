"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Wraps every page with the site header/footer EXCEPT the embedded Sanity
 * Studio at /studio, which needs the full viewport with no site chrome.
 * Header/Footer/WhatsApp are passed in as props so they can stay server
 * components where possible.
 */
export default function SiteChrome({
  header,
  footer,
  whatsapp,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  whatsapp: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="pt-[64px] sm:pt-[102px]">{children}</main>
      {footer}
      {whatsapp}
    </>
  );
}
