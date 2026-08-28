import Reveal from "@/components/Reveal";

type Stat = {
  value: string;
  label: string;
};

export default function StatBand({ heading, stats }: { heading?: string; stats: Stat[] }) {
  return (
    <section className="py-20 sm:py-28 bg-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {heading && (
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{heading}</h2>
          </Reveal>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="text-center">
              <div className="text-4xl sm:text-5xl font-light text-blue-400">{s.value}</div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
