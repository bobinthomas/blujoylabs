import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type Pathway = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  image?: string | null;
  imagePlaceholderLabel: string;
};

export default function PathwaysGrid({
  eyebrow,
  heading,
  subtitle,
  pathways,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  pathways: Pathway[];
}) {
  return (
    <section className="py-20 sm:py-28 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            {eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{heading}</h2>
          <p className="mt-4 text-navy-600 leading-relaxed">{subtitle}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {pathways.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              {p.image ? (
                <img src={p.image} alt="" className="w-full aspect-[4/3] mb-5 object-cover rounded-2xl" />
              ) : (
                <ImagePlaceholder label={p.imagePlaceholderLabel} className="w-full aspect-[4/3] mb-5" />
              )}
              <h3 className="text-lg font-medium text-navy-900">{p.title}</h3>
              <p className="mt-2 text-sm text-navy-600 leading-relaxed">{p.description}</p>
              <Link
                href={p.href}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                {p.linkLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
