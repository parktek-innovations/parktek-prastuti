import Link from "next/link";

import { StatusPill } from "@/components/website/status-pill";
import StructuredData from "@/components/website/structured-data";
import { CONTACT, MODULES, TEAM } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const principles = [
  {
    title: "Operator-first by design",
    description: "Map the physical lane, traffic, hardware, power, network and exception path with the people who run it.",
  },
  {
    title: "Keep decisions controlled",
    description: "Use eligible vehicle identity and permit state; keep unknown and exceptional cases in an authorized path.",
  },
  {
    title: "Design for continuity",
    description: "Use local controller context and operational fallbacks for the conditions a real gate faces.",
  },
  {
    title: "Label the roadmap",
    description: "Separate live, pilot, launching and in-development capabilities instead of selling them as one finished product.",
  },
];

export const metadata = makeMetadata({
  title: "About ParkTek",
  description: "Learn how ParkTek is building connected access and parking operations from the physical gate outward.",
  path: "/about/",
});

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "About", href: "/about/" },
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
                <li aria-current="page">About</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>About ParkTek</p>
            <h1 className={styles.title}>Parking infrastructure works better when its decisions stay connected.</h1>
            <p className={styles.lead}>
              ParkTek builds the operating layer between vehicle identity, gate hardware, local control and
              the people responsible for access and parking operations.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Current focus</p>
              <h2>Reliable residential access, then a staged commercial layer.</h2>
            </div>
            <div className={styles.factPanel}>
              <p>
                Residential RFID, controller, dashboard and support workflows are live. Guarded ANPR is in
                pilot. Commercial parking and POS are launching, with transaction tooling still in development.
              </p>
              <p>
                Residential access was the initial entry point because a society gate is a focused, high-frequency
                operating problem: identify the right vehicle, make a dependable decision and preserve a clear
                fallback. ParkTek is carrying that gate-first discipline into commercial parking.
              </p>
              <p>
                That status boundary is intentional: a public product claim should match what a site can
                actually deploy and operate.
              </p>
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Platform direction</p>
              <h2>One system, capabilities released at different stages.</h2>
            </div>
            <div className={styles.grid4}>
              {MODULES.map((module) => (
                <article className={styles.featureCard} key={module.id}>
                  <div className={styles.featureTop}>
                    <h3>{module.name}</h3>
                    <StatusPill status={module.status} />
                  </div>
                  <p>{module.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>How ParkTek works</p>
              <h2>Build around physical operations and honest boundaries.</h2>
            </div>
            <div className={styles.grid4}>
              {principles.map((principle) => (
                <article className={styles.card} key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Leadership and team</p>
              <h2>Built by a team close to the operating site.</h2>
              <p>Public names, roles and photographs remain configurable and will be added only after approval.</p>
            </div>
            <div className={styles.grid2}>
              {TEAM.map((member) => (
                <article className={styles.card} key={member.name}>
                  <h3>{member.name}</h3>
                  <p><strong>{member.role}</strong></p>
                  <p>{member.bio}</p>
                </article>
              ))}
              <aside className={styles.contactCard}>
                <h2>ParkTek Technologies Pvt. Ltd.</h2>
                <p>Company and public enquiry details.</p>
                <dl className={styles.contactList}>
                  <div>
                    <dt>Email</dt>
                    <dd><a href={CONTACT.emailHref}>{CONTACT.email}</a></dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd><a href={CONTACT.mapHref} rel="noreferrer" target="_blank">{CONTACT.address}</a></dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Your site</p>
              <h2>See what the ParkTek operating model means at your gates.</h2>
            </div>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/book-site-assessment/">Book a Site Assessment</Link>
              <Link className={styles.secondaryButton} href="/contact/">Contact ParkTek</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
