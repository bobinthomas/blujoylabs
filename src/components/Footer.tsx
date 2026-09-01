"use client";

import Link from "next/link";
import { useState } from "react";

type LinkItem = { label: string; href: string };
type SocialLink = { platform: "linkedin" | "x" | "youtube"; href: string };

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialIcons: Record<SocialLink["platform"], { label: string; icon: React.ReactNode }> = {
  linkedin: { label: "LinkedIn", icon: <LinkedInIcon /> },
  x: { label: "X", icon: <XIcon /> },
  youtube: { label: "YouTube", icon: <YouTubeIcon /> },
};

export default function Footer({
  productLinks,
  resourceLinks,
  companyLinks,
  socialLinks,
  tagline,
  newsletterHeading,
  copyrightText,
}: {
  productLinks: readonly LinkItem[];
  resourceLinks: readonly LinkItem[];
  companyLinks: readonly LinkItem[];
  socialLinks: readonly SocialLink[];
  tagline: string;
  newsletterHeading: string;
  copyrightText: string;
}) {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src="/blujoy-logo.svg" alt="Blujoy" className="h-9 w-auto brightness-0 invert mb-5" />
            <p className="text-sm leading-relaxed text-white/60 max-w-xs">{tagline}</p>
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  aria-label={socialIcons[s.platform].label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-blue-300 hover:text-blue-300"
                >
                  {socialIcons[s.platform].icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="mb-5 text-sm font-medium text-white">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-blue-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="mb-5 text-sm font-medium text-white">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-blue-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="mb-5 text-sm font-medium text-white">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-blue-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-5 text-sm font-medium text-white">{newsletterHeading}</h3>
            {subscribed ? (
              <p className="text-sm text-blue-300">You&apos;re subscribed — thanks!</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
                className="flex flex-col gap-2.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-1.5 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Subscribe
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Oversized watermark logo, cropped by the footer's edges */}
      <div className="relative flex h-28 items-center justify-center overflow-hidden border-t border-white/10 sm:h-40 lg:h-48">
        <img
          src="/blujoy-logo.svg"
          alt=""
          aria-hidden="true"
          className="h-full w-auto max-w-none select-none opacity-[0.07] brightness-0 invert pointer-events-none"
        />
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/40">{copyrightText}</p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="#" className="transition-colors hover:text-blue-300">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-blue-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
