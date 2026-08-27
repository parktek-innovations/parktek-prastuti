import Image from "next/image";
import Link from "next/link";

import styles from "./case-study-card.module.css";

export function CaseStudyCard({ featured = false, headingLevel = "h3", study, variant = "default" }) {
  const Heading = headingLevel;
  const image = study.images?.[0] || study.image;

  return (
    <article
      className={[
        styles.card,
        featured ? styles.featured : "",
        variant === "prastuti" ? styles.prastuti : ""
      ].filter(Boolean).join(" ")}
    >
      <div className={styles.media}>
        {image ? (
          <Image
            alt={image.alt}
            height={image.height}
            src={image.src}
            width={image.width}
          />
        ) : (
          <span>Customer-approved site image to be added</span>
        )}
      </div>
      <div className={styles.copy}>
        <p className={styles.meta}>{study.siteType} · {study.status}</p>
        <Heading>{study.title}</Heading>
        <p className={styles.summary}>{study.summary}</p>
        <Link className={styles.link} href={`/case-studies/${study.slug}/`}>
          View the case-study template <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
