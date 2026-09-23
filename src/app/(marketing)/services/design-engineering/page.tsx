import type { Metadata } from "next";
import Link from "next/link";
import ServiceHero from "@/components/service-page/ServiceHero";
import PathwaysGrid from "@/components/service-page/PathwaysGrid";
import ProcessDiagram from "@/components/service-page/ProcessDiagram";
import BenefitsGrid from "@/components/service-page/BenefitsGrid";
import SelectedWork, { type SelectedWorkItem } from "@/components/service-page/SelectedWork";
import SplitCTA from "@/components/service-page/SplitCTA";
import FAQDark from "@/components/service-page/FAQDark";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

const SLUG = "design-engineering";

export const metadata: Metadata = {
  title: "Design & Engineering",
  description:
    "Brand identity, product design, and website design and development — with scope and deliverables tailored to your project.",
};

export default async function DesignEngineeringPage() {
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
        secondaryLabel={page.selectedWorkVisible ? "View Selected Work" : undefined}
        secondaryHref={page.selectedWorkVisible ? "#selected-work" : undefined}
      />

      <PathwaysGrid
        eyebrow={page.pathwaysEyebrow}
        heading={page.pathwaysHeading}
        subtitle={page.pathwaysSubtitle}
        pathways={page.pathways.map((p) => ({ ...p, imagePlaceholderLabel: "Photo" }))}
      />

      {page.crossLinkText && page.crossLinkLabel && (
        <div className="bg-warm pb-20 sm:pb-28 -mt-20 sm:-mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-navy-600">
              {page.crossLinkText}{" "}
              <Link href={page.crossLinkHref} className="font-medium text-blue-600 hover:text-blue-700">
                {page.crossLinkLabel}
              </Link>
              .
            </p>
          </div>
        </div>
      )}

      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{page.processHeading}</h2>
            <p className="mt-4 text-navy-600 leading-relaxed">{page.processIntro}</p>
          </Reveal>
          <ProcessDiagram
            stages={page.processStages.map((s) => ({ ...s, icon: ICONS[s.iconKey as IconKey] }))}
            rows={page.processRows.filter((n): n is number => n != null)}
            branch={
              page.processBranchFromIndex != null && page.processBranchToIndex != null && page.processBranchLabel
                ? { fromStage: page.processBranchFromIndex, toStage: page.processBranchToIndex, label: page.processBranchLabel }
                : undefined
            }
            caption={page.processCaption}
          />
        </div>
      </section>

      <BenefitsGrid
        eyebrow={page.benefitsEyebrow}
        heading={page.benefitsHeading}
        subtitle={page.benefitsSubtitle}
        benefits={page.benefits.map((b) => ({ ...b, icon: ICONS[b.iconKey as IconKey] }))}
        columns={3}
      />

      {page.selectedWorkVisible && (
        <div id="selected-work">
          <SelectedWork
            heading={page.selectedWorkHeading}
            intro={page.selectedWorkIntro}
            items={page.selectedWorkItems as SelectedWorkItem[]}
          />
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
