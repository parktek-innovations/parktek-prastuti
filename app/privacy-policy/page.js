import Link from "next/link";

import StructuredData from "@/components/website/structured-data";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

const summaryFacts = [
  { label: "Privacy contact", value: "support@parktek.in", href: "mailto:support@parktek.in" },
  {
    label: "Account deletion",
    value: "Available from the ParkTek app where the Delete Account control is provided, or through support if you cannot access the app.",
  },
  { label: "Sale of personal data", value: "ParkTek does not sell or rent personal data." },
  {
    label: "Website analytics",
    value: "The public website uses Google Analytics to measure page views. ParkTek sends the page pathname and a sanitized page location without query-string values, together with the page title.",
  },
  {
    label: "Advertising trackers",
    value: "Currently, ParkTek does not intentionally deploy third-party advertising trackers on the public website. If this changes, ParkTek will update its notices and choices as required.",
  },
  {
    label: "Legal framework",
    value: "Applicable Indian law, including the Information Technology Act, 2000 and applicable rules, and the Digital Personal Data Protection Act, 2023 / Rules, 2025 as their relevant provisions come into force.",
  },
];

const personalDataRows = [
  ["Account, identity and contact", "Name, mobile number, email address, organisation/society, user role, account identifier, authentication information such as login/session tokens or OTP verification records.", "Account creation and administration; identity verification; access to Services; support and service communications."],
  ["Vehicle and access", "Vehicle registration number, RFID/tag identifier, vehicle assignment, permit/access status, site/society association, entry/exit time, access result, exception and authorised override records.", "Vehicle onboarding; access decisions; gate operations; history; audit; troubleshooting; safety and security."],
  ["ANPR and site-security", "Where enabled for an approved deployment: plate images, camera frames/streams, plate-match results, lane/gate context and related event data.", "Vehicle identification; access decisions; site security; investigation and support of access events."],
  ["Device and technical", "IP address, browser/device type, operating system, app version, login time, network/controller health, crash/error data, security events and technical logs.", "Service delivery; security; fraud/misuse prevention; troubleshooting; reliability; diagnostics."],
  ["Location", "Approximate or precise location only where a feature requests it and the relevant device permission is enabled.", "Location-dependent features, site context or other explicitly disclosed functionality."],
  ["Support, sales and communications", "Messages, enquiries, feedback, call/email records, issue details and information you provide to support or sales.", "Responding to requests; customer service; sales follow-up; dispute resolution; service improvement."],
  ["Website and browser", "Request/server logs, IP address, user agent, page/request time, essential cookies or local storage where required for functionality or security.", "Delivering and securing the website; session/functionality; abuse prevention; diagnostics."],
  ["Transaction-related (if enabled)", "Transaction reference, amount, status, parking/FASTag/E-Challan context and payment-provider response metadata. Full card/bank credentials are expected to be handled by authorised payment providers unless a specific flow says otherwise.", "Completing and reconciling an enabled transaction; support; fraud prevention; legal/accounting obligations."],
];

const policySections = [
  {
    title: "1. Who We Are and What This Policy Covers",
    paragraphs: [
      'PARKTEK INNOVATION PRIVATE LIMITED ("ParkTek", "we", "our" or "us") provides parking, vehicle-access and related technology services. This Privacy Policy applies when you visit parktek.in, use a ParkTek mobile application, use ParkTek access-control or parking-management services, interact with ParkTek dashboards, contact ParkTek support or sales, or otherwise use a ParkTek service (collectively, the "Services").',
      "Depending on the Service, this Policy may apply to residents, vehicle owners or users, society or property representatives, parking operators, authorised site staff, prospective customers, support contacts and website visitors.",
      "This Policy is intended to comply with applicable Indian privacy and information-security law. India has notified the Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025 with phased commencement. ParkTek will apply the provisions that are in force from time to time and will update this Policy where required. To the extent applicable, existing obligations under the Information Technology Act, 2000 and related rules also continue to apply.",
    ],
  },
  {
    title: "2. ParkTek’s Role in Different Deployments",
    paragraphs: ["ParkTek may act in different roles depending on the deployment:"],
    lists: [[
      "For ParkTek’s own website, account, support and direct service interactions, ParkTek generally determines why and how personal data is processed.",
      "For some society, property, campus or parking-operator deployments, the customer may determine the purpose of processing and instruct ParkTek to process resident, vehicle, access or operator data on its behalf. In those cases, the customer may provide its own privacy notice and may be the appropriate contact for certain requests.",
    ]],
    paragraphsAfter: ["Where ParkTek receives personal data from an authorised customer, operator, employer or society, that organisation is responsible for having the necessary authority to provide the data and for giving any notice or obtaining any consent required for its own processing."],
  },
  {
    title: "3. Personal Data We Collect",
    paragraphs: ["The data we handle depends on the feature, site and relationship. ParkTek seeks to collect only data reasonably necessary for the relevant purpose."],
    table: true,
    paragraphsAfter: ["Core ParkTek access-control services do not intentionally collect health information, sexual-orientation information or biometric identifiers. ParkTek does not use ANPR for facial recognition. If a future feature requires a new category of sensitive data, ParkTek will provide an appropriate notice before collecting it."],
  },
  {
    title: "4. How We Collect Personal Data",
    lists: [[
      "Directly from you when you register, submit a form, contact us, provide vehicle details, use the app or exercise a privacy choice.",
      "From an authorised society, property, employer, parking operator or other customer that uses ParkTek to manage an approved site or workflow.",
      "Automatically from ParkTek software, controllers, RFID readers, approved ANPR systems, website/server logs and other devices used to provide or secure the Service.",
      "From authorised service providers or integration partners where necessary to deliver a feature.",
    ]],
  },
  {
    title: "5. Why We Process Personal Data",
    paragraphs: ["ParkTek processes personal data for lawful purposes connected with providing and securing the Services. Depending on the context and applicable law, processing may be based on your consent, a Service you request, customer instructions, compliance with law, security needs or another lawful ground permitted by applicable law."],
    lists: [[
      "Create and administer user, resident, operator and site accounts.",
      "Register vehicles, RFID tags, permits and access permissions and associate them with the correct user/site context.",
      "Identify vehicles and evaluate configured site, vehicle, permit and operator rules for access-control or parking workflows.",
      "Operate and support barriers, controllers, RFID, ANPR, dashboards and parking-management workflows.",
      "Maintain operational, access, audit, security and troubleshooting records.",
      "Respond to enquiries, incidents, complaints and support requests.",
      "Prevent misuse, fraud, unauthorised access and security threats.",
      "Test, maintain and improve supported Services, reliability, performance and usability.",
      "Communicate service, account, operational and security notices.",
      "Send promotional communications only where permitted by law and subject to required consent/opt-out choices.",
      "Comply with legal, regulatory, contractual, tax/accounting and dispute-resolution obligations.",
    ]],
  },
  {
    title: "6. Vehicle Access, RFID, ANPR and Rule-Based Decisions",
    paragraphs: [
      "ParkTek Services may automatically evaluate vehicle identity, RFID/tag data, permit status, site rules and other configured conditions to decide whether an approved barrier workflow should proceed or an exception should be raised. Authorised site staff may review or override an event where the deployment permits it.",
      "These rule-based decisions are used for operational access-control and parking purposes. ParkTek does not use them to create advertising profiles or make lending/credit decisions.",
      "Where ANPR is enabled, its purpose is to recognise vehicle registration plates in the approved lane/site context. Camera positioning, access to images, availability and retention depend on the deployment and applicable customer/site requirements. ANPR is not represented as universally enabled across all ParkTek sites.",
    ],
  },
  {
    title: "7. Consent, Device Permissions and Your Choices",
    paragraphs: [
      "Where consent is required, ParkTek will seek it through a clear notice describing the relevant data and purpose. You may withdraw consent through available product controls or by contacting ParkTek. Withdrawal does not affect processing that was lawful before withdrawal, and a feature may stop working where the data is necessary to provide it.",
      "Device permissions such as location or camera access should be requested only where a feature requires them. You can manage device permissions through your operating-system settings. The permission request or feature notice should explain the purpose where required.",
      "You can opt out of promotional communications using the method provided in the message or by contacting ParkTek. Service, safety, security and transactional communications may still be sent where necessary.",
    ],
  },
  {
    title: "8. FASTag, E-Challan and Payment Information",
    paragraphs: [
      "Currently, ParkTek’s public FASTag and E-Challan pages are informational or enquiry-oriented and do not themselves provide a live payment-gateway flow. ParkTek’s core access-control Services are not designed to store complete debit-card, credit-card or bank-account credentials.",
      "If ParkTek enables a payment or live lookup feature, authorised third-party payment, banking, government-linked or data-service providers may process information required for that feature. ParkTek may receive transaction or lookup metadata such as a reference number, amount, status or response result. Before materially expanding such processing, ParkTek will update the applicable notice and this Policy where required.",
    ],
  },
  {
    title: "9. Cookies, Website Logs and Analytics",
    paragraphs: [
      "The public website uses Google Analytics for website usage measurement. ParkTek sends the page pathname and a sanitized page location without query-string values, together with the page title. ParkTek and its hosting/network providers may also process request and security logs and may use essential browser storage or cookies where needed to deliver, secure or operate the website.",
      "Currently, ParkTek does not intentionally deploy third-party advertising trackers on the public website. You can control browser cookies using your browser settings, although blocking essential storage may affect functionality.",
    ],
  },
  {
    title: "10. How We Share Personal Data",
    paragraphs: ["ParkTek does not sell or rent personal data. We may share personal data only where reasonably necessary for a lawful purpose, including with:"],
    lists: [[
      "The relevant society, property owner, employer, parking operator or customer and its authorised personnel for access and operational purposes.",
      "Service providers that support hosting, cloud/infrastructure, communications, monitoring, security, maintenance, support, analytics, integration or other technology functions.",
      "Payment, banking, government-linked or data-service providers where a specific enabled feature requires them.",
      "Professional advisers such as auditors, consultants, insurers or legal advisers where reasonably necessary and subject to appropriate obligations.",
      "Government, regulatory, judicial or law-enforcement authorities where disclosure is required or permitted by applicable law.",
      "A genuine successor, buyer or transaction participant in a merger, acquisition, restructuring, financing or transfer of business, subject to appropriate safeguards.",
    ]],
    paragraphsAfter: ["ParkTek requires service providers handling personal data on its behalf to use the data only for the agreed service and to apply appropriate confidentiality and security protections, subject to applicable contracts and law."],
  },
  {
    title: "11. Data Security and Personal Data Breaches",
    paragraphs: [
      "ParkTek uses reasonable technical and organisational safeguards appropriate to the nature of the Service and data involved. Depending on the system and deployment, safeguards may include encryption or secure transport, authentication, role-based access controls, logging and monitoring, environment separation, backups, vulnerability/incident management and contractual safeguards with relevant service providers.",
      "No system is completely secure. Users and authorised operators should protect their devices, credentials and OTPs and promptly report suspected misuse.",
      "If ParkTek becomes aware of a personal data breach, we will investigate, contain and remediate it and will notify affected individuals, customers and competent authorities when and in the manner required by applicable law. Where statutory breach-notification rules prescribe specific information or timelines, ParkTek will follow those requirements once applicable.",
    ],
  },
  {
    title: "12. Data Retention, Deletion and Backups",
    paragraphs: [
      "ParkTek retains personal data only for as long as reasonably necessary for the purpose for which it was collected, to provide the Service, preserve required operational/security/audit records, resolve disputes, comply with customer instructions or contracts, and meet legal or regulatory obligations.",
      "Retention varies by category and deployment. Active account and vehicle-permission data may be retained while the account or site relationship remains active. Access, security, transaction, support and audit records may be retained for a longer period where required for accountability, fraud/security investigation, contractual commitments or law. Backups may persist for a limited recovery cycle before being overwritten or deleted.",
      "Where applicable law prescribes a minimum or maximum retention period for logs or personal data, ParkTek will apply that period. When data is no longer required, ParkTek will delete, anonymise or securely dispose of it, subject to backup cycles and legally required retention.",
    ],
  },
  {
    title: "13. Your Privacy Rights and Requests",
    paragraphs: ["Depending on the applicable law and the commencement of relevant statutory provisions, you may have rights to:"],
    lists: [[
      "Ask what personal data ParkTek processes about you and obtain information or a summary where the law provides that right.",
      "Request correction, completion or updating of inaccurate or incomplete personal data.",
      "Request erasure where the data is no longer required and no lawful retention obligation applies.",
      "Withdraw consent where processing is based on consent.",
      "Raise a grievance about ParkTek’s handling of your personal data.",
      "Nominate another individual to exercise applicable rights in circumstances recognised by law.",
    ]],
    paragraphsAfter: [
      "To protect personal data, ParkTek may verify your identity before acting on a request. If the relevant data is controlled by a society, property, employer or parking operator, ParkTek may coordinate with or direct the request to that organisation. We may retain information where necessary for legal, security, audit, operational or dispute-resolution purposes.",
      "Where applicable law provides a right to approach a competent data-protection authority or board, you may do so subject to the process and preconditions prescribed by that law.",
    ],
  },
  {
    title: "14. Children’s Personal Data",
    paragraphs: [
      "ParkTek Services are not directed to children for independent use. Under India’s Digital Personal Data Protection framework, a child is an individual under 18 years of age. ParkTek does not knowingly encourage children to create independent accounts or provide personal data without appropriate adult involvement.",
      "Where ParkTek knowingly processes personal data of a child in a context where applicable law requires parental consent or other safeguards, ParkTek will use reasonable measures to obtain or verify the required parent/guardian authorisation and will apply the additional protections required by law. If you believe a child has provided data without appropriate authorisation, contact ParkTek.",
    ],
  },
  {
    title: "15. International and Cross-Border Processing",
    paragraphs: ["ParkTek may use service providers or systems located in India or other jurisdictions. If personal data is processed or transferred outside India, ParkTek will comply with applicable Indian legal requirements, contractual safeguards and any transfer restrictions notified by the Government of India. This Policy does not state that all ParkTek data is stored exclusively in India unless ParkTek separately confirms that for a specific Service or customer deployment."],
  },
  {
    title: "16. Third-Party Services and Links",
    paragraphs: ["The Services may link to or integrate with third-party websites, applications, hardware, payment services or data sources. Those third parties may independently determine how they process personal data and may have their own privacy notices. ParkTek is not responsible for independent third-party processing outside ParkTek’s control. Review the relevant third-party privacy information before using those services."],
  },
  {
    title: "17. Changes to This Policy",
    paragraphs: ["ParkTek may update this Privacy Policy to reflect changes in Services, technology, law or data practices. We will publish the revised Policy on this page. If a change materially affects how personal data is processed or fresh consent is legally required, ParkTek will provide additional notice or obtain consent as required."],
  },
  {
    title: "18. Privacy and Grievance Contact",
    paragraphs: ["For privacy questions, rights requests, grievances, account-deletion assistance or concerns about how ParkTek handles personal data, contact:"],
    contact: true,
    paragraphsAfter: ["ParkTek will use this business contact to answer privacy questions and receive grievances. If ParkTek later designates a Data Protection Officer or another privacy/grievance contact required by law, the current contact details will be published here and in the relevant app/website experience."],
  },
];

const deletionSteps = [
  { step: "STEP 1", title: "Open your profile", body: "Open the ParkTek app and tap the profile icon from the home screen." },
  { step: "STEP 2", title: "Tap Delete Account", body: "On the profile screen, tap the Delete Account button." },
  { step: "STEP 3", title: "Confirm the request", body: "When the confirmation prompt appears, select Delete to proceed." },
  { step: "STEP 4", title: "Account access is deactivated", body: "Once confirmed, account access and active vehicle permissions are removed. Data that must be retained for legal, security, audit, operational or contractual reasons may remain until the applicable retention period ends." },
];

export const metadata = makeMetadata({
  title: "Privacy Policy",
  description: "This Policy explains what personal data ParkTek handles, why we use it, when we share it, how long we keep it, and the choices available to you.",
  path: "/privacy-policy/",
});

function PolicyTable() {
  return (
    <div className={styles.policyTableWrap}>
      <table className={styles.policyTable}>
        <thead><tr><th scope="col">Category</th><th scope="col">Examples</th><th scope="col">Main purposes</th></tr></thead>
        <tbody>
          {personalDataRows.map(([category, examples, purposes]) => (
            <tr key={category}><th scope="row">{category}</th><td>{examples}</td><td>{purposes}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactDetails() {
  return (
    <dl className={styles.policyFacts}>
      <div><dt>Company</dt><dd>PARKTEK INNOVATION PRIVATE LIMITED</dd></div>
      <div><dt>Email</dt><dd><a href="mailto:support@parktek.in">support@parktek.in</a></dd></div>
      <div><dt>Phone</dt><dd><a href="tel:+919899945876">+91 9899945876</a></dd></div>
      <div><dt>Address</dt><dd>SK-70, Sector 112, Noida - 201301, India</dd></div>
    </dl>
  );
}

function PolicySection({ section }) {
  return (
    <section>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.lists?.map((items) => <ul key={items[0]}>{items.map((item) => <li key={item}>{item}</li>)}</ul>)}
      {section.table ? <PolicyTable /> : null}
      {section.contact ? <ContactDetails /> : null}
      {section.paragraphsAfter?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </section>
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
            <nav aria-label="Breadcrumb"><ol className={styles.breadcrumb}><li><Link href="/">Home</Link></li><li aria-current="page">Privacy policy</li></ol></nav>
            <p className={styles.eyebrow}>Privacy policy</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Privacy Policy</h1>
            <p className={styles.policyCompany}>PARKTEK INNOVATION PRIVATE LIMITED</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <article className={styles.policy}>
              <section className={styles.policySummary}>
                <h2>Plain-language summary</h2>
                <p>This Policy explains what personal data ParkTek handles, why we use it, when we share it, how long we keep it, and the choices available to you. ParkTek does not sell or rent personal data. Current public FASTag and E-Challan pages are informational or enquiry-oriented and do not themselves provide a live payment-gateway flow.</p>
                <dl className={styles.policyFacts}>
                  {summaryFacts.map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.href ? <a href={fact.href}>{fact.value}</a> : fact.value}</dd></div>)}
                </dl>
              </section>

              {policySections.map((section) => <PolicySection key={section.title} section={section} />)}

              <section id="account-deletion">
                <h2>19. How to Delete Your ParkTek Account</h2>
                <p>Where the ParkTek app provides the Delete Account control, you can start an account-deletion request from your profile. The current user flow is:</p>
                <div className={styles.deletionGrid}>
                  {deletionSteps.map((item) => <article className={styles.deletionCard} key={item.step}><span className={styles.stepLabel}>{item.step}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}
                </div>
                <p>If you cannot access the app or need help with deletion, email <a href="mailto:support@parktek.in">support@parktek.in</a>. Account deletion does not require immediate erasure of records that ParkTek or the relevant customer must retain for legal, security, audit, operational, contractual or backup-recovery purposes. Such records will be handled under the retention section above.</p>
              </section>

              <section>
                <h2>20. Cancellation and Refunds</h2>
                <p>This section applies to prepaid parking bookings made through ParkTek Services where parking-booking functionality is enabled.</p>

                <h3>1. Prepaid bookings</h3>
                <p>All applicable parking bookings are prepaid. The user must select the parking location, booking duration and other required booking details before confirmation. Charges are calculated according to the selected duration and the applicable rates of the relevant parking site.</p>

                <h3>2. Cancellation and refunds</h3>
                <p>Confirmed bookings are generally non-cancellable and non-refundable except in special circumstances, including where the confirmed parking service cannot be provided to the user.</p>

                <h3>3. Obligation to honour a confirmed booking</h3>
                <p>Once a parking booking has been successfully confirmed, the relevant parking owner, operator, caretaker or authorised site representative must honour the confirmed reservation and provide the reserved parking space when the ParkTek user arrives in accordance with the booking conditions.</p>

                <h3>4. Additional parking time</h3>
                <p>A confirmed booking covers only the duration paid for by the user. If the vehicle remains parked beyond the confirmed booking period, the parking facility may charge the user for the additional hours or days in accordance with the applicable parking rates. Such valid additional charges are non-refundable once incurred.</p>

                <h3>5. Disputes or unavailability</h3>
                <p>If a dispute arises between a ParkTek user and a parking owner, operator, caretaker or authorised site representative, including where a confirmed parking space is unavailable when the user arrives, the user should contact ParkTek support so that the issue can be reviewed and resolved.</p>
                <p>
                  Email: <a href="mailto:support@parktek.in">support@parktek.in</a><br />
                  Phone: <a href="tel:+919899945876">+91 9899945876</a>
                </p>

                <h3>6. Alternative parking where the confirmed space is unavailable</h3>
                <p>If the primary reason for the dispute is the unavailability of the confirmed parking space, ParkTek will arrange the nearest reasonably available alternative parking space for the user.</p>

                <h3>7. Full refund where an alternative cannot be provided</h3>
                <p>If the confirmed parking space is unavailable and ParkTek is unable to provide a suitable alternative parking space, ParkTek will refund the full eligible amount paid by the user for that booking.</p>
                <p>ParkTek may, at its sole discretion, also provide a goodwill credit, promotional benefit or other incentive. Any such additional benefit is discretionary and is separate from the user&apos;s eligible refund.</p>

                <h3>8. Other disputes</h3>
                <p>Any dispute that cannot be resolved through ParkTek support will be handled in accordance with the applicable Terms of Service, contractual arrangements and applicable law.</p>

                <h3>9. Refund processing</h3>
                <p>Where a refund is approved, ParkTek will initiate the refund through the original payment method or another permitted payment method. The time required for the refunded amount to reflect may depend on the relevant bank, payment gateway, card network, UPI provider or other payment-service provider.</p>
              </section>

              <section>
                <h2>21. Charges and Fees</h2>
                <p>ParkTek does not charge any additional convenience fee or platform fee for supported BBPS bill-payment transactions. Any charges imposed by a biller, BBPS participant, bank, card network, payment gateway or other payment partner will be clearly displayed to the customer before confirmation of the transaction.</p>

                <div className={styles.feeSummaryGrid}>
                  <article className={styles.feeSummaryCard}>
                    <h3>ParkTek Convenience Fee</h3>
                    <p className={styles.feeValue}>₹0</p>
                  </article>
                  <article className={styles.feeSummaryCard}>
                    <h3>ParkTek Platform Fee</h3>
                    <p className={styles.feeValue}>₹0</p>
                  </article>
                </div>

                <div className={styles.policyTableWrap}>
                  <table className={[styles.policyTable, styles.feesTable].join(" ")}>
                    <thead><tr><th scope="col">Service</th><th scope="col">ParkTek Convenience Fee</th></tr></thead>
                    <tbody>
                      <tr><th scope="row">Electricity Bill Payment</th><td>₹0</td></tr>
                      <tr><th scope="row">Water Bill Payment</th><td>₹0</td></tr>
                      <tr><th scope="row">Gas Bill Payment</th><td>₹0</td></tr>
                      <tr><th scope="row">Mobile Postpaid Bill Payment</th><td>₹0</td></tr>
                      <tr><th scope="row">Broadband / Landline Bill Payment</th><td>₹0</td></tr>
                      <tr><th scope="row">DTH Bill Payment</th><td>₹0</td></tr>
                      <tr><th scope="row">FASTag Recharge</th><td>₹0*</td></tr>
                      <tr><th scope="row">Credit Card Bill Payment</th><td>₹0*</td></tr>
                      <tr><th scope="row">Other BBPS Services</th><td>₹0*</td></tr>
                    </tbody>
                  </table>
                </div>

                <p className={styles.policyFootnote}>* ParkTek does not levy an additional convenience or platform fee. Charges imposed by a biller, bank, card network, payment gateway or other payment partner may still apply and, where applicable, will be disclosed before transaction confirmation.</p>

                <aside className={styles.policyInfoBox}>
                  <h3>Card and Other Payment Charges</h3>
                  <p>Credit or debit card payments may attract approximately 1%–3% in transaction, gateway or payment-partner charges imposed by the applicable bank, card network, payment gateway or other payment provider. Any applicable card charge will be clearly displayed before the customer confirms the transaction.</p>
                  <p>UPI payments through supported options such as Google Pay, PhonePe or BHIM are free and carry ₹0 ParkTek convenience fee and ₹0 ParkTek platform fee.</p>
                </aside>
              </section>

              <aside className={styles.policyImportant}>
                <strong>Important</strong>
                <p>This Privacy Policy should be read together with any feature-specific notice, customer/society notice or consent screen shown at the point personal data is collected. If a specific service notice conflicts with this general Policy for that service, the more specific notice will govern to the extent permitted by law.</p>
              </aside>
              <p className={styles.policyCopyright}>© 2026 PARKTEK INNOVATION PRIVATE LIMITED</p>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
