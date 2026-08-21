"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { ParktekIcon } from "@/components/prastuti/icons";
import { PREVIEW_NAVIGATION } from "@/lib/prastuti/preview-content.mjs";

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
              Phase A preview
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
    <footer className="border-t border-pk-border-default bg-pk-surface-section">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <p className="font-clash text-2xl text-pk-text-primary">ParkTek</p>
          <p className="mt-3 max-w-xl leading-7 text-pk-text-secondary">
            Phase A component and content preview. This route does not replace the
            production landing page.
          </p>
        </div>
        <div className="md:text-right">
          <p className="text-sm font-bold uppercase tracking-[0.12em] text-pk-text-muted">
            Preview status
          </p>
          <p className="mt-3 text-pk-text-primary">
            Architecture ready; final visual composition awaits Figma.
          </p>
          <Link
            className="pk-focus-standard mt-4 inline-flex rounded-sm font-semibold text-pk-link-default underline decoration-2 underline-offset-4 hover:text-pk-link-hover"
            href="/"
          >
            Return to the current landing page
          </Link>
        </div>
      </div>
    </footer>
  );
}
