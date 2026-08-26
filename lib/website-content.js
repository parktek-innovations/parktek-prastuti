export const SITE = {
  name: "ParkTek",
  legalName: "ParkTek Technologies Pvt. Ltd.",
  url: "https://parktek.in",
  locale: "en_IN",
  headline: "Every gate. Every vehicle. Every parking transaction—connected.",
  description:
    "ParkTek connects residential access control with a launching commercial parking workspace for operators and property teams.",
  primaryCta: {
    label: "Book a Site Assessment",
    href: "/book-site-assessment/"
  },
  secondaryCta: {
    label: "Explore Commercial Parking",
    href: "/commercial-parking-management/"
  },
  socialImage: "/worlds/parktek-ecosystem.jpg"
};

export const CONTACT = {
  email: "support@parktek.in",
  emailHref: "mailto:support@parktek.in",
  phone: "+91 9899945876",
  phoneHref: "tel:+919899945876",
  address: "SK-70, Sector 112, Noida - 201301",
  mapHref: "https://maps.google.com/?q=SK-70%20Sector%20112%20Noida%20201301"
};

export const ANNOUNCEMENT = {
  enabled: false,
  label: "Commercial parking",
  text: "New: Commercial Parking & POS pilot onboarding is open in NCR.",
  href: "/commercial-parking-management/"
};

export const NAVIGATION = [
  {
    label: "Solutions",
    items: [
      {
        label: "Residential access control",
        description: "Connected vehicle identity, gate control and society operations.",
        href: "/residential-access-control/"
      },
      {
        label: "Commercial parking management",
        description: "Launching workflows for properties and parking operators.",
        href: "/commercial-parking-management/"
      },
      {
        label: "Parking POS",
        description: "A launching operator workspace; transaction tooling is in development.",
        href: "/commercial-parking-management/#parking-pos"
      },
      {
        label: "ANPR and RFID",
        description: "Live RFID access with guarded ANPR in pilot.",
        href: "/residential-access-control/#anpr-rfid"
      }
    ]
  },
  {
    label: "Industries",
    items: [
      {
        label: "Residential societies",
        description: "Access control for residents, gate teams and society managers.",
        href: "/residential-access-control/"
      },
      {
        label: "Malls and retail",
        description: "Launching lane, POS and operator workflows for retail parking.",
        href: "/commercial-parking-management/#malls-and-retail"
      },
      {
        label: "Corporate and IT parks",
        description: "Site-assessed access and parking operations for managed campuses.",
        href: "/commercial-parking-management/#corporate-and-it-parks"
      },
      {
        label: "Hospitals and hotels",
        description: "Site-assessed workflows for visitors, staff and parking teams.",
        href: "/commercial-parking-management/#hospitals-and-hotels"
      },
      {
        label: "Parking operators",
        description: "Launching tools for site teams and operator oversight.",
        href: "/commercial-parking-management/#parking-operators"
      }
    ]
  },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" }
];

export const METRICS = [
  {
    value: "15+",
    label: "societies",
    provisional: true,
    verified: false,
    requiresFounderVerification: true
  },
  {
    value: "25+",
    label: "barriers deployed",
    provisional: true,
    verified: false,
    requiresFounderVerification: true
  },
  {
    value: "10,000+",
    label: "registered users",
    provisional: true,
    verified: false,
    requiresFounderVerification: true
  },
  {
    value: "Live",
    label: "operations across NCR",
    provisional: true,
    verified: false,
    requiresFounderVerification: true
  }
];

export const SOLUTIONS = [
  {
    id: "residential",
    eyebrow: "Residential societies",
    title: "Secure everyday vehicle access.",
    description:
      "Link vehicle identity, RFID inventory, local gate decisions, resident tools and society operations in one access-control workflow.",
    status: "Live",
    capabilities: [
      "RFID access; guarded ANPR — Pilot",
      "Registered vehicle management",
      "Barrier relay integration",
      "Entry and exit history",
      "Administration dashboard",
      "Technical support"
    ],
    href: "/residential-access-control/",
    cta: "Explore Residential Access"
  },
  {
    id: "commercial",
    eyebrow: "Commercial properties and operators",
    title: "Control parking operations and revenue.",
    description:
      "Commercial parking and POS workflows are launching. Tariffs, shifts, payment records, reconciliation and AMC tooling remain in development.",
    status: "Launching",
    capabilities: [
      "Entry and exit sessions",
      "Configurable tariffs — In development",
      "Parking POS — Launching",
      "Operator shifts — In development",
      "Payment records — In development",
      "Revenue reconciliation — In development"
    ],
    href: "/commercial-parking-management/",
    cta: "Explore Commercial Parking"
  }
];

export const STEPS = [
  {
    number: "01",
    title: "Identify",
    description: "Read an assigned RFID tag, a guarded ANPR match, QR or another approved identity signal."
  },
  {
    number: "02",
    title: "Decide",
    description: "Apply the site, vehicle, permit and operator rules that are available for the deployment."
  },
  {
    number: "03",
    title: "Act",
    description: "Operate the approved barrier relay or route the exception to authorized site staff."
  },
  {
    number: "04",
    title: "Transact",
    description: "For commercial pilots, connect the parking session to the staged POS and payment-record workflow."
  },
  {
    number: "05",
    title: "Reconcile",
    description: "Commercial reconciliation is in development and will compare sessions, shifts and recorded payments."
  },
  {
    number: "06",
    title: "Analyse",
    description: "Review access activity, controller health and approved operational reporting from role-specific tools."
  }
];

export const RESIDENTIAL_STEPS = [
  {
    number: "01",
    title: "Identify",
    description: "Read an assigned RFID tag or another approved vehicle identity signal."
  },
  {
    number: "02",
    title: "Validate",
    description: "Check the vehicle, assignment and current permit state."
  },
  {
    number: "03",
    title: "Decide locally",
    description: "Use the Yantra controller's synced permit view for eligible gate decisions."
  },
  {
    number: "04",
    title: "Operate the barrier",
    description: "Trigger the approved relay flow or route an exception to gate staff."
  },
  {
    number: "05",
    title: "Record the event",
    description: "Keep the access event connected to its society and vehicle context."
  },
  {
    number: "06",
    title: "Monitor and support",
    description: "Review activity, controller health and support work from role-specific tools."
  }
];

export const STATUS_LABELS = {
  live: "Live",
  pilot: "Pilot",
  launching: "Launching",
  inDevelopment: "In development"
};

export const MODULES = [
  {
    id: "access",
    name: "ParkTek Access",
    status: STATUS_LABELS.live,
    summary: "Vehicle identity, RFID assignment, permit state and access records.",
    capabilities: ["Resident vehicle workflows", "RFID inventory and assignment", "Society-scoped access records"]
  },
  {
    id: "control",
    name: "ParkTek Control",
    status: STATUS_LABELS.live,
    summary: "Local gate decisions, boom-barrier relays and controller operations.",
    capabilities: ["Locally synced permit view", "Barrier relay integration", "Controller health and event sync"]
  },
  {
    id: "vision",
    name: "ParkTek Vision",
    status: STATUS_LABELS.pilot,
    summary: "Guarded ANPR as an additional registered-vehicle identity signal.",
    capabilities: ["Registered-vehicle matching", "Site-specific camera setup", "RFID and manual fallback"]
  },
  {
    id: "pos",
    name: "ParkTek POS",
    status: STATUS_LABELS.launching,
    summary: "An operator workspace for commercial parking workflows.",
    capabilities: ["Site operations foundation", "Operator-facing workspace", "Phased transaction tooling"]
  }
];

export const COMMERCIAL_CAPABILITIES = [
  {
    name: "Operator workspace",
    status: STATUS_LABELS.launching,
    description: "A shared operating view for commercial parking teams and properties."
  },
  {
    name: "Parking POS",
    status: STATUS_LABELS.launching,
    description: "A phased point-of-sale workspace for site operators."
  },
  {
    name: "Tariff configuration",
    status: STATUS_LABELS.inDevelopment,
    description: "Configurable parking tariffs and rules for approved site setups."
  },
  {
    name: "Shift management",
    status: STATUS_LABELS.inDevelopment,
    description: "Operator shift handover and accountability workflows."
  },
  {
    name: "Payment records",
    status: STATUS_LABELS.inDevelopment,
    description: "Record payment information without claiming payment gateway processing or custody of funds."
  },
  {
    name: "Reconciliation",
    status: STATUS_LABELS.inDevelopment,
    description: "Compare recorded parking activity, operator shifts and payment records."
  },
  {
    name: "AMC management",
    status: STATUS_LABELS.inDevelopment,
    description: "Track site equipment service and maintenance context."
  }
];

export const COMMERCIAL_PRODUCT_GROUPS = [
  {
    title: "Entry and exit",
    status: STATUS_LABELS.launching,
    description: "Lane workflows are scoped and released per approved pilot site.",
    items: [
      "Ticket-based, ticketless or hybrid workflow",
      "ANPR-linked entry sessions",
      "QR or barcode support where available",
      "Manual operator workflow and barrier override",
      "Lost-ticket handling"
    ]
  },
  {
    title: "Tariff engine",
    status: STATUS_LABELS.inDevelopment,
    description: "Tariff capabilities are roadmap scope, not a live public product claim.",
    items: [
      "Hourly tariffs and flat rates",
      "Grace periods",
      "Monthly passes",
      "Staff and tenant tariffs",
      "Complimentary parking",
      "Retail validation where supported"
    ]
  },
  {
    title: "POS operations",
    status: STATUS_LABELS.inDevelopment,
    description: "Operator and supervisor transaction tooling is being developed in phases.",
    items: [
      "Cashier accounts, operator login and shift opening",
      "Transaction collection and receipt generation",
      "Cash and supported digital payment records",
      "Reprint permissions and supervisor controls",
      "Shift closure and cash tracking",
      "Documented offline behaviour"
    ]
  },
  {
    title: "Reporting",
    status: STATUS_LABELS.inDevelopment,
    description: "Reports will only be represented as available after their underlying records are verified.",
    items: [
      "Revenue by gate, operator and recorded payment mode",
      "Shift variance",
      "Parking duration and peak-hour traffic",
      "Exceptions and device status",
      "Exportable reports"
    ]
  },
  {
    title: "Reliability",
    status: STATUS_LABELS.launching,
    description: "Fallback scope depends on the approved site design and deployed hardware.",
    items: [
      "Documented internet-outage behaviour",
      "Approved local fallback",
      "Authorized manual override",
      "Synchronization after reconnection",
      "Remote diagnostics where supported",
      "Multi-gate operations where approved"
    ]
  }
];

export const PRODUCT_PROOF = [
  {
    title: "Residential dashboard",
    placeholder: "Residential dashboard screenshot to be added",
    note: "Use an approved current capture with resident and vehicle data redacted."
  },
  {
    title: "Commercial operations dashboard",
    placeholder: "Commercial operations dashboard image to be added",
    note: "Add only after the launching workflow is ready for public review."
  },
  {
    title: "POS interface",
    placeholder: "Commercial POS pilot image to be added",
    note: "Do not present a concept interface as a live product screen."
  },
  {
    title: "Vehicle entry screen",
    placeholder: "Vehicle entry screen to be added",
    note: "Redact plates and personal data before publication."
  },
  {
    title: "Transaction report",
    placeholder: "Verified transaction report to be added",
    note: "Publish only with the capability status and data period clearly stated."
  },
  {
    title: "Barrier and controller hardware",
    placeholder: "Barrier and controller photograph to be added",
    note: "Use a current approved installation or lab photograph."
  },
  {
    title: "Site installation",
    placeholder: "Real installation photograph to be added",
    note: "Customer and site approval are required before publication."
  }
];

export const COMPATIBILITY = [
  {
    name: "Boom barriers",
    description: "Relay integration for approved existing or new barrier equipment.",
    confirmationRequired: true
  },
  {
    name: "RFID readers",
    description: "Approved reader and tag combinations for vehicle access.",
    confirmationRequired: true
  },
  {
    name: "ANPR cameras",
    description: "Site-assessed camera placement and streams for ANPR pilots.",
    confirmationRequired: true
  },
  {
    name: "Controllers",
    description: "A surveyed controller, connectivity and backup-power plan for each gate.",
    confirmationRequired: true
  },
  {
    name: "POS hardware",
    description: "Commercial pilot hardware is confirmed against the staged operator workflow.",
    confirmationRequired: true
  },
  {
    name: "APIs and webhooks",
    description: "Integration scope is documented per approved system and data boundary.",
    confirmationRequired: true
  }
];

export const DEPLOYMENT_STEPS = [
  {
    number: "01",
    title: "Site assessment",
    description: "Survey gates, traffic flow, equipment, connectivity and operating needs."
  },
  {
    number: "02",
    title: "System design and proposal",
    description: "Confirm the approved hardware, software scope, fallbacks and rollout plan."
  },
  {
    number: "03",
    title: "Installation and integration",
    description: "Connect approved readers, controllers, barriers and site systems."
  },
  {
    number: "04",
    title: "Operator or resident onboarding",
    description: "Validate normal and exception flows, then train the responsible site teams or residents."
  },
  {
    number: "05",
    title: "Go-live, monitoring and AMC",
    description: "Launch with monitored handover, documented fallback contacts and the agreed maintenance scope."
  }
];

export const CASE_STUDIES = [
  {
    slug: "residential-access-deployment",
    title: "Residential access deployment story",
    summary:
      "This deployment story is being prepared with customer approval. Verified scope, images and outcomes will be added before publication.",
    location: "Location to be verified",
    city: "City to be verified",
    siteType: "Residential society",
    customer: "Customer name pending approval",
    gates: "To be verified",
    barriers: "To be verified",
    problem: "Customer-approved problem statement to be added.",
    solution: "Verified deployed hardware and ParkTek scope to be added.",
    deploymentTime: "To be verified",
    registeredVehiclesOrResidents: "To be verified",
    measurableResults: "Measured results and source period to be added after verification.",
    customerQuote: "Customer-approved quote to be added.",
    images: [],
    status: "Story in preparation",
    image: null,
    isPlaceholder: true,
    requiresFounderVerification: true
  }
];

export const FAQS = [
  {
    question: "Which ParkTek capabilities are live today?",
    answer:
      "Residential access and edge control are live. Guarded ANPR is in pilot. Commercial parking and POS are launching, while tariffs, shifts, payment records, reconciliation and AMC tooling are in development."
  },
  {
    question: "How does vehicle access work?",
    answer:
      "A vehicle is linked to an active identity and permit state. The Yantra controller uses locally synced data for eligible barrier decisions, while exceptions remain available to authorized gate staff."
  },
  {
    question: "Can an unknown number plate open the gate automatically?",
    answer:
      "Not by default. The ANPR pilot is a guarded identity signal for eligible registered vehicles. Any controller-scoped visitor exception must be explicitly enabled with the approved safety and audit controls; RFID and authorized manual operations remain available as fallbacks."
  },
  {
    question: "What happens if the internet connection drops?",
    answer:
      "The controller can continue eligible decisions from its synced local permit view and queue events for later sync. Locked, lost, blocked, inactive or unassigned states remain deny conditions."
  },
  {
    question: "Does ParkTek process parking payments?",
    answer:
      "ParkTek does not currently claim payment gateway processing or custody of funds. Commercial payment-record and reconciliation workflows are in development."
  },
  {
    question: "Will ParkTek work with our existing equipment?",
    answer:
      "Compatibility depends on the barrier, reader, camera, network and site configuration. ParkTek confirms supported equipment and any replacement needs during the site assessment."
  },
  {
    question: "What happens after a site assessment?",
    answer:
      "You receive a scoped recommendation covering gates, approved equipment, operating workflows, fallbacks, rollout steps and the capabilities available for your site."
  }
];

export const RESIDENTIAL_FAQS = [
  {
    question: "Can ParkTek work alongside our existing society-management system?",
    answer:
      "ParkTek can be scoped as a vehicle-access layer without requiring a society-management replacement. Any data or workflow integration is confirmed during the site assessment."
  },
  {
    question: "Can residents use RFID and ANPR together?",
    answer:
      "RFID is the live primary identity path. Guarded ANPR can be piloted as an additional signal for eligible registered vehicles; unknown plates do not auto-open by default."
  },
  {
    question: "What happens during an exception or connectivity outage?",
    answer:
      "Authorized gate staff retain the approved manual path, while the controller can use its synced local permit view for eligible decisions and queue events for later sync."
  },
  {
    question: "How are installation and support scoped?",
    answer:
      "ParkTek surveys the gates, readers, barriers, cameras, power and network before proposing installation, onboarding, fallback procedures and the agreed AMC or support scope."
  }
];

export const INDUSTRIES = [
  {
    name: "Residential societies",
    status: STATUS_LABELS.live,
    description: "Connected access for residents, gate staff and society operations.",
    href: "/residential-access-control/"
  },
  {
    name: "Malls and retail",
    status: STATUS_LABELS.launching,
    description: "Launching lane, POS and operator workflows for retail parking.",
    href: "/commercial-parking-management/#malls-and-retail"
  },
  {
    name: "Corporate and IT parks",
    status: STATUS_LABELS.launching,
    description: "Site-assessed access and parking workflows for managed campuses.",
    href: "/commercial-parking-management/#corporate-and-it-parks"
  },
  {
    name: "Hospitals and hotels",
    status: STATUS_LABELS.launching,
    description: "Site-assessed visitor, staff and operator parking workflows.",
    href: "/commercial-parking-management/#hospitals-and-hotels"
  },
  {
    name: "Parking operators",
    status: STATUS_LABELS.launching,
    description: "Launching site and operator workflows with phased transaction tooling.",
    href: "/commercial-parking-management/#parking-operators"
  }
];

export const TEAM = [
  {
    name: "ParkTek founding and operations team",
    role: "Leadership profile pending publication approval",
    bio: "ParkTek's current team profile will be added after names, roles and photographs are approved for public use.",
    image: null,
    requiresFounderVerification: true
  }
];

export const REQUIRED_ROUTES = [
  "/",
  "/residential-access-control/",
  "/commercial-parking-management/",
  "/case-studies/",
  "/case-studies/[slug]/",
  "/about/",
  "/book-site-assessment/",
  "/contact/",
  "/security/",
  "/privacy-policy/",
  "/terms-of-service/"
];
