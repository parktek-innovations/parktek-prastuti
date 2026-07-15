import Link from "next/link";

import { LeadForm } from "@/components/website/lead-form";
import { StatusPill } from "@/components/website/status-pill";
import StructuredData from "@/components/website/structured-data";
import {
  COMMERCIAL_CAPABILITIES,
  COMMERCIAL_PRODUCT_GROUPS,
  INDUSTRIES,
} from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const operatingFlow = [
  {
    number: "01",
    title: "Assess the site",
    description: "Map entry, exit, equipment, traffic, operator roles and current transaction records.",
  },
  {
    number: "02",
    title: "Configure operations",
    description: "Define the approved site, devices, operator access and staged commercial capabilities.",
  },
  {
    number: "03",
    title: "Record activity",
    description: "Build toward connected vehicle, tariff, shift and payment-record context without claiming fund custody.",
  },
  {
    number: "04",
    title: "Review exceptions",
    description: "Surface mismatches and handover context for an authorized operator to resolve.",
  },
  {
    number: "05",
    title: "Reconcile records",
    description: "Compare parking activity, shifts and recorded payment information as the tooling is developed.",
  },
  {
    number: "06",
    title: "Maintain the site",
    description: "Keep approved equipment and service history connected to the operating context.",
  },
];

export const metadata = makeMetadata({
  title: "Commercial Parking Management System | ParkTek",
  description:
    "Explore ParkTek's launching commercial parking workspace, with POS, tariffs, shifts, payment records, reconciliation and AMC capabilities clearly staged.",
  path: "/commercial-parking-management/",
});

export default function CommercialParkingManagementPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Commercial parking management", href: "/commercial-parking-management/" },
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
                <li aria-current="page">Commercial parking management</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Commercial parking <StatusPill status="Launching" /></p>
            <h1 className={styles.title}>Run every parking lane, payment and shift from one system.</h1>
            <p className={styles.lead}>
              ParkTek Commercial connects gate access, parking POS, tariffs, payment records, operator shifts
              and reporting for malls, offices, hospitals, hotels and paid parking facilities. Commercial
              availability is launching in phases, with transaction tooling still in development.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/book-site-assessment/">Book a Site Assessment</Link>
              <Link className={styles.secondaryButton} href="#parking-pos">Review capability status</Link>
            </div>
            <div className={styles.notice}>
              <strong>Commercial availability is staged.</strong>
              <p>
                ParkTek does not currently claim payment gateway processing, settlement, refunds or custody
                of funds. Payment-record and reconciliation tooling described below is in development.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Operating model</p>
              <h2>Connect the workflow without hiding the rollout stage.</h2>
              <p>
                The product direction covers the full site operating loop. Each commercial module is only
                presented as available when its displayed status says so.
              </p>
            </div>
            <div className={styles.flow}>
              {operatingFlow.map((step) => (
                <article className={styles.flowItem} key={step.number}>
                  <span className={styles.flowNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")} id="parking-pos">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Commercial POS</p>
              <h2>A practical workspace, with every capability labelled.</h2>
              <p>
                No feature below is represented as live. Site scope and pilot timing are confirmed during
                assessment and written into the implementation plan.
              </p>
            </div>
            <div className={styles.grid3}>
              {COMMERCIAL_CAPABILITIES.map((capability) => (
                <article className={styles.featureCard} key={capability.name}>
                  <div className={styles.featureTop}>
                    <h3>{capability.name}</h3>
                    <StatusPill status={capability.status} />
                  </div>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Capability map</p>
              <h2>From parking entry to revenue reconciliation.</h2>
              <p>
                Entry, tariff, POS, reporting and reliability scope is shown with an explicit release stage.
                Site assessment determines which launching capabilities can enter a pilot plan.
              </p>
            </div>
            <div className={styles.grid2}>
              {COMMERCIAL_PRODUCT_GROUPS.map((group) => (
                <article className={styles.featureCard} key={group.title}>
                  <div className={styles.featureTop}>
                    <h3>{group.title}</h3>
                    <StatusPill status={group.status} />
                  </div>
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")} id="industries">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Designed around the site</p>
              <h2>For properties and teams with real operating constraints.</h2>
            </div>
            <div className={styles.grid3}>
              {INDUSTRIES.filter((industry) => industry.status !== "Live").map((industry) => (
                <article
                  className={styles.card}
                  id={industry.href.split("#")[1]}
                  key={industry.name}
                >
                  <div className={styles.cardTop}>
                    <h3>{industry.name}</h3>
                    <StatusPill status={industry.status} />
                  </div>
                  <p>{industry.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Assessment first</p>
              <h2>Start with the operational gaps, not a generic POS demo.</h2>
              <p>
                Gate geometry, tariff rules, current equipment, operator handovers and record-keeping differ
                by property. The assessment establishes what ParkTek can support and when.
              </p>
            </div>
            <div className={styles.factPanel}>
              <ul className={styles.checkList}>
                <li>Entry and exit lanes, peak traffic and exception flows</li>
                <li>Existing barriers, readers, cameras, POS equipment and connectivity</li>
                <li>Tariff structures and operator shift responsibilities</li>
                <li>Current payment-record and reconciliation process</li>
                <li>Maintenance ownership, service expectations and rollout sequence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.container}>
            <LeadForm
              description="Share your site, capacity, operator workflow, current equipment and transaction-record challenges. We’ll confirm the staged scope before recommending a rollout."
              heading="Assess your commercial parking operation"
              source="Commercial parking management page"
            />
          </div>
        </section>
      </main>
    </>
  );
}
