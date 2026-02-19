import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { FathomAnalytics } from "./fathom-analytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.name,
  title: {
    default: "Eliminar Fondo De Una Imagen",
    template: "%s | Eliminar Fondo De Una Imagen",
  },
  description: siteConfig.description,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <FathomAnalytics />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
