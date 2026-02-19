"use client";

import type React from "react";
import { Camera, CheckCircle2, Clock3, Layers2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { buildBackgroundRemoverRedirectUrl } from "@/lib/redirect";
import { DemoUploader } from "./demo-uploader";

const faqs = [
  {
    q: "Que pasa despues de mi descarga gratis?",
    a: "Puedes descargar tu resultado y, si necesitas mas calidad o flujo profesional, continuar al editor completo.",
  },
  {
    q: "Necesito crear cuenta para probar?",
    a: "No. Puedes subir y procesar tu imagen primero. La cuenta solo es necesaria cuando quieras escalar o comprar un plan.",
  },
  {
    q: "Que formatos aceptan?",
    a: "Aceptamos JPG, PNG y WEBP de hasta 10MB por archivo.",
  },
  {
    q: "Como obtengo mayor resolucion?",
    a: "Desde la vista de resultado puedes abrir la version completa para acceder a opciones avanzadas y exportaciones HD.",
  },
] as const;

export function LeadMagnetPage() {
  const backgroundRemoverUrl = buildBackgroundRemoverRedirectUrl();

  return (
    <main className="min-h-dvh py-6 sm:py-8 lg:py-10">
      <header className="section-shell rounded-2xl border border-zinc-900/15 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <a href="#inicio" className="inline-flex items-center gap-2 text-base/6 font-semibold text-zinc-900">
            <Camera className="size-4 text-[var(--brand)]" />
            {siteConfig.name}
          </a>
          <nav className="flex flex-wrap items-center gap-2">
            <a href="#como-funciona" className="rounded-full px-3 py-1 text-sm/6 text-zinc-600 hover:bg-zinc-900/5">
              Como funciona
            </a>
            <a href="#beneficios" className="rounded-full px-3 py-1 text-sm/6 text-zinc-600 hover:bg-zinc-900/5">
              Beneficios
            </a>
            <a href="#faq" className="rounded-full px-3 py-1 text-sm/6 text-zinc-600 hover:bg-zinc-900/5">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <section id="inicio" className="section-shell mt-6 sm:mt-8">
        <article className="rounded-3xl border border-zinc-900/10 bg-(--bg-card) p-7 shadow-xl sm:p-10 lg:p-12">
          <div className="grid gap-3 text-center sm:gap-4">
            <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">
              Removedor de fondo online
            </p>
            <h1 className="text-balance font-semibold text-4xl/10 text-zinc-900 sm:text-6xl/[1.02]">
              Eliminar Fondo De Una Imagen
            </h1>
          </div>
          <DemoUploader className="mt-7 sm:mt-9" />
        </article>
      </section>

      <section id="como-funciona" className="section-shell mt-[4.5rem] rounded-3xl border border-zinc-900/10 bg-white/85 p-6 shadow-sm sm:mt-[5.5rem] sm:p-8 lg:mt-[6.5rem]">
        <h2 className="text-2xl/8 font-semibold text-zinc-900">Tu flujo en 3 pasos</h2>
        <ol className="mt-4 grid gap-3">
          <StepItem number="01" title="Sube la imagen" copy="Arrastra o selecciona JPG, PNG o WEBP." />
          <StepItem number="02" title="Procesamos el fondo" copy="Nuestro modelo de IA recorta tu sujeto automaticamente." />
          <StepItem
            number="03"
            title="Descarga y continua"
            copy="Guarda tu resultado o abre el editor completo cuando necesites mas opciones."
          />
        </ol>
      </section>

      <section id="beneficios" className="section-shell mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard
          icon={<Layers2 className="size-5 text-[var(--brand)]" />}
          title="Ideal para ecommerce"
          copy="Acelera fotos de producto, catalogos y creativos para marketplaces."
        />
        <FeatureCard
          icon={<Clock3 className="size-5 text-[var(--brand)]" />}
          title="Menos tiempo de edicion"
          copy="Recibe recortes en segundos y reduce pasos manuales en tu equipo."
        />
        <FeatureCard
          icon={<ShieldCheck className="size-5 text-[var(--brand)]" />}
          title="Flujo seguro"
          copy="Subidas firmadas, captcha y procesamiento controlado en servidor."
        />
        <FeatureCard
          icon={<CheckCircle2 className="size-5 text-[var(--brand)]" />}
          title="Escala cuando quieras"
          copy="Si necesitas mas control y calidad, puedes continuar al flujo completo."
        />
      </section>

      <section id="faq" className="section-shell mt-8 rounded-3xl border border-zinc-900/10 bg-white/85 p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-3xl/9 font-semibold text-zinc-900">Preguntas frecuentes</h2>
        <div className="mt-5 grid gap-3">
          {faqs.map((faq) => (
            <article key={faq.q} className="rounded-xl border border-zinc-900/10 bg-white p-4">
              <h3 className="text-base/7 font-semibold text-zinc-900">{faq.q}</h3>
              <p className="mt-1 text-sm/6 text-zinc-600">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell mt-8 rounded-3xl border border-[var(--brand)]/25 bg-linear-to-r from-[var(--brand)]/16 to-amber-300/20 p-6 shadow-sm sm:mt-10 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">Siguiente paso</p>
            <h2 className="text-balance text-3xl/9 font-semibold text-zinc-900 sm:text-4xl/10">
              Lleva tus resultados a nivel comercial en Background Remover.
            </h2>
            <p className="mt-2 text-base/7 text-zinc-700">
              Continua en la version completa para exportaciones HD, lotes y flujo profesional.
            </p>
          </div>
          <Button href={backgroundRemoverUrl} color="orange" className="!rounded-full !px-5">
            Abrir editor completo
          </Button>
        </div>
      </section>

      <footer className="section-shell mt-10 border-t border-zinc-900/10 pt-6 text-sm/6 text-zinc-600">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <p>Procesamiento rapido de fondos para imagenes.</p>
        </div>
      </footer>
    </main>
  );
}

type StepItemProps = {
  number: string;
  title: string;
  copy: string;
};

function StepItem({ number, title, copy }: StepItemProps) {
  return (
    <li className="rounded-xl border border-zinc-900/10 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-zinc-900 text-sm/5 font-semibold text-white">
          {number}
        </span>
        <div>
          <p className="text-base/7 font-semibold text-zinc-900">{title}</p>
          <p className="text-sm/6 text-zinc-600">{copy}</p>
        </div>
      </div>
    </li>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  copy: string;
};

function FeatureCard({ icon, title, copy }: FeatureCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-900/10 bg-white/90 p-5 shadow-sm">
      <div className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--brand)]/12">
        {icon}
      </div>
      <h3 className="mt-3 text-lg/7 font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm/6 text-zinc-600">{copy}</p>
    </article>
  );
}
