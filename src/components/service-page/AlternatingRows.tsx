import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

type Row = {
  title: string;
  description: string;
  bullets: readonly string[];
  image?: string | null;
  imagePlaceholderLabel: string;
};

export default function AlternatingRows({ rows }: { rows: readonly Row[] }) {
  return (
    <>
      {rows.map((row, i) => (
        <section key={row.title} className={i % 2 === 0 ? "bg-white" : "bg-warm"}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                {row.image ? (
                  <img src={row.image} alt="" className="w-full aspect-[4/3] object-cover rounded-2xl" />
                ) : (
                  <ImagePlaceholder label={row.imagePlaceholderLabel} className="w-full aspect-[4/3]" />
                )}
              </Reveal>
              <Reveal delay={80} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <h2 className="text-2xl sm:text-3xl font-medium text-navy-900">{row.title}</h2>
                <p className="mt-4 text-navy-600 leading-relaxed">{row.description}</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {row.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-navy-700">{b}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
