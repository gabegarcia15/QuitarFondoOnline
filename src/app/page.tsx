import type { Metadata } from "next";
import { LeadMagnetPage } from "@/components/lead-magnet/landing-page";
import { siteConfig } from "@/config/site";

const pageTitle = "Eliminar Fondo De Una Imagen | Quitar Fondo Online Gratis";
const pageDescription =
  "Eliminar Fondo De Una Imagen en segundos. Sube tu foto, elimina el fondo y descarga el resultado gratis.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: siteConfig.siteUrl,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function Page() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Eliminar Fondo De Una Imagen",
    url: siteConfig.siteUrl,
    inLanguage: "es",
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Eliminar Fondo De Una Imagen",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    inLanguage: "es",
    url: siteConfig.siteUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Prueba gratis con descarga incluida.",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <LeadMagnetPage />
    </>
  );
}
