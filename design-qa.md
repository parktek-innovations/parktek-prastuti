# ParkTek Prastuti design QA

## Comparison target

- Source visual truth: `artifacts/design-qa-source-desktop.png`
- Browser-rendered implementation: `artifacts/design-qa-implementation-desktop.jpg`
- Mobile implementation: `artifacts/design-qa-implementation-mobile.jpg`
- Route: `http://127.0.0.1:3010/`
- Desktop viewport: 1280 × 720 CSS pixels
- Mobile viewport: 390 × 844 CSS pixels
- State: desktop and mobile entry state at scroll position 0; desktop journey interaction advanced from stage 01 to stage 02.

## Full-view comparison evidence

The source top section was cropped to its 16:9 hero region and normalized to 1280 × 720 before it was viewed together with the browser-rendered 1280 × 720 implementation. The comparison showed the same primary composition: deep navy night environment, left-aligned display copy, residential gate and vehicles as the hero subject, cyan route lighting, compact glass operational overlays, a contained top navigation shell, and a high-contrast demo CTA.

The implementation intentionally uses a scroll-stage rail where the static reference uses feature cards. This brings the requested animation into the first viewport while preserving the reference's information density and visual rhythm.

## Focused region evidence

A separate crop was not needed because the normalized 1280 × 720 pair keeps the navigation, display headline, CTA, live-state panel, world imagery, vehicle details, border radii, and small stage labels legible at original resolution. The 390 × 844 browser capture was also reviewed independently for the responsive headline wrap, image crop, CTA stack, header shell, and horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: the implementation uses Clash Display for the cinematic headline and Montserrat for navigation, labels, body copy, and controls. Display weight, tight tracking, compact line height, and cyan word emphasis follow the source hierarchy. The mobile headline wraps without clipping or truncation.
- Spacing and layout rhythm: the inset navigation shell, left hero column, right live-state panel, full-bleed world, CTA spacing, and stage rail align to the source's dense hero composition. Desktop and mobile body width match the viewport with no horizontal overflow.
- Colors and visual tokens: deep navy surfaces, white text, cyan route/state accents, and translucent blue borders match the source direction. ParkTek's official primary blue replaces the reference's orange CTA as an intentional design-system constraint.
- Image quality and asset fidelity: all visible cinematic worlds are generated raster assets sized for the slot; no CSS illustrations, placeholder boxes, handcrafted SVG scenery, or emoji replace the reference imagery. The official Figma-exported ParkTek logo remains a vector asset.
- Copy and content: hero and overlay copy is specific to ParkTek's real residential access model. Unsupported payments, valet, fleet, occupancy, fake ratings, and invented performance metrics from the visual reference were deliberately excluded.

## Findings

No actionable P0, P1, or P2 design mismatches remain.

- [P3] The source includes three static capability cards inside the first viewport, while the implementation uses a six-stage scroll rail and live access panel. This is intentional: it converts the reference into an animated journey and keeps the first screen focused.
- [P3] The source uses an orange conversion accent; the implementation uses ParkTek primary blue from the official design system.
- [P3] Some generated world micro-details are decorative rather than literal product UI. All product claims remain in the HTML overlays and supporting page copy, where they are accurate and accessible.

## Open questions

- None blocking. Final camera speed and overlay timing are subjective polish choices that can be tuned after stakeholder review.

## Primary interactions tested

- `Follow the vehicle` advanced the scroll journey from `01 / Arrival` to `02 / Identify` and moved the page to the corresponding scroll state.
- Header anchors resolve to `#platform`, `#residents`, and `#operations`.
- Both demo CTAs resolve to `/contact/`.
- Desktop and mobile image assets completed loading at their natural dimensions.
- Browser console checked at desktop and mobile states: no errors or warnings.

## Comparison history

- Pass 1: no P0/P1/P2 findings. The normalized source and browser render matched the requested composition and art direction, so no post-comparison visual fix was required.
- Responsive check: the 390 × 844 browser render preserved hierarchy, readable copy, functional CTAs, the cinematic image crop, and viewport width with no P0/P1/P2 finding.

## Implementation checklist

- [x] Match the night-isometric residential gate art direction.
- [x] Add scroll-driven gate-state and camera movement.
- [x] Add a connected-campus scroll scene.
- [x] Use official ParkTek logo assets and primary color.
- [x] Keep claims aligned with ParkTek Samhita.
- [x] Verify desktop and mobile browser renders.
- [x] Verify primary links, journey interaction, loaded imagery, and console state.

## Follow-up polish

- P3: tune scroll smoothing and stage dwell time after live stakeholder feedback.
- P3: replace generated decorative vehicle details with future production 3D renders if ParkTek commissions a reusable Blender asset library.

final result: passed
