"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { HashLink } from "@/components/site/hash-link";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/site-content";

export function Header({ className, compact = false, forceDesktop = false }) {
  const [open, setOpen] = useState(false);
  const desktopLinks = NAV_LINKS.slice(0, 4);
  const desktopLinkClass = compact
    ? "inline-flex justify-center font-clash text-[20px] font-normal tracking-widest text-white transition-opacity hover:opacity-70"
    : "inline-flex justify-center font-clash text-[22px] font-normal leading-none tracking-[2.2px] text-white transition-opacity hover:opacity-70";
  const shellClass = compact
    ? forceDesktop
      ? "rounded-[60px] px-5 py-4 md:px-8 md:py-5"
      : "rounded-[28px] px-4 py-3 sm:px-5 sm:py-4 md:rounded-[36px] md:px-8 md:py-5"
    : forceDesktop
      ? "h-[116px] rounded-[60px] px-10 py-[30px]"
      : "min-h-[84px] rounded-[32px] px-4 py-3 sm:min-h-[92px] sm:px-5 sm:py-4 md:min-h-[104px] md:rounded-[48px] md:px-8 md:py-6 xl:h-[116px] xl:rounded-[60px] xl:px-10 xl:py-[30px]";
  const logoClass = compact
    ? forceDesktop
      ? "h-10 w-[112.86px]"
      : "h-9 w-[102px] md:h-10 md:w-[112.86px]"
    : forceDesktop
      ? "h-14 w-[158px]"
      : "h-10 w-[112.86px] sm:h-12 sm:w-[136px] md:h-[52px] md:w-[148px] xl:h-14 xl:w-[158px]";

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <div className={cn("relative z-30", className)}>
      <div
        className={cn(
          "flex items-center justify-between rounded-[60px] bg-black text-white",
          shellClass
        )}
      >
        <Link aria-label="ParkTek home" className="shrink-0" href="/">
          <div
            className={cn(
              "relative overflow-hidden",
              logoClass
            )}
          >
            <img
              alt="ParkTek"
              className="size-full object-contain"
              height="56"
              src="/brand/parktek-logo-white.svg"
              width="158"
            />
          </div>
        </Link>

        <div
          className={cn(
            "items-center justify-start gap-10",
            compact ? "self-auto" : "self-stretch",
            forceDesktop ? "flex" : "hidden xl:flex"
          )}
        >
          <nav className="flex items-start gap-10">
            {desktopLinks.map((link) => (
              <HashLink
                className={desktopLinkClass}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </HashLink>
            ))}
          </nav>

          <div
            aria-hidden="true"
            className="h-14 w-px shrink-0 bg-[#767676]"
          />

          <Link
            className={desktopLinkClass}
            href="/contact/"
          >
            Contact Us
          </Link>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 sm:size-11",
            forceDesktop ? "hidden" : "xl:hidden"
          )}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="mt-3 overflow-hidden rounded-[28px] border border-white/10 bg-black/95 p-3 text-white shadow-card sm:rounded-[32px] sm:p-4 xl:hidden">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <HashLink
                className="rounded-2xl px-4 py-3 font-clash text-base tracking-[0.08em] transition-colors hover:bg-white/10 sm:text-lg"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </HashLink>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
