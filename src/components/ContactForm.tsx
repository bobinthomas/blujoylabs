"use client";

import Link from "next/link";
import { useState } from "react";

const SERVICE_OPTIONS = [
  { value: "govcon", label: "GovCon Support" },
  { value: "ai-consulting", label: "AI Consulting" },
  { value: "design-engineering", label: "Design & Engineering" },
  { value: "multiple-unsure", label: "Multiple services / Not sure yet" },
];

const isKnownService = (value?: string) => SERVICE_OPTIONS.some((o) => o.value === value);

const FIELD_CLASS =
  "w-full rounded-xl border border-warm-border bg-warm px-4 py-2.5 text-navy-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function ContactForm({
  heading,
  description,
  defaultService,
  submitLabel = "Send Enquiry",
  className = "",
}: {
  heading?: string;
  description?: string;
  defaultService?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Drives the conditional deadline field — only GovCon pursuits have a submission date.
  const [service, setService] = useState(isKnownService(defaultService) ? defaultService! : "");

  if (status === "success") {
    return (
      <div
        role="status"
        className={`flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-warm-border bg-white p-8 text-center sm:p-10 ${className}`}
      >
        <svg className="mb-4 h-12 w-12 text-teal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="max-w-sm text-navy-700 leading-relaxed">
          Thank you for contacting BluJoy Labs. We&apos;ve received your enquiry and will be in touch to discuss your
          needs.
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate={false}
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");
        const data = new FormData(e.currentTarget);
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              company: data.get("company") || undefined,
              email: data.get("email"),
              service: data.get("service"),
              message: data.get("message"),
              deadline: data.get("deadline") || undefined,
            }),
          });
          // Only a accepted submission may show the success state — the entered
          // text is left in place on any failure so the visitor can retry.
          if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(body?.error || "");
          }
          setStatus("success");
        } catch (err) {
          setErrorMessage(err instanceof Error && err.message ? err.message : "");
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
            Name
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" className={FIELD_CLASS} />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-navy-800">
            Email
          </label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={FIELD_CLASS} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-company" className="mb-1.5 block text-sm font-medium text-navy-800">
            Company / Organisation <span className="font-normal text-navy-500">(optional)</span>
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" className={FIELD_CLASS} />
        </div>
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
            className={FIELD_CLASS}
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
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-navy-800">
          How can we help?
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder="Briefly describe your project, pursuit or idea, and any important dates."
          className={`${FIELD_CLASS} resize-none`}
        />
        <p className="mt-1.5 text-xs leading-relaxed text-navy-500">
          Please don&apos;t include confidential documents, passwords or sensitive personal information.
        </p>
      </div>

      {/* Submission deadline is meaningful only for an active GovCon pursuit, so it
          appears only for that service. Date-only — no time, no timezone note. */}
      {service === "govcon" && (
        <div>
          <label htmlFor="cf-deadline" className="mb-1.5 block text-sm font-medium text-navy-800">
            Submission deadline <span className="font-normal text-navy-500">(optional)</span>
          </label>
          <input id="cf-deadline" name="deadline" type="date" className={FIELD_CLASS} />
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage || "We couldn't send your enquiry. Your details are still here — please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
        {status !== "submitting" && (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </button>

      <p className="text-center text-xs text-navy-500">
        Read our{" "}
        <Link href="/privacy" className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
