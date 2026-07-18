import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const privacySections = [
  {
    title: "1. Introduction",
    paragraphs: [
      'ParkTek ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and protect information when you use the ParkTek application or services.',
    ],
  },
  {
    title: "2. Information We Collect",
    paragraphs: ["We may collect the following types of information:"],
    lists: [
      { label: "Personal Information", items: ["Name", "Phone number", "Email address", "Vehicle registration details"] },
      { label: "Usage Information", items: ["App usage activity", "Login timestamps", "Feature interactions"] },
      { label: "Device Information", items: ["Device type", "Operating system", "App version", "IP address"] },
      {
        label: "Location Information",
        items: ["Location data may be collected if enabled by the user to support parking access and monitoring features."],
      },
    ],
    paragraphsAfter: ["ParkTek does not collect or store any payment or financial information."],
  },
  {
    title: "3. How We Use Your Information",
    paragraphs: ["We use the collected information to:"],
    lists: [{
      items: [
        "Provide and operate ParkTek services",
        "Enable parking access and vehicle monitoring",
        "Improve system performance and user experience",
        "Maintain security and prevent misuse",
        "Communicate service updates and notifications",
        "Comply with legal and regulatory obligations",
      ],
    }],
  },
  {
    title: "4. Data Sharing",
    paragraphs: ["We do not sell or rent personal data. Information may be shared only with:"],
    lists: [{
      items: [
        "Parking operators for access and operational purposes",
        "Trusted service providers for hosting, analytics, or system maintenance",
        "Legal or regulatory authorities when required by law",
      ],
    }],
  },
  {
    title: "5. Data Security",
    paragraphs: ["We use reasonable technical and organizational measures to protect your data. However, no system can guarantee complete security."],
  },
  {
    title: "6. Data Retention",
    paragraphs: [
      "Personal data is retained only for as long as necessary to provide services, preserve required operational or audit records, or meet legal requirements. An in-app account-deletion request deactivates access and removes active vehicle permissions; some records may be retained where needed for those purposes. Data is deleted or anonymized when it is no longer required.",
    ],
  },
  {
    title: "7. Your Rights",
    paragraphs: ["You may request to:"],
    lists: [{ items: ["Access your personal data", "Correct inaccurate data", "Request deletion of your data (subject to legal obligations)"] }],
    paragraphsAfter: ["Requests can be made by contacting ParkTek support."],
  },
  {
    title: "8. Cookies & Tracking",
    paragraphs: ["ParkTek may use cookies or similar technologies on its website to improve functionality and analytics. Cookie preferences can be managed through browser settings."],
  },
  {
    title: "9. Children's Privacy",
    paragraphs: ["ParkTek does not knowingly collect data from children under 13 years of age."],
  },
  {
    title: "10. Policy Updates",
    paragraphs: ["This Privacy Policy may be updated periodically. Continued use of ParkTek after updates indicates acceptance of the revised policy."],
  },
  {
    title: "11. Contact Information",
    paragraphs: ["For privacy-related questions or requests, contact:"],
    contact: true,
  },
];

const deletionInstructions = [
  { step: "Step 1", title: "Go to your user profile", body: "Open the ParkTek app and tap the profile icon from the home screen." },
  { step: "Step 2", title: "Tap Delete Account", body: "On the profile screen, tap the Delete Account button." },
  { step: "Step 3", title: "Confirm the pop-up", body: 'A confirmation pop-up will appear. Tap "Delete" to proceed.' },
  {
    step: "Step 4",
    title: "Your account is deactivated",
    body: "Once confirmed, account access and active vehicle permissions are removed. Required operational, audit or legal records may be retained under this policy.",
  },
];

export const metadata = makeMetadata({
  title: "Privacy Policy",
  description: "Read how ParkTek collects, uses, stores and protects personal information.",
  path: "/privacy-policy/",
});

function PolicyList({ list }) {
  return (
    <div>
      {list.label ? <h3>{list.label}</h3> : null}
      <ul>{list.items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Privacy policy", href: "/privacy-policy/" },
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
                <li aria-current="page">Privacy policy</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Privacy policy</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>How ParkTek handles personal information.</h1>
            <p className={styles.lead}>
              This policy explains how ParkTek collects, uses, stores and protects information across its
              application and related services.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.policy}>
              {privacySections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.lists?.map((list) => <PolicyList key={list.label || list.items.join("-")} list={list} />)}
                  {section.paragraphsAfter?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.contact ? <p><a href={CONTACT.emailHref}>{CONTACT.email}</a></p> : null}
                </section>
              ))}

              <section id="account-deletion">
                <h2>12. How to Delete Your Account</h2>
                <p>
                  You can request account deletion directly from the app by following the steps below. The
                  request deactivates account access and active vehicle permissions. Some operational, audit
                  or legally required records may be retained as described in the retention section above.
                </p>

                <div className={styles.deletionGrid}>
                  {deletionInstructions.map((item) => (
                    <article className={styles.deletionCard} key={item.step}>
                      <span className={styles.stepLabel}>{item.step}</span>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>

                <div className={styles.notice}>
                  <strong>Screenshot update in progress.</strong>
                  <p>
                    Legacy app captures were removed because they contained personal or location context and
                    described soft deletion as complete erasure. Publish replacement captures only after the
                    app language and redaction have been verified.
                  </p>
                </div>

                <p>
                  If you are unable to access the app and still need help with account deletion, contact{" "}
                  <a href={CONTACT.emailHref}>{CONTACT.email}</a>.
                </p>
              </section>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
