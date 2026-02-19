"use client";

export type AnalyticsEventName =
  | "upload_started"
  | "upload_completed"
  | "hero_upload_entry_clicked"
  | "redirect_to_background_remover_clicked"
  | "coupon_shown"
  | "coupon_applied_attempted";

export function trackEvent(name: AnalyticsEventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const eventPayload = {
    event: name,
    payload,
    path: window.location.pathname,
    ts: new Date().toISOString(),
  };

  const dataLayer = (window as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push(eventPayload);
  }

  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", name, payload);
  }

  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  if (endpoint) {
    const body = JSON.stringify(eventPayload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, body);
    } else {
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  }
}
