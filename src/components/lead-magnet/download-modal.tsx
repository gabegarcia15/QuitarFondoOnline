"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Download, X } from "lucide-react";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { downloadImage, generateDownloadFilename } from "@/lib/image-processing";
import { buildBackgroundRemoverRedirectUrl } from "@/lib/redirect";
import type { ProcessingResult } from "@/types/upload";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: ProcessingResult;
};

export function DownloadModal({ isOpen, onClose, result }: DownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const backgroundRemoverUrl = useMemo(() => buildBackgroundRemoverRedirectUrl(), []);

  useEffect(() => {
    if (!isOpen) return;
    trackEvent("coupon_shown", {
      campaign: siteConfig.campaignId,
      couponLabel: siteConfig.couponLabel,
    });
  }, [isOpen]);

  if (!result.originalUrl || !result.freeDownloadUrl) {
    return null;
  }

  const freeDownloadUrl = result.freeDownloadUrl;

  const handleFreeDownload = async () => {
    setIsDownloading(true);
    try {
      const filename = result.originalFilename
        ? generateDownloadFilename(result.originalFilename)
        : "imagen-sin-fondo.png";
      await downloadImage(freeDownloadUrl, filename);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleGoToPremium = () => {
    trackEvent("coupon_applied_attempted", {
      campaign: siteConfig.campaignId,
    });
    trackEvent("redirect_to_background_remover_clicked", {
      destination: backgroundRemoverUrl,
      campaign: siteConfig.campaignId,
    });
    window.location.href = backgroundRemoverUrl;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="5xl">
      <div className="relative pr-12">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute right-0 top-0 inline-flex size-8 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white dark:focus-visible:ring-orange-400 dark:focus-visible:ring-offset-zinc-900"
        >
          <X aria-hidden className="size-4.5" />
        </button>
        <DialogTitle className="flex items-center gap-2 text-balance text-xl/7 sm:text-2xl/8">
          <span aria-hidden className="text-xl leading-none sm:text-2xl">
            🎉
          </span>
          Fondo eliminado con exito
        </DialogTitle>
        <DialogDescription className="text-sm/6 text-zinc-600 dark:text-zinc-300">
          Descarga tu resultado gratis o continua en Background Remover para opciones avanzadas.
        </DialogDescription>
      </div>

      <DialogBody className="mt-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-900/10 bg-(--bg-card) p-2.5 shadow-sm">
            <p className="mb-2 text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Antes</p>
            <div className="grid place-items-center overflow-hidden rounded-lg border border-zinc-900/10 bg-white p-1">
              <img
                src={result.originalUrl}
                alt="Imagen original"
                className="block h-auto max-h-[28dvh] w-auto max-w-full sm:max-h-[30dvh] lg:max-h-[32dvh]"
              />
            </div>
          </article>

          <article className="rounded-xl border border-zinc-900/10 bg-(--bg-card) p-2.5 shadow-sm">
            <p className="mb-2 text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Despues</p>
            <div className="bg-checkered grid place-items-center overflow-hidden rounded-lg border border-zinc-900/10 p-1">
              <img
                src={freeDownloadUrl}
                alt="Imagen sin fondo"
                className="block h-auto max-h-[28dvh] w-auto max-w-full sm:max-h-[30dvh] lg:max-h-[32dvh]"
              />
            </div>
          </article>
        </div>

        <section className="mt-3 overflow-hidden rounded-xl border border-zinc-900/10 bg-linear-to-b from-white to-zinc-50 shadow-sm">
          <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2 border-b border-zinc-900/10 px-3 py-2.5 sm:px-4">
            <div>
              <p className="text-base/6 font-semibold text-zinc-900">Gratis</p>
              <p className="text-xs/5 text-zinc-500">Hasta 500px</p>
            </div>
            <p className="pb-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-zinc-400">Comparacion</p>
            <div className="justify-self-end text-right">
              <div className="flex items-center justify-end gap-2">
                <p className="text-base/6 font-semibold text-zinc-900">Background Remover</p>
                <Badge color="orange">Recomendado</Badge>
              </div>
              <p className="text-xs/5 text-zinc-500">Alta resolucion y comercial</p>
            </div>
          </div>

          <div className="divide-y divide-zinc-900/10 px-3 sm:px-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2.5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200 px-2 py-1 text-xs/5 font-medium text-zinc-700">
                  <X className="size-3.5 text-zinc-500" />
                  Sin HD
                </span>
              </div>
              <p className="text-center text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Resolucion alta</p>
              <div className="justify-self-end">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-xs/5 font-medium text-emerald-800">
                  <Check className="size-3.5 text-emerald-600" />
                  Incluida
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2.5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200 px-2 py-1 text-xs/5 font-medium text-zinc-700">
                  <X className="size-3.5 text-zinc-500" />
                  Estandar
                </span>
              </div>
              <p className="text-center text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Velocidad</p>
              <div className="justify-self-end">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-xs/5 font-medium text-emerald-800">
                  <Check className="size-3.5 text-emerald-600" />
                  Prioritaria
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-2.5">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-200 px-2 py-1 text-xs/5 font-medium text-zinc-700">
                  <X className="size-3.5 text-zinc-500" />
                  No incluida
                </span>
              </div>
              <p className="text-center text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Licencia comercial</p>
              <div className="justify-self-end">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-xs/5 font-medium text-emerald-800">
                  <Check className="size-3.5 text-emerald-600" />
                  Incluida
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-2 border-t border-zinc-900/10 p-3 sm:grid-cols-2 sm:p-4">
            <Button color="white" className="w-full justify-center" onClick={handleFreeDownload} disabled={isDownloading}>
              <Download data-slot="icon" />
              {isDownloading ? "Descargando..." : "Descargar baja resolucion"}
            </Button>
            <Button color="orange" className="w-full justify-center" onClick={handleGoToPremium}>
              Probar Background Remover
              <ArrowRight data-slot="icon" />
            </Button>
          </div>
        </section>
      </DialogBody>
    </Dialog>
  );
}
