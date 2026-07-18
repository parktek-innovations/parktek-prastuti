import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const termsSections = [
  {
    title: "1. Introduction",
    paragraphs: [
      "Welcome to ParkTek.",
      "ParkTek provides smart parking technology solutions that help automate parking access, vehicle monitoring, and operational management. By using ParkTek services, you agree to these Terms of Service.",
    ],
  },
  {
    title: "2. Nature of ParkTek Services",
    paragraphs: ["ParkTek is a technology platform only.", "ParkTek provides:"],
    lists: [{ items: ["Automated entry and exit management", "Vehicle identification using ANPR / RFID", "Parking access control and monitoring", "Operational dashboards and analytics"] }],
    paragraphsAfter: ["ParkTek does not:"],
    listsAfter: [{ items: ["Process payments", "Collect parking fees", "Manage parking facilities"] }],
    closing: "All parking rules and enforcement are handled by the respective parking operators.",
  },
  {
    title: "3. User Responsibilities",
    paragraphs: ["Users must:"],
    lists: [{ items: ["Provide accurate vehicle information", "Use ParkTek only for authorized purposes", "Follow parking facility rules", "Protect their access credentials"] }],
  },
  {
    title: "4. Access & Availability",
    paragraphs: ["ParkTek does not guarantee uninterrupted service.", "Downtime may occur due to maintenance or external dependencies."],
  },
  {
    title: "5. No Financial Transactions",
    paragraphs: ["ParkTek does not handle payments, refunds, billing, or any financial transactions."],
  },
  {
    title: "6. Limitation of Liability",
    paragraphs: ["ParkTek is not responsible for:"],
    lists: [{ items: ["Vehicle damage, theft, or loss", "Parking availability or enforcement actions", "Disputes between users and parking operators"] }],
  },
  {
    title: "7. Third-Party Integrations",
    paragraphs: ["ParkTek may integrate with third-party hardware or software.", "ParkTek is not responsible for third-party system failures."],
  },
  { title: "8. Account Suspension", paragraphs: ["ParkTek may suspend or terminate access for misuse or violations."] },
  { title: "9. Governing Law", paragraphs: ["These terms are governed by the laws of India."] },
  { title: "10. Contact", paragraphs: ["For support, contact:"], contact: true },
];

export const metadata = makeMetadata({
  title: "Terms of Service",
  description: "Terms governing the use of ParkTek services and platform access.",
  path: "/terms-of-service/",
});

function ItemList({ list }) {
  return <ul>{list.items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

export default function TermsOfServicePage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Terms of service", href: "/terms-of-service/" },
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
                <li aria-current="page">Terms of service</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Terms of service</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Terms for using ParkTek services.</h1>
            <p className={styles.lead}>
              These terms describe the scope of ParkTek services, user responsibilities and the limits of
              the ParkTek platform.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.policy}>
              {termsSections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.lists?.map((list) => <ItemList key={list.items.join("-")} list={list} />)}
                  {section.paragraphsAfter?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.listsAfter?.map((list) => <ItemList key={list.items.join("-")} list={list} />)}
                  {section.closing ? <p>{section.closing}</p> : null}
                  {section.contact ? <p><a href={CONTACT.emailHref}>{CONTACT.email}</a></p> : null}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
