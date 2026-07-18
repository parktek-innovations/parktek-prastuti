"use client";

import { useId, useRef, useState } from "react";

import {
  MINIMUM_COMPLETION_TIME_MS,
  REQUIREMENTS,
  TIMELINES,
  validateLead,
} from "@/lib/lead-form-contract.mjs";
import { CONTACT, SITE } from "@/lib/website-content";

import styles from "./website.module.css";

const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "/api/contact-inquiry";

const INITIAL_VALUES = {
  fullName: "",
  phoneNumber: "",
  emailAddress: "",
  companyName: "",
  city: "",
  requirement: "",
  gates: "",
  parkingCapacity: "",
  existingEquipment: "",
  timeline: "",
  message: "",
  consent: false,
  website: "",
};

function submissionMessage(payload) {
  if (Array.isArray(payload?.errors)) {
    const messages = payload.errors
      .map((item) => item?.message || item?.msg)
      .filter(Boolean);
    if (messages.length) return messages.join(" ");
  }

  return (
    payload?.message ||
    payload?.error?.message ||
    `We couldn't send your request. Please try again or email ${CONTACT.email}.`
  );
}

function FieldError({ id, message }) {
  return message ? (
    <p className={styles.fieldError} id={id}>
      {message}
    </p>
  ) : null;
}

export function LeadForm({
  className = "",
  description = "Tell us about your site, gates and current parking workflow. We’ll follow up to plan the right assessment.",
  heading = "Book a site assessment",
  source = "ParkTek website",
  submitLabel = SITE.primaryCta.label,
}) {
  const idPrefix = useId();
  const startedAt = useRef(Date.now());
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function fieldId(name) {
    return `${idPrefix}-${name}`;
  }

  function updateField(event) {
    const { checked, name, type, value } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setStatus(null);
  }

  function focusFirstError(nextErrors) {
    const firstName = Object.keys(nextErrors)[0];
    if (firstName) window.requestAnimationFrame(() => document.getElementById(fieldId(firstName))?.focus());
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const nextErrors = validateLead(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      focusFirstError(nextErrors);
      return;
    }

    if (values.website || Date.now() - startedAt.current < MINIMUM_COMPLETION_TIME_MS) {
      setStatus({ type: "error", message: "Please wait a moment, then try submitting again." });
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source,
        }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) throw new Error(submissionMessage(payload));

      setValues(INITIAL_VALUES);
      setErrors({});
      setStatus({
        type: "success",
        message: payload?.message || "Your request was received. The ParkTek team will follow up shortly.",
      });
      startedAt.current = Date.now();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : `We couldn't send your request. Please try again or email ${CONTACT.email}.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={[styles.leadFormShell, className].filter(Boolean).join(" ")}>
      <div className={styles.formIntro}>
        <h2 id={`${idPrefix}-heading`}>{heading}</h2>
        <p>{description}</p>
      </div>

      <form
        aria-busy={submitting}
        aria-labelledby={`${idPrefix}-heading`}
        className={styles.leadForm}
        noValidate
        onSubmit={handleSubmit}
      >
        <div aria-hidden="true" className={styles.honeypot}>
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            autoComplete="off"
            id={fieldId("website")}
            name="website"
            onChange={updateField}
            tabIndex="-1"
            value={values.website}
          />
        </div>

        <fieldset disabled={submitting}>
          <legend className={styles.visuallyHidden}>Site assessment details</legend>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label htmlFor={fieldId("fullName")}>Full name <span aria-hidden="true">*</span></label>
              <input
                aria-describedby={errors.fullName ? `${fieldId("fullName")}-error` : undefined}
                aria-invalid={Boolean(errors.fullName)}
                autoComplete="name"
                id={fieldId("fullName")}
                maxLength="120"
                name="fullName"
                onChange={updateField}
                required
                value={values.fullName}
              />
              <FieldError id={`${fieldId("fullName")}-error`} message={errors.fullName} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("phoneNumber")}>Phone <span aria-hidden="true">*</span></label>
              <input
                aria-describedby={errors.phoneNumber ? `${fieldId("phoneNumber")}-error` : undefined}
                aria-invalid={Boolean(errors.phoneNumber)}
                autoComplete="tel"
                id={fieldId("phoneNumber")}
                inputMode="tel"
                maxLength="20"
                name="phoneNumber"
                onChange={updateField}
                required
                type="tel"
                value={values.phoneNumber}
              />
              <FieldError id={`${fieldId("phoneNumber")}-error`} message={errors.phoneNumber} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("emailAddress")}>Work email <span aria-hidden="true">*</span></label>
              <input
                aria-describedby={errors.emailAddress ? `${fieldId("emailAddress")}-error` : undefined}
                aria-invalid={Boolean(errors.emailAddress)}
                autoComplete="email"
                id={fieldId("emailAddress")}
                maxLength="160"
                name="emailAddress"
                onChange={updateField}
                required
                type="email"
                value={values.emailAddress}
              />
              <FieldError id={`${fieldId("emailAddress")}-error`} message={errors.emailAddress} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("companyName")}>Organisation / property <span aria-hidden="true">*</span></label>
              <input
                aria-describedby={errors.companyName ? `${fieldId("companyName")}-error` : undefined}
                aria-invalid={Boolean(errors.companyName)}
                autoComplete="organization"
                id={fieldId("companyName")}
                maxLength="160"
                name="companyName"
                onChange={updateField}
                required
                value={values.companyName}
              />
              <FieldError id={`${fieldId("companyName")}-error`} message={errors.companyName} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("city")}>City <span aria-hidden="true">*</span></label>
              <input
                aria-describedby={errors.city ? `${fieldId("city")}-error` : undefined}
                aria-invalid={Boolean(errors.city)}
                autoComplete="address-level2"
                id={fieldId("city")}
                maxLength="100"
                name="city"
                onChange={updateField}
                required
                value={values.city}
              />
              <FieldError id={`${fieldId("city")}-error`} message={errors.city} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("requirement")}>Primary requirement <span aria-hidden="true">*</span></label>
              <select
                aria-describedby={errors.requirement ? `${fieldId("requirement")}-error` : undefined}
                aria-invalid={Boolean(errors.requirement)}
                id={fieldId("requirement")}
                name="requirement"
                onChange={updateField}
                required
                value={values.requirement}
              >
                <option value="">Select one</option>
                {REQUIREMENTS.map((item) => <option key={item}>{item}</option>)}
              </select>
              <FieldError id={`${fieldId("requirement")}-error`} message={errors.requirement} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("gates")}>Number of gates</label>
              <input
                aria-describedby={errors.gates ? `${fieldId("gates")}-error` : undefined}
                aria-invalid={Boolean(errors.gates)}
                id={fieldId("gates")}
                inputMode="numeric"
                min="1"
                name="gates"
                onChange={updateField}
                type="number"
                value={values.gates}
              />
              <FieldError id={`${fieldId("gates")}-error`} message={errors.gates} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("parkingCapacity")}>Approximate parking capacity</label>
              <input
                aria-describedby={errors.parkingCapacity ? `${fieldId("parkingCapacity")}-error` : undefined}
                aria-invalid={Boolean(errors.parkingCapacity)}
                id={fieldId("parkingCapacity")}
                inputMode="numeric"
                min="1"
                name="parkingCapacity"
                onChange={updateField}
                type="number"
                value={values.parkingCapacity}
              />
              <FieldError id={`${fieldId("parkingCapacity")}-error`} message={errors.parkingCapacity} />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("existingEquipment")}>Existing equipment</label>
              <input
                id={fieldId("existingEquipment")}
                maxLength="240"
                name="existingEquipment"
                onChange={updateField}
                placeholder="Barriers, RFID readers, cameras, POS"
                value={values.existingEquipment}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor={fieldId("timeline")}>Desired timeline</label>
              <select id={fieldId("timeline")} name="timeline" onChange={updateField} value={values.timeline}>
                <option value="">Select one</option>
                {TIMELINES.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <div className={[styles.field, styles.fieldWide].join(" ")}>
              <label htmlFor={fieldId("message")}>Message / site and workflow details <span aria-hidden="true">*</span></label>
              <textarea
                aria-describedby={errors.message ? `${fieldId("message")}-error` : `${fieldId("message")}-hint`}
                aria-invalid={Boolean(errors.message)}
                id={fieldId("message")}
                maxLength="2000"
                name="message"
                onChange={updateField}
                required
                rows="5"
                value={values.message}
              />
              {errors.message ? (
                <FieldError id={`${fieldId("message")}-error`} message={errors.message} />
              ) : (
                <p className={styles.fieldHint} id={`${fieldId("message")}-hint`}>
                  Include current entry, exit, tariff or reconciliation issues where relevant.
                </p>
              )}
            </div>
          </div>

          <div className={styles.consentField}>
            <input
              aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
              aria-invalid={Boolean(errors.consent)}
              checked={values.consent}
              id={fieldId("consent")}
              name="consent"
              onChange={updateField}
              required
              type="checkbox"
            />
            <div>
              <label htmlFor={fieldId("consent")}>
                I agree that ParkTek may contact me about this request. <span aria-hidden="true">*</span>
              </label>
              <FieldError id={`${fieldId("consent")}-error`} message={errors.consent} />
            </div>
          </div>

          {status ? (
            <div
              aria-live="polite"
              className={status.type === "success" ? styles.formSuccess : styles.formFailure}
              role={status.type === "success" ? "status" : "alert"}
            >
              {status.message}
            </div>
          ) : null}

          <div className={styles.formActions}>
            <button className={styles.submitButton} disabled={submitting} type="submit">
              {submitting ? "Sending…" : submitLabel}
            </button>
            <p>
              Prefer email? <a href={CONTACT.emailHref}>{CONTACT.email}</a>
            </p>
          </div>
        </fieldset>
      </form>
    </section>
  );
}
