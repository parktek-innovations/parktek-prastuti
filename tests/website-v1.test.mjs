import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);

const requiredRoutes = [
  "index.html",
  "residential-access-control/index.html",
  "commercial-parking-management/index.html",
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
  assert.match(html, /transaction—connected/);
  assert.match(html, /Book a Site Assessment/);
  assert.match(html, /Explore Commercial Parking/);
  assert.match(html, /Commercial POS/);
  assert.match(html, /In development/);
  assert.doesNotMatch(html, /99\.9% uptime|10M\+ vehicles|1,000\+ locations/);
});

test("homepage footer exposes only verified app destinations with accessible names", async () => {
  const html = await outputFile("index.html");

  assert.match(
    html,
    /aria-label="Download ParkTek on Google Play"[^>]+href="https:\/\/play\.google\.com\/store\/apps\/details\?id=com\.parktek\.app&amp;pcampaignid=web_share"[^>]+rel="noopener noreferrer"[^>]+target="_blank"/
  );
  assert.match(
    html,
    /aria-label="Download ParkTek on the App Store"[^>]+href="https:\/\/apps\.apple\.com\/ca\/app\/parktek\/id6760598237"[^>]+rel="noopener noreferrer"[^>]+target="_blank"/
  );
  assert.doesNotMatch(html, /href="https:\/\/(?:x|linkedin|youtube)\.com"/);
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
  assert.match(html, /SK-70, Sector 112, Noida - 201305/);
  assert.doesNotMatch(html, /sales@parktek\.in/);
});
