"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GoogleAnalytics({ measurementId }) {
  const pathname = usePathname();

  useEffect(() => {
    const sendPageView = () => {
      if (typeof window.gtag !== "function") {
        return;
      }

      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: `${window.location.origin}${pathname}`,
        page_title: document.title
      });
    };

    if (typeof window.gtag === "function") {
      sendPageView();
      return undefined;
    }

    window.addEventListener("parktek:analytics-ready", sendPageView, { once: true });
    return () => window.removeEventListener("parktek:analytics-ready", sendPageView);
  }, [pathname, measurementId]);

  return null;
}
