"use client";

import { useState } from "react";
import Link from "next/link";

export type ServiceTab = {
  title: string;
  description: string;
  href: string;
  stats: string;
  dotColor: string;
  icon: React.ReactNode;
};

export default function ServiceTabs({ tabs }: { tabs: ServiceTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {tabs.map((t, i) => (
          <button
            key={t.title}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
              i === active
                ? "bg-warm-taupe text-navy-900"
                : "text-navy-600 hover:text-navy-900"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: t.dotColor }}
            />
            {t.title}
          </button>
        ))}
      </div>

      <div className="bg-warm-taupe rounded-2xl p-8 sm:p-12 lg:p-16">
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start">
          <div className="w-16 h-16 rounded-full bg-white border border-warm-border text-navy-900 flex items-center justify-center shrink-0">
            {tab.icon}
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-navy-900">{tab.title}</h3>
            <p className="mt-4 text-navy-600 leading-relaxed max-w-2xl">{tab.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href={tab.href}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Learn More
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <span className="text-xs font-medium text-navy-500 uppercase tracking-wider">{tab.stats}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
