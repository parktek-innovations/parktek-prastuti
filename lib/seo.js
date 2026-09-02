import { CONTACT, METRICS, SITE } from "@/lib/website-content";

function normalizedPath(path = "/") {
  if (/^https?:\/\//.test(path)) return path;

  const clean = `/${path}`.replace(/\/{2,}/g, "/");
  return clean === "/" ? clean : `${clean.replace(/\/$/, "")}/`;
}

function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

function absoluteRouteUrl(path = "/") {
  return absoluteUrl(normalizedPath(path));
}

export function makeMetadata({
  title = SITE.name,
  description = SITE.description,
  path = "/",
  image = SITE.socialImage,
  imageAlt,
  noIndex = false
}) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const canonical = absoluteRouteUrl(path);
  const socialImage = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE.url),
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      title: fullTitle,
      description,
      url: canonical,
      images: [
        {
          url: socialImage,
          alt: imageAlt || `${SITE.name} connected parking access and operations`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage]
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {})
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "SK-70 Sector 112",
  addressLocality: "Noida",
  addressRegion: "Uttar Pradesh",
  postalCode: "201301",
  addressCountry: "IN"
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: absoluteUrl("/brand/parktek-logo-black.svg"),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: postalAddress
  };
}

export function localBusinessJsonLd() {
  const ncrVerified = METRICS.some(
    (metric) => metric.label === "operations across NCR" && metric.verified
  );

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#local-business`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    image: absoluteUrl(SITE.socialImage),
    description: SITE.description,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: postalAddress,
    ...(ncrVerified
      ? {
          areaServed: {
            "@type": "AdministrativeArea",
            name: "National Capital Region, India"
          }
        }
      : {}),
    parentOrganization: { "@id": `${SITE.url}/#organization` }
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteRouteUrl(item.href || item.path || "/")
    }))
  };
}
