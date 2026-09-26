import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import BenefitsGrid from "@/components/service-page/BenefitsGrid";
import ProcessDiagram from "@/components/service-page/ProcessDiagram";
import PathwaysGrid from "@/components/service-page/PathwaysGrid";
import SplitCTA from "@/components/service-page/SplitCTA";
import Reveal from "@/components/Reveal";
import Callout from "@/components/Callout";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

export const metadata: Metadata = {
  title: "AI Consulting & Solution Engineering",
  description:
    "From requirement to working solution: use-case discovery, custom solution development, GenAI and knowledge solutions, and AI agent prototypes.",
};

export default async function AIConsultingPage() {
  const reader = getKeystaticReader();
  const page = await reader.singletons.aiConsultingPage.read();
  if (!page) throw new Error("aiConsultingPage singleton is missing");

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
      />

      <BenefitsGrid
        eyebrow={page.capabilitiesEyebrow}
        heading={page.capabilitiesHeading}
        subtitle={page.capabilitiesLead}
        benefits={page.capabilities.map((c) => ({ ...c, icon: ICONS[c.iconKey as IconKey] }))}
        columns={2}
      />

      {/* What We Can Help You Build — compact rows, deliberately distinct from the capability cards */}
      <section id="examples" className="py-10 sm:py-[50px] bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.examplesHeading}</h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.examplesIntro}</p>
          </Reveal>
          <div className="divide-y divide-warm-border border-t border-b border-warm-border">
            {page.examples.map((ex, i) => (
              <Reveal key={ex.title} delay={i * 70} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5">
                <span className="text-base font-medium text-navy-900 sm:w-72 shrink-0">{ex.title}</span>
                <span className="text-sm text-navy-600 leading-relaxed">{ex.description}</span>
              </Reveal>
            ))}
          </div>
          {page.examplesTechNote && (
            <Callout label={page.examplesTechNoteLabel} className="mt-8">
              {page.examplesTechNote}
            </Callout>
          )}
        </div>
      </section>

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
            loop={
              page.processLoopFromIndex != null && page.processLoopToIndex != null && page.processLoopLabel
                ? { from: page.processLoopFromIndex, to: page.processLoopToIndex, label: page.processLoopLabel }
                : undefined
            }
            exit={
              page.processExitAtIndex != null && page.processExitLabel
                ? { at: page.processExitAtIndex, label: page.processExitLabel }
                : undefined
            }
            caption={page.processCaption}
            captionLabel={page.processCaptionLabel}
          />
        </div>
      </section>

      <PathwaysGrid
        eyebrow={page.engagementEyebrow}
        heading={page.engagementHeading}
        subtitle={page.engagementLead}
        pathways={[...page.engagementOptions]}
        columns={3}
        showImages={false}
      />

      <BenefitsGrid
        eyebrow="Why Work With Us"
        heading={page.whyUsHeading}
        benefits={page.whyUs.map((w) => ({ ...w, icon: ICONS[w.iconKey as IconKey] }))}
        columns={3}
      />

      <SplitCTA
        heading={page.ctaHeading}
        description={page.ctaText}
        ctaText={page.ctaLabel}
        ctaHref={page.ctaHref}
        image={page.ctaImage}
        imagePlaceholderLabel="Photo"
      />
    </>
  );
}
