import type { Metadata } from "next";
import ServiceHero from "@/components/service-page/ServiceHero";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";

export const metadata: Metadata = {
  title: "Resources & Insights",
  description: "Guides, best practices, and insights from the front lines of GovCon, SAP, and digital design.",
};

const CATEGORY_META: Record<string, { title: string; icon: React.ReactNode }> = {
  "blog-articles": {
    title: "Blog & Articles",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  "govcon-guides": {
    title: "GovCon Guides",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  "sap-best-practices": {
    title: "SAP Best Practices",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
  "design-playbooks": {
    title: "Design Systems Playbooks",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  faqs: {
    title: "FAQs",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  "news-events": {
    title: "News & Events",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
};

export default async function ResourcesPage() {
  const reader = getKeystaticReader();
  const [page, resources] = await Promise.all([
    reader.singletons.resourcesPage.read(),
    reader.collections.resources.all(),
  ]);
  if (!page) throw new Error("resourcesPage singleton is missing");

  const byCategory = new Map<string, { slug: string; title: string; href: string; order: number }[]>();
  for (const { slug, entry } of resources) {
    const list = byCategory.get(entry.category) ?? [];
    list.push({ slug, title: entry.title, href: entry.href, order: entry.order ?? 0 });
    byCategory.set(entry.category, list);
  }
  for (const list of byCategory.values()) list.sort((a, b) => a.order - b.order);

  const featuredItems = byCategory.get(page.featuredCategory) ?? [];
  const otherCategories = Object.keys(CATEGORY_META).filter((c) => c !== page.featuredCategory);

  return (
    <>
      <ServiceHero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        subheadline={page.heroSubheadline}
        image={page.heroImage}
        imagePlaceholderLabel="Hero photo"
      />

      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured category */}
          <Reveal className="mb-6">
            <div className="rounded-2xl bg-white border border-warm-border overflow-hidden grid lg:grid-cols-2">
              {page.featuredImage ? (
                <img src={page.featuredImage} alt="" className="w-full min-h-[240px] object-cover" />
              ) : (
                <ImagePlaceholder label="Photo — latest article" className="w-full min-h-[240px] rounded-none border-r-0" />
              )}
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {CATEGORY_META[page.featuredCategory]?.icon}
                </div>
                <h3 className="text-2xl font-medium text-navy-900 mb-4">{CATEGORY_META[page.featuredCategory]?.title}</h3>
                <ul className="space-y-2.5">
                  {featuredItems.map((item) => (
                    <li key={item.slug}>
                      <a href={item.href} className="text-sm text-navy-600 hover:text-blue-600 transition-colors flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Remaining categories */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCategories.map((cat, i) => (
              <Reveal
                key={cat}
                delay={i * 70}
                className="h-full bg-white rounded-2xl p-8 border border-warm-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  {CATEGORY_META[cat].icon}
                </div>
                <h3 className="text-xl font-medium text-navy-900 mb-4">{CATEGORY_META[cat].title}</h3>
                <ul className="space-y-2.5">
                  {(byCategory.get(cat) ?? []).map((item) => (
                    <li key={item.slug}>
                      <a href={item.href} className="text-sm text-navy-600 hover:text-blue-600 transition-colors flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 sm:py-28 bg-ink">
        <Reveal className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{page.newsletterHeading}</h2>
          <p className="mt-4 text-white/70 leading-relaxed">{page.newsletterDescription}</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </section>
    </>
  );
}
