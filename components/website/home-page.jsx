import Image from "next/image";
import {
  Activity,
  ArrowRight,
  Camera,
  CircleDot,
  Cpu,
  Gauge,
  Radio,
  Tag
} from "lucide-react";

import { CaseStudyCard } from "@/components/website/case-study-card";
import { HomepageScrollWorld } from "@/components/website/homepage-scroll-world";
import {
  ANNOUNCEMENT,
  CASE_STUDIES,
  COMMERCIAL_PRODUCT_GROUPS,
  COMPATIBILITY,
  DEPLOYMENT_STEPS,
  FAQS,
  METRICS,
  MODULES,
  PRODUCT_PROOF,
  SITE,
  SOLUTIONS,
  STATUS_LABELS,
  STEPS
} from "@/lib/website-content";
import { StatusPill } from "@/components/website/status-pill";

import styles from "./home-page.module.css";

const moduleIcons = {
  access: Radio,
  control: Cpu,
  vision: Camera,
  pos: Gauge
};

const SHOW_DEPLOYMENT_STORIES = false;

const commercialCapabilityIcons = {
  "Entry and exit": "/figma/commercial/entry-exit.svg",
  "Tariff engine": "/figma/commercial/tariff.svg",
  "POS operations": "/figma/commercial/pos-terminal.svg",
  Reporting: "/figma/commercial/reporting.svg",
  Reliability: "/figma/commercial/reliability.svg"
};

const commercialCapabilityVisuals = {
  "Entry and exit": {
    src: "/figma/commercial/entry-exit-visual.png",
    alt: "Vehicle approaching a ParkTek-controlled parking barrier."
  },
  "Tariff engine": {
    src: "/figma/commercial/tariff-engine-visual.png",
    alt: "Parking tariff interface with a ticket and rupee pricing controls."
  },
  "POS operations": {
    src: "/figma/commercial/pos-operations-visual.png",
    alt: "Parking operator using a POS terminal with a receipt printer and payment reader."
  },
  Reporting: {
    src: "/figma/commercial/reporting-visual.png",
    alt: "Parking operations dashboard with charts, activity records and parking occupancy."
  },
  Reliability: {
    src: "/figma/commercial/reliability-visual.png",
    alt: "Parking barrier and camera equipment connected through secured local devices and backup power."
  }
};

const compatibilityIcons = {
  "Boom barriers": "/figma/compatibility/boom-barrier.svg",
  "RFID readers": "/figma/compatibility/rfid-reader.svg",
  "ANPR cameras": "/figma/compatibility/anpr-camera.svg",
  Controllers: "/figma/compatibility/controller.svg",
  "POS hardware": "/figma/compatibility/pos-hardware.svg",
  "APIs and webhooks": "/figma/compatibility/api-webhooks.svg"
};

const trustItems = [
  {
    icon: "/figma/security/role-based-access.svg",
    title: "Role-based access",
    description:
      "Product access is scoped to authorized roles and the relevant society or operating context."
  },
  {
    icon: "/figma/security/audit-context.svg",
    title: "Audit context",
    description:
      "Access events, sensitive gate lookups, controller state and support work retain operating context."
  },
  {
    icon: "/figma/security/encryption-boundaries.svg",
    title: "Encryption boundaries",
    description:
      "Production web and API traffic uses HTTPS/TLS; environment-specific storage and backup controls are reviewed for each deployment."
  },
  {
    icon: "/figma/security/retention-deletion.svg",
    title: "Retention and deletion scope",
    description:
      "Retention and deletion requirements are documented for each supported deployment."
  },
  {
    icon: "/figma/security/customer-permissions.svg",
    title: "Customer-controlled permissions",
    description:
      "Authorized customer teams control who can use society- and site-scoped operating workflows."
  },
  {
    icon: "/figma/security/responsible-vehicle-data.svg",
    title: "Responsible vehicle data",
    description:
      "Vehicle, plate and access data is limited to the approved operating purpose and handled within documented boundaries."
  }
];

const partnerSocieties = [
  {
    name: "Arihant Group",
    src: "/figma/partner-societies/arihant-group.png",
    width: 1254,
    height: 1254
  },
  {
    name: "Orris",
    src: "/figma/partner-societies/orris.png",
    width: 1536,
    height: 1024
  },
  {
    name: "Godrej Properties",
    src: "/figma/partner-societies/godrej-properties.png",
    width: 1968,
    height: 799
  },
  {
    name: "Godrej Living",
    src: "/figma/partner-societies/godrej-living.png",
    width: 1748,
    height: 900
  },
  {
    name: "Mahagun",
    src: "/figma/partner-societies/mahagun.png",
    width: 1539,
    height: 1022
  },
  {
    name: "Presidency Infraheights",
    src: "/figma/partner-societies/presidency-infraheights.png",
    width: 1254,
    height: 1254
  },
  {
    name: "Gaurs",
    src: "/figma/partner-societies/gaurs.png",
    width: 1536,
    height: 1024
  },
  {
    name: "Supertech",
    src: "/figma/partner-societies/supertech.png",
    width: 1536,
    height: 1024
  },
  {
    name: "Purvanchal",
    src: "/figma/partner-societies/purvanchal.png",
    width: 1846,
    height: 852
  },
  {
    name: "Aditya",
    src: "/figma/partner-societies/aditya.png",
    width: 1639,
    height: 960
  },
  {
    name: "Saya",
    src: "/figma/partner-societies/saya.png",
    width: 1610,
    height: 977
  },
  {
    name: "Dream Heights",
    src: "/figma/partner-societies/dream-heights.png",
    width: 1722,
    height: 913
  },
  {
    name: "Rudra",
    src: "/figma/partner-societies/rudra.png",
    width: 1665,
    height: 945
  },
  {
    name: "Apex South City",
    src: "/figma/partner-societies/apex-south-city.png",
    width: 1254,
    height: 1254
  }
];

const partnerSocietyRows = [partnerSocieties.slice(0, 7), partnerSocieties.slice(7)];

function ArrowIcon() {
  return <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />;
}

function HeroHud({ className, icon: Icon, label, value }) {
  return (
    <div className={className}>
      <span aria-hidden="true" className={styles.hudIcon}>
        <Icon size={19} strokeWidth={1.8} />
      </span>
      <span className={styles.hudCopy}>
        <span className={styles.hudLabel}>{label}</span>
        <span className={styles.hudValue}>{value}</span>
      </span>
      <span aria-hidden="true" className={styles.hudStatus} />
    </div>
  );
}

function ParkingCar({ className = "" }) {
  return (
    <span aria-hidden="true" className={`${styles.parkingCar} ${className}`}>
      <span className={styles.carCabin} />
      <span className={styles.carWindshield} />
      <span className={styles.carLightLeft} />
      <span className={styles.carLightRight} />
      <span className={styles.carWheelLeft} />
      <span className={styles.carWheelRight} />
    </span>
  );
}

function BarrierGate({ className = "" }) {
  return (
    <span aria-hidden="true" className={`${styles.barrierGate} ${className}`}>
      <span className={styles.barrierColumn}>
        <span className={styles.barrierSignal} />
      </span>
      <span className={styles.barrierArm}>
        <span />
        <span />
        <span />
      </span>
    </span>
  );
}

function SectionHeading({ eyebrow, title, lead }) {
  return (
    <div className={styles.sectionHeading}>
      <div>
        <span className={styles.sectionKicker}>{eyebrow}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      <p className={styles.sectionLead}>{lead}</p>
    </div>
  );
}

function PartnerLogoGroup({ logos, duplicate = false }) {
  return (
    <div aria-hidden={duplicate || undefined} className={styles.partnerLogoGroup}>
      {logos.map((logo) => (
        <div className={styles.partnerLogoCell} key={logo.name}>
          <Image
            alt={duplicate ? "" : `${logo.name} logo`}
            className={styles.partnerLogoImage}
            height={logo.height}
            sizes="(max-width: 620px) 132px, 180px"
            src={logo.src}
            width={logo.width}
          />
        </div>
      ))}
    </div>
  );
}

function PartnerSocieties() {
  return (
    <section aria-labelledby="partner-societies-title" className={styles.partnerSocieties}>
      <div className={styles.container}>
        <span className={`${styles.sectionKicker} ${styles.partnerSocietiesKicker}`}>Partner societies</span>
        <div className={styles.partnerSocietiesPanel}>
          <div className={styles.partnerSocietiesHeader}>
            <h2 id="partner-societies-title">Trusted across connected societies</h2>
            <p>ParkTek is active in residential communities and connected parking sites.</p>
          </div>

          <div className={styles.partnerLogoRows}>
            {partnerSocietyRows.map((logos, index) => (
              <div className={styles.partnerLogoViewport} key={`partner-row-${index + 1}`}>
                <div className={styles.partnerLogoTrack} data-row={index + 1}>
                  <PartnerLogoGroup logos={logos} />
                  <PartnerLogoGroup duplicate logos={logos} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommercialCapabilityVisual({ capability }) {
  const visual = commercialCapabilityVisuals[capability.title];
  const statusClass = capability.status === STATUS_LABELS.live
    ? styles.commercialStatusLive
    : styles.commercialStatusDevelopment;

  return (
    <div className={styles.commercialCapabilityVisual}>
      <Image
        alt={visual.alt}
        className={styles.commercialCapabilityImage}
        height={220}
        sizes="(max-width: 620px) calc(100vw - 64px), 160px"
        src={visual.src}
        width={320}
      />
      <strong className={`${styles.commercialStatusBadge} ${statusClass}`}>
        {capability.status}
      </strong>
    </div>
  );
}

export function WebsiteHomePage() {
  const caseStudy = CASE_STUDIES[0];
  const verifiedMetrics = METRICS.filter((metric) => metric.verified);

  return (
    <main className={styles.page} id="main-content">
      {ANNOUNCEMENT.enabled ? (
        <div className={styles.announcement}>
          <a href={ANNOUNCEMENT.href}>
            <strong>{ANNOUNCEMENT.label}</strong>
            <span>{ANNOUNCEMENT.text}</span>
            <ArrowIcon />
          </a>
        </div>
      ) : null}

      <section className={styles.hero} id="home">
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Connected parking operations</span>
            <h1 className={styles.heroTitle}>
              Every gate. Every vehicle. Every parking transaction<span className={styles.heroAccent}>—connected.</span>
            </h1>
            <p className={styles.heroLead}>
              ParkTek connects residential RFID and ANPR access, local gate control, commercial parking and POS
              operations in one operating workflow.
            </p>
            <div className={styles.actionRow}>
              <a className={`${styles.primaryButton} ${styles.heroPrimaryButton}`} href={SITE.primaryCta.href}>
                {SITE.primaryCta.label}
                <ArrowIcon />
              </a>
              <a className={styles.secondaryButton} href={SITE.secondaryCta.href}>
                {SITE.secondaryCta.label}
              </a>
            </div>
            <ul className={styles.reassurance} aria-label="Capability availability">
              <li className={styles.reassuranceLive}>RFID access live</li>
              <li className={styles.reassuranceLive}>ANPR live</li>
              <li className={styles.reassuranceLive}>Commercial workflows live</li>
            </ul>
          </div>

          <div className={styles.worldFrame}>
            <HomepageScrollWorld />
            <HeroHud className={styles.hud} icon={Tag} label="Vehicle identity" value="Permit verified" />
            <HeroHud className={styles.gateHud} icon={Cpu} label="Local controller" value="Decision ready" />
            <HeroHud className={styles.occupancyHud} icon={Activity} label="Operations" value="Event recorded" />
          </div>
        </div>
      </section>

      <PartnerSocieties />

      {verifiedMetrics.length ? (
        <section aria-labelledby="footprint-title">
          <h2 className="sr-only" id="footprint-title">ParkTek operating footprint</h2>
          <div className={`${styles.container} ${styles.metricsGrid}`}>
            {verifiedMetrics.map((metric) => (
              <div className={styles.metric} key={metric.label}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className={`${styles.section} ${styles.solutionsSection}`} id="solutions">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Two operating environments"
            lead="One connected platform for residential access and commercial parking operations."
            title="From society gates to managed commercial parking."
          />
          <div className={styles.solutionGrid}>
            {SOLUTIONS.map((solution, index) => (
              <article className={styles.solutionCard} key={solution.id}>
                <div>
                  <div className={styles.moduleTop}>
                    <span className={styles.solutionNumber}>0{index + 1}</span>
                    <StatusPill status={solution.status} />
                  </div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <ul className={styles.solutionFeatures}>
                    {solution.capabilities.map((capability) => (
                      <li key={capability}>{capability}</li>
                    ))}
                  </ul>
                </div>
                <a className={styles.textLink} href={solution.href}>
                  {solution.cta}
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="how-it-works">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="How ParkTek works"
            lead="RFID, ANPR, QR, POS, access rules, barriers, payment records and reporting connect in one operating flow."
            title="Identify. Decide. Act. Transact. Reconcile. Analyse."
          />
          <div className={styles.flowLayout}>
            <figure className={styles.flowVisual}>
              <div
                aria-label="A light ParkTek access schematic showing a vehicle identified at a controlled barrier, a local controller decision and an operating event recorded."
                className={styles.flowScene}
                role="img"
              >
                <div aria-hidden="true" className={styles.operationsScene}>
                  <span className={styles.operationsBuilding}>
                    <span className={styles.operationsCanopy} />
                    <span className={styles.operationsOffice} />
                  </span>
                  <span className={styles.operationsLandscape} />
                  <span className={styles.operationsLane}>
                    <span className={styles.operationsLaneLabel}>ENTRY</span>
                    <span className={styles.operationsArrow} />
                  </span>
                  <ParkingCar className={styles.operationsCar} />
                  <BarrierGate className={styles.operationsBarrier} />
                  <span className={styles.operationsReader}>
                    <span className={styles.readerWave} />
                    <span className={styles.readerLight} />
                  </span>
                  <span className={styles.operationsController}>
                    <span className={styles.controllerLight} />
                    <span className={styles.controllerVent} />
                  </span>
                  <span className={styles.operationsEvent}>
                    <span>ACCESS EVENT</span>
                    <strong>Recorded</strong>
                  </span>
                </div>
              </div>
              <figcaption className={styles.flowCaption}>
                <span>Illustrative local gate decision</span>
                <span className={styles.liveDot}>Access live</span>
              </figcaption>
            </figure>
            <div className={styles.stepList}>
              {STEPS.map((step) => (
                <article className={styles.step} key={step.number}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.platformSection}`} id="platform">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Platform modules"
            lead="Four connected modules support vehicle access, gate control, ANPR and commercial parking operations."
            title="Access. Control. Vision. Commercial POS."
          />
          <div className={styles.moduleGrid}>
            {MODULES.map((module) => {
              const Icon = moduleIcons[module.id] || CircleDot;
              return (
                <article className={styles.moduleCard} key={module.id}>
                  <div className={styles.moduleTop}>
                    <span className={styles.moduleIcon}>
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <StatusPill status={module.status} />
                  </div>
                  <h3>{module.name}</h3>
                  <p>{module.summary}</p>
                  <div className={styles.tagRow}>
                    {module.capabilities.map((capability) => (
                      <span className={styles.tag} key={capability}>
                        {capability}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section} id="commercial-parking">
        <div className={`${styles.container} ${styles.commercialLayout}`}>
          <div className={styles.commercialIntro}>
            <span className={styles.sectionKicker}>Commercial parking + POS</span>
            <h2 className={styles.sectionTitle}>From parking entry to revenue reconciliation.</h2>
            <p className={styles.sectionLead}>
              ParkTek Commercial connects gate equipment, cashier POS, payment records and operator dashboards so
              every parking session can be tracked from entry through operational reporting. Authorized payment
              providers remain responsible for gateway processing and funds.
            </p>
            <div className={styles.actionRow}>
              <a className={styles.primaryButton} href="/commercial-parking-management/">
                Explore Commercial Parking
                <ArrowIcon />
              </a>
            </div>
          </div>
          <div className={styles.capabilityList}>
            {COMMERCIAL_PRODUCT_GROUPS.map((capability) => (
              <article className={styles.commercialCapability} key={capability.title}>
                <span aria-hidden="true" className={styles.commercialCapabilityIconArea}>
                  <span
                    className={styles.commercialCapabilityIcon}
                    style={{
                      "--commercial-icon": `url("${commercialCapabilityIcons[capability.title]}")`
                    }}
                  />
                </span>
                <div className={styles.commercialCapabilityContent}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <ul>
                    {capability.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <CommercialCapabilityVisual capability={capability} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.proofSection}`} id="product-proof">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Product proof"
            lead="Product views and installation imagery across residential and commercial parking workflows."
            title="Product and deployment evidence."
          />
          <div className={styles.proofGrid}>
            {PRODUCT_PROOF.map((proof) => (
              <article className={styles.proofCard} key={proof.title}>
                <div className={styles.proofCanvas}>
                  <Image
                    alt={proof.alt}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 1180px) 50vw, 33vw"
                    src={proof.image}
                  />
                </div>
                <div className={styles.proofCopy}>
                  <h3>{proof.title}</h3>
                  <p>{proof.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt} ${styles.compatibilitySection}`} id="compatibility">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Compatibility"
            lead="ParkTek assesses each site's barriers, readers, cameras, controllers and POS hardware to define the supported integration."
            title="Upgrade your parking operation without replacing everything."
          />
          <div className={styles.compatibilityGrid}>
            {COMPATIBILITY.map((item) => (
              <article className={styles.compatibilityItem} key={item.name}>
                <span aria-hidden="true" className={styles.compatibilityIconArea}>
                  <svg className={styles.compatibilityIcon} focusable="false" viewBox="0 0 48 48">
                    <use
                      className={styles.compatibilityIconMain}
                      href={`${compatibilityIcons[item.name]}#icon-main`}
                    />
                    <use
                      className={styles.compatibilityIconAccent}
                      href={`${compatibilityIcons[item.name]}#icon-accent`}
                    />
                  </svg>
                </span>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.deploymentSection}`} id="deployment">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Deployment and support"
            lead="The commercial conversation starts with the physical site, then moves through scoped integration, testing and handover."
            title="A five-step path from survey to supported operation."
          />
          <div className={styles.deploymentGrid}>
            {DEPLOYMENT_STEPS.map((step) => (
              <article className={styles.deploymentItem} key={step.number}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {SHOW_DEPLOYMENT_STORIES ? (
        <section className={`${styles.section} ${styles.sectionAlt} ${styles.storiesSection}`} id="case-study">
          <div className={styles.container}>
            <SectionHeading
              eyebrow="Deployment stories"
              lead="Review ParkTek's residential access approach and available deployment information."
              title="Residential access in operating environments."
            />
            <CaseStudyCard featured study={caseStudy} variant="prastuti" />
          </div>
        </section>
      ) : null}

      <section className={`${styles.section} ${styles.securitySection}`} id="security">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Security and trust"
            lead="ParkTek connects controller rules, role-scoped permissions and auditable operations across each supported deployment."
            title="Control at the gate. Context across the platform."
          />
          <div className={styles.trustGrid}>
            {trustItems.map((item) => (
              <article className={styles.trustCard} key={item.title}>
                <span aria-hidden="true" className={styles.trustIconArea}>
                  <svg className={styles.trustIcon} focusable="false" viewBox="0 0 48 48">
                    <use className={styles.trustIconMain} href={`${item.icon}#icon-main`} />
                    <use className={styles.trustIconAccent} href={`${item.icon}#icon-accent`} />
                  </svg>
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <a className={styles.textLink} href="/security/">
            Read the security overview
            <ArrowIcon />
          </a>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`} id="faq">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div>
            <span className={styles.sectionKicker}>Common questions</span>
            <h2 className={styles.sectionTitle}>Before the site assessment.</h2>
          </div>
          <div className={styles.faqList}>
            {FAQS.map((item) => (
              <details className={styles.faqItem} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={`${styles.container} ${styles.finalInner}`}>
          <span className={styles.sectionKicker}>Start with the site</span>
          <h2>Make the next arrival easier to trust.</h2>
          <p>
            Tell us about your gates, parking capacity and current system. We will prepare a site-specific ParkTek plan.
          </p>
          <div className={styles.actionRow}>
            <a className={styles.primaryButton} href={SITE.primaryCta.href}>
              {SITE.primaryCta.label}
              <ArrowIcon />
            </a>
            <a className={styles.secondaryButton} href="/contact/">
              Contact ParkTek
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
