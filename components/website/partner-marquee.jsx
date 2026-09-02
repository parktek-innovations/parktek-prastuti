"use client";

import { Pause, Play } from "lucide-react";
import { useState } from "react";

import styles from "./home-page.module.css";

export function PartnerMarquee({ children }) {
  const [paused, setPaused] = useState(false);
  const label = paused ? "Play partner logo movement" : "Pause partner logo movement";

  return (
    <div className={styles.partnerMarquee} data-paused={paused}>
      <div className={styles.partnerMarqueeControls}>
        <button
          aria-label={label}
          aria-pressed={paused}
          className={styles.partnerMarqueeControl}
          onClick={() => setPaused((current) => !current)}
          type="button"
        >
          {paused ? <Play aria-hidden="true" size={15} /> : <Pause aria-hidden="true" size={15} />}
          <span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>
      {children}
    </div>
  );
}
