import Link from "next/link";

export default function CTASection({
  headline,
  ctaText = "Let's Talk",
  ctaHref = "/contact",
}: {
  headline: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{headline}</h2>
        <div className="mt-8">
          <Link
            href={ctaHref}
            className="inline-flex items-center px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-md text-lg"
          >
            {ctaText}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
