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
    description: "Configure the site, connected devices, operator access and commercial workflows.",
  },
  {
    number: "03",
    title: "Record activity",
    description: "Connect vehicle, tariff, shift and payment-record context across each parking session.",
  },
  {
    number: "04",
    title: "Review exceptions",
    description: "Surface mismatches and handover context for an authorized operator to resolve.",
  },
  {
    number: "05",
    title: "Reconcile records",
    description: "Compare parking activity, operator shifts and recorded payment information.",
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
    "Connect commercial parking entry, exit, operator POS, payment records and reporting with ParkTek.",
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
            <p className={styles.eyebrow}>Commercial parking <StatusPill status="Live" /></p>
            <h1 className={styles.title}>Connect parking lanes, operator POS and reporting in one system.</h1>
            <p className={styles.lead}>
              ParkTek Commercial connects gate access, parking POS, parking sessions and reporting for malls,
              offices, hospitals, hotels and paid parking facilities.
            </p>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/book-site-assessment/">Book a Site Assessment</Link>
              <Link className={styles.secondaryButton} href="#parking-pos">Review commercial capabilities</Link>
            </div>
            <div className={styles.notice}>
              <strong>Payment processing boundaries</strong>
              <p>
                ParkTek provides parking-management and POS tools but does not hold customer funds. Any gateway
                processing or refund flow must use an authorized payment arrangement.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Operating model</p>
              <h2>Connect every step of the parking operation.</h2>
              <p>
                Bring entry, exit, operator workflows, parking records and reporting into one site operating model.
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
              <h2>A practical workspace for parking operators.</h2>
              <p>
                Use the live operator workspace and Parking POS alongside separately labelled capabilities for
                tariffs, shifts, payment records, reconciliation and maintenance.
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
                Connect entry, tariffs, POS, reporting and site reliability around each property&apos;s operating requirements.
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
                <li>Maintenance ownership, service expectations and delivery sequence</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.container}>
            <LeadForm
              description="Share your site, capacity, operator workflow, current equipment and transaction-record challenges. We’ll define the supported scope and next steps."
              heading="Assess your commercial parking operation"
              source="Commercial parking management page"
            />
          </div>
        </section>
      </main>
    </>
  );
}
