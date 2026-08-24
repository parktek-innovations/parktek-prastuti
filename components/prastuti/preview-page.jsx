import Image from "next/image";

import {
  PrimaryPromotionalCta,
  PrastutiLink,
  SecondaryCta
} from "@/components/prastuti/actions";
import {
  AvailabilityBadge,
  CaseStudyCard,
  CompatibilityTile,
  FailClosedAlert,
  FeatureCard,
  FeedbackState,
  ProcessStep,
  ProductComparison,
  ProofMetricBlock,
  SectionHeading
} from "@/components/prastuti/foundation";
import { ParktekIcon } from "@/components/prastuti/icons";
import { PreviewFooter, PreviewHeader } from "@/components/prastuti/preview-header";
import { FormField, SiteAssessmentForm } from "@/components/prastuti/site-assessment-form";
import {
  AVAILABILITY,
  AVAILABILITY_ORDER,
  COMPATIBILITY,
  FEEDBACK_STATES,
  PROCESS_STEPS,
  VERIFIED_PROOF
} from "@/lib/prastuti/preview-content.mjs";

const availabilityGroups = AVAILABILITY_ORDER.map((key) => AVAILABILITY[key]);

function AvailabilityNarrativeSection({ group, id, surface = false, visual }) {
  return (
    <section
      className={surface ? "bg-pk-surface-section" : undefined}
      data-availability-detail={group.key}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <AvailabilityBadge label={group.badge} tone={group.tone} />
        <div className="mt-5">
          <SectionHeading
            description={group.summary}
            eyebrow={group.badge}
            title={group.heading}
          />
        </div>
        {visual ? (
          <figure className="mt-8 overflow-hidden rounded-2xl border border-pk-border-strong bg-pk-surface-card">
            <Image
              alt={visual.alt}
              className="h-auto w-full"
              data-preview-asset={visual.id}
              height={visual.height}
              sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)"
              src={visual.src}
              width={visual.width}
            />
            <figcaption className="border-t border-pk-border-default px-5 py-4 text-sm leading-6 text-pk-text-secondary">
              Illustrative commercial operations concept. Availability remains{" "}
              <span className="font-semibold text-pk-text-primary">{group.badge}</span>.
            </figcaption>
          </figure>
        ) : null}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {group.items.map((item) => (
            <li
              className="flex min-w-0 items-start gap-3 rounded-xl border border-pk-border-default bg-pk-surface-card p-4"
              key={item}
            >
              <span
                className="mt-0.5 shrink-0 text-pk-text-muted"
                data-capability-icon={group.icon}
              >
                <ParktekIcon name={group.icon} size={19} weight="duotone" />
              </span>
              <span className="break-words leading-6 text-pk-text-primary">{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <SecondaryCta href="#assessment">{group.cta}</SecondaryCta>
        </div>
      </div>
    </section>
  );
}

export function PrastutiPreviewPage() {
  return (
    <div
      className="min-h-screen bg-pk-surface-page text-pk-text-primary"
      data-pk-context="light.product"
    >
      <PreviewHeader />
      <main id="preview-main">
        <section className="border-b border-pk-border-default">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
            <div>
              <AvailabilityBadge
                label="Prastuti design-system preview"
                tone="information"
              />
              <h1 className="mt-6 max-w-4xl font-clash text-4xl leading-[1.05] text-pk-text-primary sm:text-5xl lg:text-6xl">
                Residential access today, guarded ANPR pilots, and commercial parking
                operations launching.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-pk-text-secondary">
                A release-aware landing foundation that separates what ParkTek operates
                now from pilots, launch-stage workflows, and future services.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <PrimaryPromotionalCta href="#assessment">
                  Request a site assessment
                </PrimaryPromotionalCta>
                <SecondaryCta href="#availability">Review availability</SecondaryCta>
              </div>
              <p className="mt-5 text-sm leading-6 text-pk-text-muted">
                No unsupported metrics, supplier-coverage claims, or future services are
                presented as live.
              </p>
            </div>

            <figure className="overflow-hidden rounded-3xl border border-pk-border-strong bg-pk-surface-section p-4 sm:p-5">
              <Image
                alt="Illustration of vehicles passing an apartment entrance with barrier gates, a local controller, and permit and event status panels"
                className="h-auto w-full rounded-2xl"
                data-preview-asset="hero"
                height={1122}
                priority
                sizes="(min-width: 1024px) 560px, calc(100vw - 64px)"
                src="/prastuti/connected-parking-concept.png"
                width={1402}
              />
              <figcaption className="mt-4 text-sm font-semibold text-pk-text-secondary">
                Illustrative connected-parking concept
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-pk-surface-section" id="proof">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              description="Qualitative proof is limited to capabilities established by the approved availability contract. Numeric outcomes remain absent until business evidence is supplied."
              eyebrow="Verified proof"
              title="Evidence-backed product framing"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {VERIFIED_PROOF.map((item) => (
                <ProofMetricBlock key={item.value} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="availability">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              description="The same taxonomy drives headings, badges, cards, and comparison content so a future capability cannot silently inherit a live treatment."
              eyebrow="Availability"
              title="One typed source for every release state"
            />

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {availabilityGroups.map((group) => (
                <section
                  aria-labelledby={`availability-${group.key}`}
                  className="rounded-3xl border border-pk-border-default bg-pk-surface-card p-5 sm:p-7"
                  data-availability-state={group.key}
                  key={group.key}
                >
                  <div className="grid gap-6">
                    <div>
                      <AvailabilityBadge label={group.badge} tone={group.tone} />
                      <h2
                        className="mt-5 font-clash text-3xl leading-tight text-pk-text-primary"
                        id={`availability-${group.key}`}
                      >
                        {group.heading}
                      </h2>
                      <p className="mt-4 leading-7 text-pk-text-secondary">{group.summary}</p>
                      <div className="mt-6">
                        {group.key === "live" ? (
                          <PrimaryPromotionalCta href="#assessment">
                            {group.cta}
                          </PrimaryPromotionalCta>
                        ) : (
                          <SecondaryCta href="#assessment">{group.cta}</SecondaryCta>
                        )}
                      </div>
                    </div>

                    <ul className="grid gap-3 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <li
                          className="flex min-w-0 items-start gap-3 rounded-xl border border-pk-border-default bg-pk-surface-page p-4"
                          key={item}
                        >
                          <span
                            className="mt-0.5 shrink-0 text-pk-text-muted"
                            data-capability-icon={group.icon}
                          >
                            <ParktekIcon name={group.icon} size={19} weight="duotone" />
                          </span>
                          <span className="break-words leading-6 text-pk-text-primary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="font-clash text-3xl text-pk-text-primary">
                Product availability comparison
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-pk-text-secondary">
                This comparison describes release status only. It does not make a
                competitor, accuracy, scale, or market-coverage claim.
              </p>
              <div className="mt-6">
                <ProductComparison groups={availabilityGroups} />
              </div>
            </div>
          </div>
        </section>

        <AvailabilityNarrativeSection
          group={AVAILABILITY.launching}
          id="commercial-parking"
          surface
          visual={{
            alt: "Illustrative commercial parking dashboard with launching and in-development workflow states",
            height: 941,
            id: "commercial-parking",
            src: "/prastuti/commercial-parking-dashboard.png",
            width: 1672
          }}
        />

        <AvailabilityNarrativeSection
          group={AVAILABILITY.comingSoon}
          id="coming-soon"
        />

        <section className="bg-pk-surface-section" id="how-it-works">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              description="A deployment path centred on site constraints, clear availability boundaries, and supported operations."
              eyebrow="How ParkTek works"
              title="From site assessment to routine access"
            />
            <figure className="mt-8 overflow-hidden rounded-2xl border border-pk-border-strong bg-pk-surface-card">
              <Image
                alt="Illustrative connected parking site beside a staged operating workflow"
                className="h-auto w-full"
                data-preview-asset="how-it-works"
                height={1024}
                sizes="(min-width: 1280px) 1216px, calc(100vw - 32px)"
                src="/prastuti/connected-parking-workflow.png"
                width={1536}
              />
              <figcaption className="border-t border-pk-border-default px-5 py-4 text-sm leading-6 text-pk-text-secondary">
                Illustrative workflow reference. The structured steps below remain the
                accessible process description.
              </figcaption>
            </figure>
            <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, index) => (
                <ProcessStep key={step.title} number={index + 1} {...step} />
              ))}
            </ol>
          </div>
        </section>

        <section id="compatibility">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              description="Compatibility is assessed per premises. The preview does not claim support for most suppliers or every installed device."
              eyebrow="Compatibility"
              title="Integration starts with the installed site"
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {COMPATIBILITY.map((item) => (
                <CompatibilityTile key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-pk-surface-section">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              description="The reusable foundation reflects the canonical Figma reference while keeping semantics, release states, focus behavior, and content APIs independently reviewable."
              eyebrow="Component gallery"
              title="Core landing components"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                description="Graphite carries routine hierarchy, Petrol carries information, and Signal is reserved for promotional emphasis."
                icon="scope"
                title="Semantic actions"
              >
                <PrastutiLink href="#assessment">Review the link pattern</PrastutiLink>
              </FeatureCard>
              <FeatureCard
                description="Visible labels and icons reinforce availability; future services never inherit the live status recipe."
                icon="statusInformation"
                title="Availability states"
              >
                <AvailabilityBadge label="Pilot" tone="information" />
              </FeatureCard>
              <FeatureCard
                description="Controls use the approved standard.outer focus geometry and system Highlight in forced-colour mode."
                icon="verified"
                title="Accessible focus"
              >
                <SecondaryCta href="#assessment">Keyboard-check this CTA</SecondaryCta>
              </FeatureCard>
              <FeatureCard
                description="The error remains associated with the field and does not rely on colour alone."
                icon="error"
                title="TextField error state"
              >
                <FormField
                  error="Enter the premises type."
                  id="gallery-premises-type"
                  label="Premises type"
                  placeholder="Residential society"
                />
              </FeatureCard>
              <FeatureCard
                description="Unsupported proof remains hidden until its source and publication permission are verified."
                icon="empty"
                title="Fail-closed Alert state"
              >
                <FailClosedAlert
                  description="Customer, metric, hardware, payment, and commercial outcome claims remain unpublished."
                  title="Evidence remains hidden"
                />
              </FeatureCard>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {FEEDBACK_STATES.map((item) => (
                <FeedbackState key={item.state} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading
              description="The foundation fails closed when publication-ready customer evidence is not available."
              eyebrow="Case studies / deployment proof"
              title="No invented deployments or outcomes"
            />
            <div className="mt-8">
              <CaseStudyCard />
            </div>
          </div>
        </section>

        <section className="bg-pk-surface-section" id="assessment">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
            <div>
              <SectionHeading
                description="Tell us enough to evaluate the site without sharing credentials or sensitive resident information."
                eyebrow="Site assessment CTA"
                title="Start with the premises, hardware, and operating need"
              />
              <p className="mt-6 leading-7 text-pk-text-secondary">
                This preview form demonstrates field, validation, loading, error, and
                success semantics. It intentionally does not submit to the production
                contact endpoint.
              </p>
            </div>
            <SiteAssessmentForm />
          </div>
        </section>
      </main>
      <PreviewFooter />
    </div>
  );
}
