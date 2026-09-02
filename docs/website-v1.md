# ParkTek Website V1

Last updated: 2026-07-15

## Purpose

Website V1 presents ParkTek as a connected parking platform for residential societies and a phased commercial-parking launch. It keeps public capability claims aligned with the shared ParkTek standards:

- residential vehicle access, RFID, controller operations, dashboards, logs, and support: **Live**
- guarded ANPR for eligible registered vehicles: **Pilot**
- commercial parking management and operator POS workspace: **Launching**
- tariffs, operator shifts, payment records, reconciliation, and AMC management: **In development**

ParkTek does not claim payment-gateway processing, custody of funds, unrestricted ANPR auto-open, universal hardware compatibility, or unverified customer outcomes.

## Design and interaction direction

The visual thesis is a night operations control plane: dark navy surfaces, one signal-blue action color, cyan as a secondary system signal, an isometric parking world, and dense operational grids. The homepage crossfades an illustrative barrier from closed to open and adds a restrained scan treatment. It does not use pinned multi-screen scroll scenes.

Motion is CSS-only on the production homepage and is removed when `prefers-reduced-motion: reduce` is active.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | V1 overview and primary conversion path |
| `/residential-access-control/` | Live residential access workflow, roles, access modes, and equipment scope |
| `/commercial-parking-management/` | Commercial/POS launch scope with availability labels |
| `/case-studies/` | Customer-approved case-study index |
| `/case-studies/[slug]/` | Static case-study detail template |
| `/about/` | Company and operating approach |
| `/book-site-assessment/` | Primary lead-conversion page |
| `/contact/` | Contact details and lead form |
| `/security/` | Practical security and access-control overview |
| `/privacy-policy/` | Privacy policy and account-deletion instructions |
| `/terms-of-service/` | Service terms and current financial-transaction boundary |

`/parking-pos-system/` was not an existing route, so V1 does not create or redirect it.

## Main implementation

| Area | Files |
| --- | --- |
| Global shell | `components/website/site-header.jsx`, `site-footer.jsx`, `website.module.css` |
| Homepage | `components/website/home-page.jsx`, `home-page.module.css` |
| Lead capture | `components/website/lead-form.jsx`, `lib/lead-form-contract.mjs`, `netlify/functions/contact-inquiry.mjs` |
| Case-study card | `components/website/case-study-card.jsx`, `case-study-card.module.css` |
| Availability | `components/website/status-pill.jsx` |
| Structured data | `components/website/structured-data.jsx`, `lib/seo.js` |
| Central content | `lib/website-content.js` |
| Crawler discovery | `app/sitemap.js`, `app/robots.js` |
| Marketing pages | `app/*/page.js`, `app/marketing-pages.module.css` |

The header includes desktop dropdowns and a mobile dialog with focus trapping, Escape-to-close, focus return, and body-scroll locking. All primary interactive targets are at least 44px high.

## Central configuration

`lib/website-content.js` owns:

- site name, canonical URL, headline, and CTAs
- contact email, phone, and address
- announcement-bar content and enabled state
- primary navigation and dropdowns
- provisional footprint metrics
- residential and commercial solution summaries
- six-step connected-parking flow and separate residential access flow
- module names and availability status
- commercial launch capabilities
- equipment compatibility categories
- deployment and support steps
- case-study records
- FAQ content
- industries
- required public routes

Do not duplicate those values inside pages. Add new case studies to `CASE_STUDIES`; static route generation and the sitemap consume the same records.

## Lead form and backend contract

`LeadForm` is reused on:

- `/residential-access-control/`
- `/commercial-parking-management/`
- `/book-site-assessment/`
- `/contact/`

It collects name, phone, work email, organisation/property, city, requirement, gate count, parking
capacity, existing equipment, timeline, message, and contact consent. Required fields receive client-side
field errors; the first invalid field receives focus. Submission exposes loading, failure, and
API-confirmed success states.

The browser sends:

```text
POST /api/contact-inquiry
```

The same-origin Netlify function validates every structured field again, checks the honeypot, requires
consent, records the consent text and timestamp, and applies a platform-enforced limit of five requests per
IP/domain per minute. It forwards this existing five-field contract to a configured upstream:

```json
{
  "fullName": "…",
  "emailAddress": "…",
  "phoneNumber": "…",
  "companyName": "…",
  "projectContext": "…"
}
```

The adapter serializes the validated structured fields and consent record into `projectContext`. Success is
shown only after a successful upstream response. With no upstream configured, it returns `503` and directs
the user to `support@parktek.in`.

Kendra's current public endpoint was designed for direct browser traffic. Its origin check and
five-per-15-minute IP limiter are not yet safe behind a shared serverless proxy. Production must configure
an endpoint explicitly approved for Netlify server-to-server traffic or coordinate that Kendra path first.

### Environment

```bash
CONTACT_INQUIRY_API_URL=https://approved.example/api/contact-inquiries
PUBLIC_SITE_ORIGIN=https://parktek.in
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact-inquiry
```

Use `npx netlify-cli dev` for local end-to-end form work. `npm run dev` and `npx serve out` do not mount
Netlify Functions and are intended for UI/static-export checks. Configure server-only runtime variables in
Netlify's Functions scope, not in the browser bundle.

## SEO and structured data

`makeMetadata` creates per-route titles, descriptions, canonical URLs, Open Graph data, and Twitter cards. The root layout emits Organization and LocalBusiness JSON-LD. Inner pages emit BreadcrumbList JSON-LD. `sitemap.xml` is generated from the central routes and verified, indexable case studies; `robots.txt` points to it.

Unfinished Case Studies routes remain outside the sitemap and carry `noindex` metadata while hidden from navigation.

## Founder verification required

The following provisional values are intentionally marked `requiresFounderVerification: true` in code:

- 15+ societies
- 25+ barriers
- 10,000+ registered users
- NCR operating region

All four are `verified: false` and hidden from the exported homepage and LocalBusiness JSON-LD. Capability
statuses appear in their place. Confirm or replace all four before setting `verified: true`.

The placeholder case study also requires customer approval and founder verification before real scope, imagery, or outcomes are published.

## Missing production images

V1 includes explicit placeholders instead of invented proof for:

- residential dashboard screenshot
- commercial operations dashboard
- commercial POS pilot interface
- vehicle entry screen
- transaction report
- barrier/controller hardware photograph
- real installation photograph
- approved case-study imagery
- redacted account-deletion captures whose wording matches actual soft deletion/deactivation

Replace each placeholder with an approved, current asset. Add descriptive alternative text and preserve intrinsic dimensions. Do not publish generated UI as a live product screenshot.

## Verification

Run from `parktek-prastuti`:

```bash
npm install
npm run lint
npm run build
npm test
```

Before release, verify the exported site at 375px, 768px, 1280px, and 1440px widths. Cover navigation, mobile focus handling, CTA routes, form validation and API failure, footer links, image sizing, horizontal overflow, metadata, keyboard flow, and reduced-motion behavior.

Release verification on 2026-07-15 passed:

- ESLint, static export and 10 Node contract/export tests
- all required routes returning 200
- Axe checks at 375px and 1280px with zero violations
- no horizontal overflow at 375px, 768px, 1280px or 1440px
- mobile focus trap, first-error focus, mocked failure/success form states and reduced motion
- Lighthouse mobile: 89 performance, 100 accessibility and 100 SEO

The corresponding release renders and fidelity notes are tracked in `artifacts/` and `design-qa.md`.

## Follow-ups

1. Obtain founder confirmation for the four footprint metrics.
2. Obtain customer approval for the first case study.
3. Capture current dashboard and approved commercial-pilot product imagery.
4. Keep commercial/POS labels synchronized with Samhita as capabilities move from In development to Pilot, Launching, or Live.
5. Update `parktek-samhita/docs/lending/README.md` route and implementation maps in a coordinated Samhita documentation PR.
6. Configure a proxy-compatible enquiry upstream or coordinate an authenticated Kendra proxy path before production form activation.
7. Plan a supported Next.js major upgrade; static export limits exposure to the audited server/image paths, but Next 14.2.35 still reports upstream security advisories.
