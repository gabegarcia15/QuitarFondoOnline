import { GuidePage } from "@/components/guides/guide-page";
import { buildGuideMetadata, guides } from "@/lib/guides";

const guide = guides.quitarFondoBlanco;

export const metadata = buildGuideMetadata(guide);

export default function QuitarFondoBlancoPage() {
  return <GuidePage guide={guide} />;
}
