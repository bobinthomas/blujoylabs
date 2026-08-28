import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function SplitCTA({
  heading,
  description,
  ctaText,
  ctaHref = "/contact",
  image,
  imagePlaceholderLabel,
}: {
  heading: string;
  description: string;
  ctaText: string;
  ctaHref?: string;
  image?: string | null;
  imagePlaceholderLabel: string;
}) {
  return (
    <section className="py-20 sm:py-28 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid sm:grid-cols-2 rounded-2xl overflow-hidden">
            {image ? (
              <img src={image} alt="" className="w-full min-h-[280px] object-cover" />
            ) : (
              <ImagePlaceholder label={imagePlaceholderLabel} className="w-full min-h-[280px] rounded-none border-r-0" />
            )}
            <div className="bg-ink text-white p-8 sm:p-10 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight">{heading}</h2>
              <p className="mt-4 text-white/70 leading-relaxed">{description}</p>
              <div className="mt-8">
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                >
                  {ctaText}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
