import Link from "next/link";

import { LeadForm } from "@/components/website/lead-form";
import StructuredData from "@/components/website/structured-data";
import { DEPLOYMENT_STEPS } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

export const metadata = makeMetadata({
  title: "Book a Site Assessment",
  description: "Tell ParkTek about your gates, equipment, capacity and parking workflow to scope a site assessment.",
  path: "/book-site-assessment/",
});

export default function BookSiteAssessmentPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Book a site assessment", href: "/book-site-assessment/" },
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
                <li aria-current="page">Book a site assessment</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Site assessment</p>
            <h1 className={styles.title}>Start with your gates, equipment and operating reality.</h1>
            <p className={styles.lead}>
              Share enough context for ParkTek to understand the site. The follow-up will confirm fit,
              supported equipment, operating requirements and the next practical step.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>What follows</p>
              <h2>A scoped path from assessment to supported operation.</h2>
            </div>
            <div className={[styles.flow, styles.flowFive].join(" ")}>
              {DEPLOYMENT_STEPS.map((step) => (
                <article className={styles.flowItem} key={step.number}>
                  <span className={styles.flowNumber}>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.container}>
            <LeadForm
              description="Tell us about the site, gates, parking capacity, current equipment and the workflow you need to improve."
              heading="Tell us about your site"
              source="Book site assessment page"
            />
          </div>
        </section>
      </main>
    </>
  );
}
