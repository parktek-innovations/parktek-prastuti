import Link from "next/link";

import { PageShell } from "@/components/site/page-shell";
import { CONTACT_DETAILS } from "@/lib/site-content";

const features = [
  {
    title: "FASTag recharge",
    body: "Recharge an existing FASTag for eligible issuers through ParkTek's supported payment flow."
  },
  {
    title: "Vehicle-number lookup",
    body: "Start with the vehicle registration number and confirm issuer details before payment."
  },
  {
    title: "Transparent charges",
    body: "Recharge amount, convenience fee and GST, if applicable, are shown before payment confirmation."
  },
  {
    title: "Transaction support",
    body: "Use the transaction reference for recharge, failed-payment or confirmation questions."
  }
];

const steps = [
  "Enter vehicle number",
  "Confirm FASTag issuer",
  "Review amount and charges",
  "Complete secure payment",
  "Save recharge confirmation"
];

const faqs = [
  {
    question: "What details are required for FASTag recharge?",
    answer: "You usually need the vehicle registration number and FASTag issuer. The issuer or payment partner may require additional verification."
  },
  {
    question: "Are fees shown before payment?",
    answer: "Yes. ParkTek shows recharge amount, convenience fee and GST, if applicable, before the user confirms payment."
  },
  {
    question: "What if money is debited but recharge is pending?",
    answer: "Contact ParkTek support with the transaction reference. Resolution follows the payment partner, issuer and bank timelines."
  }
];

export const metadata = {
  title: "FASTag Recharge Online | ParkTek",
  description:
    "Recharge FASTag online with ParkTek. Check vehicle-linked details, review charges and complete supported FASTag payments."
};

export default function FastagPage() {
  return (
    <PageShell
      eyebrow="FASTag services"
      lead="Recharge FASTag, review charges before payment and keep payment references connected to your vehicle journey."
      title="Recharge FASTag online with ParkTek."
    >
      <div className="grid gap-10">
        <section className="rounded-[32px] bg-parktek-ink p-5 text-white md:p-8">
          <label className="block font-clash text-[18px] tracking-[0.08em]" htmlFor="fastag-vehicle">
            Vehicle number
          </label>
          <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
            <input
              className="min-h-14 rounded-[18px] border border-white/15 bg-white px-4 text-parktek-ink outline-none placeholder:text-parktek-muted focus:border-parktek-yellow"
              id="fastag-vehicle"
              placeholder="DL 01 AB 1234"
              type="text"
            />
            <Link
              className="inline-flex min-h-14 items-center justify-center rounded-[18px] bg-parktek-yellow px-6 font-clash text-[18px] text-parktek-ink transition-opacity hover:opacity-90"
              href="/contact/"
            >
              Recharge FASTag
            </Link>
          </div>
          <p className="mt-4 text-[15px] leading-6 text-white/75">
            Final recharge amount, convenience fee and GST, if applicable, are displayed before payment.
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
          <h2 className="font-clash text-[36px] leading-none text-parktek-ink">How FASTag recharge works</h2>
          <ol className="mt-6 grid gap-3 md:grid-cols-5">
            {steps.map((step, index) => (
              <li className="rounded-[22px] bg-white p-4 text-parktek-ink shadow-card" key={step}>
                <span className="font-clash text-sm text-parktek-yellow">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-[17px] leading-6">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[28px] bg-parktek-ink p-6 text-white">
            <h2 className="font-clash text-[30px] leading-tight">FASTag support</h2>
            <p className="mt-4 leading-7 text-white/75">
              For recharge, failed payment or status questions, contact ParkTek support.
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
          <div className="grid gap-3">
            {faqs.map((item) => (
              <article className="rounded-[24px] border border-black/10 bg-white p-5" key={item.question}>
                <h2 className="font-clash text-[24px] leading-tight text-parktek-ink">{item.question}</h2>
                <p className="mt-2 text-[17px] leading-7 text-parktek-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
