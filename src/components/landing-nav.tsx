"use client";

import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";

export function LandingNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-6">
        <Link href="/" className="font-serif text-2xl italic text-[var(--text-primary)]">
          DNS Record History
        </Link>
        <ul className="hidden md:flex items-center gap-12">
          <li>
            <a href="#features" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#pricing" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Pricing
            </a>
          </li>
          <li>
            <a href="#" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Docs
            </a>
          </li>
        </ul>
        <SignUpButton mode="modal">
          <button className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-6 py-3 text-sm font-semibold hover:bg-[var(--accent)] transition-colors">
            Get Started
          </button>
        </SignUpButton>
      </div>
    </nav>
  );
}
