import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import PlaceholderContent from "@/components/PlaceholderContent";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real wins, real transformations, real partnerships.",
};

const caseStudies = [
  {
    tag: "GovCon Success",
    title: "First-Time GovCon Win — $12M IDIQ",
    challenge:
      "Zero past performance, no GovCon experience, ambitious revenue goals.",
    solution:
      "Full GovCon readiness program — SAM registration, capability statement, pipeline development, and proposal writing for a competitive IDIQ.",
    result:
      "Awarded a $12M IDIQ vehicle within 8 months of engagement start.",
    resultHighlight: "$12M IDIQ Win",
    client: "Emerging technology small business",
  },
  {
    tag: "SAP Success",
    title: "SAP S/4HANA Migration — Manufacturing Enterprise",
    challenge:
      "Outdated infrastructure, custom code debt, and a hard deadline from SAP maintenance sunset.",
    solution:
      "Brownfield conversion strategy, custom code remediation, data migration, and Fiori UX rollout.",
    result:
      "On-time migration with 30% reduction in custom code and 40% improvement in report generation speed.",
    resultHighlight: "30% Less Custom Code",
    client: "Mid-size manufacturing firm with legacy ECC system",
  },
  {
    tag: "Design Success",
    title: "Brand & Web Redesign — GovCon Firm",
    challenge:
      "Website looked like 2012. Brand inconsistent across proposals, decks, and digital. Losing credibility in early-stage evaluations.",
    solution:
      "Complete brand identity system, responsive web design, proposal template redesign, and design system in Figma.",
    result:
      "3x increase in inbound leads, 50% faster proposal production, and consistent brand presence across all touchpoints.",
    resultHighlight: "3x Inbound Leads",
    client: "Established government contractor with dated digital presence",
  },
];

const metrics = [
  { value: "150+", label: "Proposals Delivered" },
  { value: "$500M+", label: "Contract Value Supported" },
  { value: "50+", label: "SAP Projects Completed" },
  { value: "100+", label: "Design Systems Shipped" },
  { value: "95%", label: "Client Retention Rate" },
];

export default function SuccessStoriesPage() {
  return (
    <>
      <HeroSection
        headline="Results That Speak"
        subheadline="Real wins, real transformations, real partnerships."
      />

      {/* Case Studies */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {caseStudies.map((cs) => (
            <div key={cs.title} className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white flex flex-col items-center justify-center text-center">
                <span className="inline-flex items-center px-3 py-1 bg-white/15 text-sm font-medium rounded-full mb-4">
                  {cs.tag}
                </span>
                <div className="text-4xl sm:text-5xl font-light">{cs.resultHighlight}</div>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center text-sm font-medium text-blue-100 hover:text-white transition-colors"
                >
                  Read Full Case Study
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <h3 className="text-2xl font-medium text-navy-900">{cs.title}</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-navy-400 uppercase tracking-wider">Client</span>
                    <p className="text-navy-600 text-[15px]">{cs.client}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-navy-400 uppercase tracking-wider">Challenge</span>
                    <p className="text-navy-600 text-[15px]">{cs.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-navy-400 uppercase tracking-wider">Solution</span>
                    <p className="text-navy-600 text-[15px]">{cs.solution}</p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-navy-400 uppercase tracking-wider">Result</span>
                    <p className="text-navy-600 text-[15px]">{cs.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Our Clients Say" />
          <PlaceholderContent label="Insert 3–5 client testimonials with names, titles, and company names" />
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="By the Numbers" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="bg-white rounded-2xl p-6 text-center border border-warm-border">
                <div className="text-3xl font-light text-blue-600">{m.value}</div>
                <div className="mt-2 text-sm text-navy-600">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
