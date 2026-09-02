import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const SHOW_FASTAG_ENQUIRY = false;

const features = [
  {
    title: "Recharge guidance",
    description: "Share the vehicle and FASTag context so ParkTek support can direct the enquiry to the right next step."
  },
  {
    title: "Vehicle-number starting point",
    description: "Begin with the vehicle registration number, then confirm issuer and account details through an authorized channel."
  },
  {
    title: "Charge visibility",
    description: "Review the amount and any service charge before using an issuer-approved payment flow."
  },
  {
    title: "Support handoff",
    description: "Move unresolved, duplicate or delayed recharge questions to a person with the relevant reference details."
  }
];

const steps = [
  { number: "01", title: "Enter the vehicle number", description: "Use the registration number linked to the FASTag enquiry." },
  { number: "02", title: "Confirm the issuer", description: "Identify the bank or authorized issuer that manages the tag account." },
  { number: "03", title: "Review the amount", description: "Check the recharge amount and any disclosed charge before proceeding." },
  { number: "04", title: "Use an authorized payment flow", description: "Complete payment only through a verified issuer or supported channel." },
  { number: "05", title: "Keep the reference", description: "Retain the transaction reference for balance, delay or reversal support." }
];

const faqs = [
  {
    question: "Can I complete a FASTag recharge on this page?",
    answer: "No. Use your authorized FASTag issuer or payment channel to complete a recharge and confirm its status."
  },
  {
    question: "What should I have ready before contacting support?",
    answer: "Keep the vehicle registration number, FASTag issuer, intended recharge amount and any existing transaction reference available."
  },
  {
    question: "Who confirms the FASTag balance or recharge status?",
    answer: "The authorized FASTag issuer or payment channel remains the source for confirmed balance and transaction status."
  },
  {
    question: "Should I share an OTP or full payment credentials?",
    answer: "No. Do not share OTPs, PINs or full card, bank or wallet credentials through a support enquiry."
  }
];

export const metadata = makeMetadata({
  title: "FASTag Recharge Guidance | ParkTek",
  description: "Start a FASTag recharge support enquiry with ParkTek and review a safe, issuer-led recharge flow.",
  path: "/fastag/"
});

export default function FastagPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "FASTag recharge", href: "/fastag/" }
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
                <li aria-current="page">FASTag recharge</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>FASTag recharge guidance</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Start a FASTag recharge enquiry safely.</h1>
            <p className={styles.lead}>
              Use the vehicle number to prepare a support enquiry, then confirm the issuer, amount and payment
              channel before proceeding. Recharge completion is confirmed by the authorized issuer or payment channel.
            </p>
            <div className={styles.actions}>
              {SHOW_FASTAG_ENQUIRY ? (
                <Link className={styles.primaryButton} href="#fastag-enquiry">Start with vehicle number</Link>
              ) : null}
              <Link className={styles.secondaryButton} href="/contact/">Contact ParkTek</Link>
            </div>
          </div>
        </section>

        {SHOW_FASTAG_ENQUIRY ? (
          <section className={[styles.section, styles.sectionMuted].join(" ")} id="fastag-enquiry">
            <div className={styles.container}>
              <div className={styles.sectionHeader}>
                <p className={styles.eyebrow}>Vehicle lookup starting point</p>
                <h2>Prepare the right details for support.</h2>
                <p>This action opens ParkTek support; complete any recharge through an authorized issuer or payment channel.</p>
              </div>
              <form action="/contact/" className={styles.lookupPanel} method="get">
                <input name="service" type="hidden" value="fastag" />
                <label className={styles.lookupLabel} htmlFor="fastag-vehicle">Vehicle registration number</label>
                <div className={styles.lookupRow}>
                  <input
                    aria-describedby="fastag-help"
                    className={styles.lookupInput}
                    id="fastag-vehicle"
                    name="vehicle"
                    placeholder="For example, UP16AB1234"
                    type="text"
                  />
                  <button className={styles.primaryButton} type="submit">Continue to support</button>
                </div>
                <p className={styles.lookupHelp} id="fastag-help">
                  Do not enter an OTP, PIN, full card number, bank password or wallet credentials.
                </p>
              </form>
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>FASTag support</p>
              <h2>A clear path from vehicle details to authorized support.</h2>
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
              <p className={styles.eyebrow}>Recharge flow</p>
              <h2>How FASTag recharge works.</h2>
              <p>Five checks keep issuer verification and transaction confirmation in the flow.</p>
            </div>
            <div className={[styles.flow, styles.flowFive].join(" ")}>
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
              <p className={styles.eyebrow}>Support</p>
              <h2>Keep the issuer and transaction reference in the loop.</h2>
              <p>ParkTek can receive the enquiry and help identify the next support step without requesting sensitive payment credentials.</p>
            </div>
            <div className={styles.grid3}>
              <article className={styles.card}>
                <h3>Email support</h3>
                <p>Send non-sensitive vehicle, issuer and transaction-reference context.</p>
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

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>FASTag FAQ</p>
              <h2>Common FASTag support questions.</h2>
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
