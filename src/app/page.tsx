import type { Metadata } from "next";
import { LeadMagnetPage } from "@/components/lead-magnet/landing-page";
import { siteConfig } from "@/config/site";

const pageTitle = "Quitar Fondo a una Imagen | Editor Online Gratis en Segundos";
const pageDescription =
  "Quitar fondo a una imagen online con recortes limpios para producto, logos y marketing. Sube tu foto y descarga PNG transparente en segundos.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    siteConfig.primaryKeyword,
    "quitar fondo online gratis",
    "eliminar fondo de imagen",
    "removedor de fondo online",
  ],
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
  const beforeImageUrl = `${siteConfig.siteUrl}/9ff8b609-8ddc-4ca2-a16c-59b80e3f52a3.jpeg`;
  const afterImageUrl = `${siteConfig.siteUrl}/pexels-pixabay-54097-sin-fondo.png`;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Quitar Fondo Online",
    alternateName: ["Quitar Fondo Online Gratis", "Removedor de fondo online"],
    url: siteConfig.siteUrl,
    inLanguage: "es",
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Quitar Fondo Online",
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
        name: "Que sucede despues de la descarga inicial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tu archivo queda listo para bajar de inmediato y, si quieres mas precision o funciones pro, puedes abrir el editor completo.",
        },
      },
      {
        "@type": "Question",
        name: "Puedo probar sin registrarme?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Primero subes y procesas la foto. Solo pedimos cuenta cuando necesitas trabajar a escala o activar un plan.",
        },
      },
      {
        "@type": "Question",
        name: "Que archivos puedo subir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La prueba acepta JPG, PNG y WEBP con un maximo de 10 MB por imagen.",
        },
      },
      {
        "@type": "Question",
        name: "Como consigo una salida en mayor calidad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tras ver el resultado puedes pasar al flujo completo para usar exportaciones HD y ajustes adicionales.",
        },
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Como quitar fondo a una imagen en 3 pasos",
    description: "Proceso corto de tres pasos para separar el sujeto, quitar el fondo y descargar PNG transparente.",
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
        name: "Carga tu foto",
        text: "Sube una imagen en JPG, PNG o WEBP desde tu equipo.",
      },
      {
        "@type": "HowToStep",
        name: "La IA recorta el fondo",
        text: "El modelo identifica el sujeto principal y elimina el fondo en automatico.",
      },
      {
        "@type": "HowToStep",
        name: "Descarga o sigue editando",
        text: "Guarda el resultado o abre la version completa para ajustes avanzados.",
      },
    ],
  };

  const beforeImageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: "Foto original antes de eliminar fondo",
    description: "Imagen original antes de aplicar el recorte de fondo.",
    inLanguage: "es",
    contentUrl: beforeImageUrl,
    url: beforeImageUrl,
    representativeOfPage: false,
  };

  const afterImageSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: "Foto resultante despues de eliminar fondo",
    description: "Resultado de ejemplo con el fondo eliminado y sujeto aislado.",
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
