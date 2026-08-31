import Reveal from "@/components/Reveal";

type Item = {
  title: string;
  description: string;
  icon?: string;
  number?: string;
};

export default function HairlineGrid({
  items,
  columns,
  dark = false,
}: {
  items: readonly Item[];
  columns: 2 | 4;
  dark?: boolean;
}) {
  const colsClass = columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2";
  const borderColor = dark ? "border-white/10" : "border-warm-border";
  const mutedText = dark ? "text-white/50" : "text-navy-600";
  const titleText = dark ? "text-white" : "text-navy-900";

  return (
    <div className={`grid ${colsClass} gap-x-7 gap-y-0`}>
      {items.map((item, i) => {
        const isLastInRow = (i + 1) % columns === 0;
        return (
          <Reveal
            key={item.title}
            delay={i * 50}
            className={`border-t ${borderColor} py-5 ${!isLastInRow ? `sm:border-r ${borderColor} sm:pr-6` : ""}`}
          >
            <div className="flex items-center justify-between">
              {item.icon ? (
                <svg className={`w-5 h-5 ${dark ? "text-blue-300" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d={item.icon} />
                </svg>
              ) : item.number ? (
                <span className={`font-mono text-xl font-light ${dark ? "text-blue-300" : "text-blue-600"}`}>{item.number}</span>
              ) : (
                <span />
              )}
            </div>
            <div className={`mt-3 text-base font-medium ${titleText}`}>{item.title}</div>
            <div className={`mt-1.5 text-sm leading-relaxed ${mutedText}`}>{item.description}</div>
          </Reveal>
        );
      })}
    </div>
  );
}
