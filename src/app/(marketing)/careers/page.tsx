import type { Metadata } from "next";
import Link from "next/link";
import ServiceHero from "@/components/service-page/ServiceHero";
import SplitCTA from "@/components/service-page/SplitCTA";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join a team that does meaningful work — GovCon, SAP, and design, three disciplines, one culture of excellence.",
};

export default async function CareersPage() {
  const reader = getKeystaticReader();
  const [page, jobPostings] = await Promise.all([
    reader.singletons.careersPage.read(),
    reader.collections.jobPostings.all(),
  ]);
  if (!page) throw new Error("careersPage singleton is missing");

  const positions = [...jobPostings].sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      {/* Why Work With Us */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={page.whyWorkHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.whyWork.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 70}
                className={`h-full rounded-2xl p-7 border ${
                  i === 0 ? "bg-blue-600 text-white border-blue-600" : "bg-white border-warm-border"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                    i === 0 ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className={`mt-2 text-sm ${i === 0 ? "text-blue-100" : "text-navy-600"}`}>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Life Here — full-bleed culture banner */}
      <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center overflow-hidden bg-navy-200">
        {page.cultureImage ? (
          <img src={page.cultureImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-navy-300 text-navy-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
              />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider">Photo — life at Blujoy</span>
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(100deg, rgba(18,23,34,0.85) 0%, rgba(18,23,34,0.5) 50%, rgba(18,23,34,0.1) 100%)" }}
        />
        <Reveal className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{page.cultureHeadline}</h2>
            <p className="mt-4 text-white/80 leading-relaxed">{page.cultureText}</p>
          </div>
        </Reveal>
      </section>

      {/* Open Positions */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={page.positionsHeading} />
          <div className="space-y-4">
            {positions.map((pos, i) => (
              <Reveal
                key={pos.slug}
                delay={i * 40}
                className="bg-warm rounded-2xl p-6 border border-warm-border flex items-center justify-between hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div>
                  <h3 className="font-medium text-navy-900">{pos.entry.title}</h3>
                  <p className="text-sm text-navy-500 mt-1">{pos.entry.description}</p>
                </div>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
                >
                  Apply Now →
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SplitCTA
        heading={page.ctaHeading}
        description={page.ctaDescription}
        ctaText={page.ctaLabel}
        ctaHref="/contact"
        image={page.ctaImage}
        imagePlaceholderLabel="Photo"
      />
    </>
  );
}
