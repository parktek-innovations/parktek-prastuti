import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

import { CONTACT, SITE } from "@/lib/website-content";

import styles from "./website.module.css";

const QUICK_LINKS = [
  { label: "About Us", href: "/about/" },
  { label: "Features", href: "/#solutions" },
  { label: "FASTag Recharge", href: "/fastag/" },
  { label: "E-Challan", href: "/e-challan/" },
  { label: "Contact", href: "/contact/" },
  { label: "Careers", href: "/contact/" },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "/terms-of-service/" },
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Security", href: "/security/" },
];

const FOOTER_MEDIA_ITEMS = [
  {
    label: "ParkTek on X",
    icon: "/figma/footer/social-x.svg",
  },
  {
    label: "ParkTek Innovation on LinkedIn",
    href: "https://in.linkedin.com/company/https-parktek.in",
    icon: "/figma/footer/social-linkedin.svg",
  },
  {
    label: "ParkTek on YouTube",
    icon: "/figma/footer/social-youtube.svg",
  },
  {
    label: "ParkTek on Instagram",
  },
  {
    label: "Download ParkTek on Google Play",
    href: "https://play.google.com/store/apps/details?id=com.parktek.app&pcampaignid=web_share",
    icon: "/figma/footer/social-android.svg",
    isApp: true,
  },
  {
    label: "Download ParkTek on the App Store",
    href: "https://apps.apple.com/ca/app/parktek/id6760598237",
    icon: "/figma/footer/social-ios.svg",
    isApp: true,
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
            <p className={styles.footerAbout}>{SITE.legalName}</p>
            <Link href="/contact/">Join the ParkTek Team</Link>
          </div>

          <div className={styles.footerColumn}>
            <p className={styles.footerHeading}>Contact Us</p>
            <p className={styles.footerContactIntro}>For any inquiries, reach out to us at:</p>
            <a className={styles.footerContactLink} href={CONTACT.emailHref}>
              <span aria-hidden="true" className={styles.footerContactIcon}>
                <Mail size={20} />
              </span>
              <span>{CONTACT.email}</span>
            </a>
            <a className={styles.footerContactLink} href={CONTACT.phoneHref}>
              <span aria-hidden="true" className={styles.footerContactIcon}>
                <Phone size={20} />
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
                <MapPin size={20} />
              </span>
              <span>{CONTACT.address}</span>
            </a>
          </div>
        </div>

        <div className={styles.footerBrandRow}>
          <div className={styles.footerBrandGroup}>
            <Link aria-label={`${SITE.name} home`} href="/">
              <Image
                alt={SITE.name}
                className={styles.footerBrandLogo}
                height="54"
                src="/brand/parktek-logo-black.svg"
                width="152"
              />
            </Link>
            <nav aria-label="ParkTek apps and social profiles" className={styles.footerSocialRow}>
              {FOOTER_MEDIA_ITEMS.map((item) => {
                const icon = item.icon ? (
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={item.isApp ? styles.footerAppIcon : styles.footerSocialGlyph}
                    height={item.isApp ? 44 : 20}
                    src={item.icon}
                    width={item.isApp ? 44 : 20}
                  />
                ) : (
                  <Instagram aria-hidden="true" size={20} />
                );

                return item.href ? (
                  <a
                    aria-label={item.label}
                    className={styles.footerSocialLink}
                    href={item.href}
                    key={item.label}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {icon}
                  </a>
                ) : (
                  <span aria-hidden="true" className={styles.footerSocialIcon} key={item.label}>
                    {icon}
                  </span>
                );
              })}
            </nav>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <nav aria-label="Legal">
            {LEGAL_LINKS.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
