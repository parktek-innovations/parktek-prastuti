import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { CONTACT, NAVIGATION, SITE } from "@/lib/website-content";

import styles from "./website.module.css";

const solutionLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.find((item) => item.label === "Solutions")?.items || []
  : NAVIGATION.solutions || [];
const primaryLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.filter((item) => !item.items)
  : NAVIGATION.links || [];

const QUICK_LINKS = [
  ...primaryLinks,
  { label: "Book a Site Assessment", href: "/book-site-assessment/" },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms-of-service/" },
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Security", href: "/security/" },
];

const VERIFIED_APP_LINKS = [
  {
    label: "Download ParkTek on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.parktek.app&pcampaignid=web_share",
    icon: "/figma/footer/social-android.svg",
  },
  {
    label: "Download ParkTek on the App Store",
    href: "https://apps.apple.com/ca/app/parktek/id6760598237",
    icon: "/figma/footer/social-ios.svg",
  },
];

export function SiteFooter({ className = "" }) {
  return (
    <footer className={[styles.siteFooter, className].filter(Boolean).join(" ")}>
      <div className={styles.footerShell}>
        <div className={styles.footerInner}>
          <nav aria-label="Quick links" className={styles.footerColumn}>
            <p className={styles.footerHeading}>Quick Links</p>
            {QUICK_LINKS.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>About ParkTek</p>
            <p className={styles.footerAbout}>{SITE.tagline || SITE.description}</p>
            <nav aria-label="ParkTek solutions" className={styles.footerSolutionLinks}>
              {solutionLinks.slice(0, 2).map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>Contact Us</p>
            <a className={styles.footerContactLink} href={CONTACT.emailHref}>
              <span aria-hidden="true" className={styles.footerContactIcon}>
                <Mail size={17} />
              </span>
              <span>{CONTACT.email}</span>
            </a>
            <a className={styles.footerContactLink} href={CONTACT.phoneHref}>
              <span aria-hidden="true" className={styles.footerContactIcon}>
                <Phone size={17} />
              </span>
              <span>{CONTACT.phone}</span>
            </a>
            <a
              className={styles.footerContactLink}
              href={CONTACT.mapHref}
              rel="noreferrer"
              target="_blank"
            >
              <span aria-hidden="true" className={styles.footerContactIcon}>
                <MapPin size={17} />
              </span>
              <span>{CONTACT.address}</span>
            </a>
          </div>
        </div>

        <div className={styles.footerBrandRow}>
          <Link aria-label={`${SITE.name} home`} href="/">
            <Image alt={SITE.name} height="54" src="/brand/parktek-logo-black.svg" width="152" />
          </Link>
          <div className={styles.footerBrandMeta}>
            <nav aria-label="ParkTek apps" className={styles.footerSocialRow}>
              {VERIFIED_APP_LINKS.map((item) => (
                <a
                  aria-label={item.label}
                  className={styles.footerSocialLink}
                  href={item.href}
                  key={item.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image alt="" aria-hidden="true" height="44" src={item.icon} width="44" />
                </a>
              ))}
            </nav>
            <p>{SITE.legalName}</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <nav aria-label="Legal">
            {LEGAL_LINKS.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
