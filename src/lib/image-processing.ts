import { FILE_SIZE_LIMITS, SUPPORTED_FILE_FORMATS } from "@/lib/processing-constants";
import type { ProcessingResult, UploadProgress } from "@/types/upload";

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!(SUPPORTED_FILE_FORMATS.MIME_TYPES as readonly string[]).includes(file.type)) {
    return {
      valid: false,
      error: `Formato no valido. ${SUPPORTED_FILE_FORMATS.DISPLAY_TEXT}.`,
    };
  }

  if (file.size > FILE_SIZE_LIMITS.MAX_FILE_SIZE) {
    const sizeMB = (FILE_SIZE_LIMITS.MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
    return {
      valid: false,
      error: `Archivo demasiado grande. El maximo es ${sizeMB}MB.`,
    };
  }

  return { valid: true };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export async function processImageDemo(
  file: File,
  onProgress?: (progress: UploadProgress) => void,
  captchaToken?: string,
): Promise<ProcessingResult> {
  try {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    if (!captchaToken) {
      return { success: false, error: "Debes completar el captcha." };
    }

    onProgress?.({
      loaded: Math.round(file.size * 0.15),
      total: file.size,
      percentage: 15,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("captchaToken", captchaToken);
    formData.append("originalFilename", file.name);

    const processResponse = await fetch("/api/demo-process", {
      method: "POST",
      body: formData,
    });

    onProgress?.({
      loaded: file.size,
      total: file.size,
      percentage: 100,
    });

    const processResult = (await processResponse.json()) as ProcessingResult;

    if (!processResponse.ok) {
      return {
        success: false,
        error: processResult.error || "No se pudo procesar la imagen.",
      };
    }

    if (!processResult.freeDownloadUrl) {
      return {
        success: false,
        error: "No se pudo preparar el resultado procesado.",
      };
    }

    const originalUrl = URL.createObjectURL(file);

    return {
      ...processResult,
      success: true,
      originalUrl,
      originalFilename: processResult.originalFilename ?? file.name,
    };
  } catch {
    return { success: false, error: "Ocurrio un error inesperado." };
  }
}

export function generateDownloadFilename(originalName: string, suffix = "-sin-fondo"): string {
  const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf(".")) || originalName;
  return `${nameWithoutExt}${suffix}.png`;
}

export async function downloadImage(url: string, filename: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();

  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
}
