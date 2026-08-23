export default function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${light ? "text-white" : "text-navy-900"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? "text-blue-100" : "text-navy-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
