# ParkTek Prastuti

Public ParkTek marketing site for residential access control and the phased commercial-parking launch.

## Source of truth

Shared product behavior, API contracts, models, design rules, and public-claim boundaries live in [`../parktek-samhita`](../parktek-samhita). This repository owns only the public website implementation and its local deployment notes.

Start agent work with [`AGENTS.md`](AGENTS.md), then read [`../parktek-samhita/docs/agent-onboarding.md`](../parktek-samhita/docs/agent-onboarding.md) and [`docs/website-v1.md`](docs/website-v1.md).

## Stack

- Next.js 14 App Router
- React 18
- CSS Modules and Tailwind build tooling
- static export to `out/`
- Netlify hosting
- Netlify server-side lead adapter with a configurable enquiry upstream
- procedural Three.js only on the unlisted local trial route

No Higgsfield runtime or subscription is required.

## Capability labels

- Residential RFID access, controller operations, dashboards, logs, and support: **Live**
- Guarded ANPR: **Pilot**
- Commercial parking and operator POS workspace: **Launching**
- Tariffs, shifts, payment records, reconciliation, and AMC management: **In development**

The website does not claim payment processing, custody of funds, universal equipment compatibility, unrestricted ANPR auto-open, or unverified customer results.

## Routes

- `/`
- `/residential-access-control/`
- `/commercial-parking-management/`
- `/case-studies/`
- `/case-studies/[slug]/`
- `/about/`
- `/book-site-assessment/`
- `/contact/`
- `/security/`
- `/privacy-policy/`
- `/terms-of-service/`

`/scroll-world-trial/` is an unlisted, noindex Three.js experiment retained for local evaluation.

## Local setup

Requires Node.js 20 and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000` for UI work. To mount the lead-form function as well, run
`npx netlify-cli dev` and use the URL it reports (normally `http://localhost:8888`).

## Environment

```bash
CONTACT_INQUIRY_API_URL=https://approved.example/api/contact-inquiries
PUBLIC_SITE_ORIGIN=https://parktek.in
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact-inquiry
```

The browser posts to the same-origin Netlify adapter. The adapter validates every structured field,
enforces a Netlify per-IP rate limit, records the consent text and timestamp, then forwards the legacy
five-field contract to `CONTACT_INQUIRY_API_URL`. If the upstream is missing or rejects the request, the
form shows a failure and never reports false success.

Production must use an upstream explicitly approved for server-to-server Netlify traffic. Do not point
the adapter at Kendra's current public browser endpoint until its origin trust and rate-limiter keying are
coordinated for the proxy path.

## Verification

```bash
npm run lint
npm run build
npm test
```

The build produces the deployable static site in `out/`. Serve that folder with any static server when testing the exact production artifact.

Before release, verify navigation, forms, metadata, keyboard access, reduced motion, and horizontal overflow at 375px, 768px, 1280px, and 1440px. See [`docs/website-v1.md`](docs/website-v1.md) for the complete checklist and founder-verification items.

## Public contact

- `support@parktek.in`
- `+91 9899945876`
- `SK-70, Sector 112, Noida - 201301`
