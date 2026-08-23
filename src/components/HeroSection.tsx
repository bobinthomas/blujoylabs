import Link from "next/link";
import Reveal from "@/components/Reveal";
import GradientOrb from "@/components/GradientOrb";

export default function HeroSection({
  headline,
  subheadline,
  ctaText = "Schedule a Free Consultation",
  ctaHref = "/contact",
  secondaryCtaText,
  secondaryCtaHref,
  dark = false,
}: {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={`relative py-20 sm:py-28 lg:py-36 overflow-hidden ${
        dark ? "bg-ink text-white" : "bg-warm text-navy-900"
      }`}
    >
      <GradientOrb className="hidden lg:block absolute -top-16 -right-16 w-72 h-72 opacity-70 pointer-events-none" />
      <Reveal className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1]">
          {headline}
        </h1>
        {subheadline && (
          <p
            className={`mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              dark ? "text-white/70" : "text-navy-600"
            }`}
          >
            {subheadline}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className={`inline-flex items-center px-8 py-3.5 font-medium rounded-full transition-all text-base ${
              dark
                ? "bg-white text-ink hover:bg-warm-taupe"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {ctaText}
          </Link>
          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className={`inline-flex items-center px-8 py-3.5 font-medium rounded-full transition-colors text-base ${
                dark
                  ? "border border-white/30 text-white hover:bg-white/10"
                  : "bg-white text-navy-700 border border-warm-border hover:bg-warm-dark"
              }`}
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
