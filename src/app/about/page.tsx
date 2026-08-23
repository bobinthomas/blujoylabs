import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import PlaceholderContent from "@/components/PlaceholderContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A unified partner for organizations navigating government contracts, enterprise technology, and digital transformation.",
};

const values = [
  {
    number: "1",
    title: "Clarity Over Noise",
    description:
      "We cut through jargon, complexity, and ambiguity. Every recommendation, every deliverable, every conversation is designed to move you forward with confidence.",
  },
  {
    number: "2",
    title: "Ownership, Not Handoffs",
    description:
      "We don't pass work down a chain. The people you meet are the people who do the work. Accountability is non-negotiable.",
  },
  {
    number: "3",
    title: "Compliance as Foundation",
    description:
      "In GovCon and enterprise tech, compliance isn't a checkbox — it's the floor. We build everything on a foundation of security, quality, and regulatory rigor.",
  },
  {
    number: "4",
    title: "Design with Purpose",
    description:
      "Every pixel, every workflow, every interaction should earn its place. We design for outcomes, not aesthetics alone.",
  },
  {
    number: "5",
    title: "Partnership Over Transaction",
    description:
      "We succeed when you succeed. Our best relationships are long-term, not one-off.",
  },
];

const certifications = [
  "CMMC Level 1 Compliant",
  "ISO 9001:2015 Certified — Quality Management",
  "ISO/IEC 27001:2022 Certified — Information Security",
  "SAP-Certified Consultants (S/4HANA, ABAP, Fiori)",
  "Small Business Certified (as applicable)",
];

const partnerships = [
  "Northern Virginia Technology Council (NVTC)",
  "National Small Business Government Contractors Association",
  "Military Spouse Employment Partnership",
  "Virginia Values Veterans",
];

const leadership = [
  { name: "[Placeholder — add name]", title: "[Placeholder — add title]" },
  { name: "[Placeholder — add name]", title: "[Placeholder — add title]" },
  { name: "[Placeholder — add name]", title: "[Placeholder — add title]" },
  { name: "[Placeholder — add name]", title: "[Placeholder — add title]" },
];

export default function AboutPage() {
  return (
    <>
      <HeroSection
        headline="A Team Built for the Hard Stuff"
        subheadline="Government contracting. Enterprise SAP. Human-centered design. Three complex worlds. One partner who understands them all."
      />

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-light text-navy-900 tracking-tight">Our Story</h2>
          <div className="mt-6 space-y-4 text-navy-600 leading-relaxed">
            <p>
              We started with a simple observation: businesses navigating government contracts,
              enterprise technology, and digital transformation were working with three different
              partners — and losing time, money, and coherence in the gaps between them.
            </p>
            <p>So we built something different.</p>
            <p>
              Today, we operate as a unified partner for organizations that need to win in the
              federal marketplace, run smarter on SAP, and present themselves digitally with
              precision and purpose. We bring together deep GovCon expertise, SAP-certified
              technical consultants, and senior product designers — all under one roof, all
              aligned to one goal: your success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-warm-border">
            <h3 className="text-xs font-medium uppercase tracking-wider text-blue-600 mb-3">Mission</h3>
            <p className="text-navy-700 leading-relaxed">
              To simplify complexity. Whether it&apos;s a 200-page federal proposal, a multi-phase SAP
              migration, or a product interface that needs to feel effortless — we make the hard
              things manageable, and the manageable things exceptional.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-warm-border">
            <h3 className="text-xs font-medium uppercase tracking-wider text-blue-600 mb-3">Vision</h3>
            <p className="text-navy-700 leading-relaxed">
              To become the most trusted partner for organizations that operate at the intersection
              of government, enterprise technology, and digital experience.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Core Values" />
          <div className="space-y-4">
            {values.map((v) => (
              <div key={v.number} className="flex gap-5 bg-warm rounded-2xl p-6 border border-warm-border">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-medium text-sm flex items-center justify-center shrink-0">
                  {v.number}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-navy-900">{v.title}</h3>
                  <p className="mt-1 text-navy-600 leading-relaxed text-[15px]">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Leadership Team" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, i) => (
              <div key={i} className="bg-white rounded-2xl border border-warm-border p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-navy-100 mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-10 h-10 text-navy-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="font-medium text-navy-900">{person.name}</p>
                <p className="text-sm text-navy-500 mt-1">{person.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <PlaceholderContent label="Add team member bios, photos, and LinkedIn links" />
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Certifications & Compliance" />
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-start gap-3 bg-warm rounded-xl p-5 border border-warm-border">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-navy-700 text-[15px]">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20 bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Partnerships & Affiliations" />
          <div className="grid sm:grid-cols-2 gap-4">
            {partnerships.map((p) => (
              <div key={p} className="flex items-start gap-3 bg-white rounded-xl p-5 border border-warm-border">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-navy-700 text-[15px]">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Locations" />
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-warm rounded-2xl p-8 border border-warm-border">
              <h3 className="font-medium text-navy-900 mb-2">Primary Office</h3>
              <p className="text-navy-600">[Your Primary Address]</p>
            </div>
            <div className="bg-warm rounded-2xl p-8 border border-warm-border">
              <h3 className="font-medium text-navy-900 mb-2">Secondary Office</h3>
              <p className="text-navy-600">[Your Secondary Address, if applicable]</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
