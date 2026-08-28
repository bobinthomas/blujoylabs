import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import ContactForms from "./contact-forms";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "Contact",
  description: "Whether you're ready to engage or just exploring, we'd love to hear from you.",
};

export default async function ContactPage() {
  const page = await getKeystaticReader().singletons.contactPage.read();
  if (!page) throw new Error("contactPage singleton is missing");

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      <ContactForms
        consultationHeading={page.consultationHeading}
        consultationDescription={page.consultationDescription}
        inquiryHeading={page.inquiryHeading}
        inquiryDescription={page.inquiryDescription}
        serviceOptions={[...page.serviceOptions]}
        offices={[...page.offices]}
        socialLinks={[...page.socialLinks]}
      />
    </>
  );
}
