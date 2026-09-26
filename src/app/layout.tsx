import type { Metadata } from "next";
import { Questrial, Kulim_Park, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** Body face. Questrial ships a single weight (400) — see the note in globals.css. */
const questrial = Questrial({
  variable: "--font-questrial",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Heading face. Only the weights the headings actually use are loaded:
 * `font-light` → 300, `font-semibold` → 600, and 400 as the resolved target for
 * `font-medium` (Kulim Park has no 500). No heading uses `font-bold`, so 700 is
 * left out; were one added it would resolve to 600 rather than being synthesised.
 */
const kulimPark = Kulim_Park({
  variable: "--font-kulim-park",
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BluJoy Labs | GovCon Support, AI Consulting and Design & Engineering",
    template: "%s | BluJoy Labs",
  },
  description:
    "BluJoy Labs supports government contractors with capture and proposal services, develops AI and custom solutions, and provides design and engineering services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${questrial.variable} ${kulimPark.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {/* Scroll reveals start at opacity 0 and are un-hidden by script, so
            without JS every page would render blank. globals.css handles this via
            `(scripting: none)`; this is the fallback for browsers that don't
            support that media query yet. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important;translate:none!important;--tw-translate-x:0px!important;--tw-translate-y:0px!important;transition:none!important}</style>",
          }}
        />
        {children}
      </body>
    </html>
  );
}
