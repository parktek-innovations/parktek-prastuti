---
owner: repository-maintainer
status: draft
last_updated: 2026-09-19
applies_to:
  - parktek-prastuti
doc_type: reference
---

# ISO 27001 implementation evidence

Shared scope, risks, policies and approval records belong in the [ParkTek ISMS](../../parktek-samhita/docs/isms/README.md). This file records implementation facts and evidence gaps only; it does not declare certification or operating effectiveness.

<!-- BEGIN TOC -->
## Table of Contents

- [Review baseline](#review-baseline)
- [Evidence map](#evidence-map)
- [Changes awaiting approval](#changes-awaiting-approval)
- [Verification](#verification)
<!-- END TOC -->

## Review baseline

- Reviewed source: `18d82d1bf723c5bc1e78b53a792048d85ed3cfb6`; branch: `codex/iso27001-2026-09`, created from `origin/develop`.
- Scope: Public website, enquiry adapter, analytics and privacy/security disclosures; payment processing is not implemented by this repository.
- Inspection date: 2026-09-19. Production configuration, organizational approvals and field operation were not verified by source inspection.

## Evidence map

| Area | Observed implementation | Operating evidence still needed |
| --- | --- | --- |
| Enquiry trust boundary | [contact-inquiry.mjs](../netlify/functions/contact-inquiry.mjs) — Adapter validates JSON/fields, configures per-IP Netlify rate limiting, sets no-store responses, times out upstream requests and does not fake upstream success. | Live provider rate-limit behavior, approved upstream configuration and backend-compatible origin/IP controls. |
| Consent handling | [contact-form-adapter.test.mjs](../tests/contact-form-adapter.test.mjs) — Tests cover consent forwarding and invalid/missing upstream behavior. | Retained consent records and purpose/retention decisions for real enquiries. |
| Public statements | [page.js](../app/privacy-policy/page.js) — Published source describes data categories, analytics, retention and rights handling. These are statements requiring operational evidence. | Owner/legal approval against actual deployed processing and completed rights/deletion requests. |
| Hosting configuration | [netlify.toml](../netlify.toml) — Repository config declares build/functions; no security-header rules are declared here and no CI workflow was present. | Actual Netlify headers/TLS/access controls, build checks and release approvals; platform defaults may supply controls absent from source. |

## Changes awaiting approval

- CSP/security-header settings can change browser behavior and need an approved tested hosting change.
- Restricting upstream HTTP or changing proxy/IP/consent handling is behavior change; first approve production integration and preserve local-development needs.
- Analytics consent/retention and public privacy/payment claims require owner decisions based on actual processing. No legal policy or advertised capability was changed here.
- Next.js and transitive dependency remediation awaits [LC-08 approval](../../parktek-samhita/docs/isms/change-approval-register.md#lc-08-migrate-the-marketing-sites-vulnerable-framework-dependencies): the supported security fix requires a major framework migration from the locked version. Preserve static export, enquiry contracts and existing tests; validate a clean build and repeat the dependency audit before accepting any proposed replacement versions.

## Verification

`node --test tests/contact-form-adapter.test.mjs tests/contact-query-context.test.mjs`: **10 passed**. No real enquiry submission, live hosting change or production browser evidence was collected.

On 2026-09-19 at 09:17 UTC, `npm audit --omit=dev --json` against `b3d7fdf10b68c46fb9042fd334fdf7237b300e20` (Node `23.6.1`, npm `10.9.2`) exited **1** with **1 critical and 2 high package entries**. These count dependency nodes, not distinct advisories: direct `next@14.2.35`, transitive `next/node_modules/postcss@8.4.31`, and transitive `nanoid@3.3.11` in the [lockfile](../package-lock.json). The manifest and lockfile remained unchanged. Twenty-two installed production lock paths matched; required `@fontsource/inter` and eight optional SWC packages for other platforms were absent. There were no observed version mismatches. This installed tree does not establish a reproducible build.

The Next.js maintainer lists `15.5.24` and `16.3.3` as fixed for [Windows-hosted server RCE](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36) and [AVIF image-optimizer RCE](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4); the [support policy](https://nextjs.org/support-policy) lists version 14 as unsupported. The minimum supported release fixing those two advisories is `15.5.24`; this is not a claim that all transitive findings are fixed. npm proposed `16.3.5` as a major upgrade; no upgrade was installed or validated. PostCSS has [source-map file disclosure](https://github.com/postcss/postcss/security/advisories/GHSA-r28c-9q8g-f849) and a [follow-up fix in 8.5.23](https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp); Nano ID's [3.3.18 maintenance release](https://github.com/ai/nanoid/releases/tag/3.3.18) fixes an infinite-loop defect. Application reachability of these paths remains unverified.

[next.config.mjs](../next.config.mjs) declares `output: "export"` and `images.unoptimized: true`; [netlify.toml](../netlify.toml) publishes `out` and declares separate Netlify functions. This checked-in configuration does not demonstrate an exposed Next.js server or image optimizer. The live deployment was not verified, so the critical lockfile finding does not prove deployed server RCE. Machine-local `.local/iso27001/parktek-prastuti-npm-audit-production-metadata.json` retains command, source/manifest/lock identities, timestamps, counts, missing packages and the raw report SHA-256.

The [sanitized verification record](../../parktek-samhita/docs/isms/evidence/local-checks.json)
is versioned in Samhita.

Existing checks, run from the repository root with its supported dependencies:

```bash
node --test tests/contact-form-adapter.test.mjs tests/contact-query-context.test.mjs
npm run build
npm audit --omit=dev --json
```

Archive future results with the full source SHA, environment, execution date, command, exit status and reviewer in the shared ISMS evidence index. Keep credentials, personal records, raw captures and signing material out of Git.
