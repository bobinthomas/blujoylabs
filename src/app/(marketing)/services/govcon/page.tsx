import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import ServiceIntro from "@/components/service-page/ServiceIntro";
import PathwaysGrid from "@/components/service-page/PathwaysGrid";
import SupportingServicesGrid from "@/components/service-page/SupportingServicesGrid";
import ProcessDiagram from "@/components/service-page/ProcessDiagram";
import BenefitsGrid from "@/components/service-page/BenefitsGrid";
import StatBand from "@/components/service-page/StatBand";
import SplitCTA from "@/components/service-page/SplitCTA";
import FAQDark from "@/components/service-page/FAQDark";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

const SLUG = "govcon";

export const metadata: Metadata = {
  title: "Federal and SLED Capture and Proposal Support",
  description:
    "Capture, proposal writing and management support for Federal and SLED contractors. Explore monthly team support or help with an individual pursuit.",
};

export default async function GovConPage() {
  const reader = getKeystaticReader();
  const page = await reader.collections.servicePages.read(SLUG);
  if (!page) throw new Error(`servicePages/${SLUG} is missing`);

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
        primaryLabel={page.heroPrimaryLabel}
        primaryHref={page.heroPrimaryHref}
        secondaryLabel={page.heroSecondaryLabel}
        secondaryHref={page.heroSecondaryHref}
        supportingLine={page.heroSupportingLine}
      />

      <ServiceIntro
        heading={page.introHeading}
        paragraphs={[...page.introParagraphs]}
        image={page.introImage}
        imagePlaceholderLabel="Photo"
      />

      <div id="govcon-services">
        <PathwaysGrid
          eyebrow={page.pathwaysEyebrow}
          heading={page.pathwaysHeading}
          subtitle={page.pathwaysSubtitle}
          pathways={page.pathways.map((p) => ({ ...p, imagePlaceholderLabel: "Photo" }))}
        />
      </div>

      <SupportingServicesGrid
        heading={page.supportingHeading}
        subtitle={page.supportingSubtitle}
        services={[...page.supportingServices]}
      />

      <PathwaysGrid
        eyebrow={page.engagementEyebrow}
        heading={page.engagementHeading}
        subtitle={page.engagementSubtitle}
        pathways={[...page.engagementOptions]}
        columns={2}
        showImages={false}
      />
      {page.engagementNote && (
        <div className="bg-warm pb-20 sm:pb-28 -mt-20 sm:-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="max-w-2xl text-sm text-navy-500 leading-relaxed">{page.engagementNote}</p>
          </div>
        </div>
      )}

      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              {page.processEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.processHeading}</h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.processIntro}</p>
          </Reveal>
          <ProcessDiagram
            stages={page.processStages.map((s) => ({ ...s, icon: ICONS[s.iconKey as IconKey] }))}
            rows={page.processRows.filter((n): n is number => n != null)}
            shortcut={
              page.processShortcutFromIndex != null && page.processShortcutToIndex != null && page.processShortcutLabel
                ? { from: page.processShortcutFromIndex, to: page.processShortcutToIndex, label: page.processShortcutLabel }
                : undefined
            }
            loop={
              page.processLoopFromIndex != null && page.processLoopToIndex != null && page.processLoopLabel
                ? { from: page.processLoopFromIndex, to: page.processLoopToIndex, label: page.processLoopLabel }
                : undefined
            }
            caption={page.processCaption}
          />
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.marketHeading}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {page.marketCoverage.map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="h-full rounded-2xl border border-warm-border bg-white p-7 sm:p-8">
                  <h3 className="text-lg font-medium text-navy-900">{m.title}</h3>
                  <p className="mt-2 text-sm text-navy-600 leading-relaxed">{m.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {page.marketSharedLine && (
            <p className="mt-6 max-w-2xl text-sm text-navy-500 leading-relaxed">{page.marketSharedLine}</p>
          )}
        </div>
      </section>

      <BenefitsGrid
        eyebrow={page.benefitsEyebrow}
        heading={page.benefitsHeading}
        subtitle={page.benefitsSubtitle}
        benefits={page.benefits.map((b) => ({ ...b, icon: ICONS[b.iconKey as IconKey] }))}
      />

      {page.teamStatsVisible && (
        <StatBand heading={page.teamStatsHeading} stats={[...page.teamStats]} />
      )}
      {page.teamStatsVisible && page.teamStatsAttribution && (
        <p className="bg-ink px-4 pb-16 text-center text-xs text-white/50 max-w-2xl mx-auto -mt-10">
          {page.teamStatsAttribution}
        </p>
      )}

      <SplitCTA
        heading={page.ctaHeading}
        description={page.ctaDescription}
        ctaText={page.ctaLabel}
        ctaHref={page.ctaHref}
        image={page.ctaImage}
        imagePlaceholderLabel="Photo"
      />

      <FAQDark heading={page.faqHeading} faqs={[...page.faqs]} />
    </>
  );
}
