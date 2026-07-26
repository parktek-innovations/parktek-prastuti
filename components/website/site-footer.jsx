import Link from "next/link";
import Image from "next/image";

import { CONTACT, NAVIGATION, SITE, SOCIAL_LINKS } from "@/lib/website-content";

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

const SOCIAL_ICONS = {
  Instagram: (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5Zm4.25 3.1A4.9 4.9 0 1 1 7.1 12 4.9 4.9 0 0 1 12 7.1Zm0 2A2.9 2.9 0 1 0 14.9 12 2.9 2.9 0 0 0 12 9.1Zm5.15-2.35a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z" />
    </svg>
  ),
  LinkedIn: (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path d="M6.94 8.75H3.75V20h3.19V8.75ZM5.34 4a1.84 1.84 0 1 0 0 3.68 1.84 1.84 0 0 0 0-3.68Zm6.68 4.75H8.96V20h3.06v-5.89c0-1.55.29-3.05 2.21-3.05 1.89 0 1.91 1.77 1.91 3.15V20h3.07v-6.52c0-3.2-.69-5.66-4.42-5.66a3.87 3.87 0 0 0-3.48 1.91h-.04v-.98Z" />
    </svg>
  ),
};

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
          <div className={styles.socialLinks} aria-label="Social media">
            {SOCIAL_LINKS.map((item) => (
              <a
                aria-label={item.label}
                className={styles.socialLink}
                href={item.href}
                key={item.href}
                rel="noreferrer"
                target="_blank"
                title={item.label}
              >
                {SOCIAL_ICONS[item.label]}
              </a>
            ))}
          </div>
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
