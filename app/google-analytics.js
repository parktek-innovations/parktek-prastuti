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

      const queryString = window.location.search.replace(/^\?/, "");
      const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: window.location.href,
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
