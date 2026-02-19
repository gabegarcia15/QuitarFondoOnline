import { GuidePage } from "@/components/guides/guide-page";
import { buildGuideMetadata, guides } from "@/lib/guides";

const guide = guides.fondoTransparentePng;

export const metadata = buildGuideMetadata(guide);

export default function FondoTransparentePngPage() {
  return <GuidePage guide={guide} />;
}
