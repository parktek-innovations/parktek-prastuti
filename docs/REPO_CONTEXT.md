# Repo Context

<!-- BEGIN TOC -->
## Table of Contents

- [Repo name](#repo-name)
- [Role in ParkTek](#role-in-parktek)
- [Owns](#owns)
- [Does not own](#does-not-own)
- [Upstream dependencies](#upstream-dependencies)
- [Downstream dependencies](#downstream-dependencies)
- [Main runtime](#main-runtime)
- [High-risk areas](#high-risk-areas)
- [Local commands](#local-commands)
- [Required samhita references](#required-samhita-references)
<!-- END TOC -->

## Repo name

`parktek-prastuti`

## Role in ParkTek

Landing/lending/marketing site for ParkTek. Next.js + Tailwind CSS. Serves the public-facing marketing pages and lending/settlement flows. Depends on `parktek-kendra` for payment and settlement APIs.

## Owns

- Marketing/landing pages
- Lending flow UI
- Payment and reconciliation surfaces
- Settlement logic where applicable
- Static assets and content

## Does not own

- API contracts → `parktek-kendra`
- Platform product/model decisions → `parktek-samhita`
- Admin dashboard → `parktek-darpana`

## Upstream dependencies

- `parktek-kendra` (payment/settlement APIs)

## Downstream dependencies

- None

## Main runtime

- Language: TypeScript / JavaScript
- Framework: Next.js + Tailwind CSS
- Deployment: static/SSR → CDN / web server

## High-risk areas

- payment correctness and reconciliation
- settlement flows (financial — no test data in production)
- public-site content/credential hygiene (no secrets in source)
- backend API contract drift

## Local commands

```bash
npm install
npm run dev     # Next.js dev server
npm run build
npm test
```

## Required samhita references

- `../parktek-samhita/docs/lending/`
- `../parktek-samhita/skills/parktek-platform/SKILL.md`
- `../parktek-samhita/docs/repos/parktek-prastuti.md`
