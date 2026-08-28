import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import ContactFormCard from "@/components/ContactFormCard";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

function IconMark({
  d,
  className,
  strokeWidth = 1.5,
  style,
}: {
  d: string;
  className?: string;
  strokeWidth?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d={d} />
    </svg>
  );
}

function ServiceLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 card-shadow text-sm sm:text-base font-semibold text-navy-900 ${className}`}
    >
      {text}
    </div>
  );
}

const checkIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const FEATURE_GRADIENTS = [
  "linear-gradient(135deg, #121722 0%, #2d2d2d 100%)",
  "linear-gradient(135deg, #046645 0%, #0068f9 100%)",
];

const WHY_US_LAYOUT = [
  { span: "lg:col-span-2 lg:row-span-2", minH: "lg:min-h-[380px]" },
  { span: "lg:col-span-4", minH: "lg:min-h-[180px]" },
  { span: "lg:col-span-2", minH: "lg:min-h-[180px]" },
  { span: "lg:col-span-2", minH: "lg:min-h-[180px]" },
  { span: "lg:col-span-3", minH: "lg:min-h-[180px]" },
  { span: "lg:col-span-3", minH: "lg:min-h-[180px]" },
];
const DEFAULT_WHY_US_LAYOUT = { span: "lg:col-span-2", minH: "lg:min-h-[180px]" };

export default async function HomePage() {
  const reader = getKeystaticReader();
  const home = await reader.singletons.homePage.read();
  if (!home) throw new Error("homePage singleton is missing");

  const testimonialSlugs = home.testimonials.filter((slug): slug is string => slug !== null);
  const testimonials = (
    await Promise.all(testimonialSlugs.map((slug) => reader.collections.testimonials.read(slug)))
  ).filter((t): t is NonNullable<typeof t> => t !== null);

  const featureGradientByIndex = new Map<number, string>();
  {
    let featureCount = 0;
    home.floatingCards.forEach((card, i) => {
      if (card.type === "feature") {
        featureGradientByIndex.set(i, FEATURE_GRADIENTS[featureCount % FEATURE_GRADIENTS.length]);
        featureCount++;
      }
    });
  }

  return (
    <>
      {/* Hero + floating card row share this positioning context so the row
          below can be pinned to the hero's bottom edge with position: absolute. */}
      <div className="relative">
        <section className="relative -mt-20 sm:-mt-[88px] lg:-mt-24 min-h-[700px] sm:min-h-[800px] lg:min-h-[920px] flex items-end overflow-hidden">
          {home.heroImage ? (
            <img
              src={home.heroImage}
              alt="Blujoy team collaborating"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <ImagePlaceholder label="Hero photo" className="absolute inset-0 w-full h-full rounded-none" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(18,23,34,0.88) 0%, rgba(18,23,34,0.6) 40%, rgba(18,23,34,0.2) 70%, rgba(18,23,34,0.05) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(18,23,34,0.65), transparent 40%)" }}
          />
          {/* Subtle edge softening only — the photo should still read clearly behind the cards */}
          <div
            className="absolute inset-x-0 bottom-0 h-10 sm:h-14 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, #faf9f7)" }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 pb-28 sm:pb-36 lg:pb-44 w-full">
            <div className="max-w-2xl">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-sm font-medium text-white mb-6">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                  {home.heroBadge}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-white">
                  {home.heroHeadline}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed">
                  {home.heroSubheadline}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
                  <Link
                    href={home.heroCtaPrimaryHref}
                    className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white text-navy-900 font-medium rounded-full hover:bg-warm-dark transition-all text-lg"
                  >
                    {home.heroCtaPrimaryLabel}
                    <span className="w-2 h-2 rounded-full bg-blue-600" aria-hidden="true" />
                  </Link>
                  <Link
                    href={home.heroCtaSecondaryHref}
                    className="inline-flex items-center px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/30 hover:bg-white/20 transition-colors text-lg"
                  >
                    {home.heroCtaSecondaryLabel}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Overlapping card marquee — pinned to the hero's bottom edge with
            position: absolute so it floats free of document flow; the section
            below adds top clearance so its own content starts beneath it. */}
        <section className="absolute inset-x-0 top-full -translate-y-16 sm:-translate-y-20 lg:-translate-y-24 z-10">
          <Reveal className="overflow-hidden">
            <div className="flex w-max gap-5 marquee-track hover:[animation-play-state:paused]">
              {[...home.floatingCards, ...home.floatingCards].map((card, i) => {
                const iconPath = card.iconKey ? ICONS[card.iconKey as IconKey] : undefined;
                const icon = card.type === "logo" ? checkIcon : iconPath ? <IconMark d={iconPath} /> : null;
                const gradient = featureGradientByIndex.get(i % home.floatingCards.length);
                return (
                  <div
                    key={`${card.title}-${i}`}
                    className={`relative flex flex-col justify-end shrink-0 p-6 rounded-[32px] card-shadow overflow-hidden ${
                      card.type === "stat" || card.type === "logo"
                        ? "w-[220px] sm:w-[240px] h-[340px] sm:h-[380px] bg-white"
                        : "w-[280px] sm:w-[320px] h-[340px] sm:h-[380px] text-white"
                    }`}
                    style={card.type === "feature" ? { background: gradient } : undefined}
                  >
                    {card.type === "photo" && card.image && (
                      <img
                        src={card.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "75% 30%" }}
                      />
                    )}
                    {(card.type === "feature" || card.type === "photo") && (
                      <div
                        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                        style={{ background: "linear-gradient(to top, rgba(18,23,34,0.85), transparent)" }}
                      />
                    )}
                    {card.type === "logo" && (
                      <div className="absolute top-5 left-5 w-9 h-9 rounded-full bg-navy-900 text-white flex items-center justify-center">
                        {icon}
                      </div>
                    )}
                    {(card.type === "stat" || card.type === "feature") && icon && (
                      <div
                        className={`absolute top-5 right-5 w-9 h-9 rounded-full border flex items-center justify-center ${
                          card.type === "stat"
                            ? "border-navy-900/25 text-navy-900"
                            : "border-white/50 bg-white/10 backdrop-blur-sm text-white"
                        }`}
                      >
                        {icon}
                      </div>
                    )}
                    <div className="relative">
                      {card.type === "stat" && (
                        <>
                          <div className="text-5xl sm:text-6xl font-light text-navy-900">{card.value}</div>
                          {card.eyebrow && (
                            <div className="mt-4 text-xs font-semibold tracking-wider text-blue-600 uppercase">
                              {card.eyebrow}
                            </div>
                          )}
                          <p className="mt-1 text-sm text-navy-600 leading-relaxed">{card.title}</p>
                        </>
                      )}
                      {card.type === "logo" && (
                        <>
                          <div className="flex items-center justify-center mb-6">
                            <span className="text-4xl font-semibold tracking-tight text-navy-900 border-2 border-blue-600 rounded-xl px-4 py-2">
                              {card.value}
                            </span>
                          </div>
                          <div className="text-xs font-semibold tracking-wider text-blue-600 uppercase">
                            {card.eyebrow}
                          </div>
                          <p className="mt-1 text-sm text-navy-600 leading-relaxed">{card.title}</p>
                        </>
                      )}
                      {(card.type === "feature" || card.type === "photo") && (
                        <>
                          <div className="text-xs font-semibold tracking-wider text-blue-100 uppercase">
                            {card.eyebrow}
                          </div>
                          <p className="mt-2 text-lg font-medium leading-snug">{card.title}</p>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      </div>

      {/* Three Pillars - Illustrated cards — sits below the floating card row;
          pt-80 clears the row's max height (380px) minus its hero overlap. */}
      <section className="pt-80 pb-20 sm:pb-28 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-sm font-mono font-medium tracking-wider text-blue-600 uppercase mb-4">
              <span className="w-3.5 h-3.5 border border-current rounded-[3px]" />
              {home.pillarsEyebrow}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-navy-900">
              {home.pillarsHeading}
            </h2>
            <p className="mt-4 text-lg text-navy-600">{home.pillarsSubtitle}</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {home.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <Link
                  href={pillar.href}
                  style={{ ["--accent" as string]: pillar.color }}
                  className="group relative flex h-[420px] sm:h-[460px] flex-col rounded-3xl border border-navy-200/70 bg-gradient-to-br from-white to-navy-100 p-6 sm:p-7 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:card-shadow-hover"
                >
                  {/* Soft color glow behind the icon — intensifies on hover */}
                  <div
                    className="absolute left-1/2 top-1/2 w-56 h-56 sm:w-64 sm:h-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-[0.12] transition-opacity duration-500 group-hover:opacity-25 pointer-events-none"
                    style={{ background: pillar.color }}
                  />

                  {pillar.labelPosition === "top" && (
                    <ServiceLabel text={pillar.title} className="absolute top-6 left-6 sm:top-7 sm:left-7 z-10" />
                  )}

                  {/* Index + arrow badge */}
                  <div className="absolute top-6 right-6 sm:top-7 sm:right-7 z-10 flex items-center gap-2">
                    <span className="font-mono text-xs text-navy-400">0{i + 1}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-300/70 text-navy-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H8M17 7v9" />
                      </svg>
                    </span>
                  </div>

                  <div className="relative flex-1 flex items-center justify-center">
                    {pillar.image ? (
                      <img
                        src={pillar.image}
                        alt=""
                        className="w-[190px] h-[190px] sm:w-[229px] sm:h-[229px] object-contain transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-90"
                      />
                    ) : (
                      <ImagePlaceholder
                        label="Illustration"
                        className="w-[190px] h-[190px] sm:w-[229px] sm:h-[229px] transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-90"
                      />
                    )}
                    {/* Description + Learn More — revealed on hover, in place of the icon.
                        Top-anchored below the index badge / top label row (not centered),
                        with a line-clamp so its height stays predictable and clear of the
                        corner label at the bottom. */}
                    <div className="absolute inset-x-0 top-16 sm:top-20 px-1 opacity-0 translate-y-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                      <p className="text-[15px] text-navy-700 leading-relaxed line-clamp-4">{pillar.description}</p>
                      <div className="mt-5 flex items-center gap-2 font-medium text-sm" style={{ color: pillar.color }}>
                        Learn More
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <span className="mt-3 block text-xs font-medium text-navy-500 uppercase tracking-wider">
                        {pillar.stats}
                      </span>
                    </div>
                  </div>
                  {pillar.labelPosition === "bottom" && (
                    <ServiceLabel text={pillar.title} className="absolute bottom-6 left-6 sm:bottom-7 sm:left-7 z-10" />
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us - Bento Grid */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3 mb-12">
            <p className="text-xs font-semibold tracking-[0.15em] text-blue-600 uppercase">{home.whyUsEyebrow}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-navy-900 lg:text-right">
              {home.whyUsHeading}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            {home.whyUs.map((item, i) => {
              const layout = WHY_US_LAYOUT[i] ?? DEFAULT_WHY_US_LAYOUT;
              const iconPath = ICONS[item.iconKey as IconKey];
              return (
                <Reveal key={item.title} delay={i * 70} className={`${layout.span} ${layout.minH}`}>
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-warm-border bg-gradient-to-br from-white to-accent-light/70 p-7 sm:p-8 flex flex-col justify-between card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
                    <IconMark
                      d={iconPath}
                      className="absolute -right-6 -bottom-6 w-40 h-40 text-blue-600 opacity-[0.07] rotate-6 transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:scale-110 pointer-events-none"
                    />
                    <div className="relative w-11 h-11 rounded-xl bg-white border border-warm-border flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <IconMark d={iconPath} className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="relative mt-auto pt-8">
                      <h3 className="text-lg font-medium text-navy-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-navy-600 leading-relaxed max-w-xs">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Logo Grid */}
      <section className="py-16 bg-warm border-y border-warm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-navy-400 mb-8">
            Trusted across government and enterprise ecosystems
          </p>
          <Reveal>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-y-8">
              {home.logos.map((logo) => (
                <span
                  key={logo.name}
                  className="flex items-center justify-center text-lg font-medium text-navy-400 opacity-60 hover:opacity-100 transition-opacity tracking-tight"
                >
                  {logo.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="bg-ink rounded-2xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden relative">
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full -translate-y-1/3 translate-x-1/3 animate-orb-spin"
              style={{
                background: "conic-gradient(from 0deg, #0068f9, #6736eb, transparent 70%)",
                filter: "blur(50px)",
                opacity: 0.4,
              }}
            />
            <div className="relative">
              <div className="inline-flex items-center px-3 py-1 bg-white/15 text-sm font-medium rounded-full mb-6">
                {home.caseStudyBadge}
              </div>
              <h2 className="text-3xl sm:text-4xl font-light leading-tight max-w-2xl">{home.caseStudyHeadline}</h2>
              <p className="mt-5 text-blue-100 text-lg max-w-2xl leading-relaxed">{home.caseStudyDescription}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href={home.caseStudyHref}
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-medium rounded-full hover:bg-blue-50 transition-colors"
                >
                  {home.caseStudyLinkLabel}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How We Work — steps, then the testimonial + contact form directly below,
          all in one continuous section (single background, single heading). */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={home.stepsHeading} subtitle={home.stepsSubtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8 text-center">
            {home.steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <div className="text-5xl sm:text-6xl font-light text-navy-300">0{i + 1}</div>
                <h3 className="mt-4 text-lg font-medium text-navy-900">{step.title}</h3>
                <p className="mt-2 text-navy-600 text-[15px] leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </Reveal>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch mt-16 sm:mt-20">
            <Reveal>
              <TestimonialCarousel testimonials={testimonials} />
            </Reveal>
            <Reveal delay={100}>
              <ContactFormCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-warm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={home.faqHeading} subtitle={home.faqSubtitle} />
          <Reveal className="border-t border-warm-border">
            {home.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-warm-border">
                <summary className="flex items-center justify-between py-5 cursor-pointer font-medium text-navy-900 hover:text-graphite transition-colors list-none">
                  {faq.question}
                  <svg className="w-5 h-5 text-navy-400 group-open:rotate-180 transition-transform shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pb-5 text-navy-600 text-[15px] leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20 sm:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #faf9f7 0%, #faf9f7 55%, #c8dcf5 82%, #0068f9 100%)",
        }}
      >
        <Reveal className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-navy-900 tracking-tight">{home.finalCtaHeadline}</h2>
          <p className="mt-4 text-lg text-navy-600">{home.finalCtaDescription}</p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={home.finalCtaPrimaryHref}
              className="inline-flex items-center px-8 py-3.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors text-lg"
            >
              {home.finalCtaPrimaryLabel}
            </Link>
            <Link
              href={home.finalCtaSecondaryHref}
              className="inline-flex items-center px-8 py-3.5 bg-white border border-warm-border text-navy-900 font-medium rounded-full hover:bg-warm-dark transition-colors text-lg"
            >
              {home.finalCtaSecondaryLabel}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
