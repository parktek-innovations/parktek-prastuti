export const SITE = {
  name: "ParkTek",
  legalName: "PARKTEK INNOVATION PRIVATE LIMITED",
  url: "https://parktek.in",
  locale: "en_IN",
  headline: "Every gate. Every vehicle. Every parking transaction—connected.",
  description:
    "ParkTek connects live residential RFID and ANPR access with commercial parking and POS operations for property and site teams.",
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
  text: "Commercial Parking & POS site assessments are open in NCR.",
  href: "/commercial-parking-management/"
};

export const NAVIGATION = [
  {
    label: "Solutions",
    items: [
      {
        label: "Residential",
        items: [
          {
            label: "ANPR and RFID",
            description: "Live RFID and ANPR vehicle access for residential sites.",
            href: "/residential-access-control/#anpr-rfid"
          },
          {
            label: "Others",
            description: "Share a residential access-control requirement for site assessment.",
            href: "/book-site-assessment/"
          }
        ]
      },
      {
        label: "Commercial",
        items: [
          {
            label: "Malls and retail",
            description: "Connected lane, POS and operator workflows for retail parking.",
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
            description: "Connected tools for site teams and operator oversight.",
            href: "/commercial-parking-management/#parking-operators"
          },
          {
            label: "Others",
            description: "Share another commercial parking requirement for site assessment.",
            href: "/book-site-assessment/"
          }
        ]
      }
    ]
  },
  { label: "Case Studies", href: "/case-studies/" },
  { label: "FASTag", href: "/fastag/" },
  { label: "E-Challan", href: "/e-challan/" },
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
      "RFID and ANPR vehicle access",
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
      "Connect entry and exit, operator POS, parking records and reporting across commercial sites.",
    status: "Live",
    capabilities: [
      "Entry and exit sessions",
      "Configurable tariffs",
      "Parking POS",
      "Operator shifts",
      "Payment records",
      "Revenue reconciliation"
    ],
    href: "/commercial-parking-management/",
    cta: "Explore Commercial Parking"
  }
];

export const STEPS = [
  {
    number: "01",
    title: "Identify",
    description: "Read an assigned RFID tag, an ANPR match, QR code or another approved identity signal."
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
    description: "Connect each commercial parking session to the POS and payment-record workflow."
  },
  {
    number: "05",
    title: "Reconcile",
    description: "Compare parking sessions, operator shifts and recorded payment information."
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
    status: STATUS_LABELS.live,
    summary: "ANPR matching as an additional registered-vehicle identity signal.",
    capabilities: ["Registered-vehicle matching", "Site-specific camera setup", "RFID and manual fallback"]
  },
  {
    id: "pos",
    name: "ParkTek POS",
    status: STATUS_LABELS.live,
    summary: "An operator workspace for commercial parking workflows.",
    capabilities: ["Site operations foundation", "Operator-facing workspace", "Parking-session and receipt workflows"]
  }
];

export const COMMERCIAL_CAPABILITIES = [
  {
    name: "Operator workspace",
    status: STATUS_LABELS.live,
    description: "A shared operating view for commercial parking teams and properties."
  },
  {
    name: "Parking POS",
    status: STATUS_LABELS.live,
    description: "A point-of-sale workspace for site operators."
  },
  {
    name: "Tariff configuration",
    status: STATUS_LABELS.live,
    description: "Configurable parking tariffs and rules for approved site setups."
  },
  {
    name: "Shift management",
    status: STATUS_LABELS.live,
    description: "Operator shift handover and accountability workflows."
  },
  {
    name: "Payment records",
    status: STATUS_LABELS.live,
    description: "Record payment information for parking operations while authorized payment providers handle gateway processing and funds."
  },
  {
    name: "Reconciliation",
    status: STATUS_LABELS.live,
    description: "Compare recorded parking activity, operator shifts and payment records."
  },
  {
    name: "AMC management",
    status: STATUS_LABELS.live,
    description: "Track site equipment service and maintenance context."
  }
];

export const COMMERCIAL_PRODUCT_GROUPS = [
  {
    title: "Entry and exit",
    status: STATUS_LABELS.live,
    description: "Manage vehicle entry, exit and lane exceptions across configured commercial sites.",
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
    status: STATUS_LABELS.live,
    description: "Apply configured rates, grace periods, passes and validation rules to parking sessions.",
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
    status: STATUS_LABELS.live,
    description: "Give operators and supervisors a connected workspace for parking sessions, receipts and shift activity.",
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
    status: STATUS_LABELS.live,
    description: "Review parking activity, recorded revenue, operator shifts, exceptions and device status.",
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
    status: STATUS_LABELS.live,
    description: "Operational fallback and continuity are configured for each site's design and hardware.",
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
    title: "Barrier & controller hardware",
    image: "/figma/product-proof/barrier-controller-hardware.png",
    alt: "ParkTek boom barrier and access controller hardware",
    note: "Boom barrier, controller enclosure and lane-side recognition hardware."
  },
  {
    title: "Residential dashboard",
    image: "/figma/product-proof/residential-dashboard.png",
    alt: "ParkTek residential operations dashboard",
    note: "Society-scoped access activity, vehicle records and controller health in one operational view."
  },
  {
    title: "Site installation",
    image: "/figma/product-proof/site-installation.png",
    alt: "ParkTek residential parking access installation",
    note: "Residential gate installation with barrier, controller and vehicle-identification hardware."
  },
  {
    title: "Commercial operations dashboard",
    image: "/figma/product-proof/commercial-operations-dashboard.png",
    alt: "ParkTek commercial parking operations dashboard",
    note: "Commercial parking activity, occupancy and operator reporting view."
  },
  {
    title: "Vehicle entry screen",
    image: "/figma/product-proof/vehicle-entry-screen.png",
    alt: "ParkTek ANPR vehicle entry recognition installation",
    note: "Vehicle recognition equipment positioned at a controlled residential entry lane."
  },
  {
    title: "POS interface",
    image: "/figma/product-proof/pos-interface.png",
    alt: "ParkTek parking POS operator interface",
    note: "Operator sessions, tariffs, payment records and receipt workflow."
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
    description: "Camera placement and stream compatibility are confirmed during site assessment.",
    confirmationRequired: true
  },
  {
    name: "Controllers",
    description: "A surveyed controller, connectivity and backup-power plan for each gate.",
    confirmationRequired: true
  },
  {
    name: "POS hardware",
    description: "POS hardware compatibility is confirmed against the site's operator workflow.",
    confirmationRequired: true
  },
  {
    name: "APIs and webhooks",
    description: "Integration scope is documented for each supported system and data boundary.",
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
    description: "Confirm the supported hardware, software scope, fallbacks and delivery plan."
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
    title: "Residential access deployment overview",
    summary:
      "An overview of ParkTek's residential vehicle-access approach. Customer-specific deployment details and results are not published on this page.",
    location: "Not publicly disclosed",
    city: "Not publicly disclosed",
    siteType: "Residential society",
    customer: "Not publicly disclosed",
    gates: "Not publicly disclosed",
    barriers: "Not publicly disclosed",
    problem: "Residential sites need dependable vehicle identification, controlled gate decisions and clear exception handling.",
    solution: "ParkTek connects RFID and ANPR identity, local controller decisions, barrier operations and access records.",
    deploymentTime: "Not publicly disclosed",
    registeredVehiclesOrResidents: "Not publicly disclosed",
    measurableResults: "Customer-specific results are not published on this page.",
    customerQuote: "Customer comments are not published on this page.",
    images: [],
    status: "Deployment overview",
    image: null,
    isPlaceholder: true,
    requiresFounderVerification: true
  }
];

export const FAQS = [
  {
    question: "Which ParkTek capabilities are live today?",
    answer:
      "Residential RFID and ANPR access, edge control, commercial parking and Parking POS are live, including tariffs, operator shifts, payment records, reconciliation and AMC workflows."
  },
  {
    question: "How does vehicle access work?",
    answer:
      "A vehicle is linked to an active identity and permit state. The Yantra controller uses locally synced data for eligible barrier decisions, while exceptions remain available to authorized gate staff."
  },
  {
    question: "Can an unknown number plate open the gate automatically?",
    answer:
      "No. ANPR matches eligible registered vehicles; an unknown plate is not an authorization signal. Any visitor exception must be explicitly enabled with site safety and audit controls, while RFID and authorized manual handling remain available."
  },
  {
    question: "What happens if the internet connection drops?",
    answer:
      "The controller can continue eligible decisions from its synced local permit view and queue events for later sync. Locked, lost, blocked, inactive or unassigned states remain deny conditions."
  },
  {
    question: "Does ParkTek process parking payments?",
    answer:
      "ParkTek provides parking POS and payment-record tools. Authorized payment providers handle gateway processing and funds; ParkTek does not present itself as a bank, payment gateway or custodian of customer funds."
  },
  {
    question: "Will ParkTek work with our existing equipment?",
    answer:
      "Compatibility depends on the barrier, reader, camera, network and site configuration. ParkTek confirms supported equipment and any replacement needs during the site assessment."
  },
  {
    question: "What happens after a site assessment?",
    answer:
      "You receive a scoped recommendation covering gates, supported equipment, operating workflows, fallbacks, delivery steps and the capabilities available for your site."
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
      "Yes. RFID and ANPR can work together as registered-vehicle identity modes; unknown plates do not auto-open by default."
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
    status: STATUS_LABELS.live,
    description: "Connected lane, POS and operator workflows for retail parking.",
    href: "/commercial-parking-management/#malls-and-retail"
  },
  {
    name: "Corporate and IT parks",
    status: STATUS_LABELS.live,
    description: "Site-assessed access and parking workflows for managed campuses.",
    href: "/commercial-parking-management/#corporate-and-it-parks"
  },
  {
    name: "Hospitals and hotels",
    status: STATUS_LABELS.live,
    description: "Site-assessed visitor, staff and operator parking workflows.",
    href: "/commercial-parking-management/#hospitals-and-hotels"
  },
  {
    name: "Parking operators",
    status: STATUS_LABELS.live,
    description: "Connected site, operator and parking-transaction workflows.",
    href: "/commercial-parking-management/#parking-operators"
  }
];

export const TEAM = [
  {
    name: "ParkTek operations team",
    role: "Connected parking operations",
    bio: "ParkTek brings together site assessment, access-control technology, commercial parking operations and ongoing support.",
    image: null,
    requiresFounderVerification: true
  }
];

export const REQUIRED_ROUTES = [
  "/",
  "/residential-access-control/",
  "/commercial-parking-management/",
  "/fastag/",
  "/e-challan/",
  "/case-studies/",
  "/case-studies/residential-access-deployment/",
  "/about/",
  "/book-site-assessment/",
  "/contact/",
  "/security/",
  "/privacy-policy/",
  "/terms-of-service/"
];
