import Reveal from "@/components/Reveal";

type FAQ = {
  question: string;
  answer: string;
};

export default function FAQDark({ heading, faqs }: { heading: string; faqs: FAQ[] }) {
  return (
    <section className="py-20 sm:py-28 bg-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white">{heading}</h2>
        </Reveal>
        <Reveal delay={80} className="border-t border-white/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-white/10">
              <summary className="flex items-center justify-between py-5 cursor-pointer font-medium text-white hover:text-white/80 transition-colors list-none">
                {faq.question}
                <svg
                  className="w-5 h-5 text-white/40 group-open:rotate-180 transition-transform shrink-0 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="pb-5 text-white/60 text-[15px] leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
