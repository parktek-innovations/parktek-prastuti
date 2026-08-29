import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const SHOW_CHALLAN_ENQUIRY = false;

const features = [
  {
    title: "Challan reference guidance",
    description: "Collect the vehicle, notice and issuing-authority context before asking for support."
  },
  {
    title: "Vehicle-number starting point",
    description: "Use the registration number to prepare the enquiry, then check it against the issuing authority's official record."
  },
  {
    title: "Charge review context",
    description: "Check the authority, offence, date and amount on the official record before using an authorized payment channel."
  },
  {
    title: "Support handoff",
    description: "Take mismatches, duplicate records or payment-reference questions to the relevant authority or support team."
  }
];

const steps = [
  { number: "01", title: "Collect the notice details", description: "Keep the vehicle number and any challan or notice reference ready." },
  { number: "02", title: "Verify the issuing authority", description: "Use the official authority record rather than an unverified message or link." },
  { number: "03", title: "Review the charge", description: "Confirm the offence, date, location, amount and vehicle details." },
  { number: "04", title: "Use an authorized channel", description: "Pay only through the official authority or another verified payment route." },
  { number: "05", title: "Retain the receipt", description: "Keep the acknowledgement and payment reference for status or dispute follow-up." }
];

const faqs = [
  {
    question: "Does this page retrieve official e-challan records?",
    answer: "No. The issuing authority's official service remains the source for challan records and status."
  },
  {
    question: "Can I pay an e-challan through ParkTek here?",
    answer: "No. No payment is processed on this page. Use an official or otherwise verified authorized payment channel."
  },
  {
    question: "What details should I verify before payment?",
    answer: "Confirm the vehicle number, issuing authority, offence, date, location, amount and challan reference against the official record."
  },
  {
    question: "What should I do if the record looks wrong?",
    answer: "Do not pay from an unverified link. Contact the issuing authority or use its official dispute and support process."
  }
];

export const metadata = makeMetadata({
  title: "E-Challan Guidance | ParkTek",
  description: "Prepare an e-challan support enquiry and review safe verification and authorized-payment steps with ParkTek.",
  path: "/e-challan/"
});

export default function EChallanPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "E-Challan", href: "/e-challan/" }
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
                <li aria-current="page">E-Challan</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>E-Challan guidance</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Review an e-challan enquiry before you act.</h1>
            <p className={styles.lead}>
              Prepare the vehicle and notice details, verify them with the issuing authority and use only an
              authorized payment channel. The issuing authority remains the source for challan records and status.
            </p>
            <div className={styles.actions}>
              {SHOW_CHALLAN_ENQUIRY ? (
                <Link className={styles.primaryButton} href="#challan-enquiry">Prepare an enquiry</Link>
              ) : null}
              <Link className={styles.secondaryButton} href="/contact/">Contact ParkTek</Link>
            </div>
          </div>
        </section>

        {SHOW_CHALLAN_ENQUIRY ? (
          <section className={[styles.section, styles.sectionMuted].join(" ")} id="challan-enquiry">
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Safe action area</p>
                <h2>Start with the vehicle number, then verify officially.</h2>
                <p>This action opens ParkTek support; use the issuing authority&apos;s official service to verify records and payment status.</p>
              </div>
              <form action="/contact/" className={styles.lookupPanel} method="get">
                <input name="service" type="hidden" value="e-challan" />
                <div className={styles.lookupFields}>
                  <label className={styles.lookupField} htmlFor="challan-vehicle">
                    <span className={styles.lookupLabel}>Vehicle registration number</span>
                    <input
                      aria-describedby="challan-help"
                      className={styles.lookupInput}
                      id="challan-vehicle"
                      name="vehicle"
                      placeholder="For example, UP16AB1234"
                      type="text"
                    />
                  </label>
                  <label className={styles.lookupField} htmlFor="challan-reference">
                    <span className={styles.lookupLabel}>Challan reference (optional)</span>
                    <input
                      aria-describedby="challan-help"
                      className={styles.lookupInput}
                      id="challan-reference"
                      name="challan"
                      placeholder="Enter the notice reference"
                      type="text"
                    />
                  </label>
                </div>
                <div className={styles.lookupRow}>
                  <button className={styles.primaryButton} type="submit">Continue to support</button>
                </div>
                <p className={styles.lookupHelp} id="challan-help">
                  Do not enter an OTP, PIN, full card number, bank password or wallet credentials.
                </p>
              </form>
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>E-Challan support</p>
              <h2>A careful path from notice details to the right authority.</h2>
            </div>
            <div className={styles.grid4}>
              {features.map((feature) => (
                <article className={styles.featureCard} key={feature.title}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Verification flow</p>
              <h2>How e-challan payment works.</h2>
              <p>Five checks keep authority verification, charge review and receipt retention in the flow.</p>
            </div>
            <div className={styles.flow}>
              {steps.map((step) => (
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
              <p className={styles.eyebrow}>Safety and charge guidance</p>
              <h2>Verify the source, amount and authority before payment.</h2>
            </div>
            <div className={styles.grid2}>
              <div className={styles.notice}>
                <strong>Avoid unverified payment links.</strong>
                <p>ParkTek does not set the challan amount, issue the notice or confirm that an authority record has been cleared.</p>
              </div>
              <div className={styles.factPanel}>
                <ul className={styles.checkList}>
                  <li>Match the registration number and challan reference</li>
                  <li>Confirm the issuing authority and offence details</li>
                  <li>Review the disclosed amount before payment</li>
                  <li>Keep the official acknowledgement or receipt</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Support</p>
              <h2>Route unresolved questions without sharing sensitive credentials.</h2>
            </div>
            <div className={styles.grid3}>
              <article className={styles.card}>
                <h3>Email support</h3>
                <p>Send non-sensitive vehicle, authority and reference context.</p>
                <a className={styles.textLink} href={CONTACT.emailHref}>{CONTACT.email}</a>
              </article>
              <article className={styles.card}>
                <h3>Call ParkTek</h3>
                <p>Discuss the enquiry without sharing OTPs, PINs or full payment credentials.</p>
                <a className={styles.textLink} href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </article>
              <article className={styles.card}>
                <h3>Contact form</h3>
                <p>Use the current ParkTek contact route for a structured support handoff.</p>
                <Link className={styles.textLink} href="/contact/">Open contact form</Link>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>E-Challan FAQ</p>
              <h2>Common e-challan support questions.</h2>
            </div>
            <div className={styles.faqList}>
              {faqs.map((faq) => (
                <details className={styles.faqItem} key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
