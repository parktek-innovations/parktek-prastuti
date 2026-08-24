"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ParktekIcon } from "@/components/prastuti/icons";
import { PREVIEW_NAVIGATION } from "@/lib/prastuti/preview-content.mjs";

const PREVIEW_FOOTER_LINKS = Object.freeze([
  { label: "Availability", href: "#availability" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Compatibility", href: "#compatibility" },
  { label: "Commercial Parking", href: "#commercial-parking" },
  { label: "Coming Soon", href: "#coming-soon" },
  { label: "Site Assessment", href: "#assessment" }
]);

export function PreviewHeader() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <a
        className="pk-focus-standard fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-pk-action-primary-background px-4 py-3 font-semibold text-pk-action-primary-foreground focus:translate-y-0"
        href="#preview-main"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-pk-component-header-border-default bg-pk-component-header-background-default">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            className="pk-focus-standard rounded-sm font-clash text-xl text-pk-component-header-foreground-default"
            href="/preview/prastuti/"
          >
            ParkTek
            <span className="ml-2 font-montserrat text-xs font-semibold uppercase tracking-[0.12em] text-pk-text-muted">
              Design-system preview
            </span>
          </Link>

          <nav aria-label="Preview navigation" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {PREVIEW_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <a
                    className="pk-focus-standard inline-flex rounded-lg px-3 py-2 text-sm font-semibold text-pk-component-navigation-foreground-default hover:bg-pk-component-navigation-background-default"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            aria-controls="preview-mobile-navigation"
            aria-expanded={open}
            aria-label={open ? "Close preview navigation" : "Open preview navigation"}
            className="pk-focus-standard inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-pk-action-secondary-border bg-pk-action-secondary-background text-pk-action-secondary-foreground md:hidden"
            onClick={() => setOpen((current) => !current)}
            ref={triggerRef}
            type="button"
          >
            <ParktekIcon name={open ? "close" : "menu"} size={24} weight="bold" />
          </button>
        </div>

        {open ? (
          <nav
            aria-label="Preview mobile navigation"
            className="border-t border-pk-border-default bg-pk-component-navigation-background-default px-4 py-4 md:hidden"
            id="preview-mobile-navigation"
          >
            <ul className="mx-auto grid max-w-7xl gap-2">
              {PREVIEW_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <a
                    className="pk-focus-standard block rounded-lg px-4 py-3 font-semibold text-pk-component-navigation-foreground-default hover:bg-pk-component-navigation-background-selected"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
}

export function PreviewFooter() {
  return (
    <footer
      aria-labelledby="preview-footer-title"
      className="border-t border-pk-border-strong bg-pk-surface-section"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.8fr]">
          <div>
            <h2 className="font-clash text-3xl text-pk-text-primary" id="preview-footer-title">
              ParkTek
            </h2>
            <p className="mt-4 max-w-md leading-7 text-pk-text-secondary">
              Prastuti design-system preview with explicit availability boundaries and
              evidence-safe product framing.
            </p>
          </div>

          <nav aria-label="Preview footer navigation">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-pk-text-muted">
              Explore the preview
            </h3>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {PREVIEW_FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    className="pk-focus-standard inline-flex rounded-sm font-semibold text-pk-link-default underline decoration-2 underline-offset-4 hover:text-pk-link-hover"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-pk-text-muted">
              Contact
            </h3>
            <a
              className="pk-focus-standard mt-4 inline-flex items-center gap-2 rounded-sm font-semibold text-pk-link-default underline decoration-2 underline-offset-4 hover:text-pk-link-hover"
              href="mailto:support@parktek.in"
            >
              <ParktekIcon name="mail" size={20} weight="duotone" />
              support@parktek.in
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-pk-border-default pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-3xl text-sm leading-6 text-pk-text-secondary">
            Canonical Figma reference established; production migration is not yet
            authorized.
          </p>
          <Link
            className="pk-focus-standard inline-flex shrink-0 rounded-sm font-semibold text-pk-link-default underline decoration-2 underline-offset-4 hover:text-pk-link-hover"
            href="/"
          >
            Current production landing page
          </Link>
        </div>
      </div>
    </footer>
  );
}
