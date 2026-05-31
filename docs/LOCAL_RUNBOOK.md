# Local Runbook

## Prerequisites

- Node.js 18+
- npm
- `parktek-kendra` running locally or a dev backend URL (for lending/payment flows)

## First-time setup

```bash
npm install
```

Configure any required `NEXT_PUBLIC_*` env vars (see `docs/ENVIRONMENT.md`).

## Run

```bash
npm run dev      # Next.js dev server (default port 3000 or as configured)
```

## Build

```bash
npm run build
npm start       # start production build locally
```

## Tests

See `docs/TESTING.md`.

## Verification checklist

- Landing page renders
- Lending/payment flow navigates correctly
- API calls reach correct backend URL
- No credentials appear in built assets or source
