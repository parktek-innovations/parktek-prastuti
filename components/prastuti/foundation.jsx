import { PrastutiLink } from "@/components/prastuti/actions";
import { ParktekIcon } from "@/components/prastuti/icons";
import { cn } from "@/lib/utils";

const badgeToneClasses = {
  online:
    "border-pk-status-online-border bg-pk-status-online-background text-pk-status-online-foreground",
  information:
    "border-pk-status-information-border bg-pk-status-information-background text-pk-status-information-foreground",
  pending:
    "border-pk-status-pending-border bg-pk-status-pending-background text-pk-status-pending-foreground",
  unknown:
    "border-pk-status-unknown-border bg-pk-status-unknown-background text-pk-status-unknown-foreground"
};

const badgeToneIcons = {
  online: "statusOnline",
  information: "statusInformation",
  pending: "statusPending",
  unknown: "statusUnknown"
};

export function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-pk-brand-text-emphasis">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-clash text-3xl leading-tight text-pk-text-primary sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-pk-text-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function AvailabilityBadge({ label, tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em]",
        badgeToneClasses[tone]
      )}
    >
      <ParktekIcon name={badgeToneIcons[tone]} size={16} weight="bold" />
      {label}
    </span>
  );
}

export function FeatureCard({ icon, title, description, children }) {
  return (
    <article className="rounded-2xl border border-pk-component-card-border-default bg-pk-component-card-background-default p-6 text-pk-component-card-foreground-default">
      <span className="inline-flex rounded-xl bg-pk-action-information-background-subtle p-3 text-pk-action-information-foreground-subtle">
        <ParktekIcon name={icon} size={26} weight="duotone" />
      </span>
      <h3 className="mt-5 font-clash text-2xl leading-tight">{title}</h3>
      <p className="mt-3 leading-7 text-pk-text-secondary">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </article>
  );
}

export function ProofMetricBlock({ value, label, description, icon }) {
  return (
    <article className="rounded-2xl border border-pk-border-default bg-pk-surface-card p-6">
      <div className="flex items-center gap-2 text-pk-link-default">
        <ParktekIcon name={icon} size={20} weight="bold" />
        <span className="text-sm font-bold uppercase tracking-[0.12em]">{label}</span>
      </div>
      <p className="mt-5 font-clash text-3xl text-pk-text-primary">{value}</p>
      <p className="mt-3 leading-7 text-pk-text-secondary">{description}</p>
    </article>
  );
}

export function ProductComparison({ groups }) {
  return (
    <div className="grid gap-4 lg:grid-cols-4" aria-label="Product availability comparison">
      {groups.map((group) => (
        <article
          className="min-w-0 rounded-2xl border border-pk-border-default bg-pk-surface-card p-5"
          data-availability-state={group.key}
          key={group.key}
        >
          <AvailabilityBadge label={group.badge} tone={group.tone} />
          <h3 className="mt-4 font-clash text-xl leading-tight text-pk-text-primary">
            {group.heading}
          </h3>
          <p className="mt-3 text-sm leading-6 text-pk-text-secondary">
            {group.items.length} defined capabilities
          </p>
        </article>
      ))}
    </div>
  );
}

export function ProcessStep({ number, title, description, icon }) {
  return (
    <li className="relative rounded-2xl border border-pk-border-default bg-pk-surface-card p-6">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex rounded-xl bg-pk-action-information-background-subtle p-3 text-pk-action-information-foreground-subtle">
          <ParktekIcon name={icon} size={25} weight="duotone" />
        </span>
        <span className="font-clash text-2xl text-pk-brand-text-emphasis" aria-hidden="true">
          {String(number).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-clash text-2xl text-pk-text-primary">{title}</h3>
      <p className="mt-3 leading-7 text-pk-text-secondary">{description}</p>
    </li>
  );
}

export function CompatibilityTile({ title, description, icon }) {
  return (
    <article className="flex min-w-0 gap-4 rounded-2xl border border-pk-border-strong bg-pk-surface-card p-5">
      <span className="mt-1 text-pk-link-default">
        <ParktekIcon name={icon} size={25} weight="duotone" />
      </span>
      <div className="min-w-0">
        <h3 className="font-clash text-xl text-pk-text-primary">{title}</h3>
        <p className="mt-2 break-words text-sm leading-6 text-pk-text-secondary">{description}</p>
      </div>
    </article>
  );
}

export function CaseStudyCard() {
  return (
    <article className="rounded-2xl border border-pk-border-strong bg-pk-surface-card p-7">
      <span className="inline-flex rounded-xl bg-pk-component-empty-state-background-default p-3 text-pk-component-empty-state-icon-default">
        <ParktekIcon name="empty" size={28} weight="duotone" />
      </span>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-pk-text-muted">
        Evidence pending business validation
      </p>
      <h3 className="mt-3 font-clash text-2xl text-pk-text-primary">
        Deployment proof awaiting publication approval
      </h3>
      <p className="mt-3 max-w-2xl leading-7 text-pk-text-secondary">
        No customer name, deployment count, accuracy result, savings figure, or operating
        outcome is shown until its source and publication permission are verified.
      </p>
      <PrastutiLink className="mt-5" href="#assessment">
        Discuss an assessment instead
      </PrastutiLink>
    </article>
  );
}

const feedbackStyles = {
  empty: {
    icon: "empty",
    className:
      "border-pk-border-strong bg-pk-component-empty-state-background-default text-pk-component-empty-state-foreground-default"
  },
  loading: {
    icon: "loading",
    className:
      "border-pk-component-loading-border-default bg-pk-component-loading-background-default text-pk-component-loading-foreground-default"
  },
  error: {
    icon: "error",
    className:
      "border-pk-status-error-border bg-pk-surface-card text-pk-action-destructive-background"
  }
};

export function FeedbackState({ state, title, description, announce = false }) {
  const config = feedbackStyles[state];
  const role = announce ? (state === "error" ? "alert" : "status") : undefined;

  return (
    <div className={cn("rounded-2xl border p-5", config.className)} role={role}>
      <ParktekIcon
        className={state === "loading" ? "motion-safe:animate-spin" : undefined}
        name={config.icon}
        size={24}
        weight="bold"
      />
      <p className="mt-4 font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6">{description}</p>
    </div>
  );
}
