"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream-100/95 backdrop-blur-sm border-b border-cream-300 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-semibold text-mocha-800 group-hover:text-mocha-600 transition-colors">
              DžanAjla
            </span>
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-gold-500">
              Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Početna</NavLink>
            <div className="relative group">
              <button className="px-4 py-2 font-sans text-sm text-mocha-600 hover:text-mocha-800 transition-colors rounded-lg hover:bg-cream-200 flex items-center gap-1">
                Kategorije
                <svg
                  className="w-3.5 h-3.5 opacity-60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-56 bg-white rounded-2xl shadow-hover border border-cream-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-mocha-700 hover:bg-cream-100 hover:text-mocha-900 transition-colors"
                  >
                    <span className="text-base">{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
            <NavLink href="/#about">O nama</NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-mocha-600 hover:bg-cream-200 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Otvori meni"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden border-t border-cream-300 bg-cream-50 overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="px-4 py-4 flex flex-col gap-1">
          <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>
            Početna
          </MobileNavLink>
          <div className="pt-2 pb-1">
            <p className="px-3 text-[10px] font-sans tracking-[0.2em] uppercase text-gold-500 font-medium mb-1">
              Kategorije
            </p>
            {CATEGORIES.map((cat) => (
              <MobileNavLink
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMobileOpen(false)}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.label}
              </MobileNavLink>
            ))}
          </div>
          <MobileNavLink href="/#about" onClick={() => setMobileOpen(false)}>
            O nama
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-2 font-sans text-sm text-mocha-600 hover:text-mocha-800 transition-colors rounded-lg hover:bg-cream-200"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-3 py-2.5 rounded-xl text-sm text-mocha-700 hover:bg-cream-200 transition-colors"
    >
      {children}
    </Link>
  );
}
