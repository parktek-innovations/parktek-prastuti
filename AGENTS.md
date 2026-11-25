# ParkTek Landing Agent Guide

Start with [repo context](docs/REPO_CONTEXT.md), then read the task-specific workflow in `$PARKTEK_HOME/parktek-samhita/docs/agent-onboarding.md`.

Every fresh shell resolves `PARKTEK_HOME` to the workspace and sources its `.local/env.sh` when present. Use Samhita's `docs/codex-setup.md` for client discovery and toolchains. Resolve repo-local paths from this checkout's Git root, including linked worktrees.

Keep public capability claims aligned with Samhita. Keep secrets out of frontend variables and source.

Follow Samhita's verification and handoff guidance for changes.
