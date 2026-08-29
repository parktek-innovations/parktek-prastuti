import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const securityAreas = [
  {
    title: "Role-based access",
    description: "Product access is tied to authorized roles and the relevant society or operating context.",
  },
  {
    title: "Audit logs and operating evidence",
    description: "Access and controller events provide context for authorized monitoring, investigation and support.",
  },
  {
    title: "Encryption boundaries",
    description: "Production web and API traffic uses HTTPS/TLS. Environment-specific storage and backup controls are reviewed for each deployment.",
  },
  {
    title: "Retention and deletion scope",
    description: "Retention and deletion requirements are documented for each supported deployment.",
  },
  {
    title: "Customer-controlled permissions",
    description: "Authorized customer teams control who can use society- and site-scoped operating workflows.",
  },
  {
    title: "Responsible vehicle-data handling",
    description: "Vehicle, plate and access data is limited to the approved operating purpose and documented customer boundary.",
  },
  {
    title: "Controlled gate decisions",
    description: "Eligible identity and permit state drive automated access. Unknown plates do not auto-open by default.",
  },
  {
    title: "Local operating continuity",
    description: "The Yantra controller can use its synced local permit view and queue events when connectivity is interrupted.",
  },
];

export const metadata = makeMetadata({
  title: "Security",
  description: "How ParkTek approaches controlled gate access, role scope, operational continuity and security reporting.",
  path: "/security/",
});

export default function SecurityPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Security", href: "/security/" },
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
                <li aria-current="page">Security</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Security</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Physical access needs explicit digital boundaries.</h1>
            <p className={styles.lead}>
              ParkTek combines scoped product access, eligible vehicle identity, local controller decisions
              and authorized exception handling. No connected system can guarantee complete security.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Security approach</p>
              <h2>Controls across people, software and the gate.</h2>
            </div>
            <div className={styles.grid3}>
              {securityAreas.map((area) => (
                <article className={styles.card} key={area.title}>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Report a concern</p>
              <h2>Include the context needed for a responsible review.</h2>
              <p>
                Email the affected service, society or site, approximate time and a clear description. Do not
                send passwords, access tokens or unnecessary personal data.
              </p>
            </div>
            <div className={styles.contactCard}>
              <h2>Security and privacy contact</h2>
              <dl className={styles.contactList}>
                <div>
                  <dt>Email</dt>
                  <dd><a href={CONTACT.emailHref}>{CONTACT.email}</a></dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
