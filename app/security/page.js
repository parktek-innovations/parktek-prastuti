import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const securityAreas = [
  {
    title: "1. Access and Permission Controls",
    paragraphs: [
      "Access to ParkTek dashboards, workflows and administrative functions is limited to authorised users and the relevant society, property or operating context.",
      "Customer or site administrators are responsible for assigning appropriate permissions to their teams. Access should be removed or updated when a user’s role or relationship with the deployment changes.",
    ],
  },
  {
    title: "2. Account and Credential Protection",
    paragraphs: [
      "Users should protect passwords, OTPs, devices and other authentication information and must not share them with unauthorised persons.",
      "ParkTek may use authentication, session controls and other safeguards appropriate to the applicable product. Suspected unauthorised access should be reported promptly.",
    ],
  },
  {
    title: "3. Secure Communication and System Boundaries",
    paragraphs: [
      "Production website and API traffic uses HTTPS/TLS. Security controls for storage, backups and supporting infrastructure may vary by product and deployment and are reviewed according to the applicable operating requirements.",
      "ParkTek does not represent every customer environment as identical; deployment-specific controls may depend on the approved architecture, integrations and customer responsibilities.",
    ],
  },
  {
    title: "4. Vehicle, RFID and ANPR Data Safeguards",
    paragraphs: [
      "Vehicle registration numbers, RFID identifiers, plate images or ANPR results, where enabled, are used only for the approved parking, access, support or operational purpose of the deployment.",
      "Access to this information should remain limited to authorised users with a legitimate operating need. ParkTek does not use ANPR for facial recognition.",
    ],
  },
  {
    title: "5. Auditability and Operational Evidence",
    paragraphs: [
      "ParkTek systems may retain relevant access, controller, operator and support events so authorised teams can review activity, investigate exceptions and troubleshoot incidents.",
      "The availability and retention of particular records depends on the product, deployment, customer requirements and applicable law.",
    ],
  },
  {
    title: "6. Controlled Gate Decisions and Customer Rules",
    paragraphs: [
      "Connected gate workflows are designed to act on configured identity, permit and site rules. Unknown or ineligible vehicles should not automatically receive access by default.",
      "Societies, properties and operators remain responsible for the permissions and site rules they configure or instruct ParkTek to implement.",
    ],
  },
  {
    title: "7. Connected Hardware and Operating Continuity",
    paragraphs: [
      "ParkTek deployments may depend on controllers, readers, cameras, barriers, local networks and external connectivity. Where supported, local controller logic can continue using synchronised permit information and queue events during temporary connectivity interruptions.",
      "Hardware, power, network or third-party failures can still affect availability, and recovery depends on the configuration of the applicable site.",
    ],
  },
  {
    title: "8. Third-Party Security Boundaries",
    paragraphs: [
      "Some ParkTek features may integrate with cloud, communications, payment, hardware or other authorised service providers. Those providers operate their own systems and security controls.",
      "ParkTek seeks to use third parties only where necessary for an approved service and applies contractual or technical safeguards appropriate to the relationship where applicable.",
    ],
  },
];

export const metadata = makeMetadata({
  title: "Security",
  description: "ParkTek security controls across people, software and connected gates.",
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
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Security across people, software and connected gates.</h1>
            <p className={styles.lead}>
              ParkTek is built for environments where digital decisions can affect physical vehicle access. Our approach is to keep access scoped, actions traceable and connected systems limited to the permissions and operating purpose of each deployment. No connected system can guarantee complete security, so controls are reviewed and improved as products and deployments evolve.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid3}>
              {securityAreas.map((area) => (
                <article className={styles.card} key={area.title}>
                  <h2>{area.title}</h2>
                  {area.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <h2>9. Reporting a Security Concern</h2>
              <p>If you believe you have identified a security issue affecting a ParkTek website, application, account, connected deployment or API, please report it responsibly.</p>
              <p>Include the affected service or site, an approximate time, steps to reproduce where relevant and a clear description of the concern. Do not send passwords, OTPs, access tokens or unnecessary personal data.</p>
            </div>
            <div className={styles.contactCard}>
              <h2>Security contact</h2>
              <p>Email: <a href={CONTACT.emailHref}>{CONTACT.email}</a></p>
              <p>Phone: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
