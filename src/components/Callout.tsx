/**
 * A highlighted note for information a reader should not skim past — a scope
 * caveat, a condition, a limitation. Uses palette colours only (pale blue + strong
 * blue) so it reads as part of the system rather than as a warning.
 */
export default function Callout({
  label,
  children,
  className = "",
}: {
  label?: string | null;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={`flex gap-4 rounded-2xl border border-blue-200 bg-pale-blue p-5 sm:p-6 ${className}`}
    >
      <svg
        className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" strokeWidth={1.75} />
        <path strokeLinecap="round" strokeWidth={1.75} d="M12 11v5M12 8h.01" />
      </svg>
      <div>
        {label && <p className="font-display text-base font-semibold text-navy-900">{label}</p>}
        <div className={`text-base leading-relaxed text-navy-700 ${label ? "mt-1" : ""}`}>{children}</div>
      </div>
    </div>
  );
}
