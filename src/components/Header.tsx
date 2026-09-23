"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = { label: string; href: string };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

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
  const pathname = usePathname();

  // Home, then each service at the top level (no dropdown), then About and Contact.
  const navLinks: NavLink[] = [{ label: "Home", href: "/" }, ...servicesLinks, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }];

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
              alt="BluJoy Labs"
              className="h-8 sm:h-9 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-2 text-[14px] font-medium rounded-lg transition-colors ${
                    active ? "bg-pale-blue text-blue-700" : "text-navy-700 hover:text-navy-900 hover:bg-warm-dark"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`px-3 py-2.5 text-sm font-medium rounded-lg ${
                      active ? "bg-pale-blue text-blue-700" : "text-navy-700 hover:bg-warm-dark"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
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
