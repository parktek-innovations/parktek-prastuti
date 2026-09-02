import { SITE } from "@/lib/website-content";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url
  };
}
