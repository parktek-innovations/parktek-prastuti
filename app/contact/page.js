import Link from "next/link";

import { LeadForm } from "@/components/website/lead-form";
import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

export const metadata = makeMetadata({
  title: "Contact ParkTek",
  description: "Contact ParkTek about residential access control, commercial parking, site assessment or support.",
  path: "/contact/",
});

export default function ContactPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Contact", href: "/contact/" },
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
                <li aria-current="page">Contact</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Contact ParkTek</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Talk through the site, the workflow or an active support need.</h1>
            <p className={styles.lead}>
              Use the assessment form for a new deployment. For an existing ParkTek service issue, contact
              support directly using the details below.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={[styles.container, styles.contactGrid].join(" ")}>
            <aside className={styles.contactCard}>
              <h2>ParkTek contact</h2>
              <p>Support and public enquiries use one verified contact path.</p>
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
            <LeadForm
              description="Share your site or product question. For an active service issue, include the society or property name and the affected gate."
              heading="Send ParkTek an enquiry"
              source="Contact page"
            />
          </div>
        </section>
      </main>
    </>
  );
}
