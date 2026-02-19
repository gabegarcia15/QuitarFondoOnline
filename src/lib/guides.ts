import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type GuideStep = {
  readonly title: string;
  readonly copy: string;
};

type GuideFaq = {
  readonly q: string;
  readonly a: string;
};

type RelatedGuide = {
  readonly href: string;
  readonly label: string;
};

export type Guide = {
  readonly slug: string;
  readonly pageTitle: string;
  readonly pageDescription: string;
  readonly h1: string;
  readonly intro: string;
  readonly highlights: readonly string[];
  readonly steps: readonly GuideStep[];
  readonly useCases: readonly string[];
  readonly faqs: readonly GuideFaq[];
  readonly relatedGuides: readonly RelatedGuide[];
};

export const guides = {
  quitarFondoBlanco: {
    slug: "quitar-fondo-blanco",
    pageTitle: "Quitar Fondo Blanco de una Imagen Gratis",
    pageDescription:
      "Guia practica para quitar fondo blanco de fotos de producto y exportar PNG transparente en segundos.",
    h1: "Como quitar fondo blanco de una imagen en segundos",
    intro:
      "Si vendes online, un fondo limpio mejora CTR, confianza y conversion. Aqui tienes un flujo directo para eliminar fondos blancos y dejar tu imagen lista para catalogo.",
    highlights: [
      "Recorte rapido para fotos de producto sin edicion manual compleja.",
      "Salida en PNG transparente lista para marketplaces y anuncios.",
      "Mejor consistencia visual entre imagenes de un mismo catalogo.",
    ],
    steps: [
      {
        title: "Sube tu imagen original",
        copy: "Carga JPG, PNG o WEBP con buena luz y sujeto definido.",
      },
      {
        title: "Procesa el recorte automatico",
        copy: "La IA detecta el sujeto y elimina el fondo blanco en segundos.",
      },
      {
        title: "Descarga y valida bordes",
        copy: "Descarga en PNG y revisa bordes finos como pelo, vidrio o sombras.",
      },
    ],
    useCases: [
      "Fotos de producto para Amazon, Mercado Libre y Shopify.",
      "Imagenes de ficha tecnica con fondo uniforme.",
      "Creativos para redes con composicion libre sobre cualquier color.",
    ],
    faqs: [
      {
        q: "Se pierde calidad al quitar el fondo?",
        a: "La salida mantiene calidad alta para uso comercial, especialmente en exportacion PNG.",
      },
      {
        q: "Puedo usarlo con fotos tomadas con celular?",
        a: "Si. Mientras el sujeto este enfocado, el resultado suele ser solido para ecommerce.",
      },
    ],
    relatedGuides: [
      { href: "/fondo-transparente-png", label: "Fondo transparente PNG" },
      { href: "/fotos-de-producto-sin-fondo", label: "Fotos de producto sin fondo" },
      { href: "/logo-sin-fondo", label: "Logo sin fondo" },
    ],
  },
  fondoTransparentePng: {
    slug: "fondo-transparente-png",
    pageTitle: "Fondo Transparente PNG: Guia Rapida",
    pageDescription:
      "Aprende a convertir cualquier foto a PNG con fondo transparente para diseno, ecommerce y marketing.",
    h1: "Como crear un PNG con fondo transparente",
    intro:
      "Un PNG transparente te permite reutilizar una imagen en web, anuncios y presentaciones sin cajas blancas ni recortes manuales.",
    highlights: [
      "Resultado compatible con herramientas de diseno y gestores de anuncios.",
      "Facil de superponer sobre cualquier color o fotografia de fondo.",
      "Ideal para piezas de marca y elementos visuales reutilizables.",
    ],
    steps: [
      {
        title: "Elige una imagen con sujeto claro",
        copy: "Prioriza contraste entre sujeto y fondo para mejorar precision.",
      },
      {
        title: "Ejecuta la eliminacion de fondo",
        copy: "La herramienta procesa la imagen y genera una version sin fondo.",
      },
      {
        title: "Exporta como PNG transparente",
        copy: "Descarga y usa el archivo en web, diseno o catalogos digitales.",
      },
    ],
    useCases: [
      "Banners y hero images con productos recortados.",
      "Presentaciones comerciales con elementos visuales limpios.",
      "Recursos para social media con composicion flexible.",
    ],
    faqs: [
      {
        q: "Por que PNG y no JPG?",
        a: "PNG soporta transparencia. JPG siempre rellena el fondo con un color.",
      },
      {
        q: "Sirve para impresiones?",
        a: "Si, especialmente para artes finales que requieren composicion sobre fondos variables.",
      },
    ],
    relatedGuides: [
      { href: "/quitar-fondo-blanco", label: "Quitar fondo blanco" },
      { href: "/fotos-de-producto-sin-fondo", label: "Fotos de producto sin fondo" },
      { href: "/logo-sin-fondo", label: "Logo sin fondo" },
    ],
  },
  fotosDeProductoSinFondo: {
    slug: "fotos-de-producto-sin-fondo",
    pageTitle: "Fotos de Producto Sin Fondo para Ecommerce",
    pageDescription:
      "Optimiza tus fotos de producto sin fondo para catalogos, anuncios y conversion en tiendas online.",
    h1: "Fotos de producto sin fondo: flujo recomendado para vender mas",
    intro:
      "La limpieza visual en ecommerce impacta conversion. Con un flujo consistente de recorte, tus listados se ven mas profesionales y comparables.",
    highlights: [
      "Catalogo mas uniforme en miniaturas y pagina de producto.",
      "Menos tiempo operativo para el equipo de contenido.",
      "Mayor control para crear variaciones publicitarias rapidamente.",
    ],
    steps: [
      {
        title: "Prepara lote de imagenes",
        copy: "Usa fotos bien iluminadas y evita fondos con ruido visual excesivo.",
      },
      {
        title: "Quita fondo y revisa casos complejos",
        copy: "Valida bordes en productos translucidos o con partes finas.",
      },
      {
        title: "Publica en formato consistente",
        copy: "Mantener mismo estilo mejora confianza y lectura del catalogo.",
      },
    ],
    useCases: [
      "Tiendas Shopify y WooCommerce con catalogos grandes.",
      "Feeds de anuncios dinamicos para Meta y Google.",
      "Marketplaces que exigen fondo neutral o transparente.",
    ],
    faqs: [
      {
        q: "Cada cuanto debo actualizar fotos?",
        a: "Cada vez que cambie empaque, color o posicionamiento visual principal del producto.",
      },
      {
        q: "Esto ayuda al SEO?",
        a: "Indirectamente si: mejora experiencia, CTR y calidad visual de paginas de producto.",
      },
    ],
    relatedGuides: [
      { href: "/quitar-fondo-blanco", label: "Quitar fondo blanco" },
      { href: "/fondo-transparente-png", label: "Fondo transparente PNG" },
      { href: "/logo-sin-fondo", label: "Logo sin fondo" },
    ],
  },
  logoSinFondo: {
    slug: "logo-sin-fondo",
    pageTitle: "Logo Sin Fondo: Convertir a PNG Transparente",
    pageDescription:
      "Convierte tu logo a PNG transparente para web, redes sociales, presentaciones y piezas de marca.",
    h1: "Logo sin fondo: conviertelo a PNG transparente",
    intro:
      "Un logo transparente evita bordes blancos y permite uso limpio en cualquier superficie digital. Esta guia resume el proceso para obtener un resultado listo para marca.",
    highlights: [
      "Uso profesional del logo en sitios web y creativos publicitarios.",
      "Compatibilidad inmediata con fondos claros, oscuros o fotograficos.",
      "Reduccion de retrabajo en equipos de marketing y diseno.",
    ],
    steps: [
      {
        title: "Sube el archivo del logo",
        copy: "Funciona mejor cuando el logo tiene buen contraste frente al fondo.",
      },
      {
        title: "Procesa y revisa detalles",
        copy: "Verifica zonas delicadas como esquinas, letras finas o sombras.",
      },
      {
        title: "Descarga PNG transparente",
        copy: "Guarda una version maestra para web, redes y documentos comerciales.",
      },
    ],
    useCases: [
      "Header y favicon extendido en sitios web.",
      "Presentaciones corporativas y propuestas comerciales.",
      "Anuncios, reels y publicaciones sociales.",
    ],
    faqs: [
      {
        q: "Sirve para logos pequenos?",
        a: "Si, aunque conviene partir de la mayor resolucion disponible para bordes mas limpios.",
      },
      {
        q: "Puedo usarlo en fondos oscuros?",
        a: "Si. El PNG transparente elimina el fondo original y facilita adaptaciones por color.",
      },
    ],
    relatedGuides: [
      { href: "/quitar-fondo-blanco", label: "Quitar fondo blanco" },
      { href: "/fondo-transparente-png", label: "Fondo transparente PNG" },
      { href: "/fotos-de-producto-sin-fondo", label: "Fotos de producto sin fondo" },
    ],
  },
} as const satisfies Record<string, Guide>;

export function buildGuideMetadata(guide: Guide): Metadata {
  return {
    title: guide.pageTitle,
    description: guide.pageDescription,
    alternates: {
      canonical: `/${guide.slug}`,
    },
    openGraph: {
      title: guide.pageTitle,
      description: guide.pageDescription,
      url: `${siteConfig.siteUrl}/${guide.slug}`,
      locale: "es_ES",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.pageTitle,
      description: guide.pageDescription,
    },
  };
}
