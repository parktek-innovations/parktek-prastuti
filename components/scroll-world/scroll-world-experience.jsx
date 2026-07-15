"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { createParktekWorld } from "./parktek-world";
import styles from "./scroll-world-experience.module.css";

const STAGES = [
  {
    label: "Arrival",
    title: "Residential parking, connected end to end.",
    body:
      "Follow one vehicle from the society approach to a verified entry, a synced permit and an accountable parking event."
  },
  {
    label: "Identify",
    title: "The gate reads what the vehicle carries.",
    body:
      "RFID and ANPR give the controller the vehicle context it needs without turning every arrival into a manual check."
  },
  {
    label: "Decide",
    title: "Access decisions stay close to the barrier.",
    body:
      "Yantra uses locally synced permit data, enforces blocked or inactive states and controls the relay at the site."
  },
  {
    label: "Operate",
    title: "Society operations share one source of truth.",
    body:
      "Residents, vehicles, RFID inventory, controller health, support and movement logs stay connected across the platform."
  },
  {
    label: "ParkTek",
    title: "Every permitted arrival becomes a clear event.",
    body:
      "A practical parking stack for residential societies, from reader and barrier to resident app and operations dashboard."
  }
];

function getStageIndex(progress) {
  return Math.min(STAGES.length - 1, Math.round(progress * (STAGES.length - 1)));
}

export function ScrollWorldExperience() {
  const hostRef = useRef(null);
  const pageRef = useRef(null);
  const progressRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const page = pageRef.current;
    const progressBar = progressRef.current;

    if (!host || !page || !progressBar) return undefined;

    let world;
    try {
      world = createParktekWorld(host);
    } catch {
      setWebglError(true);
      return undefined;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollState = { current: 0, target: 0 };
    let frameId;
    let previousStage = -1;

    const syncScroll = () => {
      const rect = page.getBoundingClientRect();
      const travel = Math.max(1, page.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      scrollState.target = progress;
      progressBar.style.transform = `scaleX(${progress})`;

      const nextStage = getStageIndex(progress);
      if (nextStage !== previousStage) {
        previousStage = nextStage;
        setActiveStage(nextStage);
      }
    };

    const draw = (time) => {
      const smoothing = motionQuery.matches ? 1 : 0.075;
      scrollState.current += (scrollState.target - scrollState.current) * smoothing;
      world.render({ progress: scrollState.current, time: time / 1000 });
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
      world.dispose();
    };
  }, []);

  const jumpToStage = useCallback((index) => {
    const page = pageRef.current;
    if (!page) return;

    const pageTop = window.scrollY + page.getBoundingClientRect().top;
    const travel = Math.max(1, page.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: pageTop + (index / (STAGES.length - 1)) * travel,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  }, []);

  return (
    <main className={styles.page} ref={pageRef}>
      <div className={styles.stickyFrame}>
        <div aria-hidden="true" className={styles.canvasHost} ref={hostRef} />
        <div aria-hidden="true" className={styles.copyShade} />

        {webglError ? (
          <div className={styles.fallback} role="status">
            <p>WebGL is unavailable in this browser.</p>
            <p>Open the trial in a current desktop or mobile browser.</p>
          </div>
        ) : null}

        <header className={styles.header}>
          <Link aria-label="ParkTek home" className={styles.brand} href="/">
            ParkTek
          </Link>
          <div className={styles.trialMeta}>Local 3D trial</div>
          <Link className={styles.exitLink} href="/">
            Exit trial
          </Link>
        </header>

        <div className={styles.copyRegion}>
          {STAGES.map((stage, index) => {
            const headingTag = index === 0 ? "h1" : "h2";
            const Heading = headingTag;
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
                <Heading>{stage.title}</Heading>
                <p className={styles.stageBody}>{stage.body}</p>

                {index === 0 ? (
                  <button className={styles.textAction} onClick={() => jumpToStage(1)} type="button">
                    Scroll into the gate <span aria-hidden="true">↓</span>
                  </button>
                ) : null}

                {index === STAGES.length - 1 ? (
                  <div className={styles.actions}>
                    <Link className={styles.primaryAction} href="/contact/">
                      Book a demo
                    </Link>
                    <button className={styles.secondaryAction} onClick={() => jumpToStage(0)} type="button">
                      Replay journey
                    </button>
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>

        <nav aria-label="3D journey stages" className={styles.stageNav}>
          {STAGES.map((stage, index) => (
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

        <div aria-hidden="true" className={styles.progressTrack}>
          <div className={styles.progressValue} ref={progressRef} />
        </div>
      </div>
    </main>
  );
}
