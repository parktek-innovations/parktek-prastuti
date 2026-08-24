"use client";

import { useRef, useState } from "react";

import { PrimaryButton } from "@/components/prastuti/actions";
import { ParktekIcon } from "@/components/prastuti/icons";
import { cn } from "@/lib/utils";

const initialValues = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  organisation: "",
  siteContext: ""
};

function validate(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  if (!values.emailAddress.trim()) {
    errors.emailAddress = "Enter your email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.emailAddress)) {
    errors.emailAddress = "Enter an email address in the format name@example.com.";
  }

  if (!values.siteContext.trim()) {
    errors.siteContext = "Describe the premises, lanes, and access or parking need.";
  }

  return errors;
}

export function FormField({
  as = "input",
  error,
  hint,
  id,
  label,
  required = false,
  className,
  ...props
}) {
  const Component = as;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("min-w-0", className)}>
      <label
        className="block text-sm font-semibold text-pk-component-input-label-default"
        htmlFor={id}
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {hint ? (
        <p className="mt-1 text-sm leading-6 text-pk-text-muted" id={hintId}>
          {hint}
        </p>
      ) : null}
      <Component
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : undefined}
        className={cn(
          "pk-focus-standard mt-2 min-h-12 w-full rounded-xl border bg-pk-component-input-background-default px-4 py-3 text-base text-pk-component-input-foreground-default placeholder:text-pk-component-input-placeholder-default disabled:cursor-not-allowed disabled:bg-pk-status-disabled-background disabled:text-pk-status-disabled-foreground",
          as === "textarea" && "min-h-32 resize-y",
          error
            ? "border-pk-component-input-border-error"
            : "border-pk-component-input-border-default"
        )}
        id={id}
        required={required}
        {...props}
      />
      {error ? (
        <p
          className="mt-2 flex items-start gap-2 text-sm font-semibold text-pk-action-destructive-background"
          id={errorId}
        >
          <ParktekIcon className="mt-0.5 shrink-0" name="error" size={17} weight="bold" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

export function SiteAssessmentForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setErrors({});
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 350));

    setSubmitting(false);
    setValues(initialValues);
    setStatus({
      type: "success",
      message:
        "Preview request captured locally. Production submission wiring is intentionally outside this preview route."
    });
  }

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form
      aria-busy={submitting}
      className="rounded-2xl border border-pk-border-default bg-pk-surface-card p-5 sm:p-7"
      noValidate
      onSubmit={handleSubmit}
    >
      {errorCount > 0 ? (
        <div
          className="mb-6 rounded-xl border border-pk-status-error-border bg-pk-surface-card p-4 text-pk-action-destructive-background"
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
        >
          <p className="flex items-center gap-2 font-bold">
            <ParktekIcon name="error" size={20} weight="bold" />
            Correct {errorCount} {errorCount === 1 ? "field" : "fields"} before sending.
          </p>
          <p className="mt-2 text-sm">Each affected field includes a specific correction.</p>
        </div>
      ) : null}

      <div className="grid min-w-0 gap-5 md:grid-cols-2">
        <FormField
          autoComplete="name"
          disabled={submitting}
          error={errors.fullName}
          id="assessment-full-name"
          label="Full name"
          name="fullName"
          onChange={updateField}
          required
          value={values.fullName}
        />
        <FormField
          autoComplete="email"
          disabled={submitting}
          error={errors.emailAddress}
          id="assessment-email"
          label="Email address"
          name="emailAddress"
          onChange={updateField}
          required
          type="email"
          value={values.emailAddress}
        />
        <FormField
          autoComplete="tel"
          disabled={submitting}
          hint="Optional. Include the country code when applicable."
          id="assessment-phone"
          inputMode="tel"
          label="Phone number"
          name="phoneNumber"
          onChange={updateField}
          type="tel"
          value={values.phoneNumber}
        />
        <FormField
          autoComplete="organization"
          disabled={submitting}
          id="assessment-organisation"
          label="Organisation or society"
          name="organisation"
          onChange={updateField}
          value={values.organisation}
        />
        <FormField
          as="textarea"
          className="md:col-span-2"
          disabled={submitting}
          error={errors.siteContext}
          hint="Do not include passwords, access credentials, or sensitive resident information."
          id="assessment-site-context"
          label="Site and operating context"
          name="siteContext"
          onChange={updateField}
          required
          value={values.siteContext}
        />
      </div>

      {status ? (
        <div
          className="mt-6 flex items-start gap-3 rounded-xl border border-pk-status-success-border bg-pk-status-success-background p-4 text-pk-status-success-foreground"
          role="status"
        >
          <ParktekIcon className="mt-0.5 shrink-0" name="verified" size={20} weight="bold" />
          <p>{status.message}</p>
        </div>
      ) : null}

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <PrimaryButton disabled={submitting} type="submit">
          {submitting ? (
            <>
              <ParktekIcon
                className="motion-safe:animate-spin"
                name="loading"
                size={19}
                weight="bold"
              />
              Sending assessment request…
            </>
          ) : (
            "Request a site assessment"
          )}
        </PrimaryButton>
        <a
          className="pk-focus-standard rounded-sm font-semibold text-pk-link-default underline decoration-2 underline-offset-4 hover:text-pk-link-hover"
          href="mailto:support@parktek.in"
        >
          Email support@parktek.in
        </a>
      </div>
    </form>
  );
}
