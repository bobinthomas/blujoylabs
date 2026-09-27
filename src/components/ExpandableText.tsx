"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Paragraph clamped to five lines with a "Read more" toggle.
 *
 * The toggle only appears when the text genuinely overflows the clamp — it is
 * measured, not guessed from character count, so a short bio never shows a
 * pointless button, and the measurement re-runs as the card width changes.
 * The full text stays in the DOM either way, so it is always indexable and
 * readable by assistive technology.
 */
export default function ExpandableText({ text, className = "" }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Measure only while clamped; once expanded the button must stay available.
    const observer = new ResizeObserver(() => {
      if (!expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <div>
      <p id={id} ref={ref} className={`${className} ${expanded ? "" : "line-clamp-5"}`}>
        {text}
      </p>
      {(overflows || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-2 text-sm text-blue-600 underline-offset-2 hover:text-blue-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
