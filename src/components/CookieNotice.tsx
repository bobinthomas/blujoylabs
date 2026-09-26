"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

/**
 * Informational cookie notice.
 *
 * The site sets no advertising, analytics or tracking cookies, so under US state
 * privacy laws (CCPA/CPRA and similar) no opt-in consent is required — this tells
 * visitors what the site does and links to the Privacy Policy. It never blocks the
 * page or traps focus.
 *
 * If a tracking or analytics script is ever added, this must become a real
 * opt-out control that also honours Global Privacy Control (navigator.globalPrivacyControl),
 * and the notice text and Privacy Policy must change with it.
 *
 * The dismissal is kept in localStorage — a strictly necessary preference, not a
 * tracking cookie. Bump the key's version to show the notice again after the text
 * materially changes.
 */
const STORAGE_KEY = "bj-cookie-notice-v1";

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    // Storage blocked (private mode, strict settings): show the notice each visit.
    return false;
  }
}

function subscribe(onChange: () => void) {
  // Keeps tabs in sync — dismissing in one tab hides the notice in the others.
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export default function CookieNotice({
  text,
  linkLabel,
  linkHref,
  buttonLabel,
}: {
  text: string;
  linkLabel?: string | null;
  linkHref?: string | null;
  buttonLabel: string;
}) {
  // Server snapshot is "dismissed", so the server renders nothing: no layout flash
  // for returning visitors and no hydration mismatch.
  const storedDismissed = useSyncExternalStore(subscribe, readDismissed, () => true);
  const [dismissedNow, setDismissedNow] = useState(false);

  if (storedDismissed || dismissedNow) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Can't persist — still hide it for this page view.
    }
    setDismissedNow(true);
  }

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6 print:hidden"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-warm-border bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <p className="text-[15px] leading-relaxed text-navy-700">
          {text}
          {linkLabel && linkHref && (
            <>
              {" "}
              <Link href={linkHref} className="text-blue-600 underline underline-offset-2 hover:text-blue-700">
                {linkLabel}
              </Link>
            </>
          )}
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="min-h-11 shrink-0 rounded-full bg-blue-600 px-6 text-[15px] text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}
