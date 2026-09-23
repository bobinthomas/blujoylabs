"use client";

import { useState } from "react";

const SERVICE_OPTIONS = [
  { value: "govcon", label: "GovCon Support" },
  { value: "ai-consulting", label: "AI Consulting" },
  { value: "design-engineering", label: "Design & Engineering" },
  { value: "other", label: "Other" },
];

const ENGAGEMENT_OPTIONS = [
  { value: "monthly", label: "Monthly support" },
  { value: "project", label: "Individual pursuit or project" },
  { value: "unsure", label: "Not sure yet" },
];

const isKnownService = (value?: string) => SERVICE_OPTIONS.some((o) => o.value === value);
const isKnownEngagement = (value?: string) => ENGAGEMENT_OPTIONS.some((o) => o.value === value);

function detectTimeZone(): string {
  if (typeof window === "undefined") return "";
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "";
  }
}

export default function ContactForm({
  heading,
  description,
  defaultService,
  defaultEngagement,
  submitLabel = "Send Enquiry",
  className = "",
}: {
  heading?: string;
  description?: string;
  defaultService?: string;
  defaultEngagement?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [service, setService] = useState(isKnownService(defaultService) ? defaultService! : "");

  if (status === "success") {
    return (
      <div
        className={`flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-warm-border bg-white p-8 text-center sm:p-10 ${className}`}
      >
        <svg className="mb-4 h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-navy-900">Thank you.</h3>
        <p className="mt-2 text-navy-600">Your enquiry has been received.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        const form = e.currentTarget;
        const data = new FormData(form);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              company: data.get("company"),
              email: data.get("email"),
              phone: data.get("phone") || undefined,
              service: data.get("service"),
              engagement: data.get("engagement") || undefined,
              message: data.get("message"),
              deadline: data.get("deadline") || undefined,
            }),
          });
          if (!res.ok) throw new Error("request failed");
          setStatus("success");
        } catch {
          setStatus("error");
        }
      }}
      className={`space-y-5 rounded-2xl border border-warm-border bg-white p-8 sm:p-10 ${className}`}
    >
      {heading && <h2 className="text-2xl font-medium text-navy-900">{heading}</h2>}
      {description && <p className="text-navy-600">{description}</p>}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-navy-800">
            Full name
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-sm font-medium text-navy-800">
            Company
          </label>
          <input
            id="cf-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-navy-800">
            Work email
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-navy-800">
            Phone <span className="font-normal text-navy-500">(optional)</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-service" className="mb-1.5 block text-sm font-medium text-navy-800">
            Service interest
          </label>
          <select
            id="cf-service"
            name="service"
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {service === "govcon" && (
          <div>
            <label htmlFor="cf-engagement" className="mb-1.5 block text-sm font-medium text-navy-800">
              Engagement
            </label>
            <select
              id="cf-engagement"
              name="engagement"
              required
              defaultValue={isKnownEngagement(defaultEngagement) ? defaultEngagement : ""}
              className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select an option
              </option>
              {ENGAGEMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-navy-800">
          How can we help you?
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="A brief description is enough to get started."
          className="w-full resize-none rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1.5 text-xs leading-relaxed text-navy-500">
          Please avoid sharing confidential proposal content, controlled information, credentials or personal
          records here. We can agree an appropriate channel for sharing project materials.
        </p>
      </div>

      <div>
        <label htmlFor="cf-deadline" className="mb-1.5 block text-sm font-medium text-navy-800">
          Submission deadline <span className="font-normal text-navy-500">(optional, for active pursuits)</span>
        </label>
        <input
          id="cf-deadline"
          name="deadline"
          type="datetime-local"
          className="w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-1.5 text-xs text-navy-500" suppressHydrationWarning>
          {detectTimeZone() && `Shown in your time zone: ${detectTimeZone()}`}
        </p>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          We couldn&apos;t send your enquiry. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
        {status !== "submitting" && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>
    </form>
  );
}
