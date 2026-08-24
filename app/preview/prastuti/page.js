import { PrastutiPreviewPage } from "@/components/prastuti/preview-page";

export const metadata = {
  title: "ParkTek Prastuti Design-System Preview",
  description:
    "Non-production Prastuti design-system preview with release-aware product availability.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function Page() {
  return <PrastutiPreviewPage />;
}
