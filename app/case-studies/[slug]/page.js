import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import StructuredData from "@/components/website/structured-data";
import { CASE_STUDIES } from "@/lib/website-content";
import { breadcrumbJsonLd, makeMetadata } from "@/lib/seo";

import styles from "../../marketing-pages.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const study = CASE_STUDIES.find((item) => item.slug === params.slug);

  return makeMetadata({
    title: study?.title || "Case Study",
    description: study?.summary || "ParkTek deployment overview.",
    path: `/case-studies/${params.slug}/`,
    noIndex: Boolean(study?.isPlaceholder),
  });
}

export default function CaseStudyPage({ params }) {
  const study = CASE_STUDIES.find((item) => item.slug === params.slug);
  if (!study) notFound();

  const facts = [
    ["Customer / property", study.customer],
    ["Property type", study.siteType],
    ["City", study.city],
    ["Number of gates", study.gates],
    ["Number of barriers", study.barriers],
    ["Deployment time", study.deploymentTime],
    ["Registered vehicles or residents", study.registeredVehiclesOrResidents],
  ];

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Case studies", href: "/case-studies/" },
    { name: study.title, href: `/case-studies/${study.slug}/` },
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
                <li><Link href="/case-studies/">Case studies</Link></li>
                <li aria-current="page">{study.title}</li>
              </ol>
            </nav>
            <p className={styles.eyebrow}>{study.siteType} · {study.status}</p>
            <h1 className={[styles.title, styles.compactTitle].join(" ")}>{study.title}</h1>
            <p className={styles.lead}>{study.summary}</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div>
              {study.images.length ? (
                <div className={styles.caseImageGrid}>
                  {study.images.map((item) => (
                    <Image
                      alt={item.alt}
                      height={item.height}
                      key={item.src}
                      src={item.src}
                      width={item.width}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.placeholder}>Residential vehicle-access operations</div>
              )}
              <dl className={styles.caseFacts}>
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className={styles.stack}>
              <article className={styles.card}>
                <h2>Published information</h2>
                <p>
                  This overview explains ParkTek&apos;s residential access approach. Customer-specific identity,
                  location, installation details and results are not publicly disclosed.
                </p>
              </article>
              <article className={styles.card}>
                <h2>Problem</h2>
                <p>{study.problem}</p>
              </article>
              <article className={styles.card}>
                <h2>Solution</h2>
                <p>{study.solution}</p>
              </article>
              <article className={styles.card}>
                <h2>Measurable results</h2>
                <p>{study.measurableResults}</p>
              </article>
              <article className={styles.card}>
                <h2>Customer quote</h2>
                <blockquote className={styles.caseQuote}>{study.customerQuote}</blockquote>
              </article>
            </div>
          </div>
        </section>

        <section className={[styles.section, styles.sectionMuted].join(" ")}>
          <div className={[styles.container, styles.split].join(" ")}>
            <div className={styles.splitCopy}>
              <p className={styles.eyebrow}>Planning a site?</p>
              <h2>Assess your own gates and parking workflow.</h2>
            </div>
            <div className={styles.actions}>
              <Link className={styles.primaryButton} href="/book-site-assessment/">Book a Site Assessment</Link>
              <Link className={styles.secondaryButton} href="/case-studies/">Back to case studies</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
