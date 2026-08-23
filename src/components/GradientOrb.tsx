export default function GradientOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`relative isolate ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0 rounded-full animate-orb-spin"
        style={{
          background:
            "conic-gradient(from 0deg, #0068f9, #6736eb, #d6e4f1, #0068f9)",
          filter: "blur(28px)",
          opacity: 0.5,
        }}
      />
      <div
        className="absolute inset-[12%] rounded-full animate-orb-spin-reverse"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #6736eb 0%, #0068f9 45%, transparent 70%)",
          filter: "blur(6px)",
          opacity: 0.75,
        }}
      />
      <div className="absolute inset-[22%] rounded-full bg-eggshell/70 backdrop-blur-2xl border border-white/40" />
    </div>
  );
}
