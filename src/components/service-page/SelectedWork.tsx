import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export type SelectedWorkItem = {
  title: string;
  brief: string;
  workDelivered: string;
  image?: string | null;
  link?: string | null;
  contextLabel: "bluejoy" | "team" | "concept";
};

const CONTEXT_LABELS: Record<SelectedWorkItem["contextLabel"], string> = {
  bluejoy: "BluJoy project",
  team: "Team experience",
  concept: "Concept project",
};

/** Hidden entirely when there are no real samples yet — do not render empty cards. */
export default function SelectedWork({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: readonly SelectedWorkItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-warm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{heading}</h2>
          <p className="mt-4 text-navy-600 leading-relaxed">{intro}</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-warm-border bg-white">
                {item.image ? (
                  <img src={item.image} alt="" className="w-full aspect-[4/3] object-cover" />
                ) : (
                  <ImagePlaceholder label="Visual" className="w-full aspect-[4/3] rounded-none" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 inline-flex w-fit items-center rounded-full bg-pale-blue px-3 py-1 text-xs font-medium text-blue-700">
                    {CONTEXT_LABELS[item.contextLabel]}
                  </span>
                  <h3 className="text-lg font-medium text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{item.brief}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">
                    <span className="font-medium text-navy-800">Work delivered: </span>
                    {item.workDelivered}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                    >
                      View project
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
