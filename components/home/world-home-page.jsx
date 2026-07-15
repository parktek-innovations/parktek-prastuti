"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  APP_LINKS,
  CONTACT_CHANNELS,
  FAQ_ITEMS,
  LEGAL_LINKS
} from "@/lib/site-content";

import styles from "./world-home-page.module.css";

const JOURNEY_STAGES = [
  {
    label: "Arrival",
    titleBefore: "Connecting every resident ",
    accent: "vehicle",
    titleAfter: " to the gate.",
    body:
      "One residential parking ecosystem connecting vehicle identity, local gate control, resident tools and society operations.",
    status: "Approach detected",
    detail: "Yantra online · permit cache ready"
  },
  {
    label: "Identify",
    title: "One vehicle. One active identity.",
    body:
      "Vehicle-linked RFID anchors access. Registered-only guarded ANPR can add a second signal where the approved site runtime supports it.",
    status: "Identity resolved",
    detail: "Active RFID assignment · society scoped"
  },
  {
    label: "Decide locally",
    title: "The gate does not wait on a distant dashboard.",
    body:
      "Yantra works from synced permit state close to the barrier, denies blocked or inactive identities and queues events if connectivity is interrupted.",
    status: "Access eligible",
    detail: "Local permit match · barrier relay ready"
  },
  {
    label: "Resident control",
    title: "The resident sees the same vehicle the gate sees.",
    body:
      "Activate an assigned tag, lock or unlock a vehicle, review activity, receive notifications and start a vehicle-context conversation.",
    status: "Resident connected",
    detail: "Vehicle active · notifications available"
  },
  {
    label: "Society operations",
    title: "Every role gets the right operational view.",
    body:
      "Administrators, managers and guards work with society-scoped users, vehicles, inventory, approvals, support, logs and controller health.",
    status: "Operations visible",
    detail: "Inventory · access logs · controller health"
  },
  {
    label: "Accountable",
    title: "A permitted arrival becomes a clear event.",
    body:
      "From reader and relay to app and dashboard, ParkTek keeps the decision, vehicle and society context connected.",
    status: "Entry recorded",
    detail: "Event synced · audit context preserved"
  }
];

const ECOSYSTEM_STAGES = [
  {
    label: "Resident access",
    title: "A vehicle arrives with resident context.",
    body: "The active vehicle, its RFID assignment and society permit state stay linked from approach to entry."
  },
  {
    label: "Society inventory",
    title: "RFID stock becomes controlled access.",
    body: "Global inventory is allocated to a society, then activated against one eligible vehicle at a time."
  },
  {
    label: "Gate operations",
    title: "Urgent field work stays society scoped.",
    body: "Guards can use approved lookups, visitor approvals, alerts, incidents and vehicle-context chat without broad admin access."
  },
  {
    label: "Controller + audit",
    title: "Local decisions return as accountable events.",
    body: "Yantra controls the relay from synced permit state, keeps a local outbox and reconnects the event to platform logs."
  }
];

const FEATURE_GROUPS = [
  {
    number: "01",
    title: "Vehicle identity",
    intro: "A controlled path from inventory to active vehicle access.",
    items: [
      "Global RFID inventory allocation",
      "One active tag per active vehicle",
      "Society-scoped assignments",
      "Lost, blocked and inactive enforcement",
      "Registered-only guarded ANPR path",
      "Vehicle lock and unlock state"
    ]
  },
  {
    number: "02",
    title: "Resident experience",
    intro: "Self-service vehicle control without exposing society administration.",
    items: [
      "Phone OTP and onboarding",
      "Vehicle creation and management",
      "Assigned tag activation",
      "Activity and notifications",
      "Vehicle-context chat",
      "Support, profile and referrals"
    ]
  },
  {
    number: "03",
    title: "Society operations",
    intro: "The current state of residents, vehicles and access in one place.",
    items: [
      "Society users and roles",
      "Vehicle and RFID administration",
      "Movement logs and exports",
      "Controller status and health",
      "Support ticket workflows",
      "Society settings and policies"
    ]
  },
  {
    number: "04",
    title: "Gate workflows",
    intro: "Fast field actions, constrained to the guard's society and purpose.",
    items: [
      "QR, RFID and vehicle lookup",
      "Audited contact reveal",
      "Visitor and delivery approvals",
      "Guard-resident vehicle chat",
      "Alerts and incident capture",
      "RFID and approved manual fallback"
    ]
  },
  {
    number: "05",
    title: "Edge and platform",
    intro: "Local decision-making with shared context and reliable delivery.",
    items: [
      "Synced permit state on Yantra",
      "Local barrier relay control",
      "Queued event outbox",
      "Real-time permit delivery",
      "Role and society boundaries",
      "Operational audit records"
    ]
  }
];

const RESIDENT_ACTIONS = [
  "Sign in and complete onboarding",
  "Add and manage a vehicle",
  "Activate the RFID tag assigned to that vehicle",
  "Lock access immediately when needed",
  "Review movement activity and notifications",
  "Chat, raise support and manage referrals"
];

const OPERATIONS_ACTIONS = [
  "Look up a vehicle, RFID tag or resident context",
  "Handle visitor and delivery approvals with expiry",
  "Review gate alerts, incidents and movement logs",
  "Manage society users, vehicles and allocated inventory",
  "Monitor controller health and urgent site state",
  "Escalate support with the right society context"
];

const ANPR_STEPS = [
  {
    title: "Capture",
    body: "Read a usable plate crop from the approved camera feed."
  },
  {
    title: "Read + vote",
    body: "Normalize repeated observations; one noisy frame is not enough."
  },
  {
    title: "Match locally",
    body: "Require a registered vehicle and eligible local permit state."
  },
  {
    title: "Decide + sync",
    body: "Act only in an approved runtime mode, then record the event."
  }
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
    </svg>
  );
}

function Journey() {
  const sectionRef = useRef(null);
  const plateRef = useRef(null);
  const closedFrameRef = useRef(null);
  const openFrameRef = useRef(null);
  const progressRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const plate = plateRef.current;
    const closedFrame = closedFrameRef.current;
    const openFrame = openFrameRef.current;
    const progressBar = progressRef.current;
    if (!section || !plate || !closedFrame || !openFrame || !progressBar) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollState = { current: 0, target: 0 };
    let frameId;
    let previousStage = -1;

    const syncScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const stage = Math.min(
        JOURNEY_STAGES.length - 1,
        Math.floor(progress * JOURNEY_STAGES.length)
      );

      scrollState.target = progress;
      progressBar.style.transform = `scaleX(${progress})`;

      if (stage !== previousStage) {
        previousStage = stage;
        setActiveStage(stage);
      }
    };

    const draw = () => {
      const smoothing = motionQuery.matches ? 1 : 0.075;
      scrollState.current += (scrollState.target - scrollState.current) * smoothing;
      const progress = scrollState.current;
      const gateOpen = Math.min(1, Math.max(0, (progress - 0.08) / 0.16));
      const scale = 1.025 + progress * 0.13;

      plate.style.transform = `translate3d(${progress * -2.6}%, ${progress * 1.8}%, 0) scale(${scale})`;
      closedFrame.style.opacity = String(1 - gateOpen);
      openFrame.style.opacity = String(gateOpen);
      frameId = window.requestAnimationFrame(draw);
    };

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, []);

  const jumpToStage = useCallback((index) => {
    const section = sectionRef.current;
    if (!section) return;

    const top = window.scrollY + section.getBoundingClientRect().top;
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const target = index === JOURNEY_STAGES.length - 1 ? 0.985 : index / JOURNEY_STAGES.length;

    window.scrollTo({
      top: top + target * travel,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  }, []);

  return (
    <section className={styles.journey} id="home" ref={sectionRef}>
      <div className={styles.journeyFrame}>
        <div aria-hidden="true" className={styles.worldPlate} ref={plateRef}>
          <img
            alt=""
            className={styles.worldFrame}
            ref={closedFrameRef}
            src="/worlds/parktek-gate-closed.jpg"
          />
          <img
            alt=""
            className={`${styles.worldFrame} ${styles.worldFrameOpen}`}
            ref={openFrameRef}
            src="/worlds/parktek-gate-open.jpg"
          />
        </div>
        <div aria-hidden="true" className={styles.heroShade} />

        <header className={styles.journeyHeader}>
          <Link aria-label="ParkTek home" className={styles.brand} href="/#home">
            <img alt="ParkTek" src="/brand/parktek-logo-white.svg" />
          </Link>
          <nav aria-label="Primary navigation" className={styles.primaryNav}>
            <Link href="/#platform">Platform</Link>
            <Link href="/#residents">Residents</Link>
            <Link href="/#operations">Operations</Link>
          </nav>
          <Link className={styles.headerAction} href="/contact/">
            Book a demo <ArrowIcon />
          </Link>
        </header>

        <div className={styles.stageRegion}>
          {JOURNEY_STAGES.map((stage, index) => {
            const Heading = index === 0 ? "h1" : "h2";
            const isActive = index === activeStage;

            return (
              <section
                aria-hidden={!isActive}
                className={`${styles.stageCopy} ${isActive ? styles.stageCopyActive : ""}`}
                key={stage.label}
              >
                <p className={styles.stageLabel}>
                  {String(index + 1).padStart(2, "0")} / {stage.label}
                </p>
                <Heading>
                  {stage.titleBefore || stage.title}
                  {stage.accent ? <span>{stage.accent}</span> : null}
                  {stage.titleAfter}
                </Heading>
                <p className={styles.stageBody}>{stage.body}</p>

                {index === 0 ? (
                  <div className={styles.heroActions}>
                    <Link className={styles.primaryAction} href="/contact/">
                      Book a society demo <ArrowIcon />
                    </Link>
                    <button className={styles.scrollAction} onClick={() => jumpToStage(1)} type="button">
                      Follow the vehicle <span aria-hidden="true">↓</span>
                    </button>
                  </div>
                ) : null}

                {index === JOURNEY_STAGES.length - 1 ? (
                  <Link className={styles.primaryAction} href="/#platform">
                    Explore the platform <ArrowIcon />
                  </Link>
                ) : null}
              </section>
            );
          })}
        </div>

        <nav aria-label="3D product journey" className={styles.stageNav}>
          {JOURNEY_STAGES.map((stage, index) => (
            <button
              aria-current={index === activeStage ? "step" : undefined}
              className={index === activeStage ? styles.stageNavActive : ""}
              key={stage.label}
              onClick={() => jumpToStage(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{stage.label}</span>
            </button>
          ))}
        </nav>

        <aside aria-live="polite" className={styles.statusPanel}>
          <div className={styles.statusHeading}>
            <span aria-hidden="true" />
            Live access state
          </div>
          <strong>{JOURNEY_STAGES[activeStage].status}</strong>
          <p>{JOURNEY_STAGES[activeStage].detail}</p>
        </aside>

        <div aria-hidden="true" className={styles.progressTrack}>
          <div className={styles.progressValue} ref={progressRef} />
        </div>
      </div>
    </section>
  );
}

function EcosystemSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollState = { current: 0, target: 0 };
    let frameId;
    let previousStage = -1;

    const syncScroll = () => {
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const nextStage = Math.min(
        ECOSYSTEM_STAGES.length - 1,
        Math.floor(progress * ECOSYSTEM_STAGES.length)
      );

      scrollState.target = progress;
      if (nextStage !== previousStage) {
        previousStage = nextStage;
        setActiveStage(nextStage);
      }
    };

    const draw = () => {
      const smoothing = motionQuery.matches ? 1 : 0.08;
      scrollState.current += (scrollState.target - scrollState.current) * smoothing;
      const progress = scrollState.current;
      const scale = 1.02 + progress * 0.11;
      image.style.transform = `translate3d(${progress * -2}%, ${progress * -1.5}%, 0) scale(${scale})`;
      frameId = window.requestAnimationFrame(draw);
    };

    syncScroll();
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", syncScroll);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", syncScroll);
    };
  }, []);

  return (
    <section className={styles.ecosystemJourney} ref={sectionRef}>
      <div className={styles.ecosystemFrame}>
        <img
          alt="A connected ParkTek residential parking ecosystem at night"
          className={styles.ecosystemImage}
          ref={imageRef}
          src="/worlds/parktek-ecosystem.jpg"
        />
        <div aria-hidden="true" className={styles.ecosystemShade} />

        <div className={styles.ecosystemTitle}>
          <p>How ParkTek works</p>
          <h2>One connected residential parking ecosystem.</h2>
        </div>

        <div className={styles.ecosystemCallouts}>
          {ECOSYSTEM_STAGES.map((stage, index) => (
            <article
              aria-hidden={index !== activeStage}
              className={`${styles.ecosystemCallout} ${index === activeStage ? styles.ecosystemCalloutActive : ""}`}
              key={stage.label}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{stage.label}</p>
              <h3>{stage.title}</h3>
              <div>{stage.body}</div>
            </article>
          ))}
        </div>

        <div aria-label="Ecosystem stages" className={styles.ecosystemSteps}>
          {ECOSYSTEM_STAGES.map((stage, index) => (
            <span className={index === activeStage ? styles.ecosystemStepActive : ""} key={stage.label}>
              {String(index + 1).padStart(2, "0")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className={styles.platformSection} id="platform">
      <div className={styles.sectionShell}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>One connected operating layer</p>
          <h2>From RFID inventory to the barrier relay.</h2>
          <p>
            ParkTek keeps the same vehicle identity and permit context moving through every
            surface—without turning the resident app into an admin console or the gate into
            a cloud dependency.
          </p>
        </div>

        <div className={styles.featureRows}>
          {FEATURE_GROUPS.map((group) => (
            <article className={styles.featureRow} key={group.number}>
              <div className={styles.featureHeading}>
                <span>{group.number}</span>
                <h3>{group.title}</h3>
                <p>{group.intro}</p>
              </div>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">↳</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoleSection() {
  return (
    <section className={styles.roleSection}>
      <div className={styles.rolePanel} id="residents">
        <p className={styles.roleNumber}>Resident app / 01</p>
        <h2>Control your vehicle identity, not the whole society.</h2>
        <p className={styles.roleLead}>
          A focused mobile experience for onboarding, active access state and help around a
          resident&apos;s own vehicles.
        </p>
        <ol className={styles.actionList}>
          {RESIDENT_ACTIONS.map((action, index) => (
            <li key={action}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {action}
            </li>
          ))}
        </ol>
      </div>

      <div className={`${styles.rolePanel} ${styles.rolePanelDark}`} id="operations">
        <p className={styles.roleNumber}>Society operations / 02</p>
        <h2>Act at the gate. Govern from the dashboard.</h2>
        <p className={styles.roleLead}>
          Society-scoped mobile workflows for urgent field work, backed by deeper web
          administration for managers and platform teams.
        </p>
        <ol className={styles.actionList}>
          {OPERATIONS_ACTIONS.map((action, index) => (
            <li key={action}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {action}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AnprSection() {
  return (
    <section className={styles.anprSection} id="safety">
      <div className={styles.sectionShell}>
        <div className={styles.anprIntro}>
          <p className={styles.kicker}>Guarded autonomy</p>
          <h2>ANPR that fails closed.</h2>
          <p>
            ParkTek&apos;s production direction is registered-only guarded autonomy. A readable
            plate still needs repeated agreement, an eligible local permit and an approved
            runtime mode. Unknown plates do not auto-open the barrier.
          </p>
          <p className={styles.anprFallback}>
            If the camera or runtime is unavailable, RFID and approved manual operations remain
            the field fallback.
          </p>
        </div>

        <ol className={styles.anprFlow}>
          {ANPR_STEPS.map((step, index) => (
            <li key={step.title}>
              <span className={styles.flowNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.flowDot} aria-hidden="true" />
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function AccessSection() {
  return (
    <section className={styles.accessSection}>
      <div className={styles.sectionShell}>
        <div className={styles.accessCopy}>
          <p className={styles.kicker}>Choose your surface</p>
          <h2>Resident mobile. Society operations. Web control.</h2>
          <p>
            Each surface is built for its role. Residents manage their vehicles; gate and society
            teams handle field work; authorized administrators use the dashboard for deeper control.
          </p>
        </div>

        <div className={styles.accessLinks}>
          <a href={APP_LINKS.android} rel="noreferrer" target="_blank">
            <span>Resident app</span>
            <strong>Android</strong>
            <ArrowIcon />
          </a>
          <a href={APP_LINKS.ios} rel="noreferrer" target="_blank">
            <span>Resident app</span>
            <strong>iPhone</strong>
            <ArrowIcon />
          </a>
          <a href={APP_LINKS.dashboard} rel="noreferrer" target="_blank">
            <span>Authorized teams</span>
            <strong>Web dashboard</strong>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.sectionShell}>
        <div className={styles.faqIntro}>
          <p className={styles.kicker}>Questions, clearly answered</p>
          <h2>Before ParkTek reaches your gate.</h2>
        </div>
        <div className={styles.faqList}>
          {FAQ_ITEMS.map((item, index) => (
            <details key={item.question}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.question}</strong>
                <span className={styles.faqMark} aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalSection() {
  return (
    <>
      <section className={styles.finalCta}>
        <div className={styles.sectionShell}>
          <p className={styles.kicker}>For residential societies</p>
          <h2>Make the next arrival easier to trust.</h2>
          <div className={styles.finalActions}>
            <Link className={styles.primaryAction} href="/contact/">
              Plan a ParkTek demo <ArrowIcon />
            </Link>
            <a href={`mailto:${CONTACT_CHANNELS[0].value}`}>{CONTACT_CHANNELS[0].value}</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div>
            <Link className={styles.footerBrand} href="/#home">
              <img alt="ParkTek" src="/brand/parktek-logo-white.svg" />
            </Link>
            <p>Connected parking access for residential societies.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/#platform">Platform</Link>
            <Link href="/#residents">Residents</Link>
            <Link href="/#operations">Operations</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <div className={styles.footerContact}>
            {CONTACT_CHANNELS.map((channel) => (
              <a href={channel.href} key={channel.label} rel={channel.label === "Visit" ? "noreferrer" : undefined} target={channel.label === "Visit" ? "_blank" : undefined}>
                <span>{channel.label}</span>
                {channel.value}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 ParkTek. All rights reserved.</span>
          <div>
            {LEGAL_LINKS.map((link) => (
              <Link href={link.href} key={link.href}>{link.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export function WorldHomePage() {
  return (
    <main className={styles.page}>
      <Journey />
      <EcosystemSection />
      <PlatformSection />
      <RoleSection />
      <AnprSection />
      <AccessSection />
      <FaqSection />
      <FinalSection />
    </main>
  );
}
