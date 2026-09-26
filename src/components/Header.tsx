"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const servicesRef = useRef<HTMLDivElement>(null);

  const leadingLinks: NavLink[] = [{ label: "Home", href: "/" }];
  const trailingLinks: NavLink[] = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];
  const servicesActive = servicesLinks.some((link) => isActive(pathname, link.href));

  // Both menus close on navigation, so a new page never opens with a stale panel.
  // Adjusted during render rather than in an effect, per React's guidance for
  // resetting state when a value changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setServicesOpen(false);
    setMobileOpen(false);
  }

  // A dropdown has to be dismissible without a mouse: Escape returns focus to the
  // trigger, and a click anywhere outside closes it.
  useEffect(() => {
    if (!servicesOpen) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      servicesRef.current?.querySelector("button")?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  const navItemClass = (active: boolean) =>
    `px-3 py-2 text-[14px] font-medium rounded-lg transition-colors ${
      active ? "bg-pale-blue text-blue-700" : "text-navy-700 hover:text-navy-900 hover:bg-warm-dark"
    }`;

  return (
    <header className="absolute top-0 inset-x-0 z-50 pt-4 sm:pt-6 px-4 sm:px-6">
      <div
        className={`max-w-7xl mx-auto bg-white border border-warm-border shadow-sm px-4 sm:px-6 transition-[border-radius] ${
          mobileOpen ? "rounded-[28px]" : "rounded-full"
        }`}
      >
        {/* Logo holds the left edge; the nav and the CTA travel together on the right. */}
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center shrink-0">
            <img src="/blujoy-logo.svg" alt="BluJoy Labs" className="h-[37px] sm:h-[41px] w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            <nav className="hidden lg:flex items-center gap-0.5">
              {leadingLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={navItemClass(isActive(pathname, link.href))}
                >
                  {link.label}
                </Link>
              ))}

              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((open) => !open)}
                  className={`${navItemClass(servicesActive)} inline-flex items-center gap-1.5`}
                >
                  Services
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-2 w-64">
                    <div className="rounded-2xl border border-warm-border bg-white p-2 shadow-lg">
                      {servicesLinks.map((link) => {
                        const active = isActive(pathname, link.href);
                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            aria-current={active ? "page" : undefined}
                            className={`block rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
                              active
                                ? "bg-pale-blue text-blue-700"
                                : "text-navy-700 hover:bg-warm-dark hover:text-navy-900"
                            }`}
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {trailingLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={navItemClass(isActive(pathname, link.href))}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3 lg:pl-3 lg:border-l lg:border-warm-border">
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
              className="lg:hidden p-2.5 text-navy-700 hover:bg-warm-dark rounded-lg"
              aria-expanded={mobileOpen}
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
              {leadingLinks.map((link) => {
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

              {/* Same grouping as the desktop dropdown, collapsed into the sheet. */}
              <button
                type="button"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((open) => !open)}
                className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg ${
                  servicesActive ? "bg-pale-blue text-blue-700" : "text-navy-700 hover:bg-warm-dark"
                }`}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="flex flex-col gap-1 pl-3 border-l border-warm-border ml-3">
                  {servicesLinks.map((link) => {
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
                </div>
              )}

              {trailingLinks.map((link) => {
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
