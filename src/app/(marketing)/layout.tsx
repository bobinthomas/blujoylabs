import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getKeystaticReader } from "@/lib/keystatic-reader";

// Content comes from the GitHub reader's uncached fetches at request time, so these
// routes can't be statically generated/ISR'd — force real per-request rendering.
export const dynamic = "force-dynamic";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const settings = await getKeystaticReader().singletons.siteSettings.read();

  if (!settings) {
    throw new Error("siteSettings singleton is missing — run the Keystatic seed content step");
  }

  return (
    <>
      <Header servicesLinks={settings.servicesLinks} ctaLabel={settings.headerCtaLabel} ctaHref={settings.headerCtaHref} />
      <main className="flex-1 pt-20 sm:pt-[88px] lg:pt-24">{children}</main>
      <Footer
        productLinks={settings.servicesLinks}
        resourceLinks={settings.footerResourceLinks}
        companyLinks={settings.footerCompanyLinks}
        socialLinks={settings.footerSocialLinks}
        tagline={settings.footerTagline}
        newsletterHeading={settings.footerNewsletterHeading}
        copyrightText={settings.footerCopyrightText}
      />
    </>
  );
}
