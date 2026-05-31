# CLAUDE.md

Last updated: 2026-05-31

This file gives Claude Code concise project memory for `parktek-prastuti`. Router only — not the full documentation source.

## Canonical source

Platform-wide documentation lives in `../parktek-samhita/`.

## Read order

1. `docs/REPO_CONTEXT.md`
2. `docs/LOCAL_RUNBOOK.md` (setup/run), `docs/TESTING.md` (tests), `docs/ENVIRONMENT.md` (env vars)
3. `../parktek-samhita/docs/lending/` (lending/landing docs)
4. `../parktek-samhita/docs/START_HERE.md` → relevant standards
5. `../parktek-samhita/skills/parktek-platform/SKILL.md` (for payment/product context)

## Working rules

- Prefer targeted reads over broad repository scans.
- Make minimal, reversible changes.
- Do not treat landing content as the source of truth for platform product/API/model behavior.
- Never commit credentials, payment keys, or API secrets.
- Update docs only when durable behavior changes.
- Never invent ParkTek business rules.
- Ask for clarification only if blocked; otherwise make a safe assumption and state it.

## Final response

Always include:

- what changed
- why it changed
- verification performed
- remaining risk
