import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import ServiceIntro from "@/components/service-page/ServiceIntro";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SplitCTA from "@/components/service-page/SplitCTA";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A unified partner for organizations navigating government contracts, enterprise technology, and digital transformation.",
};

export default async function AboutPage() {
  const reader = getKeystaticReader();
  const [page, teamMembers] = await Promise.all([
    reader.singletons.aboutPage.read(),
    reader.collections.teamMembers.all(),
  ]);
  if (!page) throw new Error("aboutPage singleton is missing");

  const leadership = [...teamMembers].sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      <ServiceIntro
        heading={page.storyHeading}
        paragraphs={[...page.storyParagraphs]}
        image={page.storyImage}
        imagePlaceholderLabel="Photo"
      />

      {/* Mission & Vision — manifesto band */}
      <section className="py-20 sm:py-28 bg-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-0 sm:divide-x sm:divide-white/10">
            <Reveal className="sm:pr-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4">{page.missionHeading}</h3>
              <p className="text-xl sm:text-2xl font-light text-white leading-snug">{page.missionText}</p>
            </Reveal>
            <Reveal delay={100} className="sm:pl-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-300 mb-4">{page.visionHeading}</h3>
              <p className="text-xl sm:text-2xl font-light text-white leading-snug">{page.visionText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Values — numbered manifesto list */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={page.valuesHeading} />
          <div className="border-t border-warm-border">
            {page.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="flex items-start gap-6 sm:gap-10 py-8 border-b border-warm-border">
                <span className="text-3xl sm:text-4xl font-light text-navy-300 shrink-0">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-medium text-navy-900">{v.title}</h3>
                  <p className="mt-2 text-navy-600 leading-relaxed text-[15px]">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={page.leadershipHeading} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((person, i) => (
              <Reveal key={person.slug} delay={i * 80}>
                {person.entry.photo ? (
                  <img src={person.entry.photo} alt={person.entry.name} className="w-full aspect-square object-cover rounded-2xl mb-4" />
                ) : (
                  <ImagePlaceholder label="Photo — headshot" className="w-full aspect-square mb-4" />
                )}
                <p className="font-medium text-navy-900 text-center">{person.entry.name}</p>
                <p className="text-sm text-navy-500 mt-1 text-center">{person.entry.title}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance */}
      <section className="py-20 sm:py-28 bg-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{page.trustHeading}</h2>
          </Reveal>
          <Reveal delay={80} className="flex flex-wrap justify-center gap-3 mb-8">
            {page.certifications.map((cert) => (
              <span key={cert.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {cert.label}
              </span>
            ))}
          </Reveal>
          <Reveal delay={140} className="flex flex-wrap justify-center gap-3">
            {page.partnerships.map((p) => (
              <span key={p.label} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/60">
                <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {p.label}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={page.locationsHeading} />
          <div className="grid sm:grid-cols-2 gap-6">
            {page.locations.map((loc, i) => (
              <Reveal key={loc.name} delay={i * 80} className="rounded-2xl bg-white border border-warm-border p-8">
                <h3 className="font-medium text-navy-900 mb-2">{loc.name}</h3>
                <p className="text-navy-600">{loc.address}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
