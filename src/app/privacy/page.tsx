import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const pageTitle = "Politica de Privacidad | Eliminar Fondo De Una Imagen";
const pageDescription = "Politica de privacidad clara y simple para Eliminar Fondo De Una Imagen.";

const sections = [
  {
    title: "1. Informacion que Recopilamos",
    paragraphs: [
      "Recopilamos la informacion que proporcionas directamente, incluidas las imagenes que subes para su procesamiento.",
      "Tambien recopilamos datos tecnicos necesarios para operar y proteger el servicio, como metadatos de solicitud, datos del dispositivo o navegador y datos de verificacion antiabuso (incluidos datos relacionados con captcha).",
    ],
  },
  {
    title: "2. Como Usamos la Informacion",
    paragraphs: [
      "Usamos los datos para prestar el servicio, procesar tus imagenes, prevenir abuso, monitorear confiabilidad y mejorar el rendimiento.",
      "Podemos usar analitica operativa limitada para entender el uso del producto y mantener la calidad del servicio.",
    ],
  },
  {
    title: "3. Bases Legales",
    paragraphs: [
      "Cuando la ley lo exija, tratamos datos sobre la base de necesidad contractual, interes legitimo en operar un servicio seguro, obligaciones legales y consentimiento cuando corresponda.",
    ],
  },
  {
    title: "4. Comparticion y Encargados",
    paragraphs: [
      "Compartimos datos solo con proveedores confiables que nos ayudan a operar la plataforma, incluidos proveedores de hosting, seguridad, captcha y procesamiento con IA.",
      "No vendemos informacion personal.",
    ],
  },
  {
    title: "5. Conservacion",
    paragraphs: [
      "Conservamos datos solo durante el tiempo razonablemente necesario para prestar el servicio, seguridad, cumplimiento legal y resolucion de disputas.",
      "Pueden crearse copias temporales de procesamiento como parte del funcionamiento tecnico normal.",
    ],
  },
  {
    title: "6. Seguridad",
    paragraphs: [
      "Implementamos medidas tecnicas y organizativas disenadas para proteger los datos.",
      "Ningun sistema es perfectamente seguro, por lo que no podemos garantizar seguridad absoluta.",
    ],
  },
  {
    title: "7. Tus Derechos",
    paragraphs: [
      "Segun tu ubicacion, puedes tener derechos de acceso, rectificacion, eliminacion, portabilidad y oposicion respecto de tus datos personales.",
      "Para ejercer derechos, usa el canal de contacto publicado en este sitio web.",
    ],
  },
  {
    title: "8. Transferencias Internacionales y Cambios",
    paragraphs: [
      "Tus datos pueden tratarse en paises distintos al tuyo. Cuando corresponda, aplicamos salvaguardas adecuadas para transferencias internacionales.",
      "Podemos actualizar esta politica periodicamente. La fecha indicada arriba refleja la revision mas reciente.",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.siteUrl}/privacy`,
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <section className="section-shell">
        <article className="rounded-3xl border border-zinc-900/10 bg-(--bg-card) p-7 shadow-xl sm:p-10 lg:p-12">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="text-sm/6 font-medium text-zinc-700 hover:text-zinc-900">
              Volver al inicio
            </Link>
            <Link href="/terms" className="text-sm/6 font-medium text-zinc-700 hover:text-zinc-900">
              Terminos
            </Link>
          </header>

          <div className="mt-6">
            <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">Legal</p>
            <h1 className="mt-1 text-balance text-4xl/10 font-semibold text-zinc-900 sm:text-5xl/[1.04]">
              Politica de Privacidad
            </h1>
            <p className="mt-3 text-sm/6 text-zinc-600">Actualizado por ultima vez: 19 de febrero de 2026</p>
          </div>

          <div className="mt-8 grid gap-5">
            {sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-zinc-900/10 bg-white/90 p-5">
                <h2 className="text-xl/8 font-semibold text-zinc-900">{section.title}</h2>
                <div className="mt-2 grid gap-2">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm/6 text-zinc-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
