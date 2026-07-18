import { WebsiteHomePage } from "@/components/website/home-page";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata({
  title: "Smart Parking, Access Control & Parking POS | ParkTek",
  description:
    "Every gate, vehicle and parking transaction connected across live residential access and launching commercial parking workflows.",
  path: "/",
  imageAlt: "ParkTek connected gate access and parking operations"
});

export default function Page() {
  return <WebsiteHomePage />;
}
