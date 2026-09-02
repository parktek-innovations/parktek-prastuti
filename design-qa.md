# ParkTek Prastuti Website V1 — design QA

## Evidence

- Visual reference: `artifacts/design-qa-source-desktop.png` (1280 × 720 crop of the supplied concept).
- Release desktop render: `artifacts/design-qa-implementation-desktop.jpg` (1440 × 900).
- Release mobile render: `artifacts/design-qa-implementation-mobile.jpg` (375 × 812).
- Local release route: `http://127.0.0.1:4173/` from the static `out/` build.
- A 1440-pixel full-page capture was reviewed after scrolling through every lazy-loaded section.

## Visual result

The release preserves the reference's defining composition: a deep-navy operations environment, oversized left-aligned headline, illuminated parking/gate scene, compact live-state overlays, contained navigation, strong conversion CTA and dense product storytelling below the fold. ParkTek's official Figma-derived logo and primary blue replace the concept's illustrative brand mark and orange accent.

The visual is implemented as a lightweight local asset system. Responsive AVIF/JPEG/WebP sources and CSS state animation provide motion without Higgsfield or another recurring generation subscription.

## Fidelity and product-truth decisions

- Typography: Clash Display supplies the cinematic headline; Montserrat is used for navigation, labels, body copy and controls. The mobile headline wraps without clipping.
- Layout: the desktop hero keeps the copy/world split and the mobile view intentionally places the visual below the first viewport so the decision copy and CTAs remain immediate.
- Color: navy surfaces, white copy, cyan route/state accents and translucent blue borders follow the source; the primary CTA uses the ParkTek design-system blue.
- Imagery: the cinematic parking worlds are responsive raster assets, while official ParkTek brand marks remain SVG.
- Claims: RFID and local control are described as current; ANPR is marked pilot; commercial/POS workflows are marked launching. Unsupported occupancy, payments, fleet, valet, ratings and invented results from the concept are not presented as live facts.
- Metrics: provisional founder metrics are not rendered publicly until verified.

## Responsive and interaction checks

- 375, 768, 1280 and 1440-pixel widths have no horizontal overflow.
- Each route has one main landmark and one H1; the homepage has one header and one footer.
- The 375-pixel render uses responsive AVIF media, 16-pixel body copy and footer targets of at least 44 pixels.
- Mobile navigation traps focus, locks body scroll, closes on Escape and restores focus to the trigger.
- Reduced-motion mode disables continuous animation on the homepage.
- Lead-form empty submission focuses the first invalid field. Simulated upstream failure retains form values and never reports success; simulated success clears the form and announces confirmation.
- Sitemap, robots directives, canonical metadata, structured data and Case Studies noindex behavior were checked in the static export.
- Axe checks at 375 and 1280 pixels returned no violations.

## Performance and release acceptance

- Lighthouse mobile: 89 performance, 100 accessibility, 100 SEO.
- Required release thresholds: performance ≥85, accessibility ≥95, SEO ≥95.
- All release thresholds pass.
- Google Analytics is deferred until after window load so it does not block the primary rendering path.

## Remaining launch inputs

- Configure `CONTACT_INQUIRY_API_URL` with a production-approved, proxy-compatible enquiry upstream. Until then, the form adapter deliberately returns 503 instead of showing a fake success state.
- Replace the anonymised case-study, team and product-proof placeholders when founder-approved evidence is supplied.
- Add verified metrics only through the central content configuration after source confirmation.

Final result: passed.
