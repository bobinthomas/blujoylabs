import type { Metadata } from "next";
import { Epunda_Sans, Epunda_Slab, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const epundaSans = Epunda_Sans({
  variable: "--font-epunda-sans",
  subsets: ["latin"],
  display: "swap",
});

const epundaSlab = Epunda_Slab({
  variable: "--font-epunda-slab",
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
    default: "Blujoy | GovCon, SAP & Design/Engineering Services for Government and Enterprise",
    template: "%s | Blujoy",
  },
  description:
    "We help businesses win government contracts, modernize SAP systems, and design digital experiences that convert. Schedule a free consultation today.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${epundaSans.variable} ${epundaSlab.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">{children}</body>
    </html>
  );
}
