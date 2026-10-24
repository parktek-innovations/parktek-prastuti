# ParkTek Landing Agent Guide

<!-- BEGIN TOC -->
## Table of Contents

- [Source Of Truth](#source-of-truth)
- [Repo Scope](#repo-scope)
- [Local context](#local-context)
- [Safety rules](#safety-rules)
- [Final response required](#final-response-required)
- [Codex Setup](#codex-setup)
<!-- END TOC -->

## Source Of Truth

Read `docs/REPO_CONTEXT.md`, then only the relevant workflow in `parktek-samhita/docs/agent-onboarding.md`.

Shared brand/design constraints, documentation standards, and platform context live in `parktek-samhita/`.
Canonical landing documentation lives in `parktek-samhita/docs/lending/`.

## Repo Scope

This repo owns landing/marketing implementation details only: Next.js pages, content components, static assets, styling, analytics, deployment, and local docs.

Do not treat landing content as the source of truth for platform product/API/model behavior.

## Local context

Read `docs/REPO_CONTEXT.md`. Consult the runbook, testing and environment docs only when relevant.

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

## Codex Setup

For every fresh shell, resolve `PARKTEK_HOME` to the canonical workspace and source `$PARKTEK_HOME/.local/env.sh` when present. Exports do not persist across tool calls. Use `parktek-samhita/docs/codex-setup.md` for repo-scoped skills, worktrees, Python environments and Flutter SDK selection; load only task-relevant shared references.

Samhita paths resolve from `$PARKTEK_HOME`; implementation paths resolve from this repo’s current Git root, including worktrees.
