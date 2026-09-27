"use client";

import { useState } from "react";

/** Newsletter sign-up for the navy band on Resources; posts to /api/newsletter. */
export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  if (status === "success") {
    return (
      <p role="status" className="mt-8 text-white/85">
        Thanks — you&apos;re on the list.
      </p>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("submitting");
        setError("");
        const data = new FormData(e.currentTarget);
        try {
          const res = await fetch("/api/newsletter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: data.get("email"), website: data.get("website") || undefined }),
          });
          if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(body?.error || "");
          }
          setStatus("success");
        } catch (err) {
          setError(err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.");
          setStatus("error");
        }
      }}
      className="mt-8 max-w-md mx-auto text-left"
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="nl-email" className="sr-only">
          Email address
        </label>
        <input
          id="nl-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="w-full flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-blue-400 focus:outline-none"
        />
        {/* Spam trap, hidden from people and assistive tech */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 whitespace-nowrap disabled:opacity-60"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-3 text-center text-sm text-red-200">
          {error}
        </p>
      )}
    </form>
  );
}
