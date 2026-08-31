import Reveal from "@/components/Reveal";

type Stat = {
  value: string;
  label: string;
};

export default function StatStrip({ stats }: { stats: readonly Stat[] }) {
  return (
    <div className="border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 60}
            className={`py-5 ${i > 0 ? "sm:border-l border-white/10 sm:pl-7" : ""} ${i % 2 === 1 ? "pl-7" : ""}`}
          >
            <div className="text-3xl font-light text-white">{stat.value}</div>
            <div className="mt-1 text-xs font-mono tracking-wider uppercase text-white/40">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
