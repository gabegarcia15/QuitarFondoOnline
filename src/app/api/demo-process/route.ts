import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import sharp from "sharp";
import { z } from "zod";
import { FILE_SIZE_LIMITS, FREE_DOWNLOAD_SPECS, SUPPORTED_FILE_FORMATS } from "@/lib/processing-constants";

export const runtime = "nodejs";

const allowedMimeTypes = new Set<string>(SUPPORTED_FILE_FORMATS.MIME_TYPES);

const formSchema = z.object({
  captchaToken: z.string().min(1),
  originalFilename: z.string().min(1).optional(),
});

function getEnv() {
  const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;
  const replicateToken = process.env.REPLICATE_API_TOKEN;
  const replicateModel =
    process.env.REPLICATE_MODEL ??
    "851-labs/background-remover:a029dff38972b5fda4ec5d75d7d1cd25aeff621d2cf4946a41055d7db66b80bc";

  if (!hcaptchaSecret || !replicateToken) {
    throw new Error("Faltan variables de entorno para procesar la demo.");
  }

  return { hcaptchaSecret, replicateToken, replicateModel };
}

async function verifyCaptcha(token: string, secret: string): Promise<boolean> {
  const captchaResponse = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
    }).toString(),
  });

  if (!captchaResponse.ok) return false;

  const captchaResult = (await captchaResponse.json()) as { success?: boolean };
  return Boolean(captchaResult.success);
}

function pickOutputUrl(output: unknown): string {
  if (typeof output === "string") return output;
  if (Array.isArray(output) && typeof output[0] === "string") return output[0];
  if (
    output &&
    typeof output === "object" &&
    "output" in output &&
    Array.isArray((output as { output?: unknown[] }).output)
  ) {
    const first = (output as { output?: unknown[] }).output?.[0];
    if (typeof first === "string") return first;
  }
  return "";
}

async function optimizeForProcessing(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
      .rotate()
      .resize(1024, 1024, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 95, mozjpeg: true })
      .toBuffer();
  } catch {
    return buffer;
  }
}

function toDataUrl(buffer: Buffer, mimeType: string): string {
  return `data:${mimeType};base64,${buffer.toString("base64")}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fileValue = formData.get("file");
    const captchaTokenValue = formData.get("captchaToken");
    const originalFilenameValue = formData.get("originalFilename");
    const parsed = formSchema.safeParse({
      captchaToken: captchaTokenValue,
      originalFilename: typeof originalFilenameValue === "string" ? originalFilenameValue : undefined,
    });

    if (!(fileValue instanceof File) || !parsed.success) {
      return NextResponse.json(
        { error: "Solicitud invalida para procesamiento." },
        { status: 400 },
      );
    }

    if (!allowedMimeTypes.has(fileValue.type)) {
      return NextResponse.json(
        { error: `Formato no valido. ${SUPPORTED_FILE_FORMATS.DISPLAY_TEXT}.` },
        { status: 400 },
      );
    }

    if (fileValue.size > FILE_SIZE_LIMITS.MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Archivo demasiado grande. El maximo es 10MB." },
        { status: 400 },
      );
    }

    const { captchaToken, originalFilename } = parsed.data;
    const { hcaptchaSecret, replicateToken, replicateModel } = getEnv();
    const captchaOk = await verifyCaptcha(captchaToken, hcaptchaSecret);

    if (!captchaOk) {
      return NextResponse.json(
        { error: "Validacion captcha fallida. Intenta nuevamente." },
        { status: 400 },
      );
    }

    const replicate = new Replicate({ auth: replicateToken });
    const inputBuffer = Buffer.from(await fileValue.arrayBuffer());
    const optimizedBuffer = await optimizeForProcessing(inputBuffer);
    const processingImage = toDataUrl(optimizedBuffer, "image/jpeg");

    const output = await replicate.run(
      replicateModel as `${string}/${string}` | `${string}/${string}:${string}`,
      {
        input: {
          image: processingImage,
        },
      },
    );

    const outputUrl = pickOutputUrl(output);
    if (!outputUrl) {
      return NextResponse.json(
        { error: "La IA no devolvio una imagen valida." },
        { status: 500 },
      );
    }

    const processedResponse = await fetch(outputUrl);
    if (!processedResponse.ok) {
      return NextResponse.json(
        { error: "No se pudo descargar el resultado de IA." },
        { status: 500 },
      );
    }

    const processedBuffer = Buffer.from(await processedResponse.arrayBuffer());
    const freeBuffer = await sharp(processedBuffer)
      .rotate()
      .resize(FREE_DOWNLOAD_SPECS.maxDimension, FREE_DOWNLOAD_SPECS.maxDimension, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .png({
        quality: Math.round(FREE_DOWNLOAD_SPECS.quality * 100),
        compressionLevel: 9,
      })
      .toBuffer();

    const freeDownloadUrl = toDataUrl(freeBuffer, "image/png");
    const demoId = `demo-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

    return NextResponse.json({
      success: true,
      demoId,
      freeDownloadUrl,
      originalFilename: originalFilename ?? fileValue.name,
      message: "Imagen procesada correctamente.",
    });
  } catch {
    return NextResponse.json(
      { error: "Error inesperado durante el procesamiento." },
      { status: 500 },
    );
  }
}
