# Testing

Cross-repo testing standard: `../parktek-samhita/docs/testing-standard.md`.

## Automated verification

```bash
npm run lint
npm run build
npm test
```

`npm test` builds the static export, then verifies required routes, positioning and status language,
shared lead-form fields, the server adapter's validation/consent forwarding/no-fake-success behavior,
metadata/JSON-LD, sitemap/robots output, and centralized contact details with Node's built-in test runner.

## Browser verification

Test the generated site at 375px, 768px, 1280px, and 1440px. Cover:

- all required routes and CTAs
- desktop dropdowns and mobile menu focus behavior
- lead-form validation, loading, API failure, and API-confirmed success
- footer and contact links
- metadata, canonical links, JSON-LD, sitemap, and robots
- keyboard navigation and visible focus
- `prefers-reduced-motion: reduce`
- image dimensions and horizontal overflow

Never submit production-like personal data during QA. Use request mocking for success/failure browser states.
`npm run dev` and a static `out/` server do not mount the function; use `npx netlify-cli dev` for an
end-to-end adapter test. A missing or rejected upstream must show a failure and never false success.
