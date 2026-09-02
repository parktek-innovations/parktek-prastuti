# Environment

Next.js exposes only `NEXT_PUBLIC_*` variables to the browser bundle. The Netlify function reads
server-only values. Copy `.env.example` to `.env.local` for local overrides.

Cross-repo deployment readiness and owner-supplied production values live in `../parktek-samhita/docs/deployment-readiness.md`.

## Common variables

| Variable | Notes |
|---|---|
| `CONTACT_INQUIRY_API_URL` | Server-only full URL for an enquiry endpoint approved for Netlify proxy traffic |
| `PUBLIC_SITE_ORIGIN` | Origin sent to the approved upstream; defaults to `https://parktek.in` |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Optional same-origin adapter path override; defaults to `/api/contact-inquiry` |
| Analytics keys | If applicable — server-side preferred |

## Notes

- Never put credentials or secrets in `NEXT_PUBLIC_*` variables — they appear in the browser bundle.
- Production secrets must be configured via CI/CD or environment injection — not committed.
- Variables declared only in `netlify.toml` are not function runtime secrets; configure server-only values in Netlify's Functions scope.
- The current public Kendra browser endpoint is not yet a production-safe proxy target because its origin check and IP rate limiter were designed for direct browser traffic.
- Consult `../parktek-samhita/docs/lending/` for public-site content boundaries.
