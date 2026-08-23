export default function PlaceholderContent({ label }: { label: string }) {
  return (
    <div className="placeholder-content">
      <p>[Placeholder &mdash; add content]</p>
      <p className="text-sm mt-1 opacity-70">{label}</p>
    </div>
  );
}
