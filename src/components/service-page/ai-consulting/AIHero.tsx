import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function AIHero({
  eyebrow,
  headline,
  lead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
  imagePlaceholderLabel,
}: {
  eyebrow: string;
  headline: string;
  lead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image?: string | null;
  imagePlaceholderLabel: string;
}) {
  const headlineLines = headline.split("\n");

  return (
    <section className="relative -mt-20 sm:-mt-[88px] lg:-mt-24 min-h-[600px] sm:min-h-[680px] flex items-end overflow-hidden bg-ink">
      {image ? (
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 border-2 border-dashed border-white/15">
          <div className="absolute top-24 right-10 flex flex-col items-center gap-2 max-w-[180px] text-white/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
              />
            </svg>
            <span className="text-[10px] font-mono tracking-wider uppercase text-center">{imagePlaceholderLabel}</span>
          </div>
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(18,23,34,0.95) 0%, rgba(18,23,34,0.8) 42%, rgba(18,23,34,0.4) 75%, rgba(18,23,34,0.12) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(18,23,34,0.82), transparent 46%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 pb-16 w-full">
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-mono tracking-wider uppercase text-blue-300 mb-6">
              [ New Service ]
              <span className="text-white/40 normal-case tracking-normal">{eyebrow}</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.15] text-white">
              {headlineLines.map((line, i) =>
                i === 0 ? (
                  <span key={i} className="block">
                    {line}
                  </span>
                ) : (
                  <span key={i} className="block text-blue-300">
                    [ {line} ]
                  </span>
                )
              )}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg">{lead}</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                {primaryLabel}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href={secondaryHref}
                className="inline-flex items-center px-6 py-3 border border-white/25 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                {secondaryLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
