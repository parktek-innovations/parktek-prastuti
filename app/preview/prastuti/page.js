import { PrastutiPreviewPage } from "@/components/prastuti/preview-page";

export const metadata = {
  title: "ParkTek Prastuti Phase A Preview",
  description:
    "Non-production preview of ParkTek landing foundations and release-aware product availability.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function Page() {
  return <PrastutiPreviewPage />;
}
