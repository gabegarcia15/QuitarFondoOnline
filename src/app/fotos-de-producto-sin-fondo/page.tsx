import { GuidePage } from "@/components/guides/guide-page";
import { buildGuideMetadata, guides } from "@/lib/guides";

const guide = guides.fotosDeProductoSinFondo;

export const metadata = buildGuideMetadata(guide);

export default function FotosDeProductoSinFondoPage() {
  return <GuidePage guide={guide} />;
}
