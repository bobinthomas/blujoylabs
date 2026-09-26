"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Informational cookie notice.
 *
 * The site sets no advertising, analytics or tracking cookies, so under US state
 * privacy laws (CCPA/CPRA and similar) no opt-in consent is required — this tells
 * visitors what the site does and links to the Privacy Policy. It never blocks the
 * page or traps focus.
 *
 * Behaviour: a first-time visitor sees the notice as a compact card in the
 * bottom-left corner. It folds away into a round cookie button that stays in the
 * corner once they scroll, after 8 seconds, or on their first click elsewhere; the
 * button reopens the card at any time. "Got it" is remembered, so later visits
 * start folded away.
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
const COLLAPSE_AFTER_PX = 80;
/** On short screens the open card can cover the hero buttons, so it also folds itself away. */
const AUTO_FOLD_MS = 8000;
const PANEL_ID = "cookie-notice-panel";

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "dismissed";
  } catch {
    // Storage blocked (private mode, strict settings): treat as a first visit.
    return false;
  }
}

function subscribe(onChange: () => void) {
  // Keeps tabs in sync — dismissing in one tab folds the notice in the others.
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function CookieIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M21 12.5A9 9 0 1111.5 3a3 3 0 003.5 3.5 3 3 0 003 3 3 3 0 003 3z"
      />
      <circle cx="8.5" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="10" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
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
  // Server snapshot is "dismissed", so the server (and first paint) shows only the
  // folded button: no layout shift and no hydration mismatch.
  const dismissed = useSyncExternalStore(subscribe, readDismissed, () => true);
  const [scrolled, setScrolled] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // null = automatic (open for first-time visitors until they scroll);
  // true/false = the visitor opened or closed it by hand, which then wins.
  const [manual, setManual] = useState<boolean | null>(null);

  const expanded = manual ?? (!dismissed && !scrolled && !timedOut);

  // Automatic mode only: fold after a pause so the card never parks on content.
  useEffect(() => {
    if (manual !== null || dismissed || scrolled || timedOut) return;
    const timer = window.setTimeout(() => setTimedOut(true), AUTO_FOLD_MS);
    return () => window.clearTimeout(timer);
  }, [manual, dismissed, scrolled, timedOut]);

  useEffect(() => {
    if (scrolled) return;
    const onScroll = () => {
      if (window.scrollY > COLLAPSE_AFTER_PX) setScrolled(true);
    };
    // Also catch a page that opens already scrolled (reload, back navigation).
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setManual(false);
    };
    // A click or tap anywhere outside the notice folds it away.
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setManual(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [expanded]);

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // Can't persist — still fold it away for this page view.
    }
    setManual(false);
  }

  // DOM order is button then card: on phones the column is reversed so the card
  // sits above the button; from `sm` up the card opens beside it, bottom-aligned,
  // which keeps it short enough to clear the hero's call-to-action buttons.
  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-50 flex flex-col-reverse items-start gap-3 sm:bottom-6 sm:left-6 sm:flex-row sm:items-end print:hidden">
      <button
        type="button"
        onClick={() => setManual(!expanded)}
        aria-expanded={expanded}
        aria-controls={expanded ? PANEL_ID : undefined}
        aria-label={expanded ? "Hide cookie notice" : "Show cookie notice"}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-warm-border bg-white text-blue-600 shadow-lg transition-colors hover:bg-pale-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <CookieIcon className="h-6 w-6" />
      </button>

      {expanded && (
        <section
          id={PANEL_ID}
          aria-label="Cookie notice"
          className="cookie-pop flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 rounded-2xl border border-warm-border bg-white p-4 shadow-lg sm:w-auto sm:max-w-2xl sm:flex-row sm:items-center sm:gap-5 sm:p-5"
        >
          <p className="text-sm leading-relaxed text-navy-700 sm:text-[15px]">
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
            className="min-h-11 w-full shrink-0 rounded-full bg-blue-600 px-6 text-[15px] text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
          >
            {buttonLabel}
          </button>
        </section>
      )}
    </div>
  );
}
