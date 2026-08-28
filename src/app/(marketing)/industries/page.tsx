import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import AlternatingRows from "@/components/service-page/AlternatingRows";
import SplitCTA from "@/components/service-page/SplitCTA";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "Industries",
  description: "Government, enterprise, and growth-stage companies — we speak your language and understand your constraints.",
};

export default async function IndustriesPage() {
  const page = await getKeystaticReader().singletons.industriesPage.read();
  if (!page) throw new Error("industriesPage singleton is missing");

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      <AlternatingRows
        rows={page.industries.map((row) => ({ ...row, imagePlaceholderLabel: `Photo — ${row.title}` }))}
      />

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
