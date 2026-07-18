/* eslint-disable @next/next/no-img-element -- responsive AVIF/JPEG picture sources are pre-generated for static export */
import {
  Activity,
  ArrowRight,
  Building2,
  Camera,
  CircleDot,
  Cpu,
  Gauge,
  MapPinned,
  Radio,
  ShieldCheck,
  Smartphone,
  Wrench
} from "lucide-react";

import { CaseStudyCard } from "@/components/website/case-study-card";
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

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Role-based access",
    description:
      "Product access is scoped to authorized roles and the relevant society or operating context."
  },
  {
    icon: Activity,
    title: "Audit context",
    description:
      "Access events, sensitive gate lookups, controller state and support work retain operating context."
  },
  {
    icon: ShieldCheck,
    title: "Encryption boundaries",
    description:
      "Production web and API traffic uses HTTPS/TLS; environment-specific storage controls are confirmed during security review."
  },
  {
    icon: Cpu,
    title: "Retention and deletion scope",
    description:
      "Requirements are agreed for the deployed environment; ParkTek does not claim a universal automated retention control."
  },
  {
    icon: Smartphone,
    title: "Customer-controlled permissions",
    description:
      "Authorized customer teams control who can use society- and site-scoped operating workflows."
  },
  {
    icon: Camera,
    title: "Responsible vehicle data",
    description:
      "Vehicle, plate and access data is limited to the approved operating purpose and handled within documented boundaries."
  }
];

function ArrowIcon() {
  return <ArrowRight aria-hidden="true" size={17} strokeWidth={2} />;
}

function WorldImage({ alt, ariaHidden = false, className, eager = false, name, sizes }) {
  return (
    <picture>
      <source
        sizes={sizes}
        srcSet={`/worlds/${name}-720.avif 720w, /worlds/${name}-1440.avif 1440w`}
        type="image/avif"
      />
      <img
        alt={ariaHidden ? "" : alt}
        aria-hidden={ariaHidden || undefined}
        className={className}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        height="941"
        loading={eager ? "eager" : "lazy"}
        sizes={sizes}
        src={`/worlds/${name}.jpg`}
        srcSet={`/worlds/${name}-720.jpg 720w, /worlds/${name}.jpg 1672w`}
        width="1672"
      />
    </picture>
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

export function WebsiteHomePage() {
  const caseStudy = CASE_STUDIES[0];
  const verifiedMetrics = METRICS.filter((metric) => metric.verified);
  const footprintItems = verifiedMetrics.length
    ? verifiedMetrics
    : MODULES.map((module) => ({ value: module.status, label: module.name }));

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
              Every gate. Every vehicle. Every parking <span>transaction—connected.</span>
            </h1>
            <p className={styles.heroLead}>
              Secure residential access with RFID, local barrier control and live operations today—while guarded
              ANPR remains in pilot and commercial POS and payment-record workflows launch in phases.
            </p>
            <div className={styles.actionRow}>
              <a className={styles.primaryButton} href={SITE.primaryCta.href}>
                {SITE.primaryCta.label}
                <ArrowIcon />
              </a>
              <a className={styles.secondaryButton} href={SITE.secondaryCta.href}>
                {SITE.secondaryCta.label}
              </a>
            </div>
            <ul className={styles.reassurance} aria-label="Capability availability">
              <li>RFID access live</li>
              <li>ANPR pilot</li>
              <li>Commercial workflows launching</li>
            </ul>
          </div>

          <div className={styles.worldFrame} aria-label="Animated ParkTek gate access scene">
            <WorldImage
              alt="A connected ParkTek residential entry gate with a boom barrier, controller and approaching vehicle."
              className={styles.worldImage}
              eager
              name="parktek-gate-closed"
              sizes="(max-width: 1080px) calc(100vw - 40px), 58vw"
            />
            <WorldImage
              ariaHidden
              className={`${styles.worldImage} ${styles.worldImageOpen}`}
              name="parktek-gate-open"
              sizes="(max-width: 1080px) calc(100vw - 40px), 58vw"
            />
            <span className={styles.scanLine} aria-hidden="true" />
            <div className={styles.hud}>
              <span className={styles.hudLabel}>Vehicle identity</span>
              <span className={styles.hudValue}>Permit verified</span>
            </div>
            <div className={styles.gateHud}>
              <span className={styles.hudLabel}>Local controller</span>
              <span className={styles.hudValue}>Decision ready</span>
            </div>
            <div className={styles.occupancyHud}>
              <span className={styles.hudLabel}>Operations</span>
              <span className={styles.hudValue}>Event recorded</span>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="footprint-title">
        <div className="sr-only" id="footprint-title">
          {verifiedMetrics.length ? "ParkTek operating footprint" : "ParkTek capability availability"}
        </div>
        <div className={`${styles.container} ${styles.metricsGrid}`}>
          {footprintItems.map((metric) => (
            <div className={styles.metric} key={metric.label}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
          ))}
        </div>
        <p className={`${styles.container} ${styles.metricsNotice}`}>
          {verifiedMetrics.length
            ? "Verified ParkTek operating footprint."
            : "Provisional traction metrics are hidden until founder verification."}
        </p>
      </section>

      <section className={styles.section} id="solutions">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Two operating environments"
            lead="One foundation, sold honestly by availability: residential access is live; commercial operations are entering a phased launch."
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
            lead="RFID, guarded ANPR, QR, POS, access rules, barriers, payment records and reporting connect in one staged operating flow. Transaction and reconciliation steps remain commercial roadmap scope."
            title="Identify. Decide. Act. Transact. Reconcile. Analyse."
          />
          <div className={styles.flowLayout}>
            <figure className={styles.flowVisual}>
              <WorldImage
                alt="A connected parking ecosystem showing multiple gates, vehicles, parking lanes and an operations room."
                name="parktek-ecosystem"
                sizes="(max-width: 820px) calc(100vw - 40px), 64vw"
              />
              <figcaption className={styles.flowCaption}>
                <span>Illustrative connected-site view</span>
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

      <section className={styles.section} id="platform">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Platform modules"
            lead="Each module carries a visible availability label, so live capability and roadmap direction never blur together."
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

      <section className={`${styles.section} ${styles.sectionAlt}`} id="commercial-parking">
        <div className={`${styles.container} ${styles.commercialLayout}`}>
          <div>
            <span className={styles.sectionKicker}>Commercial parking + POS</span>
            <h2 className={styles.sectionTitle}>From parking entry to revenue reconciliation.</h2>
            <p className={styles.sectionLead}>
              ParkTek Commercial connects gate equipment, cashier POS, payment records and operator dashboards so
              every parking session can be tracked from entry to settlement. This is launching scope: transaction,
              settlement and reconciliation tooling is not represented as live payment processing.
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
              <article className={styles.capability} key={capability.title}>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <ul>
                    {capability.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <StatusPill status={capability.status} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="product-proof">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Product proof"
            lead="The experience is ready to hold real dashboard, POS and field-deployment evidence without substituting invented interface mockups."
            title="Show the product as it is deployed."
          />
          <div className={styles.proofGrid}>
            {PRODUCT_PROOF.map((proof) => (
              <article className={styles.proofCard} key={proof.title}>
                <div className={styles.proofCanvas}>
                  <div className={styles.placeholder}>{proof.placeholder}</div>
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

      <section className={`${styles.section} ${styles.sectionAlt}`} id="compatibility">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Compatibility"
            lead="Support is confirmed per site. ParkTek does not claim universal hardware compatibility before a survey."
            title="Upgrade your parking operation without replacing everything."
          />
          <div className={styles.compatibilityGrid}>
            {COMPATIBILITY.map((item, index) => {
              const icons = [Building2, Radio, Camera, MapPinned];
              const Icon = icons[index] || Wrench;
              return (
                <article className={styles.compatibilityItem} key={item.name}>
                  <Icon aria-hidden="true" color="#72b7ff" size={23} />
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section} id="deployment">
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

      <section className={`${styles.section} ${styles.sectionAlt}`} id="case-study">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Deployment stories"
            lead="Only customer-approved scope, images and outcomes will be published. No placeholder metrics are presented as results."
            title="Evidence, once it is verified."
          />
          <CaseStudyCard featured study={caseStudy} />
        </div>
      </section>

      <section className={styles.section} id="security">
        <div className={styles.container}>
          <SectionHeading
            eyebrow="Security and trust"
            lead="Access-control messaging stays grounded in controller rules, scoped permissions and auditable operations."
            title="Control at the gate. Context across the platform."
          />
          <div className={styles.trustGrid}>
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <article className={styles.trustCard} key={item.title}>
                  <Icon aria-hidden="true" color="#73b8ff" size={24} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
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
