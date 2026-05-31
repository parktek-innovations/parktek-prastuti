# ParkTek Landing Agent Guide

## Source Of Truth

Read `../parktek-samhita/docs/agent-onboarding.md` first.

Shared brand/design constraints, documentation standards, and platform context live in `../parktek-samhita/`.
Canonical landing documentation lives in `../parktek-samhita/docs/lending/`.

## Repo Scope

This repo owns landing/marketing implementation details only: Next.js pages, content components, static assets, styling, analytics, deployment, and local docs.

Do not treat landing content as the source of truth for platform product/API/model behavior.

## Must-read local files

- `docs/REPO_CONTEXT.md`
- `docs/LOCAL_RUNBOOK.md`
- `docs/TESTING.md`
- `docs/ENVIRONMENT.md`

## Safety rules

- Do not put payment API keys or secrets in `NEXT_PUBLIC_*` vars or source files.
- Do not create new platform-wide standards in this repo.
- Do not skip tests because they are inconvenient.

## Final response required

Return:

- summary
- files changed
- tests run
- risks
- follow-ups
