import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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
  assert.match(content, /label: "Commercial",[\s\S]*?label: "Malls and retail",[\s\S]*?href: "\/commercial-parking-management\/#malls-and-retail"/);
  assert.match(content, /label: "Corporate and IT parks",[\s\S]*?href: "\/commercial-parking-management\/#corporate-and-it-parks"/);
  assert.match(content, /label: "Hospitals and hotels",[\s\S]*?href: "\/commercial-parking-management\/#hospitals-and-hotels"/);
  assert.match(content, /label: "Parking operators",[\s\S]*?href: "\/commercial-parking-management\/#parking-operators"/);
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
    "app/case-studies/[slug]/page.js",
    "components/website/case-study-card.jsx",
  ].map(sourceFile));

  for (const content of marketingContent) {
    for (const phrase of stalePublicPhrases) {
      assert.doesNotMatch(content, phrase, `marketing source contains stale public wording: ${phrase}`);
    }
  }
});

test("privacy policy export contains the complete 28 August 2026 policy", async () => {
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

  assert.doesNotMatch(html, /Effective date<\/dt><dd>28 August 2026/);
  assert.match(html, /Effective 28 August 2026/);
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
  assert.doesNotMatch(html, /1%\s*[–-]\s*2\.5%/);
  assert.match(html, /This Privacy Policy should be read together with any feature-specific notice/);
  assert.match(html, /uses Google Analytics for website usage measurement/);
  assert.match(html, /page path, page location and page title/);
  assert.match(html, /© 2026 PARKTEK INNOVATION PRIVATE LIMITED/);
  assert.doesNotMatch(html, /Screenshot update in progress/i);
  assert.doesNotMatch(html, /children under 13 years of age/i);
  assert.doesNotMatch(html, /does not collect or store any payment or financial information/i);
  assert.doesNotMatch(html, /respects your privacy and is committed to protecting your personal data/i);
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

test("homepage hero world preserves lifecycle, reduced-motion, and accessibility contracts", async () => {
  const component = await sourceFile("components/website/homepage-scroll-world.jsx");
  const world = await sourceFile("components/scroll-world/parktek-world.js");

  assert.match(component, /createParktekWorld\(host, \{ colors: readHomepagePalette\(\) \}\)/);
  assert.match(component, /prefers-reduced-motion: reduce/);
  assert.match(component, /IntersectionObserver/);
  assert.match(component, /visibilitychange/);
  assert.match(component, /world\.dispose\(\)/);
  assert.match(component, /role="img"/);
  assert.match(component, /scrollState\.current \+= \(scrollState\.target - scrollState\.current\) \* 0\.075/);
  assert.match(component, /progress: journeyElapsed \/ JOURNEY_DURATION_MS/);
  assert.match(world, /const colors = \{ \.\.\.DEFAULT_COLORS, \.\.\.options\.colors \}/);
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
  assert.doesNotMatch(html, /href="https:\/\/(?:x|youtube)\.com"/);
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
