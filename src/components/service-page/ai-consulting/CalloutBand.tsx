import Reveal from "@/components/Reveal";

export default function CalloutBand({ quote, text }: { quote: string; text: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl bg-ink text-white p-8 sm:p-10">
        <svg className="w-8 h-8 text-blue-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.17 6C4.86 8.06 3 11.13 3 14.5 3 17.54 5.02 19 7.14 19c2.06 0 3.71-1.66 3.71-3.71 0-2.06-1.42-3.55-3.25-3.55-.37 0-.72.05-.97.13.32-1.9 1.87-4.15 3.75-5.4L7.17 6zm10 0c-2.31 2.06-4.17 5.13-4.17 8.5 0 3.04 2.02 4.5 4.14 4.5 2.06 0 3.71-1.66 3.71-3.71 0-2.06-1.42-3.55-3.25-3.55-.37 0-.72.05-.97.13.32-1.9 1.87-4.15 3.75-5.4L17.17 6z" />
        </svg>
        <p className="text-xl sm:text-2xl font-light leading-snug">{quote}</p>
        <p className="mt-4 text-white/60 leading-relaxed">{text}</p>
      </div>
    </Reveal>
  );
}
