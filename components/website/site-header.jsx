"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { NAVIGATION, SITE } from "@/lib/website-content";

import styles from "./website.module.css";

const solutionLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.find((item) => item.label === "Solutions")?.items || []
  : NAVIGATION.solutions || [];
const industryLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.find((item) => item.label === "Industries")?.items || []
  : NAVIGATION.industries || [];
const primaryLinks = Array.isArray(NAVIGATION)
  ? NAVIGATION.filter((item) => !item.items)
  : NAVIGATION.links || [];

function Dropdown({ items, label }) {
  return (
    <details className={styles.navDropdown}>
      <summary className={styles.navSummary}>
        {label}
        <span aria-hidden="true" className={styles.chevron} />
      </summary>
      <div className={styles.dropdownPanel}>
        {items.map((item) => (
          <Link className={styles.dropdownLink} href={item.href} key={item.href}>
            <span>{item.label}</span>
            {item.status ? <span className={styles.dropdownMeta}>{item.status}</span> : null}
          </Link>
        ))}
      </div>
    </details>
  );
}

function MobileGroup({ items, label, onNavigate }) {
  return (
    <div className={styles.mobileGroup}>
      <p className={styles.mobileGroupTitle}>{label}</p>
      {items.map((item) => (
        <Link className={styles.mobileLink} href={item.href} key={item.href} onClick={onNavigate}>
          <span>{item.label}</span>
          {item.status ? <span className={styles.mobileMeta}>{item.status}</span> : null}
        </Link>
      ))}
    </div>
  );
}

export function SiteHeader({ className = "" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    previousFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const frame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector(focusableSelector)?.focus();
    });

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusable = Array.from(menuRef.current.querySelectorAll(focusableSelector));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1040px)");
    const closeAtDesktop = (event) => {
      if (event.matches) setOpen(false);
    };

    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={[styles.siteHeader, className].filter(Boolean).join(" ")}>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>

      <div className={styles.headerInner}>
        <Link aria-label={`${SITE.name} home`} className={styles.brandLink} href="/">
          <Image
            alt={SITE.name}
            className={styles.brandLogo}
            height="54"
            src="/brand/parktek-logo-black.svg"
            width="152"
          />
        </Link>

        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          <Dropdown items={solutionLinks} label="Solutions" />
          <Dropdown items={industryLinks} label="Industries" />
          {primaryLinks.map((item) => (
            <Link className={styles.headerLink} href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className={styles.headerCta} href={SITE.primaryCta.href}>
          {SITE.primaryCta.label}
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className={styles.menuToggle}
          onClick={() => setOpen((current) => !current)}
          ref={toggleRef}
          type="button"
        >
          <span aria-hidden="true" className={styles.menuIcon} data-open={open ? "true" : "false"}>
            <span />
            <span />
          </span>
        </button>
      </div>

      {open ? (
        <div
          className={styles.mobileBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeMenu();
          }}
        >
          <div
            aria-label="Site navigation"
            aria-modal="true"
            className={styles.mobilePanel}
            id="mobile-navigation"
            ref={menuRef}
            role="dialog"
          >
            <div className={styles.mobilePanelHeader}>
              <Image alt={SITE.name} height="43" src="/brand/parktek-logo-black.svg" width="121" />
              <button className={styles.mobileClose} onClick={closeMenu} type="button">
                Close
              </button>
            </div>

            <nav aria-label="Mobile navigation" className={styles.mobileNav}>
              <MobileGroup items={solutionLinks} label="Solutions" onNavigate={closeMenu} />
              <MobileGroup items={industryLinks} label="Industries" onNavigate={closeMenu} />
              <div className={styles.mobileGroup}>
                {primaryLinks.map((item) => (
                  <Link className={styles.mobileLink} href={item.href} key={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            <Link className={styles.mobileCta} href={SITE.primaryCta.href} onClick={closeMenu}>
              {SITE.primaryCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
