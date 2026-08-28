"use client";

import { useState } from "react";

const sourceOptions = ["Google Search", "LinkedIn", "Referral", "Social Media", "Other"];

export default function ContactFormCard() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-warm-border bg-white p-8 text-center sm:p-10">
        <svg className="mb-4 h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-navy-900">Thank you!</h3>
        <p className="mt-2 text-navy-600">We&apos;ll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-5 rounded-2xl border border-warm-border bg-white p-8 sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-800">Full name</label>
          <input
            type="text"
            required
            placeholder="Your name"
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-800">Your company</label>
          <input
            type="text"
            placeholder="Your company"
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-800">E-mail</label>
        <input
          type="email"
          required
          placeholder="Your e-mail"
          className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-800">How can we help you?</label>
        <textarea
          required
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full resize-none rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy-800">How did you hear about us?</label>
        <select
          defaultValue=""
          className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            -
          </option>
          {sourceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-blue-700"
      >
        Schedule a Free Consultation
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>
      <p className="text-xs leading-relaxed text-navy-500">
        By clicking the button, you consent to the processing of your personal data in accordance with our Privacy
        Policy.
      </p>
    </form>
  );
}
