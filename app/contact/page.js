import { ContactForm } from "@/components/site/contact-form";
import { PageShell } from "@/components/site/page-shell";

export const metadata = {
  title: "Contact ParkTek",
  description: "Talk to ParkTek about residential parking access, RFID, guarded ANPR, and society operations."
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      lead="Bring resident vehicles, gate access and society operations into one coordinated parking layer."
      title="Talk to ParkTek about your society."
    >
      <ContactForm />
    </PageShell>
  );
}
