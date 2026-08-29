"use client";

import { useEffect, useRef, useState } from "react";

import { createParktekWorld } from "@/components/scroll-world/parktek-world";

import styles from "./homepage-scroll-world.module.css";

const INTRO_FADE_MS = 700;
const JOURNEY_DURATION_MS = 18000;
const END_HOLD_MS = 2200;
const OUTRO_FADE_MS = 700;
const LOOP_DURATION_MS = INTRO_FADE_MS + JOURNEY_DURATION_MS + END_HOLD_MS + OUTRO_FADE_MS;
const REDUCED_MOTION_PROGRESS = 0.28;

function readHomepagePalette() {
  const computed = getComputedStyle(document.documentElement);
  const token = (name) => computed.getPropertyValue(name).trim();

  return {
    background: token("--prastuti-surface"),
    surface: token("--prastuti-background"),
    muted: token("--prastuti-muted-background"),
    border: token("--prastuti-border"),
    ink: token("--pk-color-text-primary"),
    road: token("--pk-color-border-strong"),
    roadSoft: token("--pk-color-text-muted"),
    primary: token("--prastuti-primary"),
    primaryDark: token("--prastuti-primary-hover"),
    primarySoft: token("--prastuti-primary-subtle-border"),
    teal: token("--pk-color-status-information-border"),
    success: token("--prastuti-status-success"),
    landscape: token("--prastuti-muted-background"),
    landscapeDark: token("--pk-color-border-strong"),
    warm: token("--prastuti-primary-subtle"),
    glass: token("--prastuti-primary-subtle-border"),
    treeTrunk: token("--pk-color-text-muted"),
    vehicleNeutral: token("--pk-color-text-muted"),
    vehicleTeal: token("--prastuti-primary-subtle-border"),
    vehicleWarm: token("--prastuti-muted-background"),
    vehicleMuted: token("--prastuti-border"),
    hemisphereGround: token("--pk-color-border-strong"),
    light: token("--prastuti-background")
  };
}

function getLoopState(elapsed) {
  if (elapsed < INTRO_FADE_MS) {
    return { progress: 0, curtain: 1 - elapsed / INTRO_FADE_MS };
  }

  const journeyElapsed = elapsed - INTRO_FADE_MS;
  if (journeyElapsed < JOURNEY_DURATION_MS) {
    return { progress: journeyElapsed / JOURNEY_DURATION_MS, curtain: 0 };
  }

  if (journeyElapsed < JOURNEY_DURATION_MS + END_HOLD_MS) {
    return { progress: 1, curtain: 0 };
  }

  const fadeElapsed = journeyElapsed - JOURNEY_DURATION_MS - END_HOLD_MS;
  return { progress: 1, curtain: fadeElapsed / OUTRO_FADE_MS };
}

export function HomepageScrollWorld() {
  const hostRef = useRef(null);
  const curtainRef = useRef(null);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const curtain = curtainRef.current;
    if (!host || !curtain) return undefined;

    let world;
    try {
      world = createParktekWorld(host, { colors: readHomepagePalette() });
    } catch {
      setWebglError(true);
      return undefined;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollState = { current: 0, target: 0 };
    let elapsed = 0;
    let frameId = 0;
    let previousCycle = 0;
    let previousTime = 0;
    let isVisible = true;

    const renderStatic = () => {
      curtain.style.opacity = "0";
      world.render({ progress: REDUCED_MOTION_PROGRESS, time: 0 });
    };

    const stop = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
    };

    const draw = (time) => {
      const delta = previousTime ? Math.min(50, time - previousTime) : 0;
      previousTime = time;
      elapsed += delta;

      const cycle = elapsed % LOOP_DURATION_MS;
      if (cycle < previousCycle) {
        scrollState.current = 0;
        scrollState.target = 0;
      }
      previousCycle = cycle;

      const loop = getLoopState(cycle);
      scrollState.target = loop.progress;
      scrollState.current += (scrollState.target - scrollState.current) * 0.075;
      curtain.style.opacity = String(loop.curtain);
      world.render({ progress: scrollState.current, time: time / 1000 });
      frameId = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (frameId || motionQuery.matches || !isVisible || document.hidden) return;
      frameId = window.requestAnimationFrame(draw);
    };

    const syncMotionPreference = () => {
      stop();
      if (motionQuery.matches) renderStatic();
      else start();
    };

    const syncVisibility = () => {
      if (document.hidden) stop();
      else if (motionQuery.matches) renderStatic();
      else start();
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) syncVisibility();
      else stop();
    }, { rootMargin: "120px" });

    const renderAfterResize = () => {
      if (motionQuery.matches) window.requestAnimationFrame(renderStatic);
    };

    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", syncVisibility);
    window.addEventListener("resize", renderAfterResize);
    motionQuery.addEventListener("change", syncMotionPreference);
    syncMotionPreference();

    return () => {
      stop();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
      window.removeEventListener("resize", renderAfterResize);
      motionQuery.removeEventListener("change", syncMotionPreference);
      world.dispose();
    };
  }, []);

  return (
    <div
      aria-label="Animated ParkTek world showing a vehicle travelling through a controlled gate and onward to connected parking operations."
      className={styles.world}
      role="img"
    >
      <div aria-hidden="true" className={styles.canvasHost} ref={hostRef} />
      <div aria-hidden="true" className={styles.loopCurtain} ref={curtainRef} />
      {webglError ? (
        <div aria-hidden="true" className={styles.fallback}>
          Parking access visualization unavailable.
        </div>
      ) : null}
    </div>
  );
}
