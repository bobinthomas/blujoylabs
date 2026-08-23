import Reveal from "@/components/Reveal";

export default function ServiceCard({
  number,
  title,
  tagline,
  description,
  whatYouGet,
  whoItsFor,
  delay = 0,
}: {
  number?: number;
  title: string;
  tagline?: string;
  description: string;
  whatYouGet: string[];
  whoItsFor?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="bg-white rounded-2xl p-8 border border-warm-border hover:border-navy-300 transition-colors duration-300">
      {number && (
        <div className="w-10 h-10 rounded-full bg-warm-taupe text-navy-900 font-medium text-sm flex items-center justify-center mb-4">
          {String(number).padStart(2, "0")}
        </div>
      )}
      <h3 className="text-xl font-medium text-navy-900">{title}</h3>
      {tagline && <p className="mt-1 text-sm text-graphite font-medium">{tagline}</p>}
      <p className="mt-3 text-navy-600 leading-relaxed text-[15px]">{description}</p>
      <div className="mt-6">
        <h4 className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-3">What You Get</h4>
        <ul className="space-y-2">
          {whatYouGet.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-navy-600">
              <svg className="w-4 h-4 text-forest mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
      {whoItsFor && (
        <div className="mt-6 pt-6 border-t border-warm-border">
          <h4 className="text-xs font-medium text-navy-400 uppercase tracking-wider mb-2">Who It&apos;s For</h4>
          <p className="text-sm text-navy-600 leading-relaxed">{whoItsFor}</p>
        </div>
      )}
    </Reveal>
  );
}
