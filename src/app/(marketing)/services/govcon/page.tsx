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
import Callout from "@/components/Callout";
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
        <div className="bg-warm -mt-10 sm:-mt-[50px] pt-6 pb-10 sm:pb-[50px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Callout label={page.engagementNoteLabel}>{page.engagementNote}</Callout>
          </div>
        </div>
      )}

      <section className="py-10 sm:py-[50px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <div className="text-lg sm:text-xl font-mono tracking-wider text-blue-600 uppercase mb-4">{page.processEyebrow}</div>
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
            captionLabel={page.processCaptionLabel}
          />
        </div>
      </section>

      <section className="py-10 sm:py-[50px] bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <Callout label={page.marketSharedLineLabel} className="mt-8">
              {page.marketSharedLine}
            </Callout>
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
        <div className="bg-ink pb-10 sm:pb-[50px]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Callout label={page.teamStatsAttributionLabel}>{page.teamStatsAttribution}</Callout>
          </div>
        </div>
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
