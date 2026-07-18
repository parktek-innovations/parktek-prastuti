import styles from "./website.module.css";

const STATUS_LABELS = {
  live: "Live",
  pilot: "Pilot",
  launching: "Launching",
  "in-development": "In development",
};

export function StatusPill({ status, className = "" }) {
  const key = String(status || "in-development")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  const safeKey = STATUS_LABELS[key] ? key : "in-development";

  return (
    <span
      className={[styles.statusPill, styles[`status_${safeKey}`], className]
        .filter(Boolean)
        .join(" ")}
    >
      {STATUS_LABELS[safeKey]}
    </span>
  );
}
