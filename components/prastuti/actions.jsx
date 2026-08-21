import Link from "next/link";

import { ParktekIcon } from "@/components/prastuti/icons";
import { cn } from "@/lib/utils";

const baseActionClass =
  "pk-focus-standard inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold leading-5 transition-colors motion-reduce:transition-none";

export function PrimaryPromotionalCta({ href, children, className }) {
  return (
    <Link
      className={cn(
        baseActionClass,
        "border-2 border-pk-brand-primary-strong bg-pk-brand-primary text-pk-text-primary hover:bg-pk-brand-primary-strong",
        className
      )}
      href={href}
    >
      <span>{children}</span>
      <ParktekIcon name="arrow" size={18} weight="bold" />
    </Link>
  );
}

export function SecondaryCta({ href, children, className }) {
  return (
    <Link
      className={cn(
        baseActionClass,
        "border border-pk-action-secondary-border bg-pk-action-secondary-background text-pk-action-secondary-foreground hover:bg-pk-surface-section",
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

export function PrastutiLink({ href, children, className }) {
  return (
    <Link
      className={cn(
        "pk-focus-standard inline-flex items-center gap-1 rounded-sm font-semibold text-pk-link-default underline decoration-2 underline-offset-4 hover:text-pk-link-hover",
        className
      )}
      href={href}
    >
      {children}
      <ParktekIcon name="arrow" size={16} weight="bold" />
    </Link>
  );
}

export function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        baseActionClass,
        "bg-pk-action-primary-background text-pk-action-primary-foreground hover:bg-pk-action-primary-background-hover disabled:cursor-not-allowed disabled:bg-pk-component-button-primary-background-disabled disabled:text-pk-component-button-primary-foreground-disabled",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
