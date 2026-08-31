import type { Metadata } from "next";
import Link from "next/link";
import AIHero from "@/components/service-page/ai-consulting/AIHero";
import StatStrip from "@/components/service-page/ai-consulting/StatStrip";
import HairlineGrid from "@/components/service-page/ai-consulting/HairlineGrid";
import FlowStages from "@/components/service-page/ai-consulting/FlowStages";
import TerminalPanel from "@/components/service-page/ai-consulting/TerminalPanel";
import CalloutBand from "@/components/service-page/ai-consulting/CalloutBand";
import SectionHeading from "@/components/SectionHeading";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

export const metadata: Metadata = {
  title: "AI Consulting & Solution Engineering",
  description:
    "From requirement to working solution — AI-enabled consulting, solution architecture and engineering that turns ambiguity into deployable outcomes.",
};

export default async function AIConsultingPage() {
  const reader = getKeystaticReader();
  const page = await reader.singletons.aiConsultingPage.read();
  if (!page) throw new Error("aiConsultingPage singleton is missing");

  const withIcon = <T extends { iconKey: string }>(items: readonly T[]) =>
    items.map((item) => ({ ...item, icon: ICONS[item.iconKey as IconKey] }));

  return (
    <>
      <AIHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        lead={page.heroLead}
        primaryLabel={page.heroPrimaryLabel}
        primaryHref={page.heroPrimaryHref}
        secondaryLabel={page.heroSecondaryLabel}
        secondaryHref={page.heroSecondaryHref}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      <div className="bg-ink">
        <StatStrip
          stats={[
            { value: String(page.stages.length).padStart(2, "0"), label: "Delivery Stages" },
            { value: String(page.capabilities.length).padStart(2, "0"), label: "Capabilities" },
            { value: String(page.engagementModels.length).padStart(2, "0"), label: "Engagement Models" },
            { value: String(page.techPlatforms.length).padStart(2, "0"), label: "AI Platforms Supported" },
          ]}
        />
      </div>

      {/* The Gap We Solve — white */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.gapHeading}</h2>
              </Reveal>
              <Reveal delay={80} className="mt-8">
                {page.gapImage ? (
                  <img src={page.gapImage} alt="" className="w-full aspect-[3/4] object-cover rounded-2xl" />
                ) : (
                  <ImagePlaceholder label="Photo" className="w-full aspect-[3/4]" />
                )}
              </Reveal>
            </div>
            <div>
              <div className="space-y-4 max-w-2xl">
                {page.gapParagraphs.map((p, i) => (
                  <Reveal key={i} delay={i * 60}>
                    <p className="text-navy-600 leading-relaxed">{p}</p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10 max-w-2xl">
                <CalloutBand quote={page.gapCalloutQuote} text={page.gapCalloutText} />
              </div>

              <div className="mt-14">
                <Reveal>
                  <h3 className="text-xl font-medium text-navy-900 mb-6">{page.gapEntryHeading}</h3>
                </Reveal>
                <HairlineGrid items={withIcon(page.gapEntryPoints)} columns={2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do — dark */}
      <section className="py-20 sm:py-28 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-blue-300 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              {page.capabilitiesEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{page.capabilitiesHeading}</h2>
            <p className="mt-4 text-white/60 leading-relaxed">{page.capabilitiesLead}</p>
          </Reveal>

          <HairlineGrid items={withIcon(page.capabilities)} columns={4} dark />

          <div className="mt-16 grid lg:grid-cols-2 gap-6 items-stretch">
            <Reveal className="rounded-2xl border border-white/10 p-8 sm:p-10 flex flex-col justify-center">
              <h3 className="text-lg font-medium text-white">{page.capabilitiesNoteHeading}</h3>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{page.capabilitiesNoteText}</p>
            </Reveal>
            <CalloutBand quote={page.capabilitiesCalloutQuote} text={page.capabilitiesCalloutText} />
          </div>
        </div>
      </section>

      {/* How We Build — white: flow chart + leverage + principle */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-blue-600 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              {page.methodEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.methodHeading}</h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.methodLead}</p>
          </Reveal>

          <FlowStages stages={withIcon(page.stages)} />

          <div className="mt-20">
            <SectionHeading title={page.leverageHeading} />
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <HairlineGrid items={withIcon(page.leverageAreas)} columns={2} />
              <TerminalPanel />
            </div>

            <Reveal delay={200} className="mt-14 pt-8 border-t border-warm-border max-w-2xl mx-auto text-center">
              <h3 className="text-xs font-mono tracking-wider uppercase text-blue-600">{page.principleHeading}</h3>
              <p className="mt-3 text-lg text-navy-700 leading-relaxed font-light">{page.principleText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Modern Technology — dark */}
      <section className="py-20 sm:py-28 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10 lg:gap-12 items-center mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-blue-300 uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                {page.techEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{page.techHeading}</h2>
              <p className="mt-4 text-white/55 leading-relaxed">{page.techText}</p>
            </Reveal>
            <Reveal delay={100}>
              {page.techImage ? (
                <img src={page.techImage} alt="" className="w-full aspect-[4/3] object-cover rounded-2xl" />
              ) : (
                <ImagePlaceholder label="Photo" className="w-full aspect-[4/3]" dark />
              )}
            </Reveal>
          </div>

          <HairlineGrid items={page.techStack.map((t) => ({ ...t }))} columns={4} dark />

          <Reveal delay={150} className="flex flex-wrap items-center gap-2 mt-10">
            <span className="text-xs font-mono tracking-wider uppercase text-white/40 mr-1">Platforms &mdash;</span>
            {page.techPlatforms.map((platform) => (
              <span
                key={platform}
                className="px-3 py-1.5 rounded border border-white/12 text-xs font-mono text-white/65"
              >
                [ {platform} ]
              </span>
            ))}
          </Reveal>

          <Reveal delay={200} className="mt-10 rounded-lg border border-white/10 bg-white/[0.02] p-7 sm:p-9 max-w-3xl">
            <h3 className="text-xs font-mono tracking-wider uppercase text-white/40">{page.techAgnosticHeading}</h3>
            <p className="mt-3 text-sm text-white/55 leading-relaxed">{page.techAgnosticText}</p>
          </Reveal>
        </div>
      </section>

      {/* Engagement & Fit — white */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-blue-600 uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              {page.engagementEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.engagementHeading}</h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.engagementLead}</p>
          </Reveal>

          <HairlineGrid
            items={page.engagementModels.map((m) => ({ title: m.title, description: m.description, number: m.number }))}
            columns={4}
          />

          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            <Reveal>
              <h3 className="text-xs font-mono tracking-wider uppercase text-navy-500 mb-4">{page.crossIndustryHeading}</h3>
              <p className="text-navy-600 leading-relaxed">{page.crossIndustryText}</p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="text-xs font-mono tracking-wider uppercase text-navy-500 mb-4">{page.whyUsHeading}</h3>
              <div className="border-t border-warm-border">
                {page.whyUs.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 py-3 border-b border-warm-border">
                    <svg
                      className="w-[18px] h-[18px] text-blue-600 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={ICONS[item.iconKey as IconKey]} />
                    </svg>
                    <span className="text-base font-medium text-navy-900 shrink-0 w-40">{item.title}</span>
                    <span className="text-sm text-navy-600 leading-relaxed">{item.description}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Final CTA — dark */}
      <section className="relative py-20 sm:py-28 bg-ink overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-[220px_1fr] gap-10 sm:gap-12 items-center">
            <Reveal>
              {page.ctaImage ? (
                <img src={page.ctaImage} alt="" className="w-full aspect-square object-cover rounded-2xl" />
              ) : (
                <ImagePlaceholder label="Photo" className="w-full aspect-square" dark />
              )}
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white max-w-xl">{page.ctaHeading}</h2>
              <p className="mt-4 text-white/55 leading-relaxed max-w-lg">{page.ctaText}</p>
              <Link
                href={page.ctaHref}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-ink text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                {page.ctaLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
