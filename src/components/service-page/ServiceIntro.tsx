import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";

export default function ServiceIntro({
  heading,
  paragraphs,
  image,
  imagePlaceholderLabel,
}: {
  heading: string;
  paragraphs: string[];
  image?: string | null;
  imagePlaceholderLabel: string;
}) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            {image ? (
              <img src={image} alt="" className="w-full aspect-square object-cover rounded-2xl" />
            ) : (
              <ImagePlaceholder label={imagePlaceholderLabel} className="w-full aspect-square" />
            )}
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-navy-900">{heading}</h2>
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-navy-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
