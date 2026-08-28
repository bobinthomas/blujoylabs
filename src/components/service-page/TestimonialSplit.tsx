import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function TestimonialSplit({
  heading,
  quote,
  name,
  title,
  image,
  imagePlaceholderLabel,
}: {
  heading: string;
  quote: string;
  name: string;
  title: string;
  image?: string | null;
  imagePlaceholderLabel: string;
}) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-navy-900 mb-10">{heading}</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="grid sm:grid-cols-2 rounded-2xl overflow-hidden">
            <div className="bg-blue-600 text-white p-8 sm:p-10 flex flex-col justify-center">
              <p className="text-xl sm:text-2xl leading-relaxed font-light">{quote}</p>
              <div className="mt-8">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-blue-100 mt-0.5">{title}</p>
              </div>
            </div>
            {image ? (
              <img src={image} alt="" className="w-full min-h-[280px] object-cover" />
            ) : (
              <ImagePlaceholder label={imagePlaceholderLabel} className="w-full min-h-[280px] rounded-none border-l-0" />
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
