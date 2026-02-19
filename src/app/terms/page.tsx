import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const pageTitle = "Terminos de Servicio | Eliminar Fondo De Una Imagen";
const pageDescription = "Terminos claros y simples para usar Eliminar Fondo De Una Imagen.";

const sections = [
  {
    title: "1. Aceptacion",
    paragraphs: [
      "Al acceder o usar este servicio, aceptas estos Terminos. Si no estas de acuerdo, no debes usar el servicio.",
      "Si usas el servicio para una empresa o cliente, declaras que tienes autoridad para obligar legalmente a esa parte.",
    ],
  },
  {
    title: "2. Alcance del Servicio",
    paragraphs: [
      "Este servicio ofrece eliminacion automatica de fondo y funciones relacionadas de procesamiento de imagen.",
      "Podemos mejorar, cambiar, limitar o descontinuar funciones en cualquier momento para proteger la confiabilidad, la seguridad o el cumplimiento legal.",
    ],
  },
  {
    title: "3. Tu Contenido",
    paragraphs: [
      "Mantienes la titularidad de las imagenes y de cualquier otro contenido que subas.",
      "Nos otorgas una licencia limitada y no exclusiva para procesar tu contenido solo con el fin de operar, proteger y mejorar el servicio.",
    ],
  },
  {
    title: "4. Uso Permitido",
    paragraphs: [
      "Debes usar el servicio de forma legal y respetar derechos de terceros, incluidos derechos de propiedad intelectual y privacidad.",
      "No debes subir codigo malicioso, intentar accesos no autorizados, afectar la integridad del servicio ni usarlo para actividades abusivas o fraudulentas.",
    ],
  },
  {
    title: "5. Servicios de Terceros",
    paragraphs: [
      "El servicio depende de infraestructura y proveedores de IA de terceros confiables. Su disponibilidad y sus politicas pueden afectar el rendimiento del servicio.",
      "Cuando corresponda, el uso de funcionalidades de terceros tambien estara sujeto a sus propios terminos.",
    ],
  },
  {
    title: "6. Exenciones y Responsabilidad",
    paragraphs: [
      "El servicio se ofrece en estado \"tal cual\" y \"segun disponibilidad\". No garantizamos continuidad ininterrumpida ni resultados sin errores.",
      "En la maxima medida permitida por la ley, no seremos responsables por danos indirectos, incidentales, especiales, consecuenciales o punitivos, ni por perdida de datos, ingresos o negocio.",
    ],
  },
  {
    title: "7. Suspension, Cambios y Ley Aplicable",
    paragraphs: [
      "Podemos suspender el acceso por motivos de seguridad, legales o de uso indebido.",
      "Podemos actualizar estos Terminos periodicamente. El uso continuo despues de una actualizacion implica aceptacion de la version vigente.",
      "Estos Terminos se rigen por la ley aplicable en la jurisdiccion donde este establecido el operador del servicio, salvo que una norma imperativa disponga lo contrario.",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${siteConfig.siteUrl}/terms`,
    locale: "es_ES",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <section className="section-shell">
        <article className="rounded-3xl border border-zinc-900/10 bg-(--bg-card) p-7 shadow-xl sm:p-10 lg:p-12">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="text-sm/6 font-medium text-zinc-700 hover:text-zinc-900">
              Volver al inicio
            </Link>
            <Link href="/privacy" className="text-sm/6 font-medium text-zinc-700 hover:text-zinc-900">
              Privacidad
            </Link>
          </header>

          <div className="mt-6">
            <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">Legal</p>
            <h1 className="mt-1 text-balance text-4xl/10 font-semibold text-zinc-900 sm:text-5xl/[1.04]">
              Terminos de Servicio
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
