import Link from "next/link";

import { LeadForm } from "@/components/website/lead-form";
import { StatusPill } from "@/components/website/status-pill";
import StructuredData from "@/components/website/structured-data";
import {
  COMPATIBILITY,
  DEPLOYMENT_STEPS,
  RESIDENTIAL_FAQS,
  RESIDENTIAL_STEPS,
} from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const roles = [
  {
    title: "Residents",
    description: "Keep approved vehicles and RFID activation connected to the right society access record.",
  },
  {
    title: "Gate staff",
    description: "Handle authorized lookups and exceptions without treating an unknown vehicle as approved.",
  },
  {
    title: "Society teams",
    description: "Manage residents, vehicles, RFID inventory and access records, with role-scoped controller health context.",
  },
  {
    title: "ParkTek operations",
    description: "Support onboarding, hardware setup, controller health and society-scoped issue resolution.",
  },
];

const accessModes = [
  {
    title: "UHF RFID",
    description: "The live primary vehicle identity flow links one active tag to one active vehicle at a time.",
    status: "Live",
  },
  {
    title: "Local control",
    description: "Yantra uses its synced permit view for eligible gate decisions and queues events for later sync.",
    status: "Live",
  },
  {
    title: "Authorized fallback",
    description: "Gate teams retain an approved manual path for exceptions and equipment or connectivity issues.",
    status: "Live",
  },
  {
    title: "ANPR",
    description: "ANPR provides an additional live registered-vehicle identity signal. Unknown plates do not auto-open by default.",
    status: "Live",
  },
];

const liveSurfaces = [
  {
    title: "Resident and vehicle registration",
    description: "Vehicle details, society access and RFID activation stay connected to the resident record.",
  },
  {
    title: "Authorized gate exceptions",
    description: "Authorized teams retain a controlled manual path. Any automated temporary-access workflow is confirmed per site.",
  },
  {
    title: "Entry and exit history",
    description: "Society-scoped access events retain the vehicle and operating context needed by authorized teams.",
  },
  {
    title: "Administration dashboard",
    description: "Authorized teams manage users, vehicles, RFID inventory and logs, with role-scoped controller and support context.",
  },
  {
    title: "Hardware monitoring",
    description: "Controller health and event synchronization provide operational context for supported gates.",
  },
  {
    title: "Guard workflows",
    description: "Gate teams can use approved lookups and exception handling without treating an unknown vehicle as authorized.",
  },
  {
    title: "Technical support",
    description: "Role-scoped support context helps ParkTek and the society resolve access, tag and device issues.",
  },
];

export const metadata = makeMetadata({
  title: "RFID & ANPR Vehicle Access for Societies | ParkTek",
  description:
    "Connect resident vehicles, RFID identity, local gate control, boom barriers and society operations with ParkTek.",
  path: "/residential-access-control/",
});

export default function ResidentialAccessControlPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Residential access control", href: "/residential-access-control/" },
  ]);

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <main className={styles.page} id="main-content">
        <section className={styles.hero}>
          <div className={[styles.container, styles.heroInner].join(" ")}>
            <nav aria-label="Breadcrumb">
              <ol className={styles.breadcrumb}>
                <li><Link href="/">Home</Link></li>
                <li aria-current="page">Residential access control</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Residential societies <StatusPill status="Live" /></p>
            <h1 className={styles.title}>Secure vehicle access without replacing your society-management system.</h1>
            <p className={styles.lead}>
              ParkTek links vehicle identity, RFID inventory, local gate decisions, boom-barrier control,
              resident tools and society operations—while keeping exceptions in authorized hands.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/book-site-assessment/">Book a Site Assessment</Link>
              <Link className={styles.secondaryButton} href="#workflow">See the access workflow</Link>
            </div>
          </div>
        </section>

        <section className={styles.section} id="workflow">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Connected workflow</p>
              <h2>From identification to a recorded gate event.</h2>
              <p>Each stage has a clear job, a controlled fallback and a shared operational record.</p>
            </div>
            <div className={styles.flow}>
              {RESIDENTIAL_STEPS.map((step) => (
                <article className={styles.flowItem} key={step.number}>
                  <span className={styles.flowNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Role-specific tools</p>
              <h2>Useful context for everyone operating the gate.</h2>
            </div>
            <div className={styles.roleGrid}>
              {roles.map((role) => (
                <article className={styles.card} key={role.title}>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="anpr-rfid">
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Access modes</p>
              <h2>RFID and ANPR working together at the gate.</h2>
              <p>
                ParkTek uses RFID and ANPR as complementary registered-vehicle identity modes. An
                unrecognized plate is not permission to operate the barrier.
              </p>
            </div>
            <div className={styles.stack}>
              {accessModes.map((mode) => (
                <article className={styles.modeRow} key={mode.title}>
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                  <StatusPill status={mode.status} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Available now</p>
              <h2>Live residential operations, clearly scoped.</h2>
            </div>
            <div className={styles.grid4}>
              {liveSurfaces.map((surface) => (
                <article className={styles.featureCard} key={surface.title}>
                  <div className={styles.featureTop}>
                    <h3>{surface.title}</h3>
                    <StatusPill status="Live" />
                  </div>
                  <p>{surface.description}</p>
                </article>
              ))}
            </div>
            <div className={styles.notice}>
              <strong>Remote barrier operation is not presented as a live customer surface.</strong>
              <p>
                ParkTek&apos;s standard operating path uses local controller relay integration with authorized manual
                exception handling. Remote operation availability depends on the supported site configuration.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Hardware compatibility</p>
              <h2>Confirm compatibility for your existing gate equipment.</h2>
              <p>
                Reader protocols, relay wiring, camera placement, networking and backup power vary by site.
                ParkTek confirms supported equipment and any required integration work during the assessment.
              </p>
            </div>
            <div className={styles.grid4}>
              {COMPATIBILITY.map((item) => (
                <article className={styles.card} key={item.name}>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Installation and support</p>
              <h2>From site assessment to monitored handover.</h2>
              <p>
                The rollout documents equipment, access rules, fallback procedures, onboarding and the agreed
                maintenance path before the gate is placed into supported operation.
              </p>
            </div>
            <div className={styles.flow}>
              {DEPLOYMENT_STEPS.map((step) => (
                <article className={styles.flowItem} key={step.number}>
                  <span className={styles.flowNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Residential FAQ</p>
              <h2>Questions to settle before deployment.</h2>
            </div>
            <div className={styles.faqList}>
              {RESIDENTIAL_FAQS.map((item) => (
                <details className={styles.faqItem} key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.container}>
            <LeadForm
              description="Share your gates, current barriers, RFID setup and access issues. We’ll scope the assessment around your society."
              heading="Plan your residential access assessment"
              source="Residential access control page"
            />
          </div>
        </section>
      </main>
    </>
  );
}
