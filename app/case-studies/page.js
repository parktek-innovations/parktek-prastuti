import Link from "next/link";

import { CaseStudyCard } from "@/components/website/case-study-card";
import StructuredData from "@/components/website/structured-data";
import { CASE_STUDIES } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

export const metadata = makeMetadata({
  title: "Case Studies",
  description: "Verified ParkTek deployment stories will appear here after customer approval and outcome review.",
  path: "/case-studies/",
});

export default function CaseStudiesPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies/" },
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
                <li aria-current="page">Case studies</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>Deployment proof</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Customer stories, published only after verification.</h1>
            <p className={styles.lead}>
              ParkTek will publish site context, approved imagery, deployed scope and measured outcomes here.
              We do not use invented results while those stories are being prepared.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid2}>
              {CASE_STUDIES.map((study) => (
                <CaseStudyCard headingLevel="h2" key={study.slug} study={study} />
              ))}
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Evidence standard</p>
              <h2>Scope and outcomes must be attributable.</h2>
            </div>
            <div className={styles.factPanel}>
              <ul className={styles.checkList}>
                <li>Customer approval before names, logos or site images are published</li>
                <li>Deployment scope checked against implementation records</li>
                <li>Metrics tied to a defined period and source</li>
                <li>No outcome claim inferred from a product feature</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
