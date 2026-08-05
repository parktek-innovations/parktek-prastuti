import Link from "next/link";

import { HashLink } from "@/components/site/hash-link";
import { APP_LINKS, CONTACT_DETAILS, LEGAL_LINKS } from "@/lib/site-content";

const quickLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "FASTag Recharge", href: "/fastag/" },
  { label: "E-Challan", href: "/e-challan/" },
  { label: "Contact", href: "/contact/" },
  { label: "Careers", href: "/contact/" }
];

const aboutLinks = [
  { label: "PARKTEK INNOVATION PRIVATE LIMITED", href: "/#solutions" },
  { label: "Join the Parktek Team", href: "/contact/" }
];

const socialLinks = [
  { alt: "X", href: "https://x.com", icon: "/figma/footer/social-x.svg" },
  {
    alt: "LinkedIn",
    href: "https://linkedin.com",
    icon: "/figma/footer/social-linkedin.svg"
  },
  {
    alt: "YouTube",
    href: "https://youtube.com",
    icon: "/figma/footer/social-youtube.svg"
  },
  {
    alt: "",
    ariaLabel: "Download ParkTek on Android",
    href: APP_LINKS.android,
    icon: "/figma/footer/social-android.svg",
    imageClassName: "size-10 sm:size-11"
  },
  {
    alt: "",
    ariaLabel: "Download ParkTek on iOS",
    href: APP_LINKS.ios,
    icon: "/figma/footer/social-ios.svg",
    imageClassName: "size-10 sm:size-11"
  }
];

export function Footer({ className = "", forceDesktop = false }) {
  return (
    <footer className={className}>
      <div className={forceDesktop ? "bg-black p-6 text-white" : "bg-black p-4 text-white sm:p-6"}>
        <div
          className={
            forceDesktop
              ? "rounded-[36px] border border-white/20 px-[72px] py-[72px]"
              : "rounded-[28px] border border-white/20 px-5 py-8 sm:px-6 sm:py-10 md:rounded-[32px] md:px-10 md:py-12 xl:rounded-[36px] xl:px-[73.2px] xl:py-[73.2px]"
          }
        >
          <div
            className={
              forceDesktop
                ? "grid items-start gap-12 grid-cols-[minmax(180px,281px)_minmax(320px,474px)_minmax(260px,390px)]"
                : "grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-14 min-[1440px]:grid-cols-[minmax(180px,281px)_minmax(320px,474px)_minmax(260px,390px)] min-[1440px]:gap-y-12"
            }
          >
            <div className="min-w-0 w-full space-y-3 md:space-y-4">
              <h3 className="font-clash text-2xl font-medium leading-none text-[#424547] md:text-[26px] xl:text-[28px] xl:leading-[28.8px]">
                Quick Links
              </h3>
              <div className="text-base leading-8 md:text-lg md:leading-9 xl:text-[19.2px] xl:leading-[42px]">
                {quickLinks.map((link) => (
                  <HashLink
                    className="block transition-opacity hover:opacity-70"
                    href={link.href}
                    key={link.label}
                  >
                    {link.label}
                  </HashLink>
                ))}
              </div>
            </div>

            <div className="min-w-0 w-full max-w-[474px] space-y-3 md:space-y-4">
              <h3 className="font-clash text-2xl font-medium leading-none text-[#424547] md:text-[26px] xl:text-[28px] xl:leading-[28.8px]">
                About Parktek
              </h3>
              <div className="space-y-3 text-base leading-7 md:space-y-4 md:text-lg md:leading-8 xl:space-y-[14.4px] xl:text-[19.2px] xl:leading-[28.8px]">
                <HashLink
                  className="block transition-opacity hover:opacity-70"
                  href={aboutLinks[0].href}
                >
                  {aboutLinks[0].label}
                </HashLink>
                <Link className="block transition-opacity hover:opacity-70" href={aboutLinks[1].href}>
                  {aboutLinks[1].label}
                </Link>
              </div>
            </div>

            <div
              className={
                forceDesktop
                  ? "min-w-0 w-full max-w-[390px]"
                  : "min-w-0 w-full max-w-[390px] md:col-span-2 min-[1440px]:col-span-1"
              }
            >
              <h3 className="font-clash text-2xl font-medium leading-none text-[#424547] md:text-[26px] xl:text-[28px] xl:leading-[37.8px]">
                Contact Us
              </h3>
              <div className="mt-4 space-y-2 text-base leading-7 md:mt-5 md:text-lg md:leading-8 xl:text-[19.2px] xl:leading-[37.8px]">
                <p>For any inquiries, reach out to us at:</p>
                <p className="break-words">{`Email: ${CONTACT_DETAILS.email}`}</p>
                <p>{`Phone: ${CONTACT_DETAILS.phone}`}</p>
                <p className="break-words">{`Address: ${CONTACT_DETAILS.address}`}</p>
              </div>
            </div>
          </div>

          <div
            className={
              forceDesktop
                ? "mt-[72px] flex flex-wrap items-center justify-between gap-8"
                : "mt-12 flex flex-col gap-8 md:mt-14 md:gap-10 lg:flex-row lg:items-center lg:justify-between"
            }
          >
            <div
              className={
                forceDesktop
                  ? "flex items-center gap-6"
                  : "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:gap-6"
              }
            >
              <div className={forceDesktop ? "relative h-14 w-[158px] overflow-hidden" : "relative h-11 w-[124px] overflow-hidden sm:h-12 sm:w-[136px] xl:h-14 xl:w-[158px]"}>
                <img
                  alt="ParkTek"
                  className="absolute left-[-25.83%] top-[-82.97%] h-[281.32%] w-[149.13%] max-w-none"
                  height="56"
                  src="/figma/footer/logo.png"
                  width="158"
                />
              </div>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    aria-label={link.ariaLabel}
                    className={link.imageClassName ? "inline-flex items-center justify-center transition-opacity hover:opacity-80" : "inline-flex size-9 items-center justify-center rounded-full bg-[#333] sm:size-10"}
                    href={link.href}
                    key={link.ariaLabel || link.alt}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      alt={link.alt}
                      aria-hidden={link.alt ? undefined : true}
                      className={link.imageClassName || "size-[18px] sm:size-[19.2px]"}
                      src={link.icon}
                    />
                  </a>
                ))}
              </div>
            </div>

            <div
              className={
                forceDesktop
                  ? "flex flex-wrap items-center justify-end gap-6"
                  : "flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:justify-end lg:gap-6"
              }
            >
              <div
                className={
                  forceDesktop
                    ? "flex gap-10 text-[19.2px] leading-[28.8px]"
                    : "flex flex-wrap gap-x-6 gap-y-3 text-base leading-7 md:text-lg md:leading-8 xl:gap-10 xl:text-[19.2px] xl:leading-[28.8px]"
                }
              >
                {LEGAL_LINKS.map((link) => (
                  <Link className="transition-opacity hover:opacity-70" href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <p
                className={
                  forceDesktop
                    ? "whitespace-nowrap text-[19.2px] leading-[28.8px] text-[#999999]"
                    : "text-sm leading-6 text-[#999] md:text-base md:leading-7 lg:text-right"
                }
              >
                {"\u00A9 2025 ParkTek. All rights reserved."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
