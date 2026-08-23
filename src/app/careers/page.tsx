import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import PlaceholderContent from "@/components/PlaceholderContent";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join a team that does meaningful work — GovCon, SAP, and design, three disciplines, one culture of excellence.",
};

const whyWork = [
  {
    title: "Impactful Projects",
    description:
      "Work on proposals that win millions, SAP systems that power enterprises, and designs that shape user experiences.",
  },
  {
    title: "Growth-Focused",
    description: "We invest in certifications, conferences, and continuous learning.",
  },
  {
    title: "Flexible Environment",
    description: "Remote-first with collaborative in-person options.",
  },
  {
    title: "Diverse & Inclusive",
    description: "We actively recruit veterans, military spouses, and underrepresented talent.",
  },
  {
    title: "Competitive Compensation",
    description: "Salaries, benefits, and bonuses that reflect your contribution.",
  },
];

const positions = [
  "Proposal Writer / Manager",
  "SAP Functional Consultant",
  "UX/UI Designer",
  "Capture Manager",
  "UX Engineer",
  "SAP Technical Consultant",
  "Business Development Associate",
];

export default function CareersPage() {
  return (
    <>
      <HeroSection
        headline="Join a Team That Does Meaningful Work"
        subheadline="GovCon, SAP, and design — three disciplines, one culture of excellence."
      />

      {/* Why Work With Us */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Why Work With Us" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyWork.map((item, i) => (
              <div
                key={item.title}
                className={`rounded-2xl p-7 border ${
                  i === 0 ? "bg-blue-600 text-white border-blue-600" : "bg-white border-warm-border"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  i === 0 ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className={`mt-2 text-sm ${i === 0 ? "text-blue-100" : "text-navy-600"}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Open Positions" />
          <div className="space-y-4">
            {positions.map((pos) => (
              <div
                key={pos}
                className="bg-warm rounded-2xl p-6 border border-warm-border flex items-center justify-between hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-bold text-navy-900">{pos}</h3>
                  <p className="text-sm text-navy-500 mt-1">[Placeholder — add description]</p>
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
                >
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PlaceholderContent label="Add job descriptions, locations, and application links" />
          </div>
        </div>
      </section>
    </>
  );
}
