"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = { label: string; href: string };

const navLinks: (NavLink & { hasDropdown?: boolean })[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services/govcon", hasDropdown: true },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Header({
  servicesLinks,
  ctaLabel,
  ctaHref,
}: {
  servicesLinks: readonly NavLink[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="absolute top-0 inset-x-0 z-50 pt-4 sm:pt-6 px-4 sm:px-6">
      <div
        className={`max-w-7xl mx-auto bg-white border border-warm-border shadow-sm px-4 sm:px-6 transition-[border-radius] ${
          mobileOpen ? "rounded-[28px]" : "rounded-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/blujoy-logo.svg"
              alt="Blujoy"
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href="/services/govcon"
                    className="flex items-center gap-1 px-3 py-2 text-[14px] font-medium text-navy-700 hover:text-navy-900 hover:bg-warm-dark rounded-lg transition-colors"
                  >
                    Services
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-warm-border py-2 z-50">
                      {servicesLinks.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-warm hover:text-blue-600 transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-[14px] font-medium text-navy-700 hover:text-navy-900 hover:bg-warm-dark rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 pl-3 border-l border-warm-border">
              <Link
                href={ctaHref}
                className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
              >
                {ctaLabel}
              </Link>
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy-700 hover:bg-warm-dark rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-4 border-t border-warm-border mt-2 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-warm-dark rounded-lg"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-warm-border">
                <p className="px-3 py-1 text-xs font-medium text-navy-400 uppercase tracking-wider">Services</p>
                {servicesLinks.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-2 text-sm text-navy-600 hover:bg-warm-dark rounded-lg"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
              <Link
                href={ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-3 mx-3 text-center px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
