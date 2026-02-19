const DEFAULT_SITE_URL = "https://www.quitarfondoonline.com";

function normalizeSiteUrl(input: string): string {
  try {
    const url = new URL(input);
    if (url.hostname === "quitarfondoonline.com") {
      url.hostname = "www.quitarfondoonline.com";
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const normalizedSiteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL);

export const siteConfig = {
  name: "Quitar Fondo Online",
  headline: "Quitar Fondo Online",
  description:
    "Quitar fondo online en segundos con una herramienta simple en espanol para recortes limpios.",
  primaryKeyword: "quitar fondo online",
  keywords: [
    "quitar fondo online",
    "quitar fondo online gratis",
    "eliminar fondo de imagen",
    "removedor de fondo",
    "fondo transparente png",
    "quitar fondo blanco",
  ],
  siteUrl: normalizedSiteUrl,
  backgroundRemoverUrl:
    process.env.NEXT_PUBLIC_BR_HOME_URL ?? "https://backgroundremover.com",
  pricingUrl:
    process.env.NEXT_PUBLIC_BR_PRICING_URL ?? "https://backgroundremover.com/pricing",
  campaignId: process.env.NEXT_PUBLIC_BR_CAMPAIGN_ID ?? "es_emd_launch",
  couponLabel: process.env.NEXT_PUBLIC_BR_COUPON_LABEL ?? "20% OFF",
  utm: {
    source: "www.quitarfondoonline.com",
    medium: "referral",
    campaign: "es_lead_magnet",
  },
} as const;
