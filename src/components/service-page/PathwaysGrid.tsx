import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type Pathway = {
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  image?: string | null;
  imagePlaceholderLabel?: string;
  /** Small pill above the title, e.g. "Recommended for ongoing pipelines". */
  badge?: string;
};

export default function PathwaysGrid({
  eyebrow,
  heading,
  subtitle,
  pathways,
  columns = 3,
  showImages = true,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  pathways: Pathway[];
  /** Card grid width — 2 for text-forward option cards (e.g. engagement models), 3 for illustrated pathways. */
  columns?: 2 | 3;
  /** Set false for option-style cards that don't need a photo/placeholder slot. */
  showImages?: boolean;
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

        <div className={`grid gap-6 ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
          {pathways.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 90}
              className={showImages ? undefined : "rounded-2xl border border-warm-border bg-white p-6 sm:p-8"}
            >
              {showImages &&
                (p.image ? (
                  <img src={p.image} alt="" className="w-full aspect-[4/3] mb-5 object-cover rounded-2xl" />
                ) : (
                  <ImagePlaceholder label={p.imagePlaceholderLabel ?? "Photo"} className="w-full aspect-[4/3] mb-5" />
                ))}
              {p.badge && (
                <span className="inline-flex items-center rounded-full bg-pale-blue px-3 py-1 text-xs font-medium text-blue-700 mb-3">
                  {p.badge}
                </span>
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
