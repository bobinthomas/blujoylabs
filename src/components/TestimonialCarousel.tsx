"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const t = testimonials[active];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-warm-border bg-white p-8 sm:p-10">
      <svg className="w-9 h-9 text-navy-300 mb-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
      </svg>
      <p className="flex-1 text-xl leading-relaxed text-navy-800">{t.quote}</p>
      <div className="mt-8 flex items-center gap-3 border-t border-warm-border pt-6">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
          {initials(t.name)}
        </div>
        <div>
          <p className="text-sm font-medium text-navy-900">{t.name}</p>
          <p className="mt-0.5 text-xs text-navy-500">{t.title}</p>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === active ? "w-8 bg-blue-600" : "w-4 bg-warm-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
