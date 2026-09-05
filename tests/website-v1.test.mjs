import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);
const source = new URL("../", import.meta.url);

const requiredRoutes = [
  "index.html",
  "residential-access-control/index.html",
  "commercial-parking-management/index.html",
  "fastag/index.html",
  "e-challan/index.html",
  "case-studies/index.html",
  "case-studies/residential-access-deployment/index.html",
  "about/index.html",
  "book-site-assessment/index.html",
  "contact/index.html",
  "security/index.html",
  "privacy-policy/index.html",
  "terms-of-service/index.html"
];

async function outputFile(path) {
  return readFile(new URL(path, output), "utf8");
}

async function sourceFile(path) {
  return readFile(new URL(path, source), "utf8");
}

test("static export contains every Website V1 route", async () => {
  for (const route of requiredRoutes) {
    const html = await outputFile(route);
    assert.match(html, /<html lang="en">/);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route} must have one h1`);
  }
});

test("homepage carries the approved positioning and requested availability labels", async () => {
  const html = await outputFile("index.html");

  assert.match(html, /Every gate\. Every vehicle\. Every parking/);
  assert.match(html, /transaction<span class="[^"]+">—connected\.<\/span>/);
  assert.match(html, /Book a Site Assessment/);
  assert.match(html, /Explore Commercial Parking/);
  assert.match(html, /Commercial POS/);
  assert.match(html, /RFID access live/);
  assert.match(html, /ANPR live/);
  assert.match(html, /Commercial workflows live/);
  assert.doesNotMatch(html, /99\.9% uptime|10M\+ vehicles|1,000\+ locations/);
  assert.doesNotMatch(html, /Provisional traction metrics|ParkTek capability availability|footprint-title/);
  assert.match(html, /Product proof/);
  const productProof = html.match(/<section[^>]*id="product-proof"[\s\S]*?<\/section>/)?.[0] || "";
  assert.equal((productProof.match(/<article/g) || []).length, 6);
  assert.doesNotMatch(productProof, /Transaction report|Future approved-proof slot|to be added/);
  assert.doesNotMatch(productProof, /Concept UI|In development/);
  let previousTitleIndex = -1;
  for (const title of [
    "Barrier &amp; controller hardware",
    "Residential dashboard",
    "Site installation",
    "Commercial operations dashboard",
    "Vehicle entry screen",
    "POS interface"
  ]) {
    const titleIndex = productProof.indexOf(title);
    assert.ok(titleIndex > previousTitleIndex, `${title} must render in the requested Product Proof order`);
    previousTitleIndex = titleIndex;
  }
  for (const image of [
    "barrier-controller-hardware.png",
    "residential-dashboard.png",
    "site-installation.png",
    "commercial-operations-dashboard.png",
    "vehicle-entry-screen.png",
    "pos-interface.png"
  ]) {
    assert.match(productProof, new RegExp(`/figma/product-proof/${image}`));
  }
});

test("homepage credibility metrics render in the requested location and responsive layout", async () => {
  const [html, homepage, content, styles] = await Promise.all([
    outputFile("index.html"),
    sourceFile("components/website/home-page.jsx"),
    sourceFile("lib/website-content.js"),
    sourceFile("components/website/home-page.module.css"),
  ]);

  for (const copy of [
    "ParkTek at a glance",
    "Trusted by growing communities.",
    "Real operations. Real results. Built for modern residential living.",
    "50,000+",
    "Vehicle movements",
    "50+",
    "Residential apartment communities",
    "25,000+",
    "Trusted users",
  ]) {
    assert.match(html, new RegExp(copy.replace(/[+.]/g, "\\$&")));
  }

  const solutionsIndex = html.indexOf("From society gates to managed commercial parking.");
  const credibilityIndex = html.indexOf("ParkTek at a glance");
  const workflowIndex = html.indexOf("How ParkTek works");
  assert.ok(solutionsIndex < credibilityIndex && credibilityIndex < workflowIndex);
  assert.match(content, /export const HOMEPAGE_CREDIBILITY_METRICS = \[[\s\S]*?value: "50,000\+"[\s\S]*?value: "50\+"[\s\S]*?value: "25,000\+"/);
  assert.match(homepage, /<section aria-labelledby="credibility-title"[\s\S]*?<ul className=\{styles\.credibilityGrid\}/);
  assert.equal((homepage.match(/aria-hidden="true" className=\{styles\.credibilityIconArea\}/g) || []).length, 1);
  assert.match(styles, /\.credibilityGrid\s*\{[^}]*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/s);
  assert.match(styles, /@media \(max-width: 620px\)[\s\S]*\.credibilityGrid,[\s\S]*grid-template-columns:\s*1fr/);
  assert.doesNotMatch(html, />Communities<|99\.9%|Communities served|Cities covered/);
});

test("case studies stay unpromoted while implementation remains", async () => {
  const homepage = await outputFile("index.html");
  const caseStudies = await outputFile("case-studies/index.html");
  const caseStudyDetail = await outputFile("case-studies/residential-access-deployment/index.html");
  const sitemap = await outputFile("sitemap.xml");
  const homepageSource = await sourceFile("components/website/home-page.jsx");
  const headerSource = await sourceFile("components/website/site-header.jsx");
  const renderedHeader = homepage.match(/<header[\s\S]*?<\/header>/)?.[0] || "";

  assert.doesNotMatch(homepage, /Deployment stories/i);
  assert.doesNotMatch(renderedHeader, /Case Studies/);
  assert.match(caseStudies, /Residential access in operating environments/);
  assert.match(caseStudies, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(caseStudyDetail, /<meta name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(sitemap, /\/case-studies\//);
  assert.match(homepageSource, /const SHOW_DEPLOYMENT_STORIES = false/);
  assert.match(headerSource, /const SHOW_CASE_STUDIES_NAV = false/);
  assert.match(headerSource, /SHOW_CASE_STUDIES_NAV \|\| item\.href !== "\/case-studies\/"/);
  assert.equal((headerSource.match(/primaryLinks\.map/g) || []).length, 2);
});

test("header navigation uses one nested Solutions hierarchy on desktop and mobile", async () => {
  const content = await sourceFile("lib/website-content.js");
  const header = await sourceFile("components/website/site-header.jsx");

  assert.doesNotMatch(content, /label: "Industries"/);
  assert.match(content, /label: "Residential",[\s\S]*?label: "ANPR and RFID",[\s\S]*?href: "\/residential-access-control\/#anpr-rfid"/);
  assert.match(content, /label: "Residential",[\s\S]*?label: "Others",[\s\S]*?href: "\/book-site-assessment\/"/);
  assert.match(content, /label: "Commercial",[\s\S]*?label: "Malls and retail",[\s\S]*?href: "\/commercial-parking-management\/#malls-and-retail"/);
  assert.match(content, /label: "Corporate and IT parks",[\s\S]*?href: "\/commercial-parking-management\/#corporate-and-it-parks"/);
  assert.match(content, /label: "Hospitals and hotels",[\s\S]*?href: "\/commercial-parking-management\/#hospitals-and-hotels"/);
  assert.match(content, /label: "Parking operators",[\s\S]*?href: "\/commercial-parking-management\/#parking-operators"/);
  assert.match(content, /label: "Commercial",[\s\S]*?label: "Others",[\s\S]*?href: "\/book-site-assessment\/"/);
  assert.doesNotMatch(header, /industryLinks|label="Industries"/);
  assert.match(header, /function DesktopSolutionsMenu/);
  assert.match(header, /onMouseEnter=\{\(\) => setActiveGroup\(item\.label\)\}/);
  assert.match(header, /onFocusCapture=\{\(\) => setActiveGroup\(item\.label\)\}/);
  assert.match(header, /event\.key !== "Escape"/);
  assert.match(header, /document\.addEventListener\("pointerdown", handlePointerDown\)/);
  assert.match(header, /function MobileNestedItem/);
  assert.match(header, /aria-expanded=\{expanded\}/);
});

test("commercial navigation fragments match rendered industry card ids", async () => {
  const content = await sourceFile("lib/website-content.js");
  const commercialSource = await sourceFile("app/commercial-parking-management/page.js");
  const commercial = await outputFile("commercial-parking-management/index.html");
  const fragments = [...new Set(
    [...content.matchAll(/href: "\/commercial-parking-management\/#([^"]+)"/g)]
      .map((match) => match[1])
  )];

  assert.deepEqual(fragments, [
    "malls-and-retail",
    "corporate-and-it-parks",
    "hospitals-and-hotels",
    "parking-operators",
  ]);
  for (const fragment of fragments) {
    assert.match(commercial, new RegExp(`id="${fragment}"`));
  }
  assert.doesNotMatch(commercialSource, /INDUSTRIES\.filter/);
});

test("commercial capabilities use consistent Live availability", async () => {
  const homepage = await outputFile("index.html");
  const commercial = await outputFile("commercial-parking-management/index.html");
  const capabilityHeadings = [
    "Tariff configuration",
    "Shift management",
    "Payment records",
    "Reconciliation",
    "AMC management",
  ];

  for (const heading of capabilityHeadings) {
    const headingIndex = commercial.indexOf(`<h3>${heading}</h3>`);
    assert.ok(headingIndex >= 0, `${heading} card missing`);
    const articleStart = commercial.lastIndexOf("<article", headingIndex);
    const articleEnd = commercial.indexOf("</article>", headingIndex);
    const card = commercial.slice(articleStart, articleEnd + "</article>".length);
    assert.match(card, />Live<\/span>/, `${heading} must be Live`);
    assert.doesNotMatch(card, /In development/i, `${heading} must not contradict Live status`);
  }

  for (const capability of [
    "Configurable tariffs",
    "Operator shifts",
    "Payment records",
    "Revenue reconciliation",
  ]) {
    assert.match(homepage, new RegExp(`>${capability}<`));
  }
  assert.doesNotMatch(homepage, /(?:Configurable tariffs|Operator shifts|Payment records|Revenue reconciliation)[^<]*In development/i);
  assert.match(homepage, /commercial parking and Parking POS are live, including tariffs, operator shifts, payment records, reconciliation and AMC workflows/i);
  assert.match(commercial, /does not hold customer funds/i);
});

test("footer quick links use stable unique React keys", async () => {
  const footer = await sourceFile("components/website/site-footer.jsx");

  assert.equal((footer.match(/href: "\/contact\/"/g) || []).length, 2);
  assert.match(footer, /QUICK_LINKS\.map\(\(item\) => \([\s\S]*?key=\{`\$\{item\.label\}-\$\{item\.href\}`\}/);
  const quickLinksRender = footer.match(/QUICK_LINKS\.map\(\(item\) => \([\s\S]*?\)\)\}/)?.[0] || "";
  assert.doesNotMatch(quickLinksRender, /key=\{item\.href\}/);
});

test("FASTag and E-Challan enquiry sections and dead hero anchors stay hidden", async () => {
  const fastag = await outputFile("fastag/index.html");
  const challan = await outputFile("e-challan/index.html");
  const fastagSource = await sourceFile("app/fastag/page.js");
  const challanSource = await sourceFile("app/e-challan/page.js");
  const marketingStyles = await sourceFile("app/marketing-pages.module.css");

  assert.match(fastag, /Recharge completion is confirmed by the authorized issuer or payment channel/i);
  assert.match(challan, /The issuing authority remains the source for challan records and status/i);
  assert.doesNotMatch(fastag, /(?:id|href)="\#?fastag-enquiry"|Vehicle lookup starting point/);
  assert.doesNotMatch(challan, /(?:id|href)="\#?challan-enquiry"|Safe action area/);
  assert.match(fastag, /href="\/contact\/"[^>]*>Contact ParkTek<\/a>/);
  assert.match(challan, /href="\/contact\/"[^>]*>Contact ParkTek<\/a>/);
  assert.match(fastagSource, /const SHOW_FASTAG_ENQUIRY = false/);
  assert.match(fastagSource, /id="fastag-enquiry"[\s\S]*?action="\/contact\/"/);
  assert.match(challanSource, /const SHOW_CHALLAN_ENQUIRY = false/);
  assert.match(challanSource, /id="challan-enquiry"[\s\S]*?action="\/contact\/"/);
  assert.match(marketingStyles, /@media \(max-width: 620px\)[\s\S]*\.flowFive\s*\{[\s\S]*grid-template-columns:\s*1fr;/);
  assert.match(marketingStyles, /@media \(max-width: 620px\)[\s\S]*\.flowFive > \.flowItem:nth-child\(4\),[\s\S]*grid-column:\s*auto;/);
});

test("all shared five-step deployment flows use the intentional layout", async () => {
  const [residential, assessment, homepage, marketingStyles, homepageStyles] = await Promise.all([
    sourceFile("app/residential-access-control/page.js"),
    sourceFile("app/book-site-assessment/page.js"),
    sourceFile("components/website/home-page.jsx"),
    sourceFile("app/marketing-pages.module.css"),
    sourceFile("components/website/home-page.module.css"),
  ]);

  assert.match(residential, /\[styles\.flow, styles\.flowFive\][\s\S]*DEPLOYMENT_STEPS\.map/);
  assert.match(assessment, /\[styles\.flow, styles\.flowFive\][\s\S]*DEPLOYMENT_STEPS\.map/);
  assert.match(homepage, /className=\{styles\.deploymentGrid\}[\s\S]*DEPLOYMENT_STEPS\.map/);
  assert.match(marketingStyles, /\.flowFive\s*\{[^}]*grid-template-columns:\s*repeat\(6,/s);
  assert.match(homepageStyles, /\.deploymentGrid\s*\{[^}]*grid-template-columns:\s*repeat\(6,/s);
  assert.match(homepageStyles, /\.deploymentItem:nth-child\(4\),[\s\S]*\.deploymentItem:nth-child\(5\)\s*\{[^}]*grid-column:\s*span 3;/);
});

test("public marketing output excludes stale product-stage and builder wording", async () => {
  const stalePublicPhrases = [
    /ANPR remains in pilot/i,
    /ANPR is being piloted/i,
    /ANPR pilot/i,
    /guarded ANPR in pilot/i,
    /Commercial Parking & POS pilot/i,
    /commercial operations are entering a phased launch/i,
    /Commercial availability is launching/i,
    /Commercial availability is staged/i,
    /No feature below is represented as live/i,
    /launching capabilities/i,
    /roadmap scope, not a live public product claim/i,
    /being developed in phases/i,
    /sold honestly by availability/i,
    /before it is promised/i,
    /before promising the integration/i,
    /pending publication approval/i,
    /\bto be added\b/i,
    /\bto be verified\b/i,
    /Story in preparation/i,
    /case-study template/i,
    /intentionally a template/i,
    /founder verification/i,
    /approved-proof slot/i,
    /Concept ParkTek/i,
    /Concept view/i,
  ];

  for (const route of requiredRoutes) {
    const html = await outputFile(route);
    for (const phrase of stalePublicPhrases) {
      assert.doesNotMatch(html, phrase, `${route} contains stale public wording: ${phrase}`);
    }
  }

  const marketingContent = await Promise.all([
    "lib/website-content.js",
    "components/website/home-page.jsx",
    "app/residential-access-control/page.js",
    "app/commercial-parking-management/page.js",
    "app/about/page.js",
    "app/case-studies/page.js",
    "app/case-studies/residential-access-deployment/page.js",
    "components/website/case-study-card.jsx",
  ].map(sourceFile));

  for (const content of marketingContent) {
    for (const phrase of stalePublicPhrases) {
      assert.doesNotMatch(content, phrase, `marketing source contains stale public wording: ${phrase}`);
    }
  }
});

test("privacy policy export contains the complete approved policy", async () => {
  const html = await outputFile("privacy-policy/index.html");
  const sectionTitles = [
    "Who We Are and What This Policy Covers",
    "ParkTek’s Role in Different Deployments",
    "Personal Data We Collect",
    "How We Collect Personal Data",
    "Why We Process Personal Data",
    "Vehicle Access, RFID, ANPR and Rule-Based Decisions",
    "Consent, Device Permissions and Your Choices",
    "FASTag, E-Challan and Payment Information",
    "Cookies, Website Logs and Analytics",
    "How We Share Personal Data",
    "Data Security and Personal Data Breaches",
    "Data Retention, Deletion and Backups",
    "Your Privacy Rights and Requests",
    "Children’s Personal Data",
    "International and Cross-Border Processing",
    "Third-Party Services and Links",
    "Changes to This Policy",
    "Privacy and Grievance Contact",
    "How to Delete Your ParkTek Account",
    "Cancellation and Refunds",
    "Charges and Fees",
  ];

  assert.doesNotMatch(html, /Effective(?: date)?\s*(?::|<)/i);
  assert.match(html, /PARKTEK INNOVATION PRIVATE LIMITED/);
  assert.match(html, /support@parktek\.in/);
  sectionTitles.forEach((title, index) => {
    assert.ok(html.includes(`${index + 1}. ${title}`), `privacy section ${index + 1} missing`);
  });
  assert.match(html, /<table[^>]*>.*Category.*Examples.*Main purposes.*Transaction-related \(if enabled\)/s);
  assert.match(html, /STEP 1.*Open your profile.*STEP 4.*Account access is deactivated/s);
  assert.match(html, /ParkTek Convenience Fee.*₹0.*ParkTek Platform Fee.*₹0/s);
  assert.match(html, /Electricity Bill Payment.*FASTag Recharge.*Credit Card Bill Payment.*Other BBPS Services/s);
  assert.match(html, /Card and Other Payment Charges.*Google Pay, PhonePe or BHIM/s);
  assert.match(html, /approximately 1%–3%/);
  assert.match(html, /UPI payments through supported options.*are free and carry ₹0 ParkTek convenience fee and ₹0 ParkTek platform fee/s);
  assert.match(html, /This Privacy Policy should be read together with any feature-specific notice/);
  assert.match(html, /uses Google Analytics for website usage measurement/);
  assert.match(html, /page pathname and a sanitized page location without query-string values, together with the page title/);
  assert.match(html, /© 2026 PARKTEK INNOVATION PRIVATE LIMITED/);
  assert.doesNotMatch(html, /Screenshot update in progress/i);
  assert.doesNotMatch(html, /children under 13 years of age/i);
  assert.doesNotMatch(html, /does not collect or store any payment or financial information/i);
  assert.doesNotMatch(html, /respects your privacy and is committed to protecting your personal data/i);
});

test("legal exports omit review-only effective-date and jurisdiction placeholders", async () => {
  const [terms, privacySource, termsSource, securitySource] = await Promise.all([
    outputFile("terms-of-service/index.html"),
    sourceFile("app/privacy-policy/page.js"),
    sourceFile("app/terms-of-service/page.js"),
    sourceFile("app/security/page.js"),
  ]);

  for (const source of [privacySource, termsSource, securitySource]) {
    assert.doesNotMatch(source, /className=\{styles\.policyEffective\}/);
    assert.doesNotMatch(source, /effective date|last-updated date|as of the effective date/i);
  }
  assert.doesNotMatch(terms, /To be approved|court-jurisdiction wording/i);
  assert.match(terms, /These Terms are governed by the laws of India/);
  assert.doesNotMatch(privacySource, /<ul className=\{styles\.policyFootnote\}>/);
  assert.match(privacySource, /<p className=\{styles\.policyFootnote\}>\* ParkTek does not levy/);
});

test("analytics page views never include query-string context", async () => {
  const analytics = await sourceFile("app/google-analytics.js");

  assert.match(analytics, /page_path:\s*pathname/);
  assert.match(analytics, /page_location:\s*`\$\{window\.location\.origin\}\$\{pathname\}`/);
  assert.doesNotMatch(analytics, /window\.location\.(?:href|search)|URLSearchParams|useSearchParams/);
});

test("responsive marketing images keep PNG fallbacks and smaller WebP candidates", async () => {
  const html = await outputFile("index.html");
  const groups = {
    "product-proof": { count: 6, widths: [480, 800, 1200] },
    commercial: { count: 5, widths: [320, 640, 960] },
    "partner-societies": { count: 14, widths: [256, 384, 512] },
  };

  assert.match(html, /<picture[^>]*>[\s\S]*?<source[^>]+type="image\/webp"/);
  for (const [group, config] of Object.entries(groups)) {
    const directory = new URL(`../public/figma/${group}/`, import.meta.url);
    const originals = (await readdir(directory)).filter((name) => name.endsWith(".png"));
    assert.equal(originals.length, config.count, `${group} original count changed`);
    for (const original of originals) {
      const originalStats = await stat(new URL(original, directory));
      assert.match(html, new RegExp(`/figma/${group}/${original}`));
      for (const width of config.widths) {
        const derivative = original.replace(/\.png$/, `-${width}.webp`);
        const derivativeStats = await stat(new URL(derivative, directory));
        assert.ok(derivativeStats.size < originalStats.size, `${derivative} must be smaller than its PNG`);
        assert.match(html, new RegExp(`/figma/${group}/${derivative}`));
      }
    }
  }
});

test("partner marquee keeps moving without a pause control and becomes static for touch and reduced motion", async () => {
  const [homepage, styles] = await Promise.all([
    sourceFile("components/website/home-page.jsx"),
    sourceFile("components/website/home-page.module.css"),
  ]);

  assert.doesNotMatch(homepage, /PartnerMarquee|Pause partner logo movement|Play partner logo movement|aria-pressed/);
  assert.doesNotMatch(styles, /partnerMarqueeControl|data-paused/);
  assert.match(styles, /\.partnerLogoTrack\s*\{[^}]*animation:\s*partner-logo-scroll 36s linear infinite/s);
  assert.match(styles, /@media \(hover: none\), \(pointer: coarse\)[\s\S]*\.partnerLogoTrack[\s\S]*animation:\s*none/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.partnerLogoTrack[\s\S]*animation:\s*none/);
});

test("all website headings use locally bundled Inter", async () => {
  const [layout, ...styles] = await Promise.all([
    sourceFile("app/layout.js"),
    sourceFile("app/globals.css"),
    sourceFile("app/marketing-pages.module.css"),
    sourceFile("components/website/case-study-card.module.css"),
    sourceFile("components/website/home-page.module.css"),
    sourceFile("components/website/website.module.css"),
  ]);
  const [globalStyles] = styles;
  const websiteStyles = styles.join("\n");

  for (const weight of [400, 500, 600, 700]) {
    assert.match(layout, new RegExp(`import "@fontsource/inter/latin-${weight}\\.css"`));
  }
  assert.match(globalStyles, /h1,[\s\S]*h6,[\s\S]*\[role="heading"\]\s*\{[^}]*font-family:\s*Inter, sans-serif;/);
  assert.doesNotMatch(
    websiteStyles,
    /(?:h[1-6]|footerHeading)[^{]*\{[^}]*font-family:\s*"(?:Clash Display|Montserrat)"/s
  );

  const cssOutput = new URL("../out/_next/static/css/", import.meta.url);
  const compiledStyles = (await Promise.all(
    (await readdir(cssOutput))
      .filter((name) => name.endsWith(".css"))
      .map((name) => readFile(new URL(name, cssOutput), "utf8"))
  )).join("\n");
  const fontAssets = await readdir(new URL("../out/_next/static/media/", import.meta.url));

  assert.match(compiledStyles, /@font-face\{font-family:Inter/);
  for (const weight of [400, 500, 600, 700]) {
    assert.ok(fontAssets.some((name) => new RegExp(`inter-latin-${weight}-normal\\..+\\.woff2`).test(name)));
  }
});

test("responsive CSS keeps shared cards balanced across launch breakpoints", async () => {
  const [globalStyles, homepageStyles, marketingStyles, websiteStyles] = await Promise.all([
    sourceFile("app/globals.css"),
    sourceFile("components/website/home-page.module.css"),
    sourceFile("app/marketing-pages.module.css"),
    sourceFile("components/website/website.module.css"),
  ]);

  assert.match(globalStyles, /body\s*\{[^}]*min-width:\s*320px;[^}]*overflow-x:\s*clip;/s);
  for (const breakpoint of [1180, 960, 820, 620]) {
    assert.match(homepageStyles, new RegExp(`@media \\(max-width: ${breakpoint}px\\)`));
  }
  assert.match(marketingStyles, /@media \(min-width: 700px\)[\s\S]*\.grid3\s*\{[^}]*repeat\(2,/);
  assert.match(marketingStyles, /@media \(min-width: 1040px\)[\s\S]*\.grid3\s*\{[^}]*repeat\(3,/);
  assert.match(websiteStyles, /@media \(max-width: 639px\)/);
});

test("production form configuration is explicit and missing upstream fails safely", async () => {
  const [environment, adapter] = await Promise.all([
    sourceFile(".env.example"),
    sourceFile("netlify/functions/contact-inquiry.mjs"),
  ]);

  assert.match(environment, /PRODUCTION REQUIRED:[\s\S]*CONTACT_INQUIRY_API_URL=/);
  assert.match(environment, /submissions then fail safely with HTTP 503/);
  assert.match(environment, /Production must use the exact public origin[\s\S]*PUBLIC_SITE_ORIGIN=http:\/\/localhost:8888/);
  assert.match(adapter, /if \(!endpoint\)\s*\{\s*return jsonResponse\(503,/);
});

test("production export excludes the removed Three.js trial", async () => {
  const [packageJson, readme, websiteDoc] = await Promise.all([
    sourceFile("package.json"),
    sourceFile("README.md"),
    sourceFile("docs/website-v1.md"),
  ]);

  await assert.rejects(outputFile("scroll-world-trial/index.html"), { code: "ENOENT" });
  assert.doesNotMatch(packageJson, /"three"/);
  assert.doesNotMatch(readme, /scroll-world-trial|Three\.js/i);
  assert.doesNotMatch(websiteDoc, /scroll-world-trial|Three\.js/i);
});

test("privacy policy uses the wide native webpage treatment", async () => {
  const marketing = await sourceFile("app/marketing-pages.module.css");

  assert.match(marketing, /\.policy\s*\{[^}]*max-width:\s*1200px;[^}]*padding:\s*0;[^}]*border:\s*0;[^}]*background:\s*transparent;/s);
  assert.match(marketing, /\.policy h2\s*\{[^}]*font-size:\s*clamp\(1\.5rem, 2\.1vw, 1\.95rem\)/s);
  assert.match(marketing, /\.policy p\s*\{[^}]*max-width:\s*80ch;[^}]*font-size:\s*1\.0625rem;[^}]*line-height:\s*1\.72;/s);
  assert.match(marketing, /\.policyFacts\s*\{[^}]*grid-template-columns:\s*1fr;/s);
  assert.match(marketing, /\.policyTableWrap\s*\{[^}]*overflow-x:\s*auto;/s);
  assert.match(marketing, /\.policyTable\s*\{[^}]*min-width:\s*900px;/s);
});

test("footer privacy destination remains stable", async () => {
  const html = await outputFile("index.html");
  assert.match(html, /href="\/privacy-policy\/"[^>]*>Privacy<\/a>/);
});

test("homepage animated worlds use the archived gate and ecosystem assets", async () => {
  const homepage = await sourceFile("components/website/home-page.jsx");
  const styles = await sourceFile("components/website/home-page.module.css");

  assert.match(homepage, /function WorldImage/);
  assert.match(homepage, /name="parktek-gate-closed"/);
  assert.match(homepage, /name="parktek-gate-open"/);
  assert.match(homepage, /name="parktek-ecosystem"/);
  assert.match(homepage, /aria-label="Animated ParkTek gate access scene"/);
  assert.match(homepage, /role="img"/);
  assert.match(homepage, /ariaHidden/);
  assert.match(homepage, /Illustrative connected-site view/);
  assert.match(styles, /\.worldImageOpen\s*\{[\s\S]*animation:\s*scene-switch 9s ease-in-out infinite/);
  assert.match(styles, /@keyframes scene-switch/);
  assert.match(styles, /@keyframes scan/);
  assert.match(styles, /@media \(max-width: 820px\)[\s\S]*\.worldFrame > picture\s*\{[^}]*aspect-ratio:\s*16 \/ 9;/);
  assert.match(styles, /@media \(max-width: 820px\)[\s\S]*\.worldImage\s*\{[^}]*object-fit:\s*contain;[^}]*object-position:\s*center;/);
  assert.match(styles, /@media \(max-width: 620px\)[\s\S]*\.worldFrame\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\);/);
  assert.doesNotMatch(styles, /object-position:\s*62% center/);
  assert.match(
    styles,
    /\.flowVisual img\s*\{[^}]*display:\s*block;[^}]*width:\s*100%;[^}]*height:\s*auto;[^}]*aspect-ratio:\s*1672 \/ 941;[^}]*object-fit:\s*contain;/
  );
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*\.worldImageOpen,[\s\S]*\.scanLine[\s\S]*display:\s*none;/);
});

test("live product groups use the existing Live treatment", async () => {
  const content = await sourceFile("lib/website-content.js");
  const homepage = await sourceFile("components/website/home-page.module.css");

  assert.doesNotMatch(content, /status:\s*(?:"Launching"|STATUS_LABELS\.(?:pilot|launching))/);
  assert.match(homepage, /\.commercialStatusLive\s*\{[^}]*var\(--pk-color-status-online-border\)[^}]*var\(--pk-color-status-online-background\)[^}]*var\(--pk-color-status-online-foreground\)/s);
});

test("primary actions use the current Samhita semantic bridge", async () => {
  const globals = await sourceFile("app/globals.css");
  const homepage = await sourceFile("components/website/home-page.module.css");
  const shared = await sourceFile("components/website/website.module.css");

  assert.match(globals, /--prastuti-primary:\s*#1d4ed8/i);
  assert.match(globals, /--prastuti-primary-hover:\s*#1e40af/i);
  assert.match(homepage, /\.primaryButton\s*\{[^}]+background:\s*var\(--prastuti-primary\)/s);
  assert.match(shared, /--primary:\s*var\(--prastuti-primary\)/);
  assert.doesNotMatch(homepage, /\.primaryButton\s*\{[^}]+pk-color-brand-primary/s);
});

test("shared marketing routes use the light Samhita page foundation", async () => {
  const marketing = await sourceFile("app/marketing-pages.module.css");

  assert.match(marketing, /\.page\s*\{[^}]+background:\s*var\(--prastuti-background\)/s);
  assert.match(marketing, /\.sectionMuted\s*\{[^}]+background:\s*var\(--prastuti-muted-background\)/s);
  assert.match(marketing, /\.secondaryButton\s*\{[^}]+border:\s*1px solid var\(--prastuti-border\)[^}]+background:\s*var\(--prastuti-background\)[^}]+color:\s*var\(--prastuti-text-primary\)/s);
  assert.doesNotMatch(marketing, /var\(--navy-|radial-gradient|rgba?\(|#[0-9a-f]{3,8}\b/i);
});

test("homepage footer exposes only verified app and social destinations with accessible names", async () => {
  const html = await outputFile("index.html");

  assert.match(
    html,
    /aria-label="Download ParkTek on Google Play"[^>]+href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.parktek\.app&amp;pcampaignid=web_share"[^>]+rel="noopener noreferrer"[^>]+target="_blank"/
  );
  assert.match(
    html,
    /aria-label="Download ParkTek on the App Store"[^>]+href="https:\/\/apps\.apple\.com\/ca\/app\/parktek\/id6760598237"[^>]+rel="noopener noreferrer"[^>]+target="_blank"/
  );
  assert.match(
    html,
    /aria-label="ParkTek Innovation on LinkedIn"[^>]+href="https:\/\/in\.linkedin\.com\/company\/https-parktek\.in"[^>]+rel="noopener noreferrer"[^>]+target="_blank"/
  );
  assert.match(html, /alt="Get it on Google Play"[^>]+src="\/figma\/footer\/google-play-badge\.png"/);
  assert.match(html, /alt="Download on the App Store"[^>]+src="\/figma\/footer\/app-store-badge\.svg"/);
  assert.doesNotMatch(html, /social-android\.svg|social-ios\.svg|footerAppIcon|ParkTek on X|ParkTek on YouTube|ParkTek on Instagram|footerSocialIcon/);
});

test("lead pages render the shared accessible form contract", async () => {
  const leadRoutes = [
    "residential-access-control/index.html",
    "commercial-parking-management/index.html",
    "book-site-assessment/index.html",
    "contact/index.html"
  ];

  for (const route of leadRoutes) {
    const html = await outputFile(route);
    for (const label of [
      "Full name",
      "Phone",
      "Work email",
      "Organisation / property",
      "City",
      "Primary requirement",
      "Number of gates",
      "Approximate parking capacity",
      "Existing equipment",
      "Desired timeline",
      "Message / site and workflow details"
    ]) {
      assert.match(html, new RegExp(label), `${route} missing ${label}`);
    }
    assert.match(html, /I agree that ParkTek may contact me/);
    assert.match(html, /<option[^>]*>Others<\/option>/);
  }
});

test("metadata, discovery files, and structured data are exported", async () => {
  const commercial = await outputFile("commercial-parking-management/index.html");
  const sitemap = await outputFile("sitemap.xml");
  const robots = await outputFile("robots.txt");

  assert.match(commercial, /rel="canonical" href="https:\/\/parktek\.in\/commercial-parking-management\/"/);
  assert.match(commercial, /application\/ld\+json/);
  assert.match(sitemap, /https:\/\/parktek\.in\/book-site-assessment\//);
  assert.doesNotMatch(sitemap, /residential-access-deployment/);
  assert.match(robots, /Sitemap: https:\/\/parktek\.in\/sitemap\.xml/);
});

test("central public contact details remain consistent", async () => {
  const html = await outputFile("contact/index.html");

  assert.match(html, /support@parktek\.in/);
  assert.match(html, /\+91 9899945876/);
  assert.match(html, /SK-70, Sector 112, Noida - 201301/);
  assert.doesNotMatch(html, /sales@parktek\.in/);
});

test("verified legal identity is consistent in pages and structured data", async () => {
  for (const route of ["index.html", "about/index.html", "contact/index.html"]) {
    const html = await outputFile(route);
    assert.match(html, /PARKTEK INNOVATION PRIVATE LIMITED/);
    assert.doesNotMatch(html, /ParkTek Technologies Pvt\. Ltd\./);
  }

  const home = await outputFile("index.html");
  assert.match(home, /"legalName":"PARKTEK INNOVATION PRIVATE LIMITED"/);
  assert.match(home, /"postalCode":"201301"/);
});
