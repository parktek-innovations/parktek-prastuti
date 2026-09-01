import { CASE_STUDIES, REQUIRED_ROUTES, SITE } from "@/lib/website-content";

const priority = {
  "/": 1,
  "/residential-access-control/": 0.9,
  "/commercial-parking-management/": 0.9,
  "/book-site-assessment/": 0.9,
  "/case-studies/": 0.7,
  "/about/": 0.6,
  "/contact/": 0.6,
  "/security/": 0.5,
  "/privacy-policy/": 0.3,
  "/terms-of-service/": 0.3
};

export default function sitemap() {
  const caseStudyRoutes = CASE_STUDIES
    .filter((study) => !study.isPlaceholder)
    .map(({ slug }) => `/case-studies/${slug}/`);
  const routes = [
    ...REQUIRED_ROUTES.filter((route) => !route.includes("[slug]") && route !== "/case-studies/"),
    ...caseStudyRoutes
  ];

  return [...new Set(routes)].map((route) => ({
    url: new URL(route, SITE.url).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: priority[route] || (route.startsWith("/case-studies/") ? 0.6 : 0.5)
  }));
}
