import { GuidePage } from "@/components/guides/guide-page";
import { buildGuideMetadata, guides } from "@/lib/guides";

const guide = guides.logoSinFondo;

export const metadata = buildGuideMetadata(guide);

export default function LogoSinFondoPage() {
  return <GuidePage guide={guide} />;
}
