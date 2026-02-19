export const siteConfig = {
  name: "Eliminar Fondo De Una Imagen",
  headline: "Eliminar Fondo De Una Imagen",
  description:
    "Eliminar Fondo De Una Imagen online en segundos con una herramienta simple en espanol para recortes limpios.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.eliminarfondodeunaimagen.com",
  pricingUrl:
    process.env.NEXT_PUBLIC_BR_PRICING_URL ?? "https://backgroundremover.com/pricing",
  campaignId: process.env.NEXT_PUBLIC_BR_CAMPAIGN_ID ?? "es_emd_launch",
  couponLabel: process.env.NEXT_PUBLIC_BR_COUPON_LABEL ?? "20% OFF",
  utm: {
    source: "www.eliminarfondodeunaimagen.com",
    medium: "referral",
    campaign: "es_lead_magnet",
  },
} as const;
