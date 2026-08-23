"use client";

import Link from "next/link";
import { useState } from "react";

const servicesLinks = [
  { label: "GovCon Solutions", href: "/services/govcon" },
  { label: "SAP Services", href: "/services/sap" },
  { label: "UI/UX & Design", href: "/services/ui-ux-design" },
  { label: "Build & Engineering", href: "/services/build-engineering" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services/govcon", hasDropdown: true },
  { label: "Industries", href: "/industries" },
  { label: "Success Stories", href: "/success-stories" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Schedule a Free Consultation
            </Link>
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
                <p className="px-3 py-1 text-xs font-semibold text-navy-400 uppercase tracking-wider">Services</p>
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
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 mx-3 text-center px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Schedule a Free Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
