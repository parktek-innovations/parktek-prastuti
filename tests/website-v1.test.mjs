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

test("homepage carries the approved positioning and truthful status labels", async () => {
  const html = await outputFile("index.html");

  assert.match(html, /Every gate\. Every vehicle\. Every parking/);
  assert.match(html, /transaction<span class="[^"]+">—connected\.<\/span>/);
  assert.match(html, /Book a Site Assessment/);
  assert.match(html, /Explore Commercial Parking/);
  assert.match(html, /Commercial POS/);
  assert.match(html, /In development/);
  assert.match(html, /RFID access live/);
  assert.match(html, /ANPR pilot/);
  assert.match(html, /Commercial workflows launching/);
  assert.doesNotMatch(html, /99\.9% uptime|10M\+ vehicles|1,000\+ locations/);
  assert.doesNotMatch(html, /Provisional traction metrics|ParkTek capability availability|footprint-title/);
  assert.match(html, /Product proof/);
  assert.match(html, /Future approved-proof slot/);
  assert.match(html, /Residential dashboard screenshot to be added/);
  assert.match(html, /Commercial POS pilot image to be added/);
  assert.doesNotMatch(html, /Approved current product and deployment evidence/);
});

test("FASTag and E-Challan routes keep transactional claims behind a support boundary", async () => {
  const fastag = await outputFile("fastag/index.html");
  const challan = await outputFile("e-challan/index.html");

  assert.match(fastag, /does not claim payment processing or recharge completion/i);
  assert.match(fastag, /action="\/contact\/"/);
  assert.match(fastag, /type="hidden" name="service" value="fastag"/);
  assert.match(fastag, /name="vehicle"/);
  assert.match(challan, /does not retrieve official records or process challan payments/i);
  assert.match(challan, /action="\/contact\/"/);
  assert.match(challan, /type="hidden" name="service" value="e-challan"/);
  assert.match(challan, /name="vehicle"/);
  assert.match(challan, /name="challan"/);
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
  ];

  assert.doesNotMatch(html, /Effective date<\/dt><dd>28 August 2026/);
  assert.match(html, /PARKTEK INNOVATION PRIVATE LIMITED/);
  assert.match(html, /support@parktek\.in/);
  sectionTitles.forEach((title, index) => {
    assert.ok(html.includes(`${index + 1}. ${title}`), `privacy section ${index + 1} missing`);
  });
  assert.match(html, /<table[^>]*>.*Category.*Examples.*Main purposes.*Transaction-related \(if enabled\)/s);
  assert.match(html, /STEP 1.*Open your profile.*STEP 4.*Account access is deactivated/s);
  assert.match(html, /This Privacy Policy should be read together with any feature-specific notice/);
  assert.match(html, /© 2026 PARKTEK INNOVATION PRIVATE LIMITED/);
  assert.doesNotMatch(html, /Screenshot update in progress/i);
  assert.doesNotMatch(html, /children under 13 years of age/i);
  assert.doesNotMatch(html, /does not collect or store any payment or financial information/i);
  assert.doesNotMatch(html, /respects your privacy and is committed to protecting your personal data/i);
});

test("privacy policy uses the wide native webpage treatment", async () => {
  const marketing = await sourceFile("app/marketing-pages.module.css");

  assert.match(marketing, /\.policy\s*\{[^}]*max-width:\s*1200px;[^}]*padding:\s*0;[^}]*border:\s*0;[^}]*background:\s*transparent;/s);
  assert.match(marketing, /\.policy p\s*\{[^}]*max-width:\s*96ch;[^}]*font-size:\s*1\.0625rem;[^}]*line-height:\s*1\.72;/s);
  assert.match(marketing, /\.policyFacts\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/s);
  assert.match(marketing, /\.policyTableWrap\s*\{[^}]*overflow-x:\s*auto;/s);
  assert.match(marketing, /\.policyTable\s*\{[^}]*min-width:\s*900px;/s);
});

test("footer privacy destination remains stable", async () => {
  const html = await outputFile("index.html");
  assert.match(html, /href="\/privacy-policy\/"[^>]*>Privacy<\/a>/);
});

test("mobile hero animation preserves its responsive scale", async () => {
  const homepage = await sourceFile("components/website/home-page.module.css");

  assert.match(homepage, /\.heroCar\s*\{[^}]*--hero-car-scale:\s*1;[^}]*scale\(var\(--hero-car-scale\)\)/s);
  assert.match(homepage, /@keyframes vehicle-approach\s*\{[^}]*scale\(var\(--hero-car-scale\)\)/s);
  assert.match(homepage, /@media \(max-width: 620px\)[\s\S]*?\.heroCar\s*\{[^}]*--hero-car-scale:\s*0\.82;/);
  assert.match(homepage, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.heroCar\s*\{[^}]*scale\(var\(--hero-car-scale\)\)/);
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
