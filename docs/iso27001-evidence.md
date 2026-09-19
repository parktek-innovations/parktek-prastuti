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

## Verification

`node --test tests/contact-form-adapter.test.mjs tests/contact-query-context.test.mjs`: **10 passed**. No real enquiry submission, live hosting change or production browser evidence was collected.

Existing checks, run from the repository root with its supported dependencies:

```bash
node --test tests/contact-form-adapter.test.mjs tests/contact-query-context.test.mjs
npm run build
```

Archive future results with the full source SHA, environment, execution date, command, exit status and reviewer in the shared ISMS evidence index. Keep credentials, personal records, raw captures and signing material out of Git.
