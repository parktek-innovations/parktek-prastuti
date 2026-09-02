import Link from "next/link";

import { CaseStudyCard } from "@/components/website/case-study-card";
import StructuredData from "@/components/website/structured-data";
import { CASE_STUDIES } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../marketing-pages.module.css";

export const metadata = makeMetadata({
  title: "Case Studies",
  description: "Explore ParkTek's residential vehicle-access approach and available deployment information.",
  path: "/case-studies/",
  noIndex: true,
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
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>Residential access in operating environments.</h1>
            <p className={styles.lead}>
              Review ParkTek&apos;s approach to vehicle identity, local gate decisions, barrier control and access records.
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
              <p className={styles.eyebrow}>Deployment overview</p>
              <h2>Understand the operating approach.</h2>
            </div>
            <div className={styles.factPanel}>
              <ul className={styles.checkList}>
                <li>Registered-vehicle identity through RFID and ANPR</li>
                <li>Local controller decisions and barrier operations</li>
                <li>Authorized handling for gate exceptions</li>
                <li>Society-scoped access records and support</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
