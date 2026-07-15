"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_CHANNELS } from "@/lib/site-content";

const CONTACT_INQUIRY_API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(
  /\/$/,
  ""
);

const initialValues = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  companyName: "",
  projectContext: ""
};

function getSubmissionMessage(payload) {
  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    return payload.errors.map((item) => item.message).join(" ");
  }

  return payload?.message || payload?.error?.message || "We couldn't send your inquiry right now. Please try again or email us directly.";
}

export function ContactForm() {
  const [form, setForm] = useState(initialValues);
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${CONTACT_INQUIRY_API_BASE_URL}/contact-inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          emailAddress: form.emailAddress.trim(),
          phoneNumber: form.phoneNumber.trim(),
          companyName: form.companyName.trim(),
          projectContext: form.projectContext.trim()
        })
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(getSubmissionMessage(payload));
      }

      setForm(initialValues);
      setStatus({
        type: "success",
        message: payload?.message || "Inquiry submitted successfully. Our team will reach out soon."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We couldn't send your inquiry right now. Please try again or email us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-[32px] bg-[#111108] p-8 text-white shadow-card md:p-10">
        <p className="font-clash text-[42px] leading-[1] text-[#60A5FA]">Contact Us</p>
        <p className="mt-4 max-w-[40ch] text-lg leading-8 text-white/75">
          Ready to update how your society handles vehicle identity, gate access and parking operations? Talk to the ParkTek team.
        </p>

        <div className="mt-10 space-y-5">
          {CONTACT_CHANNELS.map((item) => (
            <a
              className="flex flex-col rounded-3xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:bg-white/10"
              href={item.href}
              key={item.label}
              rel="noreferrer"
              target="_blank"
            >
              <span className="text-sm uppercase tracking-[0.18em] text-white/45">{item.label}</span>
              <span className="mt-1 text-lg leading-7 text-white">{item.value}</span>
            </a>
          ))}
        </div>
      </div>

      <form className="rounded-[32px] bg-white p-8 shadow-card md:p-10" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              disabled={isSubmitting}
              id="fullName"
              name="fullName"
              onChange={updateField}
              placeholder="John Doe"
              required
              value={form.fullName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input
              disabled={isSubmitting}
              id="emailAddress"
              name="emailAddress"
              onChange={updateField}
              placeholder="john@example.com"
              required
              type="email"
              value={form.emailAddress}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              disabled={isSubmitting}
              id="phoneNumber"
              name="phoneNumber"
              onChange={updateField}
              placeholder="+91 9899945876"
              value={form.phoneNumber}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Society Name</Label>
            <Input
              disabled={isSubmitting}
              id="companyName"
              name="companyName"
              onChange={updateField}
              placeholder="Your residential society"
              value={form.companyName}
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="projectContext">Project Context</Label>
          <Textarea
            disabled={isSubmitting}
            id="projectContext"
            name="projectContext"
            onChange={updateField}
            placeholder="Tell us about your society, gate setup, vehicle volume, and the parking workflow you want to improve."
            required
            value={form.projectContext}
          />
        </div>

        {status ? (
          <p
            aria-live="polite"
            className={`mt-5 rounded-2xl px-4 py-3 text-sm leading-6 ${
              status.type === "success"
                ? "border border-[#0d7a32]/20 bg-[#0d7a32]/10 text-[#0d7a32]"
                : "border border-[#c43d3d]/20 bg-[#c43d3d]/10 text-[#8f1f1f]"
            }`}
          >
            {status.message}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button className="h-14 rounded-[18px] px-6 text-base" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </Button>
          <a
            className="text-sm font-medium uppercase tracking-[0.14em] text-[#75756d] underline-offset-4 hover:underline"
            href="mailto:support@parktek.in"
          >
            Prefer email instead?
          </a>
        </div>
      </form>
    </div>
  );
}
