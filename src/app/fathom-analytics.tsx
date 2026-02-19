"use client";

import * as Fathom from "fathom-client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const FATHOM_SITE_ID = process.env.NEXT_PUBLIC_FATHOM_ID;
const INCLUDED_DOMAINS = ["eliminarfondodeunaimagen.com", "www.eliminarfondodeunaimagen.com"];

export function FathomAnalytics() {
  const pathname = usePathname();
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!FATHOM_SITE_ID || initializedRef.current) return;

    Fathom.load(FATHOM_SITE_ID, { includedDomains: INCLUDED_DOMAINS });
    initializedRef.current = true;
  }, []);

  useEffect(() => {
    if (!initializedRef.current) return;

    const query = typeof window === "undefined" ? "" : window.location.search;
    const url = `${pathname}${query}`;

    Fathom.trackPageview({ url });
  }, [pathname]);

  return null;
}
