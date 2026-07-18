export const MINIMUM_COMPLETION_TIME_MS = 3000;

export const REQUIREMENTS = [
  "Residential",
  "Commercial Parking",
  "Parking POS",
  "Partnership",
  "Support",
];

export const TIMELINES = [
  "Immediately",
  "Within 30 days",
  "1–3 months",
  "3+ months",
  "Exploring options",
];

function text(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function validateLead(values = {}) {
  const errors = {};
  const fullName = text(values.fullName);
  const phoneNumber = text(values.phoneNumber);
  const emailAddress = text(values.emailAddress);
  const companyName = text(values.companyName);
  const city = text(values.city);
  const requirement = text(values.requirement);
  const gates = text(values.gates);
  const parkingCapacity = text(values.parkingCapacity);
  const existingEquipment = text(values.existingEquipment);
  const timeline = text(values.timeline);
  const message = text(values.message);
  const phoneDigits = phoneNumber.replace(/\D/g, "");

  if (fullName.length < 2 || fullName.length > 120) errors.fullName = "Enter your full name.";
  if (
    phoneDigits.length < 10 ||
    phoneDigits.length > 15 ||
    !/^[0-9+\-().\s]{7,20}$/.test(phoneNumber)
  ) {
    errors.phoneNumber = "Enter a valid phone number.";
  }
  if (emailAddress.length > 160 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    errors.emailAddress = "Enter a valid work email.";
  }
  if (companyName.length < 2 || companyName.length > 160) {
    errors.companyName = "Enter your organisation or property name.";
  }
  if (city.length < 2 || city.length > 100) errors.city = "Enter your city.";
  if (!REQUIREMENTS.includes(requirement)) errors.requirement = "Choose your primary requirement.";
  if (gates && (!/^\d+$/.test(gates) || Number(gates) < 1 || Number(gates) > 10000)) {
    errors.gates = "Enter a whole number greater than zero.";
  }
  if (
    parkingCapacity &&
    (!/^\d+$/.test(parkingCapacity) ||
      Number(parkingCapacity) < 1 ||
      Number(parkingCapacity) > 10000000)
  ) {
    errors.parkingCapacity = "Enter a whole number greater than zero.";
  }
  if (existingEquipment.length > 240) errors.existingEquipment = "Keep equipment details under 240 characters.";
  if (timeline && !TIMELINES.includes(timeline)) errors.timeline = "Choose a valid timeline.";
  if (message.length < 10 || message.length > 2000) {
    errors.message = "Add 10–2000 characters about your site.";
  }
  if (values.consent !== true) errors.consent = "Consent is required before we can contact you.";

  return errors;
}

export function buildProjectContext(values, source, submittedAt = new Date()) {
  return [
    `Lead source: ${text(source).slice(0, 120) || "ParkTek website"}`,
    `Requirement: ${text(values.requirement)}`,
    `City: ${text(values.city)}`,
    `Gates: ${text(values.gates) || "Not provided"}`,
    `Parking capacity: ${text(values.parkingCapacity) || "Not provided"}`,
    `Existing equipment: ${text(values.existingEquipment) || "Not provided"}`,
    `Timeline: ${text(values.timeline) || "Not provided"}`,
    "Contact consent: Yes — ParkTek may contact this person about this request.",
    `Consent captured: ${submittedAt.toISOString()}`,
    "",
    text(values.message),
  ].join("\n");
}
