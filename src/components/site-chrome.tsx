import Link from "next/link";
import { Camera } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function SiteHeader() {
  return (
    <header className="py-6 sm:py-8 lg:py-10">
      <div className="section-shell rounded-2xl border border-zinc-900/15 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/#inicio" className="inline-flex items-center gap-2 text-base/6 font-semibold text-zinc-900">
            <Camera className="size-4 text-[var(--brand)]" />
            {siteConfig.name}
          </Link>
          <nav className="flex flex-wrap items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1 text-sm/6 text-zinc-600 hover:bg-zinc-900/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-zinc-900/10 pt-6 pb-8 text-sm/6 text-zinc-600">
      <div className="section-shell">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="font-medium text-zinc-700 hover:text-zinc-900">
              Terminos
            </Link>
            <Link href="/privacy" className="font-medium text-zinc-700 hover:text-zinc-900">
              Privacidad
            </Link>
          </div>
        </div>
        <p className="mt-2">Procesamiento rapido de fondos para imagenes.</p>
      </div>
    </footer>
  );
}
