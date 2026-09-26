import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

function IconMark({
  d,
  className,
  strokeWidth = 1.5,
}: {
  d: string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d={d} />
    </svg>
  );
}

export default async function HomePage() {
  const reader = getKeystaticReader();
  const home = await reader.singletons.homePage.read();
  if (!home) throw new Error("homePage singleton is missing");

  return (
    <>
      {/* Hero — navy wash over the photo, near-white text, white primary button.
          Both CTAs point at on-page anchors (#enquiry / #services), so neither
          can become a dead destination. */}
      <section className="relative -mt-20 sm:-mt-[88px] lg:-mt-24 min-h-[620px] sm:min-h-[700px] lg:min-h-[780px] flex items-end overflow-hidden bg-navy-900">
        {home.heroImage ? (
          <img
            src={home.heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <ImagePlaceholder label="Hero photo" className="absolute inset-0 w-full h-full rounded-none" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,35,63,0.92) 0%, rgba(16,35,63,0.78) 45%, rgba(16,35,63,0.45) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(16,35,63,0.7), transparent 45%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-20 sm:pb-24 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/25 text-sm font-medium text-white mb-6">
                {home.heroBadge}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="max-w-lg text-4xl sm:text-5xl font-normal tracking-tight leading-[1.08] text-white">
                {home.heroHeadline}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">
                {home.heroSubheadline}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href={home.heroCtaPrimaryHref}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-navy-900 font-medium rounded-full hover:bg-warm-dark transition-colors text-lg"
                >
                  {home.heroCtaPrimaryLabel}
                  <span className="w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />
                </Link>
                <Link
                  href={home.heroCtaSecondaryHref}
                  className="inline-flex items-center px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/40 hover:bg-white/20 transition-colors text-lg"
                >
                  {home.heroCtaSecondaryLabel}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How We Can Help — three equal cards, descriptions always visible (no
          hover-to-reveal), each linking to its real service page. */}
      <section id="services" className="scroll-mt-24 py-10 sm:py-[50px] bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <div className="text-lg sm:text-xl font-mono tracking-wider text-blue-600 uppercase mb-4">
              {home.pillarsEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-navy-900">
              {home.pillarsHeading}
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
            {home.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90} className="h-full">
                <Link
                  href={pillar.href}
                  style={{ ["--accent" as string]: pillar.color }}
                  className="group flex h-full flex-col rounded-3xl border border-warm-border bg-white p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] hover:card-shadow-hover"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light text-[var(--accent)]">
                    <IconMark d={ICONS[pillar.iconKey as IconKey]} className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-xl font-medium text-navy-900">{pillar.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-navy-600">{pillar.description}</p>
                  <span
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: pillar.color }}
                  >
                    {pillar.linkLabel}
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Right Expertise. A Clear Way Forward. — three compact commitments on a
          teal band. White on #0F766E is about 5.4:1, so the eyebrow and heading pass AA. */}
      <section className="py-10 sm:py-[50px] bg-teal-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Wider than the services block so the heading holds one line at 48px */}
          <Reveal className="max-w-4xl mb-12">
            <div className="text-lg sm:text-xl font-mono tracking-wider text-white uppercase mb-4">
              {home.whyUsEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
              {home.whyUsHeading}
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
            {home.whyUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col rounded-3xl border border-warm-border bg-warm p-7 sm:p-8">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-warm-border text-blue-600">
                    <IconMark d={ICONS[item.iconKey as IconKey]} className="w-5 h-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-6 text-lg font-medium text-navy-900">{item.title}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-navy-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Talk About What You Need — the three steps sit directly above the
          enquiry form in one section, so the form needs no second heading. */}
      <section id="enquiry" className="scroll-mt-24 py-10 sm:py-[50px] bg-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{home.stepsHeading}</h2>
            <p className="mt-4 text-lg text-navy-600 leading-relaxed">{home.stepsSubtitle}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {home.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 90} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-warm-border bg-white p-6">
                  <span className="text-sm font-mono font-medium text-blue-600">{i + 1}</span>
                  <h3 className="mt-2 font-medium text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy-600 leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12 max-w-2xl mx-auto">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 sm:py-[50px] bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{home.faqHeading}</h2>
            {home.faqSubtitle && <p className="mt-4 text-lg text-navy-600">{home.faqSubtitle}</p>}
          </Reveal>
          <Reveal className="border-t border-warm-border">
            {home.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-warm-border">
                <summary className="flex items-center justify-between py-5 cursor-pointer font-medium text-navy-900 hover:text-graphite transition-colors list-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  {faq.question}
                  <svg className="w-5 h-5 text-navy-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pb-5 text-navy-600 text-[16px] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
