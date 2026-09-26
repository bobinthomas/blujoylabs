import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";

/**
 * DRAFT — this policy has not been through legal review. The copy deliberately
 * describes only what the site actually does today: a single enquiry form, no
 * analytics, no advertising cookies. If any of that changes — an analytics
 * script, a newsletter, an embedded third-party widget — this page has to
 * change with it, or it becomes an inaccurate public statement.
 */
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BluJoy Labs collects, uses and retains the personal information you submit through this website.",
};

export default async function PrivacyPage() {
  const page = await getKeystaticReader().singletons.privacyPage.read();
  if (!page) throw new Error("privacyPage singleton is missing");

  return (
    <>
      <section className="bg-ink pt-16 pb-14 sm:pt-20 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 *:max-w-3xl">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-white">{page.heading}</h1>
            {page.lastUpdated && (
              <p className="mt-4 text-sm text-white/60">Last updated {page.lastUpdated}</p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="py-10 sm:py-[50px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 *:max-w-3xl">
          <Reveal>
            <p className="text-lg leading-relaxed text-navy-700">{page.intro}</p>
          </Reveal>

          <div className="mt-12 space-y-10">
            {page.sections.map((section, i) => (
              <Reveal key={section.heading} delay={i * 40}>
                {/* Slug ids make each section linkable, e.g. /privacy#cookies-and-tracking from the cookie notice. */}
                <h2
                  id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}
                  className="scroll-mt-32 text-xl font-medium text-navy-900"
                >
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-navy-600">{section.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 rounded-2xl border border-warm-border bg-warm p-7 sm:p-8">
            <h2 className="text-xl font-medium text-navy-900">{page.contactHeading}</h2>
            <p className="mt-3 leading-relaxed text-navy-600">{page.contactBody}</p>
            {page.contactEmail ? (
              <a
                href={`mailto:${page.contactEmail}`}
                className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700"
              >
                {page.contactEmail}
              </a>
            ) : (
              <Link href="/contact" className="mt-4 inline-block font-medium text-blue-600 hover:text-blue-700">
                Contact us
              </Link>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
