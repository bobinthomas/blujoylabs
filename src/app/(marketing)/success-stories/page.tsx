import type { Metadata } from "next";
import Link from "next/link";
import ServiceHero from "@/components/service-page/ServiceHero";
import StatBand from "@/components/service-page/StatBand";
import SplitCTA from "@/components/service-page/SplitCTA";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "Success Stories",
  description: "Real wins, real transformations, real partnerships.",
};

export default async function SuccessStoriesPage() {
  const reader = getKeystaticReader();
  const [page, caseStudies] = await Promise.all([
    reader.singletons.successStoriesPage.read(),
    reader.collections.caseStudies.all(),
  ]);
  if (!page) throw new Error("successStoriesPage singleton is missing");

  const sortedCaseStudies = [...caseStudies].sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));

  const testimonialSlugs = page.testimonials.filter((slug): slug is string => slug !== null);
  const testimonials = (
    await Promise.all(testimonialSlugs.map((slug) => reader.collections.testimonials.read(slug)))
  ).filter((t): t is NonNullable<typeof t> => t !== null);

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      {/* Case Studies */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sortedCaseStudies.map(({ slug, entry: cs }, i) => (
            <Reveal key={slug} delay={i * 90} className="grid lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white flex flex-col items-center justify-center text-center">
                <span className="inline-flex items-center px-3 py-1 bg-white/15 text-sm font-medium rounded-full mb-4">
                  {cs.tag}
                </span>
                <div className="text-4xl sm:text-5xl font-light">{cs.resultHighlight}</div>
                <Link href="#" className="mt-6 inline-flex items-center text-sm font-medium text-blue-100 hover:text-white transition-colors">
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
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={page.testimonialsHeading} />
          <Reveal>
            <TestimonialCarousel testimonials={testimonials} />
          </Reveal>
        </div>
      </section>

      <StatBand heading={page.metricsHeading} stats={[...page.metrics]} />

      <SplitCTA
        heading={page.ctaHeading}
        description={page.ctaDescription}
        ctaText={page.ctaLabel}
        image={page.ctaImage}
        imagePlaceholderLabel="Photo"
      />
    </>
  );
}
