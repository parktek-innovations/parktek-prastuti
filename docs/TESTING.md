# Testing

## Standard

Cross-repo testing standard: `../parktek-samhita/docs/testing-standard.md`.

## Runners

- Node's built-in test runner for release/content/source contracts.
- Playwright with a locally installed Chrome channel for preview-route browser checks.

## Commands

```powershell
npm.cmd test
```

Focused commands:

```powershell
npm.cmd run test:unit
npm.cmd run test:preview
```

`test:preview` builds the static export before running the browser suite. Set
`PLAYWRIGHT_CHANNEL` when Chrome is unavailable and another installed Playwright
channel should be used.

```powershell
$env:PLAYWRIGHT_CHANNEL = "msedge"
npm.cmd run test:preview
```

## Notes

- Do not use real payment credentials or production API keys in tests.
- Financial flow tests require correct mock/stub of payment APIs.
- Do not delete or skip tests to make a change work.
- Phase A tests hash-check the generated Samhita adapter, guard new preview source
  against raw colours, and exercise availability, keyboard focus, forced colours,
  320 px/200%-zoom-proxy reflow, mobile navigation, and form semantics.
- Automated checks do not replace manual screen-reader, Windows High Contrast,
  browser 200% zoom, or target-device review.
