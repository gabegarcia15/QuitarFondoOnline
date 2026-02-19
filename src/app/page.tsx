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
  const beforeImageUrl = `${siteConfig.siteUrl}/examples/background-removal-before.svg`;
  const afterImageUrl = `${siteConfig.siteUrl}/examples/background-removal-after.svg`;

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "es",
    mainEntity: [
      {
        "@type": "Question",
        name: "Que pasa despues de mi descarga gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puedes descargar tu resultado y, si necesitas mas calidad o flujo profesional, continuar al editor completo.",
        },
      },
      {
        "@type": "Question",
        name: "Necesito crear cuenta para probar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Puedes subir y procesar tu imagen primero. La cuenta solo es necesaria cuando quieras escalar o comprar un plan.",
        },
      },
      {
        "@type": "Question",
        name: "Que formatos aceptan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aceptamos JPG, PNG y WEBP de hasta 10MB por archivo.",
        },
      },
      {
        "@type": "Question",
        name: "Como obtengo mayor resolucion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Desde la vista de resultado puedes abrir la version completa para acceder a opciones avanzadas y exportaciones HD.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como eliminar el fondo de una imagen",
    description: "Flujo rapido en 3 pasos para quitar el fondo de una imagen online.",
    inLanguage: "es",
    totalTime: "PT30S",
    supply: [
      {
        "@type": "HowToSupply",
        name: "Imagen en JPG, PNG o WEBP",
      },
    ],
    step: [
      {
        "@type": "HowToStep",
        name: "Sube la imagen",
        text: "Arrastra o selecciona una imagen en JPG, PNG o WEBP.",
      },
      {
        "@type": "HowToStep",
        name: "Procesamos el fondo",
        text: "Nuestro modelo de IA recorta el sujeto automaticamente.",
      },
      {
        "@type": "HowToStep",
        name: "Descarga y continua",
        text: "Guarda tu resultado o abre el editor completo para opciones avanzadas.",
      },
    ],
  };

  const beforeImageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: "Imagen original antes de eliminar fondo",
    description: "Ejemplo de imagen con fondo original antes del procesamiento.",
    inLanguage: "es",
    contentUrl: beforeImageUrl,
    url: beforeImageUrl,
    representativeOfPage: false,
  };

  const afterImageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: "Imagen despues de eliminar fondo",
    description: "Ejemplo de imagen resultante con fondo limpio para ecommerce.",
    inLanguage: "es",
    contentUrl: afterImageUrl,
    url: afterImageUrl,
    representativeOfPage: true,
  };

  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, softwareSchema, faqSchema, howToSchema, beforeImageSchema, afterImageSchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graphSchema),
        }}
      />
      <LeadMagnetPage />
    </>
  );
}
