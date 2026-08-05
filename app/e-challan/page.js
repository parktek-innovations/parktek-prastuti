import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { CONTACT_DETAILS } from "@/lib/site-content";

const features = [
  {
    title: "Check by vehicle number",
    body: "Use the vehicle registration number to start an eligible e-challan lookup."
  },
  {
    title: "Review challan details",
    body: "Verify offence, authority, date, location, amount and payment eligibility before paying."
  },
  {
    title: "Pay eligible challans",
    body: "Complete payment for eligible traffic challans through ParkTek's supported payment flow."
  },
  {
    title: "Keep receipts",
    body: "Save transaction references and receipts until the official challan status is updated."
  }
];

const steps = [
  "Enter vehicle or challan details",
  "Verify owner or user details",
  "Review pending challans",
  "Confirm fine and charges",
  "Pay and save receipt"
];

const guidance = [
  "Always verify challan details before payment",
  "Government fine, convenience fee and GST are shown before payment where applicable",
  "Some court or disputed challans may require a separate official process",
  "Do not share OTP, CVV or card credentials with anyone",
  "Keep the transaction reference for support and reconciliation"
];

const faqs = [
  {
    question: "Can every traffic challan be paid online?",
    answer: "Some challans can be paid online, while disputed, court or authority-restricted challans may require a separate official process."
  },
  {
    question: "What details can be used to check an e-challan?",
    answer: "Depending on supported data, a user may check by vehicle number, challan number or driving licence number."
  },
  {
    question: "What if payment is debited but status is not updated?",
    answer: "Keep the transaction reference and contact support. Reconciliation depends on the payment partner, bank and challan authority timelines."
  }
];

export const metadata = {
  title: "E-Challan Check and Payment Online | ParkTek",
  description:
    "Check and pay eligible traffic e-challans online with ParkTek. Review challan details, charges and support information before payment."
};

export default function EChallanPage() {
  return (
    <PageShell
      eyebrow="Traffic challan payments"
      lead="Check eligible e-challans, review official details and pay securely after confirming the final amount."
      title="Check and pay traffic e-challans online."
    >
      <div className="grid gap-10">
        <section className="rounded-[32px] bg-parktek-ink p-5 text-white md:p-8">
          <label className="block font-clash text-[18px] tracking-[0.08em]" htmlFor="challan-vehicle">
            Vehicle number
          </label>
          <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <input
              className="min-h-14 rounded-[18px] border border-white/15 bg-white px-4 text-parktek-ink outline-none placeholder:text-parktek-muted focus:border-parktek-yellow"
              id="challan-vehicle"
              placeholder="DL 01 AB 1234"
              type="text"
            />
            <Link
              className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-parktek-yellow px-6 font-clash text-[18px] text-parktek-ink transition-opacity hover:opacity-90"
              href="/contact/"
            >
              Check Challan
            </Link>
          </div>
          <p className="mt-4 text-[15px] leading-6 text-white/75">
            Government fine, convenience fee and GST, if applicable, are displayed before payment.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <article className="rounded-[28px] border border-black/10 bg-white p-6 shadow-card" key={feature.title}>
              <h2 className="font-clash text-[28px] leading-tight text-parktek-ink">{feature.title}</h2>
              <p className="mt-3 text-[18px] leading-7 text-parktek-muted">{feature.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-[32px] bg-[#f5f2e8] p-6 md:p-8">
          <h2 className="font-clash text-[36px] leading-none text-parktek-ink">How e-challan payment works</h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-5">
            {steps.map((step, index) => (
              <li className="rounded-[22px] bg-white p-4 text-parktek-ink shadow-card" key={step}>
                <span className="font-clash text-sm text-parktek-yellow">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-[17px] leading-6">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-card">
            <h2 className="font-clash text-[32px] leading-tight text-parktek-ink">Safety and charge visibility</h2>
            <ul className="mt-5 grid gap-3 text-[18px] leading-7 text-parktek-muted">
              {guidance.map((item) => (
                <li className="rounded-[18px] bg-[#f5f2e8] px-4 py-3" key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="rounded-[28px] bg-parktek-ink p-6 text-white">
            <h2 className="font-clash text-[30px] leading-tight">E-challan support</h2>
            <p className="mt-4 leading-7 text-white/75">
              For challan payment, failed transaction or status questions, contact ParkTek support.
            </p>
            <dl className="mt-6 grid gap-3 text-[17px]">
              <div>
                <dt className="text-white/55">Email</dt>
                <dd><a className="underline" href={`mailto:${CONTACT_DETAILS.email}`}>{CONTACT_DETAILS.email}</a></dd>
              </div>
              <div>
                <dt className="text-white/55">Phone</dt>
                <dd><a className="underline" href="tel:+919899945876">{CONTACT_DETAILS.phone}</a></dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="grid gap-3">
          {faqs.map((item) => (
            <article className="rounded-[24px] border border-black/10 bg-white p-5" key={item.question}>
              <h2 className="font-clash text-[24px] leading-tight text-parktek-ink">{item.question}</h2>
              <p className="mt-2 text-[17px] leading-7 text-parktek-muted">{item.answer}</p>
            </article>
          ))}
        </section>
      </div>
    </PageShell>
  );
}
