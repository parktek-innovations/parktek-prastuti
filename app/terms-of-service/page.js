import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { CONTACT } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const termsSections = [
  {
    title: "1. Acceptance and Scope",
    paragraphs: [
      "These Terms apply to users of ParkTek services unless a specific feature, customer arrangement or separate written agreement states otherwise.",
      "Where a service-specific term applies, it will govern that service to the extent of any direct conflict with these general Terms, where permitted by law.",
    ],
  },
  {
    title: "2. General Use of ParkTek Services",
    paragraphs: [
      "ParkTek provides technology for parking operations, vehicle identification, access control, connected gate workflows, operational dashboards and other supported mobility or parking services.",
      "The availability of a feature depends on the applicable product and deployment. Societies, property owners, parking operators or other authorised customers may control site rules, access permissions and operational decisions within their own locations.",
      "You must use ParkTek only for lawful and authorised purposes and comply with the rules of the relevant property or parking facility.",
    ],
  },
  {
    title: "3. User Accounts",
    paragraphs: [
      "Some ParkTek services may require an account, mobile-number verification, OTP or other authentication. You are responsible for providing accurate information and keeping your account details current.",
      "You must keep passwords, OTPs and other access credentials confidential and must not allow unauthorised persons to use your account. Please notify ParkTek if you suspect unauthorised access or misuse.",
    ],
  },
  {
    title: "4. User Responsibilities and Prohibited Use",
    paragraphs: [
      "You must not misuse ParkTek services, interfere with connected systems, attempt unauthorised access, submit knowingly false information, impersonate another person, introduce malicious code, bypass access controls or use ParkTek in violation of applicable law.",
      "You must not copy, scrape, extract or systematically collect ParkTek content or service data using automated means except where ParkTek has expressly authorised that activity.",
    ],
  },
  {
    title: "5. Ownership and Permitted Use",
    paragraphs: [
      "ParkTek’s websites, applications, software, interfaces, designs, documentation, trademarks, service names and other proprietary materials are owned by ParkTek or used under appropriate licence. Third-party names and marks remain the property of their respective owners.",
      "Using ParkTek does not transfer ownership of any ParkTek intellectual property to you. You may use ParkTek content only as reasonably necessary to access and use the service for its intended purpose, unless ParkTek gives you separate written permission.",
    ],
  },
  {
    title: "6. Feedback and Submissions",
    paragraphs: [
      "If you voluntarily send ParkTek ideas, suggestions or product feedback, ParkTek may use that feedback to evaluate, improve or develop its services without an obligation to compensate you.",
      "You remain responsible for the content you submit and should not provide material that you do not have the right to share.",
    ],
  },
  {
    title: "7. External Links and Third-Party Services",
    paragraphs: [
      "ParkTek services may contain links to or integrations with third-party websites, hardware, payment providers, data sources or other services. These are provided where useful to the applicable feature or workflow.",
      "Third parties operate under their own terms, policies and technical controls. ParkTek is not responsible for independent third-party content or conduct outside ParkTek’s reasonable control, except where responsibility cannot legally be excluded.",
    ],
  },
  {
    title: "8. Service Availability, Maintenance and Changes",
    paragraphs: [
      "ParkTek aims to keep its services reliable, but continuous or error-free availability is not guaranteed. Maintenance, network conditions, power, hardware, external APIs or other dependencies may affect service availability.",
      "ParkTek may update, improve, replace or discontinue features where reasonably required for product, security, legal, operational or commercial reasons. Where appropriate, material changes may be communicated through the applicable website, application or customer channel.",
    ],
  },
  {
    title: "9. Suspension and Termination",
    paragraphs: [
      "ParkTek may restrict, suspend or terminate access where reasonably necessary because of misuse, a material breach of these Terms, suspected fraud, security risk, unlawful activity, customer/site instructions or discontinuation of the applicable service.",
      "Where reasonably practicable and appropriate, ParkTek may provide notice or an opportunity to address the issue. Provisions that are intended by their nature to continue after termination will remain in effect.",
    ],
  },
  {
    title: "10. Disclaimer and Limitation of Liability",
    paragraphs: [
      "ParkTek services are provided subject to the technical and operational limitations described in these Terms. To the extent permitted by law, ParkTek does not guarantee uninterrupted access, uninterrupted third-party availability or outcomes controlled by independent parking operators, property owners, banks, government authorities, network providers or other third parties.",
      "To the extent permitted by applicable law, ParkTek will not be responsible for indirect, incidental, special or consequential loss arising solely from circumstances outside ParkTek’s reasonable control. Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by law.",
    ],
  },
  {
    title: "11. Copyright and Intellectual Property Complaints",
    paragraphs: [
      "If you believe content made available through a ParkTek-owned website or application infringes your copyright or other intellectual-property rights, contact ParkTek with enough information to identify the protected work, the material complained of, where it appears, your contact details and the basis of your claim.",
      "ParkTek may request reasonable supporting information before reviewing or acting on a complaint.",
    ],
  },
  {
    title: "12. Privacy and Security",
    paragraphs: [
      "ParkTek’s handling of personal data is described in the ParkTek Privacy Policy and any applicable service-specific notice. Security practices and responsible-reporting information are described on the ParkTek Security page.",
      "You are responsible for protecting your own account credentials, devices and authentication information and for promptly reporting suspected misuse.",
    ],
  },
  {
    title: "13. Changes to These Terms",
    paragraphs: [
      "ParkTek may update these Terms to reflect changes in services, law, technology or business operations. The revised version will be published with an updated effective or last-updated date.",
      "Where applicable law requires additional notice or consent for a material change, ParkTek will provide it as required.",
    ],
  },
  {
    title: "14. Governing Law and Disputes",
    paragraphs: [
      "These Terms are governed by the laws of India.",
      "Users should first contact ParkTek so that a complaint or dispute can be reviewed and, where possible, resolved through the appropriate support process.",
    ],
  },
  {
    title: "15. Contact",
    paragraphs: ["For questions about these Terms or the use of ParkTek services, contact:"],
    contact: true,
  },
];

export const metadata = makeMetadata({
  title: "Terms of Service",
  description: "Terms governing access to and use of ParkTek services.",
  path: "/terms-of-service/",
});

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
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Terms of Service</h1>
            <p className={styles.policyCompany}>PARKTEK INNOVATION PRIVATE LIMITED</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.policy}>
              <section className={styles.policySummary}>
                <p>These Terms of Service (“Terms”) govern your access to and use of ParkTek websites, mobile applications, dashboards, connected parking and vehicle-access services, and other ParkTek features made available by PARKTEK INNOVATION PRIVATE LIMITED (“ParkTek”, “we”, “our” or “us”). By accessing or using an applicable ParkTek service, you agree to these Terms. If you do not agree, you should not use the relevant service.</p>
              </section>

              {termsSections.map((section) => (
                <section key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.contact ? (
                    <>
                      <p>PARKTEK INNOVATION PRIVATE LIMITED</p>
                      <p>Email: <a href={CONTACT.emailHref}>{CONTACT.email}</a></p>
                      <p>Phone: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
                      <p>Address: {CONTACT.address}, India</p>
                    </>
                  ) : null}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
