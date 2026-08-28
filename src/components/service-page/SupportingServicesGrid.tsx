import Reveal from "@/components/Reveal";

type SupportingService = {
  title: string;
  description: string;
};

export default function SupportingServicesGrid({
  heading,
  subtitle,
  services,
}: {
  heading: string;
  subtitle: string;
  services: SupportingService[];
}) {
  return (
    <section className="py-20 sm:py-28 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-navy-900">{heading}</h2>
          <p className="mt-3 text-navy-600 leading-relaxed">{subtitle}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="h-full rounded-2xl bg-white border border-warm-border p-6">
                <h3 className="font-medium text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-600 leading-relaxed">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
