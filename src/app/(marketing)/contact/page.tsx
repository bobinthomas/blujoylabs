import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import ContactForm from "@/components/ContactForm";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you are working on and where you need help. We'll review your enquiry and contact you to discuss the next step.",
};

// Mirrors the form's own option values — a service-specific CTA elsewhere can
// preselect the right option via ?service=, and anything unrecognised is ignored.
const KNOWN_SERVICES = ["govcon", "ai-consulting", "design-engineering", "multiple-unsure"];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const page = await getKeystaticReader().singletons.contactPage.read();
  if (!page) throw new Error("contactPage singleton is missing");

  const params = await searchParams;
  const defaultService = KNOWN_SERVICES.includes(params.service ?? "") ? params.service : undefined;

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      <section className="py-10 sm:py-[50px] bg-warm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm heading={page.formHeading} defaultService={defaultService} />

          {page.contactEmail && (
            <p className="mt-8 text-center text-sm text-navy-600">
              Prefer email? Reach us at{" "}
              <a href={`mailto:${page.contactEmail}`} className="font-medium text-blue-600 hover:text-blue-700">
                {page.contactEmail}
              </a>
              .
            </p>
          )}
        </div>
      </section>
    </>
  );
}
