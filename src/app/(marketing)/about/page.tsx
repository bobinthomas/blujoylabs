import type { Metadata } from "next";
import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/Reveal";
import { getKeystaticReader } from "@/lib/keystatic-reader";
import { ICONS, type IconKey } from "@/lib/icons";

const EYEBROW = "text-lg sm:text-xl font-mono tracking-wider text-blue-600 uppercase mb-4";

/** First letter of a name for the no-photo avatar; skips placeholder brackets. */
const initial = (name: string) => (name.replace(/[^A-Za-z]/g, "").charAt(0) || "?").toUpperCase();

export const metadata: Metadata = {
  title: "About Us",
  description:
    "BluJoy Labs brings together specialists in government contracting support, AI and application development, and design, giving small businesses access to experienced support at a cost they can manage.",
};

export default async function AboutPage() {
  const reader = getKeystaticReader();
  const [page, teamMembers] = await Promise.all([
    reader.singletons.aboutPage.read(),
    reader.collections.teamMembers.all(),
  ]);
  if (!page) throw new Error("aboutPage singleton is missing");

  // A profile only publishes once its name, role AND bio are real. Records still
  // carrying a bracketed "[...]" placeholder, or missing a bio, stay off the live
  // page; if none qualify the whole section is hidden rather than shipping stubs.
  const isFilled = (value?: string | null) => Boolean(value?.trim() && !value.trim().startsWith("["));
  // `teamSectionVisible` forces the section on with every profile, placeholders
  // included, for review; off, only completed profiles publish.
  const team = [...teamMembers]
    .filter(
      (m) => page.teamSectionVisible || (isFilled(m.entry.name) && isFilled(m.entry.title) && isFilled(m.entry.bio))
    )
    .sort((a, b) => (a.entry.order ?? 0) - (b.entry.order ?? 0));

  return (
    <>
      {/* Opening — compact navy band, near-white text, no oversized photo block */}
      <section className="relative -mt-20 sm:-mt-[88px] lg:-mt-24 flex items-end overflow-hidden bg-navy-900 min-h-[520px] sm:min-h-[580px]">
        {page.heroImage ? (
          <img src={page.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <ImagePlaceholder label="Hero photo" className="absolute inset-0 w-full h-full rounded-none" />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(16,35,63,0.94) 0%, rgba(16,35,63,0.82) 50%, rgba(16,35,63,0.5) 100%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-44 pb-16 sm:pb-20 w-full">
          <div className="max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-300 uppercase mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
                {page.heroEyebrow}
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.1] text-white">
                {page.heroHeadline}
              </h1>
            </Reveal>
            <div className="mt-6 space-y-4">
              {page.introParagraphs.map((paragraph, i) => (
                <Reveal key={i} delay={160 + i * 60}>
                  <p className="text-lg text-white/85 leading-relaxed max-w-xl">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Combined team experience — the figure and the words "combined team
          experience" must stay together; it is not BluJoy's operating history. */}
      <section className="py-10 sm:py-[50px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-4 rounded-3xl border border-blue-200 bg-pale-blue p-7 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-10">
            <p className="lg:col-span-6 font-display text-3xl sm:text-4xl font-light tracking-tight text-navy-900">
              <span className="block text-6xl sm:text-7xl text-blue-600">{page.experienceValue}</span>
              {page.experienceLabel}
            </p>
            <p className="lg:col-span-6 text-lg leading-relaxed text-navy-700">{page.experienceSupporting}</p>
          </Reveal>
        </div>
      </section>

      {/* Our Story — heading column + reading column, so the section uses the full width */}
      <section className="py-10 sm:py-[50px] bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <div className={EYEBROW}>{page.storyEyebrow}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-navy-900">{page.storyHeading}</h2>
          </Reveal>
          <div className="lg:col-span-8 space-y-5">
            {page.storyParagraphs.map((paragraph, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                {/* The opening paragraph reads as the lead */}
                <p className={i === 0 ? "text-xl sm:text-2xl leading-relaxed text-navy-800" : "leading-relaxed text-navy-600"}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team — see the `team` filter above for when it shows */}
      {team.length > 0 && (
        <section className="py-10 sm:py-[50px] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="max-w-2xl mb-12">
              <div className={EYEBROW}>{page.teamEyebrow}</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-navy-900">
                {page.leadershipHeading}
              </h2>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person, i) => (
                <Reveal key={person.slug} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-2xl border border-warm-border bg-warm p-6 sm:p-7">
                    {/* A real headshot when supplied; otherwise an initial — never a stock person */}
                    {person.entry.photo ? (
                      <img
                        src={person.entry.photo}
                        alt={person.entry.name}
                        className="mb-5 h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pale-blue font-display text-2xl text-blue-700"
                      >
                        {initial(person.entry.name)}
                      </span>
                    )}
                    <p className="font-display text-xl text-navy-900">{person.entry.name}</p>
                    <p className="mt-1 text-sm text-blue-600">{person.entry.title}</p>
                    <p className="mt-4 border-t border-warm-border pt-4 text-[16px] leading-relaxed text-navy-600">
                      {person.entry.bio}
                    </p>
                    {person.entry.linkedin && (
                      <a
                        href={person.entry.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto pt-5 self-start inline-flex items-center gap-2 text-sm font-medium text-navy-700 transition-colors hover:text-blue-600"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                        <span className="sr-only"> profile for {person.entry.name}</span>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision — side by side on desktop, stacked on mobile */}
      <section className="py-10 sm:py-[50px] bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-0 sm:divide-x sm:divide-white/10">
            <Reveal className="sm:pr-10">
              <h2 className="text-lg sm:text-xl font-mono tracking-wider uppercase text-blue-300 mb-4">{page.missionHeading}</h2>
              <p className="text-xl sm:text-2xl font-light text-white leading-snug">{page.missionText}</p>
            </Reveal>
            <Reveal delay={100} className="sm:pl-10">
              <h2 className="text-lg sm:text-xl font-mono tracking-wider uppercase text-blue-300 mb-4">{page.visionHeading}</h2>
              <p className="text-xl sm:text-2xl font-light text-white leading-snug">{page.visionText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What Guides Our Work — 2x2 on desktop (per the handoff), stacked on mobile */}
      <section className="py-10 sm:py-[50px] bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl mb-12">
            <div className={EYEBROW}>{page.valuesEyebrow}</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-navy-900">{page.valuesHeading}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {page.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 70} className="h-full">
                <div className="flex h-full gap-5 rounded-2xl border border-warm-border bg-white p-6 sm:p-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pale-blue text-blue-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={ICONS[value.iconKey as IconKey]} />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-navy-900">{value.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-navy-600">{value.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — a navy panel on the page edge; white button on navy per the brief */}
      <section className="py-10 sm:py-[50px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col gap-8 rounded-3xl bg-ink p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{page.ctaHeading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{page.ctaDescription}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-7 py-3.5 font-medium text-navy-900 transition-colors hover:bg-warm-dark lg:self-center"
            >
              {page.ctaLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
