export interface ProcessingResult {
  success: boolean;
  demoId?: string;
  originalUrl?: string;
  freeDownloadUrl?: string;
  message?: string;
  error?: string;
  originalFilename?: string;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}
