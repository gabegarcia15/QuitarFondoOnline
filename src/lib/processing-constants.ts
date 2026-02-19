export const FILE_SIZE_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024,
} as const;

export const FREE_DOWNLOAD_SPECS = {
  maxDimension: 500,
  quality: 0.85,
} as const;

export const SUPPORTED_FILE_FORMATS = {
  DISPLAY_TEXT: "Compatible con JPG, JPEG, PNG y WEBP",
  MIME_TYPES: ["image/jpeg", "image/png", "image/webp"] as const,
} as const;
