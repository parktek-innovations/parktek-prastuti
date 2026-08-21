# Local Runbook

## Prerequisites

- Node.js 18+
- npm
- `parktek-kendra` running locally or a dev backend URL (for lending/payment flows)

## First-time setup

```powershell
npm.cmd install
```

Configure any required `NEXT_PUBLIC_*` env vars (see `docs/ENVIRONMENT.md`).

## Run

```powershell
npm.cmd run dev
```

The Phase A non-production component/landing preview is available at
`http://localhost:3000/preview/prastuti/`. Its form is local-only and does not
send to the production contact endpoint.

## Build

```powershell
npm.cmd run build
npm.cmd start
```

## Tests

See `docs/TESTING.md`.

## Verification checklist

- Landing page renders
- Lending/payment flow navigates correctly
- API calls reach correct backend URL
- No credentials appear in built assets or source
