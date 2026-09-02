import Link from "next/link";

import styles from "./marketing-pages.module.css";

export const metadata = {
  title: "Page not found | ParkTek",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero}>
        <div className={[styles.container, styles.heroInner].join(" ")}>
          <p className={styles.eyebrow}>404</p>
          <h1 className={[styles.title, styles.compactTitle].join(" ")}>This ParkTek page is not available.</h1>
          <p className={styles.lead}>Return to the connected parking overview or start with a site assessment.</p>
          <div className={styles.actions}>
            <Link className={styles.primaryButton} href="/">Return home</Link>
            <Link className={styles.secondaryButton} href="/book-site-assessment/">Book a Site Assessment</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
