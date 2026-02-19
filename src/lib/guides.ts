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
    pageTitle: "Quitar Fondo Blanco para Ecommerce | Guia Operativa",
    pageDescription:
      "Metodo practico para limpiar fondo blanco en fotos de producto y exportar archivos listos para tu catalogo.",
    h1: "Quitar fondo blanco en fotos de producto sin friccion",
    intro:
      "En operaciones ecommerce, quitar fondo a una imagen con un metodo repetible evita retrabajos y acelera la publicacion del catalogo.",
    highlights: [
      "Estandariza el recorte de SKU nuevos sin depender de edicion manual extensa.",
      "Obtiene PNG transparentes listos para fichas, anuncios y marketplaces.",
      "Reduce diferencias visuales entre tomas para mejorar coherencia de catalogo.",
    ],
    steps: [
      {
        title: "Selecciona la foto base",
        copy: "Trabaja con imagenes bien iluminadas para detectar bordes con mayor precision.",
      },
      {
        title: "Aplica limpieza del fondo",
        copy: "Procesa el recorte automatico y confirma que el producto quede aislado.",
      },
      {
        title: "Exporta y valida para tienda",
        copy: "Descarga el PNG y revisa zonas finas antes de subirlo al catalogo.",
      },
    ],
    useCases: [
      "Altas de producto en Shopify, WooCommerce y marketplaces.",
      "Actualizacion rapida de imagenes cuando cambia empaque o variante.",
      "Bancos internos de assets listos para equipo de performance.",
    ],
    faqs: [
      {
        q: "Funciona con fondos blancos irregulares?",
        a: "Si, y conviene revisar sombras suaves para ajustar piezas con detalles delicados.",
      },
      {
        q: "Me sirve para cargas masivas de catalogo?",
        a: "Si, porque el flujo mantiene un criterio uniforme y facilita QA antes de publicar.",
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
    pageTitle: "Fondo Transparente PNG | Activos Reutilizables para Web y Diseno",
    pageDescription:
      "Convierte imagenes en PNG transparente para reutilizarlas en sitios, presentaciones y piezas creativas sin rehacer recortes.",
    h1: "Crear PNG transparente para reutilizar activos en cualquier pieza",
    intro:
      "Si necesitas recursos modulares, quitar fondo a una imagen y guardarla en PNG transparente te permite mover el mismo activo entre web, diseno y anuncios.",
    highlights: [
      "Un mismo archivo funciona en landing pages, banners y mockups.",
      "Facilita composiciones sobre fondos claros, oscuros o fotograficos.",
      "Evita repetir recortes cada vez que cambias formato o canal.",
    ],
    steps: [
      {
        title: "Escoge una imagen utilizable",
        copy: "Prioriza archivos nitidos para preservar contornos en multiples tamanos.",
      },
      {
        title: "Genera la version sin fondo",
        copy: "Ejecuta el proceso de recorte hasta obtener el sujeto aislado.",
      },
      {
        title: "Guarda el PNG maestro",
        copy: "Exporta un archivo transparente que puedas reutilizar en distintas herramientas.",
      },
    ],
    useCases: [
      "Componentes visuales para sitios, newsletters y banners.",
      "Elementos graficos para Figma, Canva o presentaciones internas.",
      "Bibliotecas de assets para equipos de contenido multicanal.",
    ],
    faqs: [
      {
        q: "PNG transparente pesa mas que JPG?",
        a: "Puede ocupar mas espacio, pero conserva transparencia y evita fondos de relleno.",
      },
      {
        q: "Puedo reutilizar el mismo PNG en distintos tamanos?",
        a: "Si, y conviene guardar una version maestra para derivar variantes sin perder calidad visual.",
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
    pageTitle: "Fotos de Producto Sin Fondo | Consistencia para Catalogo y Ads",
    pageDescription:
      "Estandariza fotos de producto sin fondo para mantener catalogos coherentes y acelerar operaciones publicitarias.",
    h1: "Fotos de producto sin fondo para catalogo consistente y anuncios agiles",
    intro:
      "Para equipos de crecimiento, quitar fondo a una imagen dentro de un flujo estable mejora la consistencia del catalogo y simplifica la ejecucion de anuncios.",
    highlights: [
      "Uniforma miniaturas y paginas de producto con una presentacion coherente.",
      "Reduce tiempos operativos entre produccion creativa y trafico pago.",
      "Facilita pruebas de anuncios con variaciones sobre el mismo recorte.",
    ],
    steps: [
      {
        title: "Organiza el lote de fotos",
        copy: "Agrupa imagenes por categoria y calidad antes de iniciar el recorte.",
      },
      {
        title: "Recorta y revisa bordes clave",
        copy: "Valida transparencias en zonas complejas como reflejos o materiales finos.",
      },
      {
        title: "Publica con criterio unico",
        copy: "Aplica el mismo estilo final para catalogo, feed y campanas.",
      },
    ],
    useCases: [
      "Catalogos extensos en ecommerce con multiples familias de producto.",
      "Flujos de anuncios dinamicos para Meta, Google y marketplaces.",
      "Repositorios creativos para equipos de paid media y diseno.",
    ],
    faqs: [
      {
        q: "Que gano al mantener un solo estilo de recorte?",
        a: "Mejora la lectura visual del catalogo y reduce friccion cuando escalan nuevas campanas.",
      },
      {
        q: "Esto impacta la operacion de anuncios?",
        a: "Si, porque acelera la preparacion de creativos y mantiene consistencia entre canales.",
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
    pageTitle: "Logo Sin Fondo | Archivo Transparente para Todos tus Canales",
    pageDescription:
      "Lleva tu logo sin fondo a web, redes, documentos y campanas con un PNG transparente reutilizable.",
    h1: "Logo sin fondo para mover tu marca entre canales sin fricciones",
    intro:
      "Cuando tu identidad debe viajar entre formatos, quitar fondo a una imagen del logo evita fondos no deseados y mantiene la marca lista para cualquier canal.",
    highlights: [
      "Permite usar el logo sobre piezas digitales con fondos variables.",
      "Conserva una version portable para web, social y material comercial.",
      "Reduce ajustes manuales cada vez que cambia el formato de salida.",
    ],
    steps: [
      {
        title: "Importa el logo original",
        copy: "Usa el archivo con mayor nitidez disponible para preservar detalles.",
      },
      {
        title: "Limpia el fondo y comprueba trazos",
        copy: "Revisa letras finas, bordes curvos y zonas con sombra.",
      },
      {
        title: "Exporta un PNG de marca",
        copy: "Guarda un master transparente para reutilizarlo en todos tus canales.",
      },
    ],
    useCases: [
      "Sitios web, headers, firmas y documentos corporativos.",
      "Publicaciones sociales, video corto y anuncios de performance.",
      "Material comercial para ventas, partnerships y eventos.",
    ],
    faqs: [
      {
        q: "Sirve para logos con tipografias delgadas?",
        a: "Si, y se recomienda validar bordes al ampliar para asegurar legibilidad.",
      },
      {
        q: "Puedo usar el mismo archivo en varios fondos?",
        a: "Si, ese es el objetivo del PNG transparente: adaptar la marca sin cajas de color.",
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
