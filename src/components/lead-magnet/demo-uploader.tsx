"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { AlertCircle, CheckCircle2, Download, Loader2, RefreshCw, Upload } from "lucide-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { formatFileSize, processImageDemo, validateImageFile } from "@/lib/image-processing";
import type { ProcessingResult, UploadProgress } from "@/types/upload";
import { DownloadModal } from "./download-modal";

type DemoUploaderProps = {
  className?: string;
};

const PRELOAD_TIMEOUT_MS = 2500;

const preloadImage = (url: string, timeoutMs: number = PRELOAD_TIMEOUT_MS) =>
  new Promise<void>((resolve) => {
    const image = new window.Image();
    let resolved = false;

    const cleanup = () => {
      if (resolved) return;
      resolved = true;
      window.clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    const timer = window.setTimeout(cleanup, timeoutMs);
    image.onload = cleanup;
    image.onerror = cleanup;
    image.src = url;
  });

const revokeObjectUrlIfNeeded = (url?: string) => {
  if (!url?.startsWith("blob:")) return;
  window.URL.revokeObjectURL(url);
};

function DemoUploaderComponent({ className }: DemoUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [processingPhase, setProcessingPhase] = useState<"captcha" | "uploading" | "processing" | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [shouldLoadCaptcha, setShouldLoadCaptcha] = useState(false);
  const [captchaRequested, setCaptchaRequested] = useState(false);
  const [isCaptchaReady, setIsCaptchaReady] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const hCaptchaRef = useRef<HCaptcha>(null);

  const hCaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  const processFile = useCallback(async (file: File, token: string) => {
    setProcessingPhase("uploading");
    setIsProcessing(true);

    try {
      const processingResult = await processImageDemo(
        file,
        (progress) => {
          setUploadProgress(progress);
          if (progress.percentage === 100) {
            setProcessingPhase("processing");
          }
        },
        token,
      );

      if (processingResult.success) {
        if (!processingResult.originalUrl || !processingResult.freeDownloadUrl) {
          setError("No pudimos preparar las vistas previas. Intenta otra vez.");
          return;
        }

        setResult(processingResult);
        await Promise.all([
          preloadImage(processingResult.originalUrl),
          preloadImage(processingResult.freeDownloadUrl),
        ]);
        setShowDownloadModal(true);
        trackEvent("upload_completed", { fileType: file.type });
      } else {
        setError(processingResult.error || "No se pudo procesar la imagen.");
      }
    } catch {
      setError("Ocurrio un error inesperado durante el proceso.");
    } finally {
      setIsProcessing(false);
      setUploadProgress(null);
      setProcessingPhase(null);
    }
  }, []);

  useEffect(() => {
    if (!captchaRequested || !isCaptchaReady) return;
    hCaptchaRef.current?.execute();
    setCaptchaRequested(false);
  }, [captchaRequested, isCaptchaReady]);

  const requestCaptchaExecution = useCallback(() => {
    setShouldLoadCaptcha(true);
    setCaptchaRequested(true);
  }, []);

  const handleFileSelect = useCallback(
    (file: File) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || "Archivo invalido.");
        return;
      }

      revokeObjectUrlIfNeeded(result?.originalUrl);
      setError(null);
      setResult(null);
      setUploadProgress(null);
      setSelectedFile(file);
      setShowCaptcha(false);
      setProcessingPhase("captcha");
      trackEvent("upload_started", {
        fileType: file.type,
        fileSize: file.size,
      });
      requestCaptchaExecution();
    },
    [requestCaptchaExecution, result?.originalUrl],
  );

  const handleCaptchaVerify = useCallback(
    (token: string) => {
      setShowCaptcha(false);
      if (selectedFile) {
        void processFile(selectedFile, token);
      }
    },
    [processFile, selectedFile],
  );

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragOver(false);
      const files = Array.from(event.dataTransfer.files);
      if (files[0]) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files?.[0]) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const openFilePicker = useCallback((source: "dropzone" | "inline_button" | "sticky_mobile") => {
    setShouldLoadCaptcha(true);
    trackEvent("hero_upload_entry_clicked", { source });
    fileInputRef.current?.click();
  }, []);

  const handleTryAgain = useCallback(() => {
    revokeObjectUrlIfNeeded(result?.originalUrl);
    setError(null);
    setResult(null);
    setShowDownloadModal(false);
    setProcessingPhase(null);
    setSelectedFile(null);
    setShowCaptcha(false);
    setCaptchaRequested(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [result?.originalUrl]);

  useEffect(() => {
    return () => {
      revokeObjectUrlIfNeeded(result?.originalUrl);
    };
  }, [result?.originalUrl]);

  if (!hCaptchaSiteKey) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-800">
        Falta configurar hCaptcha en las variables de entorno.
      </div>
    );
  }

  return (
    <>
      <div className={className}>
        <div
          className={[
            "card-noise relative overflow-hidden rounded-2xl border-2 border-dashed p-6 sm:p-8",
            "min-h-[24rem] cursor-pointer bg-(--bg-card) shadow-xl transition",
            isDragOver
              ? "border-[var(--brand)] bg-[var(--brand)]/5"
              : "border-zinc-900/20 hover:border-[var(--brand)]/55 hover:bg-white",
            isProcessing ? "pointer-events-none opacity-80" : "",
          ].join(" ")}
          role="button"
          tabIndex={isProcessing ? -1 : 0}
          aria-label="Subir imagen para eliminar fondo"
          onClick={() => openFilePicker("dropzone")}
          onKeyDown={(event) => {
            if (isProcessing) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openFilePicker("dropzone");
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleInputChange}
          />

          {showCaptcha ? (
            <div className="grid min-h-[19rem] place-items-center gap-4 text-center">
              <div className="grid gap-2">
                <Badge color="orange">Verificacion</Badge>
                <p className="text-2xl/8 font-semibold text-zinc-900">Confirma que eres humano</p>
                <p className="text-sm/6 text-zinc-600">
                  Abre el reto de seguridad para procesar tu imagen.
                </p>
              </div>
              <div id="hcaptcha-challenge-area" className="mx-auto" />
            </div>
          ) : isProcessing ? (
            <div className="grid min-h-[19rem] place-items-center gap-4 text-center">
              <div className="relative">
                <Loader2 className="size-12 animate-spin text-[var(--brand)]" />
                <Upload className="absolute inset-0 m-auto size-5 text-[var(--brand-deep)]" />
              </div>
              <div className="grid gap-1">
                <p className="text-xl/7 font-semibold text-zinc-900">
                  {processingPhase === "uploading" ? "Subiendo tu imagen..." : "Eliminando fondo..."}
                </p>
                <p className="text-sm/6 text-zinc-600">
                  {processingPhase === "uploading"
                    ? "Preparando la magia"
                    : "Optimizando para descarga gratis"}
                </p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
                  {processingPhase === "uploading" ? (
                    <div
                      className="h-full bg-[var(--brand)] transition-all duration-300"
                      style={{ width: `${uploadProgress?.percentage ?? 18}%` }}
                    />
                  ) : (
                    <div className="relative h-full bg-[var(--brand)]/25">
                      <div className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-[var(--brand)] to-transparent" />
                    </div>
                  )}
                </div>
                <p className="mt-2 text-xs/5 text-zinc-500">
                  {processingPhase === "uploading"
                    ? `${uploadProgress?.percentage ?? 0}% completado`
                    : "Procesamiento en curso"}
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="grid min-h-[19rem] place-items-center gap-4 text-center">
              <AlertCircle className="size-11 text-red-600" />
              <div className="grid gap-1">
                <p className="text-lg/7 font-semibold text-red-700">No se pudo procesar</p>
                <p className="max-w-sm text-sm/6 text-zinc-600">{error}</p>
              </div>
              <Button outline onClick={(event) => {
                event.stopPropagation();
                handleTryAgain();
              }}>
                <RefreshCw data-slot="icon" />
                Intentar otra vez
              </Button>
            </div>
          ) : result ? (
            <div className="grid min-h-[19rem] place-items-center gap-4 text-center">
              <CheckCircle2 className="size-12 text-emerald-600" />
              <div className="grid gap-1">
                <p className="text-2xl/8 font-semibold text-zinc-900">Listo, fondo eliminado</p>
                <p className="text-sm/6 text-zinc-600">Tu imagen esta lista para descargar.</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  color="orange"
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowDownloadModal(true);
                  }}
                >
                  <Download data-slot="icon" />
                  Ver resultado
                </Button>
                <Button
                  plain
                  onClick={(event) => {
                    event.stopPropagation();
                    handleTryAgain();
                  }}
                >
                  <RefreshCw data-slot="icon" />
                  Probar otra imagen
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid min-h-[19rem] place-items-center gap-4 text-center">
              <div className="grid gap-2">
                <p className="text-3xl/9 font-semibold text-zinc-900 sm:text-4xl/10">Sube tu imagen</p>
                <p className="mx-auto max-w-xl text-base/7 text-zinc-600">Arrastra y suelta o toca para elegir archivo.</p>
              </div>
              <Button color="orange" onClick={(event) => {
                event.stopPropagation();
                openFilePicker("inline_button");
              }}>
                <Upload data-slot="icon" />
                Elegir imagen
              </Button>
              <p className="text-xs/5 text-zinc-500">
                JPG, PNG y WEBP hasta {formatFileSize(10 * 1024 * 1024)}.
              </p>
            </div>
          )}
        </div>
      </div>

      {shouldLoadCaptcha ? (
        <div className={showCaptcha ? "flex justify-center" : "hidden"}>
          <HCaptcha
            ref={hCaptchaRef}
            sitekey={hCaptchaSiteKey}
            size="invisible"
            loadAsync
            onReady={() => setIsCaptchaReady(true)}
            onOpen={() => setShowCaptcha(true)}
            onClose={() => setShowCaptcha(false)}
            onVerify={handleCaptchaVerify}
          />
        </div>
      ) : null}

      {!isProcessing && !showCaptcha && !showDownloadModal && !result ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
          <Button
            color="orange"
            className="pointer-events-auto w-full justify-center !rounded-full shadow-lg"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker("sticky_mobile");
            }}
          >
            <Upload data-slot="icon" />
            Subir imagen
          </Button>
        </div>
      ) : null}

      {result ? (
        <DownloadModal
          isOpen={showDownloadModal}
          onClose={() => setShowDownloadModal(false)}
          result={result}
        />
      ) : null}
    </>
  );
}

export const DemoUploader = memo(DemoUploaderComponent);
