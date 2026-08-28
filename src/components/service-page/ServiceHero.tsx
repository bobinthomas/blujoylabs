import Reveal from "@/components/Reveal";

export default function ServiceHero({
  eyebrow,
  headline,
  subheadline,
  image,
  imagePlaceholderLabel,
}: {
  eyebrow: string;
  headline: string;
  subheadline: string;
  image?: string | null;
  imagePlaceholderLabel: string;
}) {
  return (
    <section className="relative -mt-20 sm:-mt-[88px] lg:-mt-24 min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-end overflow-hidden bg-navy-200">
      {image ? (
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0 border-2 border-dashed border-navy-300 text-navy-400">
          <div className="absolute top-20 right-6 sm:top-24 sm:right-10 flex flex-col items-center gap-2 max-w-[160px] sm:max-w-[200px]">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 8h16M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
              />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider text-center">{imagePlaceholderLabel}</span>
          </div>
        </div>
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 pb-20 sm:pb-28 w-full">
        <div className="max-w-2xl">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-300 uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300" />
              {eyebrow}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.1] text-white">
              {headline}
              <svg
                className="inline-block w-8 h-8 sm:w-9 sm:h-9 ml-2 -translate-y-1 text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg">{subheadline}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
