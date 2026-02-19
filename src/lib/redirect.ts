import { siteConfig } from "@/config/site";

export function buildBackgroundRemoverRedirectUrl(): string {
  const url = new URL(siteConfig.backgroundRemoverUrl);
  url.searchParams.set("campaign", siteConfig.campaignId);
  url.searchParams.set("utm_source", siteConfig.utm.source);
  url.searchParams.set("utm_medium", siteConfig.utm.medium);
  url.searchParams.set("utm_campaign", siteConfig.utm.campaign);
  return url.toString();
}

export function buildPricingRedirectUrl(): string {
  return buildBackgroundRemoverRedirectUrl();
}
