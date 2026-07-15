import { ScrollWorldExperience } from "@/components/scroll-world/scroll-world-experience";
import { makeMetadata } from "@/lib/seo";

export const metadata = makeMetadata({
  title: "ParkTek 3D access journey",
  description:
    "A local, procedural Three.js trial of the ParkTek residential parking journey.",
  path: "/scroll-world-trial/",
  noIndex: true
});

export default function ScrollWorldTrialPage() {
  return <ScrollWorldExperience />;
}
