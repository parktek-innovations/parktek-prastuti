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

Public ParkTek marketing site built with Next.js and CSS Modules. It presents live residential access control and clearly labeled commercial-parking/POS launch scope. It depends on `parktek-kendra` only for the contact-inquiry API.

## Owns

- Marketing/landing pages
- Site-assessment and contact lead UI
- Public capability-status copy
- Static assets and content

## Does not own

- API contracts → `parktek-kendra`
- Platform product/model decisions → `parktek-samhita`
- Admin dashboard → `parktek-darpana`
- Payment processing, settlement, and financial records → not implemented in this repo

## Upstream dependencies

- `parktek-kendra` (`POST /api/contact-inquiries`)

## Downstream dependencies

- None

## Main runtime

- Language: TypeScript / JavaScript
- Framework: Next.js + Tailwind CSS
- Deployment: static export → Netlify CDN

## High-risk areas

- unsupported or premature product claims
- lead-form/backend contract drift
- public-site content/credential hygiene (no secrets in source)
- accessibility, SEO, and responsive regressions

## Local commands

```bash
npm install
npm run dev     # Next.js dev server
npm run build
npm run lint
npm test
```

## Required samhita references

- `../parktek-samhita/docs/lending/`
- `../parktek-samhita/skills/parktek-platform/SKILL.md`
- `../parktek-samhita/docs/repos/parktek-prastuti.md`
