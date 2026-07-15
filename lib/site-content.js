export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Platform", href: "/#platform" },
  { label: "Residents", href: "/#residents" },
  { label: "Operations", href: "/#operations" },
  { label: "Contact Us", href: "/contact/" }
];

export const FAQ_ITEMS = [
  {
    question: "Who is ParkTek built for?",
    answer:
      "ParkTek is built for residential societies. It connects residents, guards, society managers, administrators and ParkTek operations through role-specific mobile and web experiences."
  },
  {
    question: "How does vehicle access work?",
    answer:
      "A vehicle is linked to an active RFID assignment and permit state. The Yantra controller uses locally synced data to decide at the barrier. Registered-only guarded ANPR can provide another identity signal where the approved site configuration supports it."
  },
  {
    question: "What can residents do in the ParkTek app?",
    answer:
      "Residents can sign in by phone, manage vehicles, activate an assigned tag, lock or unlock a vehicle, review activity, receive notifications, chat in vehicle context, contact support and use referrals."
  },
  {
    question: "What can society and gate teams manage?",
    answer:
      "Authorized teams can manage society users, vehicles and allocated RFID inventory, review access logs, inspect controller health, handle support work and use society-scoped gate lookups, approvals, alerts and incident workflows."
  },
  {
    question: "What happens if the cloud connection drops?",
    answer:
      "Yantra keeps a local permit view for eligible registered decisions and queues events for later sync. Locked, lost, blocked, inactive or unassigned states remain deny conditions. RFID and approved manual operations remain part of the field fallback."
  },
  {
    question: "How does ParkTek handle support and auditability?",
    answer:
      "Support tickets, replies, attachments and status changes stay connected to the right society context. Access events, sensitive gate lookups and operational actions are designed to leave an auditable record."
  }
];

export const CONTACT_DETAILS = {
  email: "support@parktek.in",
  phone: "+91 9899945876",
  address: "SK-70, Sector - 112, Noida - 201305"
};

export const APP_LINKS = {
  dashboard: "https://dashboard.parktek.in",
  android: "https://play.google.com/store/apps/details?id=com.parktek.app&pcampaignid=web_share",
  ios: "https://apps.apple.com/ca/app/parktek/id6760598237"
};

export const CONTACT_CHANNELS = [
  {
    label: "Email",
    value: CONTACT_DETAILS.email,
    href: `mailto:${CONTACT_DETAILS.email}`
  },
  {
    label: "Phone",
    value: CONTACT_DETAILS.phone,
    href: "tel:+919899945876"
  },
  {
    label: "Visit",
    value: CONTACT_DETAILS.address,
    href: "https://maps.google.com/?q=SK-70%2C%20Sector%20112%2C%20Noida%20201305"
  }
];

export const LEGAL_LINKS = [
  { label: "Terms of Service", href: "/terms-of-service/" },
  { label: "Privacy Policy", href: "/privacy-policy/" }
];
