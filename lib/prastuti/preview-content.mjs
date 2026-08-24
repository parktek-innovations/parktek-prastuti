// @ts-check

/**
 * @typedef {"live" | "pilot" | "launching" | "comingSoon"} AvailabilityKey
 * @typedef {"online" | "information" | "pending" | "unknown"} StatusTone
 * @typedef {Object} AvailabilityGroup
 * @property {AvailabilityKey} key
 * @property {string} badge
 * @property {string} heading
 * @property {string} summary
 * @property {StatusTone} tone
 * @property {string} icon
 * @property {readonly string[]} items
 * @property {string} cta
 */

/** @type {readonly AvailabilityKey[]} */
export const AVAILABILITY_ORDER = Object.freeze([
  "live",
  "pilot",
  "launching",
  "comingSoon"
]);

/** @type {Readonly<Record<AvailabilityKey, AvailabilityGroup>>} */
export const AVAILABILITY = Object.freeze({
  live: Object.freeze({
    key: "live",
    badge: "Live",
    heading: "Available Today — Residential Access",
    summary:
      "Established residential access workflows for communities operating with ParkTek controllers and supported barrier hardware.",
    tone: "online",
    icon: "residentialAccess",
    items: Object.freeze([
      "Residential RFID access",
      "Resident vehicle management",
      "Entry/exit activity",
      "Controller/barrier integration",
      "Society administration/support"
    ]),
    cta: "Discuss residential access"
  }),
  pilot: Object.freeze({
    key: "pilot",
    badge: "Pilot",
    heading: "Pilot — ANPR and Parking Intelligence",
    summary:
      "Guarded, approved pilots with site-specific operating boundaries and human oversight.",
    tone: "information",
    icon: "anprPilot",
    items: Object.freeze([
      "Guarded ANPR",
      "RFID/ANPR cross-check",
      "Approved parking-intelligence pilots"
    ]),
    cta: "Request a pilot assessment"
  }),
  launching: Object.freeze({
    key: "launching",
    badge: "Launching",
    heading: "Launching — Commercial Parking Operations",
    summary:
      "Commercial operating workflows are being prepared for launch and must not be represented as generally available.",
    tone: "pending",
    icon: "commercialOperations",
    items: Object.freeze([
      "Commercial parking operations",
      "Parking sessions",
      "POS/operator workflows",
      "Tariffs",
      "Payment records",
      "Reporting",
      "Reconciliation"
    ]),
    cta: "Discuss launch readiness"
  }),
  comingSoon: Object.freeze({
    key: "comingSoon",
    badge: "Coming soon",
    heading: "Coming Next — 2–4 months",
    summary:
      "Planned services shown for roadmap context only. They are not currently available for use or purchase.",
    tone: "unknown",
    icon: "comingNext",
    items: Object.freeze([
      "FASTag recharge",
      "E-challan services",
      "Mall/commercial parking discovery",
      "Parking availability",
      "Parking-space booking"
    ]),
    cta: "Discuss future requirements"
  })
});

export const PREVIEW_NAVIGATION = Object.freeze([
  { label: "Availability", href: "#availability" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Compatibility", href: "#compatibility" },
  { label: "Proof", href: "#proof" },
  { label: "Assessment", href: "#assessment" }
]);

export const VERIFIED_PROOF = Object.freeze([
  {
    value: "RFID access",
    label: "Available today",
    description: "Vehicle-linked residential access with supported controller workflows.",
    icon: "verified"
  },
  {
    value: "Activity",
    label: "Available today",
    description: "Resident-facing entry and exit activity with society administration.",
    icon: "activity"
  },
  {
    value: "Site assessed",
    label: "Compatibility approach",
    description: "Controller and barrier fit is confirmed for each premises before rollout.",
    icon: "compatibility"
  }
]);

export const PROCESS_STEPS = Object.freeze([
  {
    title: "Assess the site",
    description: "Review lanes, controller and barrier hardware, operating roles, and support needs.",
    icon: "assessment"
  },
  {
    title: "Confirm the operating scope",
    description: "Separate available residential workflows from approved pilots and future services.",
    icon: "scope"
  },
  {
    title: "Integrate and onboard",
    description: "Configure supported access hardware and prepare residents and society operators.",
    icon: "integration"
  },
  {
    title: "Operate with evidence",
    description: "Use recorded entry and exit activity and defined support paths for routine operations.",
    icon: "operate"
  }
]);

export const COMPATIBILITY = Object.freeze([
  {
    title: "Controllers and barriers",
    description: "Integration depends on a site assessment of the installed controller, relay, and barrier interface.",
    icon: "controller"
  },
  {
    title: "Residential operations",
    description: "Designed around vehicle-linked RFID access, society administration, and resident activity.",
    icon: "residentialAccess"
  },
  {
    title: "Guarded camera pilots",
    description: "ANPR is limited to approved, guarded pilots with confirmed camera and operating conditions.",
    icon: "anprPilot"
  }
]);

export const FEEDBACK_STATES = Object.freeze([
  {
    state: "empty",
    title: "No deployment proof published",
    description: "Case-study evidence remains hidden until the business approves a named deployment and publication scope."
  },
  {
    state: "loading",
    title: "Checking assessment details",
    description: "The action retains its label and visible focus while work is in progress."
  },
  {
    state: "error",
    title: "Assessment request needs attention",
    description: "The error identifies what needs to be corrected and does not rely on colour alone."
  }
]);

export function assertAvailabilityContent() {
  const keys = Object.keys(AVAILABILITY);

  if (keys.length !== AVAILABILITY_ORDER.length) {
    throw new Error("Availability content must define every approved state exactly once.");
  }

  for (const key of AVAILABILITY_ORDER) {
    const group = AVAILABILITY[key];
    if (!group || group.key !== key || group.items.length === 0) {
      throw new Error(`Invalid availability group: ${key}`);
    }
  }

  for (const key of ["pilot", "launching", "comingSoon"]) {
    if (AVAILABILITY[/** @type {AvailabilityKey} */ (key)].badge.toLowerCase() === "live") {
      throw new Error(`Future availability group cannot be live: ${key}`);
    }
  }

  return true;
}
