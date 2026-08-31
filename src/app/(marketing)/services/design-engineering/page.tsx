import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import ServiceIntro from "@/components/service-page/ServiceIntro";
import PathwaysGrid from "@/components/service-page/PathwaysGrid";
import BenefitsGrid from "@/components/service-page/BenefitsGrid";
import SupportingServicesGrid from "@/components/service-page/SupportingServicesGrid";
import TestimonialSplit from "@/components/service-page/TestimonialSplit";
import SplitCTA from "@/components/service-page/SplitCTA";
import FAQDark from "@/components/service-page/FAQDark";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

const SLUG = "design-engineering";

export const metadata: Metadata = {
  title: "Design & Engineering",
  description:
    "Brand identity, product design, and production-grade web development — from first pixel to shipped code, under one roof.",
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
      />

      <ServiceIntro
        heading={page.introHeading}
        paragraphs={[...page.introParagraphs]}
        image={page.introImage}
        imagePlaceholderLabel="Photo"
      />

      <PathwaysGrid
        eyebrow={page.pathwaysEyebrow}
        heading={page.pathwaysHeading}
        subtitle={page.pathwaysSubtitle}
        pathways={page.pathways.map((p) => ({ ...p, imagePlaceholderLabel: "Photo" }))}
      />

      <BenefitsGrid
        eyebrow={page.benefitsEyebrow}
        heading={page.benefitsHeading}
        subtitle={page.benefitsSubtitle}
        benefits={page.benefits.map((b) => ({ ...b, icon: ICONS[b.iconKey as IconKey] }))}
      />

      <SupportingServicesGrid
        heading={page.supportingHeading}
        subtitle={page.supportingSubtitle}
        services={[...page.supportingServices]}
      />

      <TestimonialSplit
        heading={page.testimonialHeading}
        quote={page.testimonialQuote}
        name={page.testimonialName}
        title={page.testimonialTitle}
        image={page.testimonialImage}
        imagePlaceholderLabel="Photo"
      />

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
