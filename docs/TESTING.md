# Testing

## Standard

Cross-repo testing standard: `../parktek-samhita/docs/testing-standard.md`.

## Runner

Jest / Next.js test tooling.

## Commands

```bash
npm test
```

## Notes

- Do not use real payment credentials or production API keys in tests.
- Financial flow tests require correct mock/stub of payment APIs.
- Do not delete or skip tests to make a change work.
