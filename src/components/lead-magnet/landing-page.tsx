"use client";

import type React from "react";
import Link from "next/link";
import { CheckCircle2, Clock3, Layers2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildBackgroundRemoverRedirectUrl } from "@/lib/redirect";
import { DemoUploader } from "./demo-uploader";

const faqs = [
  {
    q: "Que sucede despues de la descarga inicial?",
    a: "Tu archivo queda listo para bajar de inmediato y, si quieres mas precision o funciones pro, puedes abrir el editor completo.",
  },
  {
    q: "Puedo probar sin registrarme?",
    a: "Si. Primero subes y procesas la foto. Solo pedimos cuenta cuando necesitas trabajar a escala o activar un plan.",
  },
  {
    q: "Que archivos puedo subir?",
    a: "La prueba acepta JPG, PNG y WEBP con un maximo de 10 MB por imagen.",
  },
  {
    q: "Como consigo una salida en mayor calidad?",
    a: "Tras ver el resultado puedes pasar al flujo completo para usar exportaciones HD y ajustes adicionales.",
  },
] as const;

const sampleComparison = {
  beforeSrc: "/9ff8b609-8ddc-4ca2-a16c-59b80e3f52a3.jpeg",
  afterSrc: "/pexels-pixabay-54097-sin-fondo.png",
  pexelsPhotoUrl: "https://www.pexels.com/photo/spain-flag-in-pole-54097/",
  photographerName: "Pixabay",
} as const;

export function LeadMagnetPage() {
  const backgroundRemoverUrl = buildBackgroundRemoverRedirectUrl();

  return (
    <main className="py-1 sm:py-2">
      <section id="inicio" className="section-shell">
        <article className="rounded-3xl border border-zinc-900/10 bg-(--bg-card) p-7 shadow-xl sm:p-10 lg:p-12">
          <div className="grid gap-3 text-center sm:gap-4">
            <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">
              Removedor de fondo online
            </p>
            <h1 className="text-balance font-semibold text-4xl/10 text-zinc-900 sm:text-6xl/[1.02]">
              Quitar Fondo Online
            </h1>
          </div>
          <DemoUploader className="mt-7 sm:mt-9" />
        </article>
      </section>

      <section
        id="ejemplo-real"
        className="section-shell mt-8 rounded-3xl border border-zinc-900/10 bg-white/85 p-6 shadow-sm sm:mt-10 sm:p-8"
      >
        <div className="grid gap-2">
          <p className="text-sm/6 font-semibold uppercase tracking-wide text-[var(--brand-deep)]">Ejemplo real</p>
          <h2 className="text-balance text-2xl/8 font-semibold text-zinc-900 sm:text-3xl/9">
            Antes y despues con una imagen real
          </h2>
          <p className="max-w-3xl text-sm/6 text-zinc-600">
            Mostramos un ejemplo real procesado con nuestro removedor de fondo para que veas el cambio en segundos.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-900/10 bg-(--bg-card) p-2.5 shadow-sm">
            <p className="mb-2 text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Antes</p>
            <div className="overflow-hidden rounded-lg border border-zinc-900/10 bg-white">
              <img
                src={sampleComparison.beforeSrc}
                alt="Imagen original antes de eliminar fondo"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </article>

          <article className="rounded-xl border border-zinc-900/10 bg-(--bg-card) p-2.5 shadow-sm">
            <p className="mb-2 text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Despues</p>
            <div className="bg-checkered overflow-hidden rounded-lg border border-zinc-900/10 p-2">
              <img
                src={sampleComparison.afterSrc}
                alt="Imagen con fondo eliminado"
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </article>
        </div>

        <p className="mt-3 text-xs/5 text-zinc-500">
          Foto fuente por{" "}
          <a
            href={sampleComparison.pexelsPhotoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-zinc-700 underline decoration-zinc-400 underline-offset-2 hover:text-zinc-900"
          >
            {sampleComparison.photographerName} en Pexels
          </a>
          .
        </p>
      </section>

      <section id="como-funciona" className="section-shell mt-[4.5rem] rounded-3xl border border-zinc-900/10 bg-white/85 p-6 shadow-sm sm:mt-[5.5rem] sm:p-8 lg:mt-[6.5rem]">
        <h2 className="text-2xl/8 font-semibold text-zinc-900">Tu flujo en 3 pasos</h2>
        <ol className="mt-4 grid gap-3">
          <StepItem number="01" title="Carga tu foto" copy="Importa un archivo JPG, PNG o WEBP desde tu dispositivo." />
          <StepItem number="02" title="La IA separa el sujeto" copy="El sistema detecta el elemento principal y retira el fondo automaticamente." />
          <StepItem
            number="03"
            title="Descarga o edita mas"
            copy="Baja la imagen recortada o continua en el editor avanzado si necesitas control extra."
          />
        </ol>
      </section>

      <section id="beneficios" className="section-shell mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4">
        <FeatureCard
          icon={<Layers2 className="size-5 text-[var(--brand)]" />}
          title="Pensado para catalogos ecommerce"
          copy="Prepara imagenes de producto y creativos con una presentacion limpia para venta online."
        />
        <FeatureCard
          icon={<Clock3 className="size-5 text-[var(--brand)]" />}
          title="Operacion mas agil"
          copy="Automatiza el recorte y reduce el tiempo dedicado a edicion repetitiva."
        />
        <FeatureCard
          icon={<ShieldCheck className="size-5 text-[var(--brand)]" />}
          title="Procesamiento protegido"
          copy="Combinamos subidas firmadas, captcha y ejecucion en servidor para un flujo controlado."
        />
        <FeatureCard
          icon={<CheckCircle2 className="size-5 text-[var(--brand)]" />}
          title="Crece sin cambiar de herramienta"
          copy="Cuando el proyecto exige mas calidad, pasas al entorno completo sin rehacer trabajo."
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

      <section className="section-shell mt-8 rounded-3xl border border-zinc-900/10 bg-white/85 p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl/8 font-semibold text-zinc-900">Guias de Quitar Fondo a una Imagen</h2>
        <p className="mt-2 max-w-3xl text-sm/6 text-zinc-600">
          Elige la ruta que necesitas: limpiar fondo blanco, exportar PNG transparente, preparar catalogos de producto o dejar tu logo listo para publicar.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/quitar-fondo-blanco"
            className="rounded-full border border-zinc-900/15 bg-white px-4 py-2 text-sm/6 font-medium text-zinc-700 hover:border-zinc-900/25 hover:text-zinc-900"
          >
            Quitar fondo blanco
          </Link>
          <Link
            href="/fondo-transparente-png"
            className="rounded-full border border-zinc-900/15 bg-white px-4 py-2 text-sm/6 font-medium text-zinc-700 hover:border-zinc-900/25 hover:text-zinc-900"
          >
            Fondo transparente PNG
          </Link>
          <Link
            href="/fotos-de-producto-sin-fondo"
            className="rounded-full border border-zinc-900/15 bg-white px-4 py-2 text-sm/6 font-medium text-zinc-700 hover:border-zinc-900/25 hover:text-zinc-900"
          >
            Fotos de producto sin fondo
          </Link>
          <Link
            href="/logo-sin-fondo"
            className="rounded-full border border-zinc-900/15 bg-white px-4 py-2 text-sm/6 font-medium text-zinc-700 hover:border-zinc-900/25 hover:text-zinc-900"
          >
            Logo sin fondo
          </Link>
        </div>
      </section>
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
