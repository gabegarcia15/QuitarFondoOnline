import Link from "next/link";
import { Button } from "@/components/ui/button";
import { buildBackgroundRemoverRedirectUrl } from "@/lib/redirect";
import type { Guide } from "@/lib/guides";

type GuidePageProps = {
  guide: Guide;
};

export function GuidePage({ guide }: GuidePageProps) {
  const backgroundRemoverUrl = buildBackgroundRemoverRedirectUrl();

  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <section className="section-shell">
        <article className="rounded-3xl border border-zinc-900/10 bg-(--bg-card) p-7 shadow-xl sm:p-10 lg:p-12">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <Link href="/" className="text-sm/6 font-medium text-zinc-700 hover:text-zinc-900">
              Volver al inicio
            </Link>
            <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">Guia practica</p>
          </header>

          <div className="mt-6">
            <h1 className="text-balance text-4xl/10 font-semibold text-zinc-900 sm:text-5xl/[1.04]">{guide.h1}</h1>
            <p className="mt-3 max-w-3xl text-base/7 text-zinc-700">{guide.intro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="/#inicio" color="orange" className="!rounded-full !px-5">
                Probar removedor gratis
              </Button>
              <Button href={backgroundRemoverUrl} outline className="!rounded-full !px-5">
                Abrir editor completo
              </Button>
            </div>
          </div>

          <section className="mt-8 rounded-2xl border border-zinc-900/10 bg-white/90 p-5">
            <h2 className="text-2xl/8 font-semibold text-zinc-900">Puntos clave</h2>
            <ul className="mt-3 grid gap-2">
              {guide.highlights.map((highlight) => (
                <li key={highlight} className="text-sm/6 text-zinc-700">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-2xl border border-zinc-900/10 bg-white/90 p-5">
            <h2 className="text-2xl/8 font-semibold text-zinc-900">Paso a paso</h2>
            <ol className="mt-3 grid gap-3">
              {guide.steps.map((step, index) => (
                <li key={step.title} className="rounded-xl border border-zinc-900/10 bg-white p-4">
                  <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">
                    Paso {index + 1}
                  </p>
                  <h3 className="mt-1 text-base/7 font-semibold text-zinc-900">{step.title}</h3>
                  <p className="mt-1 text-sm/6 text-zinc-700">{step.copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-6 rounded-2xl border border-zinc-900/10 bg-white/90 p-5">
            <h2 className="text-2xl/8 font-semibold text-zinc-900">Casos recomendados</h2>
            <ul className="mt-3 grid gap-2">
              {guide.useCases.map((useCase) => (
                <li key={useCase} className="text-sm/6 text-zinc-700">
                  {useCase}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-2xl border border-zinc-900/10 bg-white/90 p-5">
            <h2 className="text-2xl/8 font-semibold text-zinc-900">Preguntas frecuentes</h2>
            <div className="mt-3 grid gap-3">
              {guide.faqs.map((faq) => (
                <article key={faq.q} className="rounded-xl border border-zinc-900/10 bg-white p-4">
                  <h3 className="text-base/7 font-semibold text-zinc-900">{faq.q}</h3>
                  <p className="mt-1 text-sm/6 text-zinc-700">{faq.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-zinc-900/10 bg-white/90 p-5">
            <h2 className="text-2xl/8 font-semibold text-zinc-900">Guias relacionadas</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              {guide.relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.href}
                  href={relatedGuide.href}
                  className="rounded-full border border-zinc-900/15 bg-white px-4 py-2 text-sm/6 font-medium text-zinc-700 hover:border-zinc-900/25 hover:text-zinc-900"
                >
                  {relatedGuide.label}
                </Link>
              ))}
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
