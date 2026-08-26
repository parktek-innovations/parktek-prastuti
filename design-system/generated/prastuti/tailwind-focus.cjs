// notice: GENERATED FILE — DO NOT EDIT
// canonical_source: design-system/tokens/tokens.json
// token_release_version: 0.2.0
// release_status: approved-focus-component-foundation
// source_sha256: 03a89fdf95768d895d1a2bd4a2b0e3f1dc417d1b97574371d02ca829ba64ac56
// generator_version: 0.3.0
// platform: Prastuti Tailwind focus foundation
// context: light.product;camera.overlay
// timestamp_policy: No wall-clock timestamps; release metadata only.

const utilities = {
  ".pk-focus-dual": {
    "boxShadow": "0 0 0 var(--pk-focus-dual-gap) transparent, 0 0 0 calc(var(--pk-focus-dual-gap) + var(--pk-focus-dual-inner-width)) var(--pk-focus-contrast-colour), 0 0 0 calc(var(--pk-focus-dual-gap) + var(--pk-focus-dual-inner-width) + var(--pk-focus-dual-outer-width)) var(--pk-focus-ring-colour)"
  },
  ".pk-focus-inset": {
    "boxShadow": "inset 0 0 0 var(--pk-focus-inset-width) var(--pk-focus-ring-colour)"
  },
  ".pk-focus-inset-separator": {
    "boxShadow": "inset 0 0 0 var(--pk-focus-inset-separator-width) var(--pk-focus-inset-separator-colour), inset 0 0 0 calc(var(--pk-focus-inset-separator-width) + var(--pk-focus-inset-width)) var(--pk-focus-ring-colour)"
  },
  ".pk-focus-standard": {
    "outline": "var(--pk-focus-standard-width) solid var(--pk-focus-ring-colour)",
    "outlineOffset": "var(--pk-focus-standard-offset)"
  }
};
const themeExtension = { parktekFocus: { standard: 'standard.outer', dual: 'contrast.dual', inset: 'dense.inset' } };
function plugin(api) { api.addUtilities(utilities); }
module.exports = { themeExtension, utilities, plugin };
