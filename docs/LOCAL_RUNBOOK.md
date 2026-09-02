# Local Runbook

## Prerequisites

- Node.js 20
- npm
- Netlify CLI through `npx netlify-cli` when testing the server-side lead adapter
- an upstream explicitly configured to accept the forwarded local origin when testing real form delivery

## First-time setup

```bash
npm install
```

Copy `.env.example` to `.env.local` and configure only the adapter values required for your test.

## Run

```bash
npm run dev      # Next.js dev server (default port 3000 or as configured)
```

`npm run dev` is sufficient for page and client-validation work. It does not mount Netlify Functions.
For end-to-end form work, use:

```bash
npx netlify-cli dev
```

## Build

```bash
npm run build
npx serve out   # exact static-export UI preview; functions are not mounted
```

## Tests

See `docs/TESTING.md`.

```bash
npm run lint
npm test
```

## Verification checklist

- Landing page renders
- All required routes render from `out/`
- Site-assessment requests reach the configured contact-inquiry endpoint
- Mobile navigation traps focus and closes with Escape
- No horizontal overflow at 375, 768, 1280, or 1440px
- No credentials appear in built assets or source
