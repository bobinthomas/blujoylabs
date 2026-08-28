import Reveal from "@/components/Reveal";

type Benefit = {
  title: string;
  description: string;
  icon: string;
};

function BenefitIcon({ d }: { d: string }) {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={d} />
    </svg>
  );
}

export default function BenefitsGrid({
  eyebrow,
  heading,
  subtitle,
  benefits,
}: {
  eyebrow: string;
  heading: string;
  subtitle: string;
  benefits: Benefit[];
}) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-blue-600 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            {eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{heading}</h2>
          <p className="mt-4 text-navy-600 leading-relaxed">{subtitle}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-warm border border-warm-border p-6">
                <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <BenefitIcon d={b.icon} />
                </div>
                <h3 className="font-medium text-navy-900">{b.title}</h3>
                <p className="mt-2 text-sm text-navy-600 leading-relaxed">{b.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
