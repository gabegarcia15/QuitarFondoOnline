"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Download, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";
import { downloadImage, generateDownloadFilename } from "@/lib/image-processing";
import { buildPricingRedirectUrl } from "@/lib/redirect";
import type { ProcessingResult } from "@/types/upload";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: ProcessingResult;
};

export function DownloadModal({ isOpen, onClose, result }: DownloadModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const pricingUrl = useMemo(() => buildPricingRedirectUrl(), []);

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
    trackEvent("redirect_to_pricing_clicked", {
      destination: pricingUrl,
      campaign: siteConfig.campaignId,
    });
    window.location.href = pricingUrl;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="5xl">
      <DialogTitle className="flex items-center gap-2 text-balance text-xl/7 sm:text-2xl/8">
        <Sparkles className="size-5 text-[var(--brand)]" />
        Fondo eliminado con exito
      </DialogTitle>
      <DialogDescription className="text-sm/6 text-zinc-600 dark:text-zinc-300">
        Descarga tu resultado o abre la version completa para opciones avanzadas.
      </DialogDescription>

      <DialogBody>
        <div className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-zinc-900/10 bg-(--bg-card) p-3 shadow-sm">
            <p className="mb-2 text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Antes</p>
            <div className="overflow-hidden rounded-lg border border-zinc-900/10 bg-white">
              <img src={result.originalUrl} alt="Imagen original" className="h-72 w-full object-cover" />
            </div>
          </article>

          <article className="rounded-xl border border-zinc-900/10 bg-(--bg-card) p-3 shadow-sm">
            <p className="mb-2 text-xs/5 font-semibold uppercase tracking-wide text-zinc-500">Despues</p>
            <div className="bg-checkered overflow-hidden rounded-lg border border-zinc-900/10">
                <img
                src={freeDownloadUrl}
                alt="Imagen sin fondo"
                className="h-72 w-full object-cover"
              />
            </div>
          </article>
        </div>

        <section className="mt-4 rounded-xl border border-[var(--brand)]/35 bg-[var(--brand)]/6 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge color="orange">Version completa</Badge>
            <p className="text-sm/6 text-zinc-800">
              Si necesitas mas resolucion y controles profesionales, continua en Background Remover.
            </p>
          </div>
          <ul className="mt-3 grid gap-2 text-sm/6 text-zinc-700">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-emerald-600" />
              Descargas de mayor resolucion y licencia comercial.
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 size-4 text-emerald-600" />
              Procesamiento prioritario y mas volumen para equipos.
            </li>
          </ul>
        </section>
      </DialogBody>

      <DialogActions>
        <Button outline onClick={handleFreeDownload} disabled={isDownloading}>
          <Download data-slot="icon" />
          {isDownloading ? "Descargando..." : "Descargar gratis"}
        </Button>
        <Button color="orange" onClick={handleGoToPremium}>
          Abrir version completa
          <ArrowRight data-slot="icon" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}
