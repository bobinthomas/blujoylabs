import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Government, enterprise, and growth-stage companies — we speak your language and understand your constraints.",
};

const industries = [
  {
    title: "Federal Civilian Agencies",
    description:
      "We support contractors and agencies across civilian portfolios — from health and human services to transportation and energy. Our GovCon expertise ensures your proposals align with agency priorities, and our design and SAP capabilities help you deliver once you win.",
    capabilities: [
      "Proposal development for civilian RFPs",
      "SAP implementation for federal shared services",
      "Compliance with civilian agency regulations",
      "Digital transformation and UX modernization",
    ],
  },
  {
    title: "Department of Defense & Intelligence",
    description:
      "DoD and IC contracts demand precision, security, and compliance. We bring CMMC-aligned processes, cleared recruitment support, and technical depth to every engagement.",
    capabilities: [
      "Defense-focused proposal strategy",
      "CMMC and NIST compliance support",
      "SAP for defense logistics and finance",
      "Secure design and development practices",
    ],
  },
  {
    title: "State & Local Government",
    description:
      "State and local opportunities move differently than federal — and we know the rhythm. From RFP response to system implementation, we help you serve communities effectively.",
    capabilities: [
      "State and local RFP support",
      "SAP for public sector ERP",
      "Citizen-facing digital services design",
      "Grant and funding application support",
    ],
  },
  {
    title: "Commercial Enterprises",
    description:
      "Not every client wears a uniform. We bring the same rigor to commercial engagements — helping businesses modernize technology, redesign digital experiences, and compete in crowded markets.",
    capabilities: [
      "SAP S/4HANA for commercial operations",
      "Product design and digital transformation",
      "eCommerce and growth engineering",
      "Brand strategy and market positioning",
    ],
  },
  {
    title: "Startups & Growth-Stage Companies",
    description:
      "You're moving fast. We move with you. From MVP prototyping to your first GovCon win, we provide the expertise you need without the overhead you can't afford.",
    capabilities: [
      "Rapid prototyping and MVP development",
      "GovCon readiness and first-contract support",
      "Brand and web design for market entry",
      "Fractional design and technical leadership",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <HeroSection
        headline="Trusted Across Sectors"
        subheadline="Government, enterprise, and growth-stage companies — we speak your language and understand your constraints."
      />
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {industries.map((ind, i) => (
              <div
                key={ind.title}
                className={`rounded-2xl p-8 sm:p-10 border ${
                  i % 2 === 0 ? "bg-white border-warm-border" : "bg-navy-50 border-navy-100"
                }`}
              >
                <h2 className="text-2xl font-medium text-navy-900">{ind.title}</h2>
                <p className="mt-3 text-navy-600 leading-relaxed max-w-3xl text-[15px]">{ind.description}</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {ind.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 bg-warm rounded-xl p-4 border border-warm-border">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-navy-700">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
