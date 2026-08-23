import Link from "next/link";

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
        dark ? "bg-blue-600 text-white" : "bg-warm text-navy-900"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full ${
            dark ? "bg-white/5" : "bg-blue-100"
          } opacity-60`}
        />
        <div
          className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full ${
            dark ? "bg-white/5" : "bg-blue-50"
          } opacity-60`}
        />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
          {headline}
        </h1>
        {subheadline && (
          <p
            className={`mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed ${
              dark ? "text-blue-100" : "text-navy-600"
            }`}
          >
            {subheadline}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className={`inline-flex items-center px-8 py-3.5 font-semibold rounded-full transition-all shadow-md text-base ${
              dark
                ? "bg-white text-blue-700 hover:bg-blue-50"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
            }`}
          >
            {ctaText}
          </Link>
          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className={`inline-flex items-center px-8 py-3.5 font-semibold rounded-full transition-colors text-base ${
                dark
                  ? "border-2 border-white/30 text-white hover:bg-white/10"
                  : "bg-white text-navy-700 border border-warm-border hover:bg-warm-dark"
              }`}
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
