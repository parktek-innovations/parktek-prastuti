# Environment

Next.js exposes only `NEXT_PUBLIC_*` variables to the browser bundle. Server-side variables are available server-only. Copy `.env.example` to `.env.local` for local overrides.

Cross-repo deployment readiness and owner-supplied production values live in `../parktek-samhita/docs/deployment-readiness.md`.

## Common variables

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL (if used client-side) |
| Payment API keys | Server-side only; never `NEXT_PUBLIC_*`. Configure via CI/CD secrets. |
| Analytics keys | If applicable — server-side preferred |

## Notes

- Never put payment API keys, credentials, or secrets in `NEXT_PUBLIC_*` variables — they appear in the browser bundle.
- Production secrets must be configured via CI/CD or environment injection — not committed.
- Consult `../parktek-samhita/docs/lending/` for lending/payment integration context.
