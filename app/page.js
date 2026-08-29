import { WebsiteHomePage } from "@/components/website/home-page";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata({
  title: "Smart Parking, Access Control & Parking POS | ParkTek",
  description:
    "Connect live residential RFID and ANPR access with commercial parking and POS operations through ParkTek.",
  path: "/",
  imageAlt: "ParkTek connected gate access and parking operations"
});

export default function Page() {
  return <WebsiteHomePage />;
}
