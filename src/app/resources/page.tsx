import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Resources & Insights",
  description:
    "Guides, best practices, and insights from the front lines of GovCon, SAP, and digital design.",
};

const categories = [
  {
    title: "Blog & Articles",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    items: [
      "GovCon strategy and proposal tips",
      "SAP implementation best practices",
      "Design systems and UX trends",
      "Industry news and regulatory updates",
    ],
  },
  {
    title: "GovCon Guides",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    items: [
      "GovCon 101: Getting Started with Federal Contracting",
      "How to Read an RFP Like a Pro",
      "Writing a Winning Past Performance Narrative",
      "CMMC Readiness Checklist",
    ],
  },
  {
    title: "SAP Best Practices",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    items: [
      "S/4HANA Migration: Brownfield vs. Greenfield",
      "Building an SAP Center of Excellence",
      "Fiori UX: A Practical Introduction",
      "SAP Security Essentials",
    ],
  },
  {
    title: "Design Systems Playbooks",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    items: [
      "Starting Your First Design System in Figma",
      "From Design to Dev: A Handoff Checklist",
      "Motion Design for Interfaces: A Beginner's Guide",
      "Accessibility in Product Design",
    ],
  },
  {
    title: "FAQs",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    items: [
      "How long does a typical proposal take?",
      "Do I need past performance to win a government contract?",
      "What's the difference between ECC and S/4HANA?",
      "How much does a design system cost?",
    ],
  },
  {
    title: "News & Events",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      "Upcoming webinars",
      "Conference appearances",
      "Company announcements",
      "Industry partnerships",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <>
      <HeroSection
        headline="Knowledge Worth Sharing"
        subheadline="Guides, best practices, and insights from the front lines of GovCon, SAP, and digital design."
      />
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bg-white rounded-2xl p-8 border border-warm-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{cat.title}</h3>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-navy-600 hover:text-blue-600 transition-colors flex items-start gap-2"
                      >
                        <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
