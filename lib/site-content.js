export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Solutions", href: "/#solutions" },
  { label: "About Us", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Contact Us", href: "/contact/" }
];

export const FAQ_ITEMS = [
  {
    question: "What types of parking solutions do you offer?",
    answer: [
      "Boom Barriers: automated vehicle flow management",
      "ANPR Systems: advanced license plate recognition",
      "POS Devices: seamless payment processing",
      "Web Dashboard: real-time monitoring and analytics",
      "Mobile Apps: user-friendly parking management"
    ]
  },
  {
    question: "How does your system improve operational efficiency?",
    answer:
      "ParkTek reduces manual gate handling, speeds up vehicle verification, centralizes list tagging, and gives operations teams one view of access and movement across the site."
  },
  {
    question: "Are your systems customizable?",
    answer:
      "Yes. The stack can be adapted for residential communities, corporate campuses, valet environments, and fleet-heavy premises with the right mix of hardware and workflows."
  },
  {
    question: "What payment options are supported?",
    answer:
      "The platform is designed to work with contactless payment flows such as QR and FASTag-led experiences, alongside automated exit logic where the site hardware supports it."
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "ParkTek provides deployment guidance, operator onboarding, and ongoing support for hardware integration and smart parking operations."
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
