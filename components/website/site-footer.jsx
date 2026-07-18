import Link from "next/link";
import Image from "next/image";

import { CONTACT, NAVIGATION, SITE } from "@/lib/website-content";

import styles from "./website.module.css";

const solutionLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.find((item) => item.label === "Solutions")?.items || []
  : NAVIGATION.solutions || [];
const primaryLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.filter((item) => !item.items)
  : NAVIGATION.links || [];

const LEGAL_LINKS = [
  { label: "Security", href: "/security/" },
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms-of-service/" },
];

export function SiteFooter({ className = "" }) {
  return (
    <footer className={[styles.siteFooter, className].filter(Boolean).join(" ")}>
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <Link aria-label={`${SITE.name} home`} href="/">
            <Image alt={SITE.name} height="54" src="/brand/parktek-logo-white.svg" width="152" />
          </Link>
          <p>{SITE.tagline || SITE.description}</p>
        </div>

        <nav aria-label="Solutions" className={styles.footerColumn}>
          <p className={styles.footerHeading}>Solutions</p>
          {solutionLinks.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Company" className={styles.footerColumn}>
          <p className={styles.footerHeading}>Company</p>
          {primaryLinks.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/book-site-assessment/">Book a site assessment</Link>
        </nav>

        <div className={styles.footerColumn}>
          <p className={styles.footerHeading}>Contact</p>
          <a href={CONTACT.emailHref}>{CONTACT.email}</a>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={CONTACT.mapHref} rel="noreferrer" target="_blank">
            {CONTACT.address}
          </a>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <nav aria-label="Legal">
          {LEGAL_LINKS.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
